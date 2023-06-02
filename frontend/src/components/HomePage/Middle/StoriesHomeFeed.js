import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import profilePic from "../../NavBar/imgs/blank.png";
import StoriesHeader from "./StoriesHeader";
import CreateButtonSvg from "../../svgs/CreateButtonSvg";
import ArrowLeftSvg from "../../svgs/ArrowLeftSvg";
import ArrowRightSvg from "../../svgs/ArrowRightSvg";
import "./StoriesHomeFeed.css";

function StoriesHomeFeed() {
  const history = useHistory();

  const [currentWindow, setCurrentWindow] = useState(0);

  const sessionUser = useSelector((state) => state.session.user);

  const simpleUsers = useSelector((state) => state.simpleUsers);

  const storiesFromState = useSelector((state) => state.stories);

  const stories = [];

  for (const key in storiesFromState) {
    for (const storyKey in storiesFromState[key]) {
      if (stories.length < 10) {
        stories.push(storiesFromState[key][storyKey]);
      } else {
        break;
      }
    }
  }

  const sessionUserPicture = simpleUsers[sessionUser.id].profile_picture;

  const moveLeft = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (currentWindow < (stories.length - 1) / 2) {
      let newWindow = currentWindow + 2;
      document.querySelector(
        ".stories-mapped-out"
      ).style.transform = `translateX(-${newWindow * 300}px)`;
      setCurrentWindow(newWindow);
    }
  };
  const moveRight = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (currentWindow > 2) {
      let newWindow = currentWindow - 2;
      setCurrentWindow(newWindow);
      document.querySelector(
        ".stories-mapped-out"
      ).style.transform = `translateX(-${newWindow * 300}px)`;
    } else {
      document.querySelector(
        ".stories-mapped-out"
      ).style.transform = `translateX(-${1}px)`;
      setCurrentWindow(0);
    }
  };

  function findWindowIndex(storyClicked) {
    const index = storiesFromState[storyClicked.user_id].findIndex(
      (story) => story.id === storyClicked.id
    );
    return `${index}`;
  }

  return (
    <>
      <StoriesHeader />
      <div className="stories-home-feed-container">
        {currentWindow === 0 ? (
          <button className="control-button-story-home-left" onClick={moveLeft}>
            <ArrowLeftSvg />
          </button>
        ) : null}
        <div className="stories-mapped-out">
          {currentWindow === 0 ? (
            <div className="story-create-wrapper">
              <div
                onClick={() => history.push("/stories/create")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  position: "relative",
                  cursor: "pointer",
                  width: "125px",
                }}
              >
                <img
                  className="profile-picture-on-story"
                  alt=""
                  src={sessionUserPicture || profilePic}
                ></img>
                <CreateButtonSvg />
                <div className="create-story-container">
                  <p
                    style={{
                      margin: "0",
                      padding: "0",
                      textAlign: "center",
                      color: "grey",
                      fontSize: "1rem",
                    }}
                  >
                    create a story
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {Object.values(stories).map((story, index) => {
            return (
              <Link
                key={index}
                to={{
                  pathname: `/stories/${story.user_id}`,
                  search: `?windowIndex=${findWindowIndex(story)}`,
                }}
                style={{
                  width: "250px",
                  textDecoration: "none",
                  margin: "2px",
                  paddingLeft: index === 0 ? "4px" : "0",
                }}
              >
                {story.picture ? (
                  <div className="photo-story-container">
                    <div className="story-img-wrapper">
                      <img
                        className="story-img"
                        alt="38242"
                        src={story.picture}
                      />
                    </div>
                    <img
                      className="profile-picture-on-img-story"
                      alt=""
                      src={
                        simpleUsers[story.user_id].profile_picture || profilePic
                      }
                    />
                    <p
                      style={{
                        position: "absolute",
                        bottom: "0",
                        paddingLeft: "5px",
                        color: "#fff",
                        fontSize: "0.9rem",
                      }}
                    >
                      {simpleUsers[story.user_id].name}
                    </p>
                  </div>
                ) : (
                  <div className="photo-story-container">
                    <div
                      className="text-story-background"
                      style={{
                        backgroundColor: `${story.background_color}`,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "1rem",
                          color: `${story.color}`,
                        }}
                      >
                        {story.text_content}
                      </p>
                    </div>
                    <img
                      className="profile-picture-on-img-story"
                      alt=""
                      src={
                        simpleUsers[story.user_id].profile_picture || profilePic
                      }
                    />
                    <p
                      style={{
                        position: "absolute",
                        bottom: "0",
                        paddingLeft: "5px",
                        color: "#fff",
                        fontSize: "0.9rem",
                      }}
                    >
                      {simpleUsers[story.user_id].name}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
        {currentWindow !== 0 ? (
          <button
            className="control-button-story-home-right"
            onClick={moveRight}
          >
            <ArrowRightSvg />
          </button>
        ) : null}
      </div>
    </>
  );
}

export default StoriesHomeFeed;
