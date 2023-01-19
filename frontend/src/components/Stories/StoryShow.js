import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { getSimpleUsers } from "../../store/simpleUsers";
import { fetchStories } from "../../store/story";
import Facebook from "../NavBar/imgs/Facebook.png";
import profilePic from "../NavBar/imgs/blank.png";

import "./StoryShow.css";

function StoryShow() {
  const dispatch = useDispatch();

  const history = useHistory();

  const { id } = useParams();

  const [currentWindow, setCurrentWindow] = useState(0)

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchStories());
      await dispatch(getSimpleUsers());
    };
    getData();
  }, [id]);

  const simpleUsers = useSelector((state) => state.simpleUsers);

  const stories = useSelector((state) => state.stories);

  if (!stories[id] || !simpleUsers) {
    return null 
  }
  const currentStory = stories[id][currentWindow]
  const usersWithStories = {};

  for (const id in stories) {
    usersWithStories[id] = simpleUsers[id];
  }

  return (
    <div
      className="stories-show-omega-container"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        backgroundColor: "#fff",
      }}
    >
      <div
        className="story-show-side-bar"
        style={{ width: "20%", minWidth: "150px" }}
      >
        <div style={{ display: "flex" }}>
          <button
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50px",
              backgroundColor: "#fff",
              border: "none",
            }}
            onClick={() => history.push("/")}
          >
            X
          </button>
          <img
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50px",
              backgroundColor: "#fff",
              border: "none",
            }}
            onClick={() => history.push("/")}
            src={Facebook}
          />
        </div>
        <br></br>
        <div className="your-stories-show">
          <h4>Your Story</h4>
          <button onClick={() => history.push("/stories/create")}>
            Create Story
          </button>
        </div>
        <br></br>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            height: "75%",
          }}
        >
          <h4>All Stories</h4>
          {stories &&
            Object.values(usersWithStories).map((user) => {
              return (
                <Link
                  key={user?.user_id}
                  className="all-stories-mapped"
                  style={{
                    display: "flex",
                    height: "65px",
                    width: "100%",
                    alignItems: "center",
                    paddingLeft: "10px",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                  to={`/stories/${user?.user_id}`}
                >
                  <img
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50px",
                    }}
                    src={user?.profile_picture || profilePic}
                  />
                  <p>{user?.name}</p>
                </Link>
              );
            })}
        </div>
      </div>

      <div
        className="story-show-preview-container"
        style={{ width: "80%", backgroundColor: "black", position: "relative" }}
      >
        {currentStory?.picture === null ? (
          <div
            className="actual-story-show-background"
            style={{
              height: "90%",
              width: "50%",
              position: "absolute",
              borderRadius: "7px",
              backgroundColor: currentStory?.background_color,
              minWidth: "200px",
              minHeight: "200px",
              top: "50%",
              right: "50%",
              bottom: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "300px",
              position: "absolute",
              borderRadius: "5px",
            }}
          >
            <p
              className="actual-story-show-text"
              style={{
                fontSize: currentStory?.font_size,
                justifyContent: "center",
                paddingTop: `${currentStory?.padding_top}px`,
                paddingLeft: `${currentStory?.padding_left}px`,
                paddingRight: `${currentStory?.padding_right}px`,
                color: "black",
                minWidth: "150px",
                minHeight: "200px",
                position: "absolute",
              }}
            >
              {currentStory?.text_content}
            </p>
          </div>
        ) : (
          <img
            className="actual-text-story-background"
            src={currentStory?.picture}
            style={{
              height: "90%",
              width: "65%",
              position: "absolute",
              borderRadius: "7px",
              minWidth: "200px",
              minHeight: "200px",
              top: "50%",
              right: "50%",
              bottom: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "300px",
            }}
          ></img>
        )}
      </div>
      <button onClick={() => setCurrentWindow(() => {
        if (currentWindow >= Object.keys(stories[id]).length) {
          return 0 
        } else {
          const newWindow = currentWindow + 1 
          return newWindow
        }
      })}>next picture</button>
    </div>
  );
}

export default StoryShow;
