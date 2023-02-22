import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import profilePic from "../../NavBar/imgs/blank.png";
import StoriesHeader from "./StoriesHeader";
import "./StoriesHomeFeed.css";
import { useEffect } from "react";

function StoriesHomeFeed() {
  const history = useHistory();

  const [currentWindow, setCurrentWindow] = useState(0)

  const [currentStories, setCurrentStories] = useState(null)

  const sessionUser = useSelector((state) => state.session.user);

  const simpleUsers = useSelector((state) => state.simpleUsers);

  const stories = useSelector((state) => state.stories);

  const sessionUserPicture = useSelector(
    (state) => state.simpleUsers[sessionUser.id]?.profile_picture
  );

  useEffect(() => {
    const slicedStories = Object.values(stories).slice(currentWindow, currentWindow + 3)
    setCurrentStories(slicedStories)
  }, [currentWindow, stories])



  const moveLeft = (e) => {
    if (e) {
      e.preventDefault()
    }
    if (currentWindow < (Object.keys(stories).length - 3)) {
      let newWindow = currentWindow + 1 
      setCurrentWindow(newWindow)
    }
  }
  const moveRight = (e) => {
    if (e) {
      e.preventDefault()
    }
    if (currentWindow - 2 > 0) {
      let newWindow = currentWindow - 1
      setCurrentWindow(newWindow)
    }
  }

  if (!currentStories) {
    return null 
  }

  return (
    <>
      <StoriesHeader />
      <div
        style={{
          display: "flex",
          height: "175px",
          minHeight: "75px",
          justifyContent: "space-evenly",
          backgroundColor: "#fff",
          padding: "10px",
          borderEndStartRadius: "10px",
          borderEndEndRadius: "10px",
          boxShadow: "0px 6px 6px 0px lightgrey",
          marginBottom: "10px",
        }}
      >
        <div
          className="story-img"
          onClick={() => history.push("/stories/create")}
          style={{
            width: "20%",
            margin: "2.5px",
            padding: "0",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            alt=""
            style={{
              height: "70%",
              width: "100%",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              margin: "0",
              padding: "0",
              borderTop: "0.3px solid lightgrey",
              borderLeft: "0.3px solid lightgrey",
              borderRight: "0.3px solid lightgrey",
              objectFit: "cover",
            }}
            src={sessionUserPicture || profilePic}
          ></img>
          <div
            style={{
              transform: "translate(0, -15px)",
              height: "60px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              borderBottom: "0.3px solid lightgrey",
              borderLeft: "0.3px solid lightgrey",
              borderRight: "0.3px solid lightgrey",
              display: "flex",
            }}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="story-create-button-the-acutal-button"
              style={{
                height: "30px",
                borderRadius: "100px",
                backgroundColor: "rgb(27, 116, 228)",
                color: "#fff",
                border: "4px solid #fff",
              }}
            >
              <g fillRule="evenodd" transform="translate(-446 -350)">
                <g fillRule="nonzero">
                  <path
                    d="M95 201.5h13a1 1 0 1 0 0-2H95a1 1 0 1 0 0 2z"
                    transform="translate(354.5 159.5)"
                  ></path>
                  <path
                    d="M102.5 207v-13a1 1 0 1 0-2 0v13a1 1 0 1 0 2 0z"
                    transform="translate(354.5 159.5)"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>

        {Object.values(currentStories).map((story, index) => {
          return (
            <Link
              key={index}
              to={`/stories/${story?.user_id}`}
              style={{ width: "20%" }}
            >
              {story?.picture !== null ? (
                <div
                  className="story-img"
                  style={{
                    width: "100%",
                    height: "150px",
                    paddingTop: "5px",
                    borderRadius: "10px",
                    backgroundImage: `url(${story?.picture})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "lightgrey",
                  }}
                >
                  <img
                    alt=""
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50px",
                      border: "4px solid rgb(27, 116, 228)",
                    }}
                    src={
                      simpleUsers[story?.user_id]?.profile_picture || profilePic
                    }
                  ></img>
                </div>
              ) : (
                <div
                  key={index}
                  className="indi-text-story-home-page"
                  style={{
                    backgroundColor: story?.background_color,
                    width: "100%",
                    height: "85%",
                    paddingTop: "5px",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    alt=""
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50px",
                      marginLeft: "5px",
                      border: "4px solid rgb(27, 116, 228)",
                    }}
                    src={
                      simpleUsers[story?.user_id]?.profile_picture || profilePic
                    }
                  ></img>
                </div>
              )}
            </Link>
          );
        })}
        <button onClick={moveLeft}>left</button>
        <button onClick={moveRight}>Right</button>
      </div>
    </>
  );
}

export default StoriesHomeFeed;
