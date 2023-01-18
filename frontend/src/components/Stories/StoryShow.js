import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSimpleUsers } from "../../store/simpleUsers";
import { useEffect } from "react";
import Facebook from "../NavBar/imgs/Facebook.png";
import profilePic from "../NavBar/imgs/blank.png";
import { Link } from "react-router-dom";
import { fetchStories } from "../../store/story";

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
  console.log(stories);

  return (
    <div
      className="stories-show-omega-container"
      style={{ height: "100vh", width: "100vw", display: "flex" }}
    >
      <div className="story-show-side-bar" style={{ width: "20%" }}>
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
          style={{ display: "flex", flexDirection: "column", margin: "10px" }}
        >
          <h4>All Stories</h4>
          {stories &&
            Object.values(stories).map((story) => {
              return (
                <img
                  key={story.id}
                  style={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "50px",
                    padding: "10px",
                  }}
                  src={simpleUsers[story.user_id]?.picture || profilePic}
                />
              );
            })}
        </div>
      </div>

      <div
        className="story-show-preview-container"
        style={{ width: "80%", backgroundColor: "black" }}
      ></div>
    </div>
  );
}

export default StoryShow;
