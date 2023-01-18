import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSimpleUsers } from "../../store/simpleUsers";
import { useEffect } from "react";
import Facebook from "../NavBar/imgs/Facebook.png";
import profilePic from "../NavBar/imgs/blank.png";
import { Link } from "react-router-dom";
import { fetchStories } from "../../store/story";
import "./StoryShow.css"

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
  const stories = useSelector((state) => state.stories.undefined);
//   console.log(stories[id], 'target story');

  if (!stories || !simpleUsers) {
    return null 
  }

  return (
    <div
      className="stories-show-omega-container"
      style={{ height: "100vh", width: "100vw", display: "flex" }}
    >
      <div className="story-show-side-bar" style={{ width: "20%", minWidth: "100px" }}>
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
          style={{ display: "flex", flexDirection: "column"}}
        >
          <h4>All Stories</h4>
          {stories &&
            Object.values(stories).map((story) => {
              return (
                <Link className="all-stories-mapped" style={{ display: "flex", height: "65px", width: "100%", alignItems: "center", paddingLeft: "10px"}} to={`/stories/${story.id}`}>
                <img
                  key={story?.id}
                  style={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "50px",
                  }}
                  src={simpleUsers[story.user_id]?.picture || profilePic}
                />
                 <p style={{ }}>{simpleUsers[story.user_id]?.name}</p>
                </Link>
              );
            })}
        </div>
      </div>

      <div
        className="story-show-preview-container"
        style={{ width: "80%", backgroundColor: "black" }}
      >
         {stories[id].picture === null ? <div
              className="actual-story-show-background"
              style={{
                height: "90%",
                width: "30%",
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
              }}
            >
              <p
                className="actual-story-show-text"
                style={{
                  fontSize: stories[id].font_size,
                  justifyContent: "center",
                  paddingTop: stories[id].padding_top,
                  paddingLeft: stories[id].padding_left,
                  paddingRight: stories[id].padding_right,
                  color: "black",
                  minWidth: "150px",
                  minHeight: "200px",
                }}
              >
                {stories[id].text_content}
              </p>
            </div> :  <img
                  className="actual-text-story-background"
                  src={stories[id]?.picture}
                  style={{
                    height: "90%",
                    width: "40%",
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
                ></img>}
      </div>
    </div>
  );
}

export default StoryShow;
