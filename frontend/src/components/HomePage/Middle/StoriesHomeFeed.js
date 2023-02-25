import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import profilePic from "../../NavBar/imgs/blank.png";
import StoriesHeader from "./StoriesHeader";
import "./StoriesHomeFeed.css";
import { useEffect } from "react";

function StoriesHomeFeed() {
  const history = useHistory();

  const [currentWindow, setCurrentWindow] = useState(0);

  // const [currentStories, setCurrentStories] = useState(null);

  const sessionUser = useSelector((state) => state.session.user);

  const simpleUsers = useSelector((state) => state.simpleUsers);

  const stories = useSelector((state) => state.stories);

  const sessionUserPicture = useSelector(
    (state) => state.simpleUsers[sessionUser.id]?.profile_picture
  );

  let currentStories;

  if (currentWindow === 0) {
    currentStories = Object.values(stories).slice(
      currentWindow,
      currentWindow + 3
    );
  } else {
    currentStories = Object.values(stories).slice(
      currentWindow,
      currentWindow + 4
    );
  }

  const moveLeft = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (currentWindow < Object.keys(stories).length - 4) {
      let newWindow = currentWindow + 1;
      setCurrentWindow(newWindow);
    }
  };
  const moveRight = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (currentWindow > 0) {
      let newWindow = currentWindow - 1;
      setCurrentWindow(newWindow);
    }
  };

  if (!currentStories) {
    return null;
  }

  return (
    <>
      <StoriesHeader />
      <div
        style={{
          display: "flex",
          height: "225px",
          minHeight: "75px",
          justifyContent: "space-evenly",
          backgroundColor: "#fff",
          padding: "10px",
          borderEndStartRadius: "10px",
          borderEndEndRadius: "10px",
          boxShadow: "0px 6px 6px 0px lightgrey",
          marginBottom: "10px",
          position: "relative",
        }}
      >
        {currentWindow < Object.keys(stories).length - 4 ? (
          <button
            className="control-button-story-home"
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              borderRadius: "50%",
              height: "50px",
              width: "50px",
              border: "0.5px solid grey",
            }}
            onClick={moveLeft}
          >
            <svg
              style={{}}
              fill="currentColor"
              viewBox="0 0 20 20"
              width="1em"
              height="1em"
              class="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xxk0z11 xvy4d1p"
            >
              <path d="M7.8 4.53 13.273 10 7.8 15.47a.75.75 0 0 0 1.061 1.06l6-6a.751.751 0 0 0 0-1.06l-6-6A.75.75 0 0 0 7.8 4.53z"></path>
            </svg>
          </button>
        ) : null}
        {currentWindow === 0 ? (
          <div
            className="story-img"
            onClick={() => history.push("/stories/create")}
            style={{
              width: "21%",
              height: "108%",
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
                  height: "45px",
                  borderRadius: "50%",
                  backgroundColor: "rgb(27, 116, 228)",
                  color: "#fff",
                  border: "4px solid #fff",
                  width: "50px",
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
        ) : null}

        {Object.values(currentStories).map((story, index) => {
          return (
            <Link
              key={index}
              to={`/stories/${story?.user_id}`}
              style={{ width: "21%" }}
            >
              {story?.picture !== null ? (
                <div
                  className="story-img"
                  style={{
                    width: "100%",
                    height: "95%",
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
                    height: "95%",
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
        {currentWindow !== 0 ? (
          <button
            className="control-button-story-home"
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              border: "0.5px solid grey",
              transform: "translateY(-50%)",
            }}
            onClick={moveRight}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              width="1em"
              height="1em"
              class="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xxk0z11 xvy4d1p"
            >
              <path d="M12.2 4.53 6.727 10l5.47 5.47a.75.75 0 0 1-1.061 1.06l-6-6a.751.751 0 0 1 0-1.06l6-6A.75.75 0 1 1 12.2 4.53z"></path>
            </svg>
          </button>
        ) : null}
      </div>
    </>
  );
}

export default StoriesHomeFeed;
