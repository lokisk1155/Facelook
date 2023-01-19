import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSimpleUsers } from "../../store/simpleUsers";
import { useEffect } from "react";
import Facebook from "../NavBar/imgs/Facebook.png";
import profilePic from "../NavBar/imgs/blank.png";
import { Link } from "react-router-dom";
import { fetchStories } from "../../store/story";
import "./StoryShow.css";

function StoryShow() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    await dispatch(fetchStories());
    await dispatch(getSimpleUsers());
  };

  const simpleUsers = useSelector((state) => state.simpleUsers);
  const sessionUser = useSelector((state) => state.session.user);
  const stories = useSelector((state) => state.stories);
  //   console.log(stories[id], 'target story');

  if (!stories || !simpleUsers) {
    return null;
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
            Object.values(stories).map((story) => {
              return (
                <Link
                  key={story?.id}
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
                  to={`/stories/${story.id}`}
                >
                  <img
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50px",
                    }}
                    src={simpleUsers[story.user_id]?.picture || profilePic}
                  />
                  <p>{simpleUsers[story.user_id]?.name}</p>
                </Link>
              );
            })}
        </div>
      </div>

      <div
        className="story-show-preview-container"
        style={{ width: "80%", backgroundColor: "black", position: "relative" }}
      >
        {stories[id]?.picture === null ? (
          <div
            className="actual-story-show-background"
            style={{
              height: "90%",
              width: "50%",
              position: "absolute",
              borderRadius: "7px",
              backgroundColor: stories[id].background_color,
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
                fontSize: stories[id].font_size,
                justifyContent: "center",
                paddingTop: `${stories[id].padding_top}px`,
                paddingLeft: `${stories[id].padding_left}px`,
                paddingRight: `${stories[id].padding_right}px`,
                color: "black",
                minWidth: "150px",
                minHeight: "200px",
                position: "absolute",
              }}
            >
              {stories[id].text_content}
            </p>
          </div>
        ) : (
          <img
            className="actual-text-story-background"
            src={stories[id]?.picture}
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
    </div>
  );
}

export default StoryShow;
