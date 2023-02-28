import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import profilePic from "../NavBar/imgs/blank.png";
import "./StoryShow.css";
import { useCallback } from "react";
import PreviewCurrentStory from "./PreviewCurrentStory";
import StoriesSideBar from "./StoriesSideBar";
import ProfilePicModal from "../NavBar/ProfilePicModal";
import { Modal } from "../../context/Modal";

function StoryShow() {
  const dispatch = useDispatch();

  const history = useHistory();

  const { id } = useParams();

  const [currentWindow, setCurrentWindow] = useState(0);

  const [toggleProfileModal, setToggleProfileModal] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);

  const simpleUsers = useSelector((state) => state.simpleUsers);

  const stories = useSelector((state) => state.stories);

  const sessionUserId = sessionUser.id;

  const handleNext = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
      }
      if (!stories[id]) {
        return null;
      }
      if (parseInt(id) === sessionUserId) {
        if (currentWindow === Object.values(stories[id]).length - 1) {
          for (const userId in stories) {
            if (
              simpleUsers[userId] !== undefined &&
              parseInt(userId) !== sessionUserId
            ) {
              setCurrentWindow(0);
              return history.push(`/stories/${userId}`);
            }
          }
        } else {
          const newWindow = currentWindow + 1;
          setCurrentWindow(newWindow);
        }
      } else {
        if (currentWindow === Object.values(stories[id]).length - 1) {
          let firstId = false;
          let found = false;
          let target = Object.keys(stories).length - 1;
          let current = 0;
          for (const userId in stories) {
            if (!firstId) {
              firstId = userId;
            }
            current += 1;
            if (found) {
              setCurrentWindow(0);
              return history.push(`/stories/${userId}`);
            }
            if (userId === id) {
              if (current === target) {
                setCurrentWindow(0);
                return history.push(`/stories/${firstId}`);
              }
              found = true;
            }
          }
        } else {
          if (currentWindow === 0 && stories[id].length === 1) {
            for (const userId in stories) {
              return history.push(`/stories/${userId}`);
            }
          }
          const newWindow = currentWindow + 1;
          setCurrentWindow(newWindow);
        }
      }
    },
    [id, simpleUsers, stories, currentWindow, history, sessionUserId]
  );

  const handlePrevious = (e) => {
    e.preventDefault();
    if (parseInt(id) === sessionUserId) {
      if (currentWindow === 0) {
        let previousId;
        let target = Object.keys(stories).length - 1;
        let currentCount = 0;
        for (const id in stories) {
          currentCount += 1;
          if (
            simpleUsers[id] !== undefined &&
            parseInt(id) !== sessionUserId &&
            currentCount === target
          ) {
            if (parseInt(id) === sessionUserId) {
              setCurrentWindow(Object.keys(stories[previousId]).length - 1);
              return history.push(`/stories/${previousId}`);
            } else {
              setCurrentWindow(Object.keys(stories[id]).length - 1);
              return history.push(`/stories/${id}`);
            }
          }
          previousId = id;
        }
      } else {
        const newWindow = currentWindow - 1;
        setCurrentWindow(newWindow);
      }
    } else {
      if (currentWindow < 1) {
        let previousId;
        for (const userId in stories) {
          if (userId === id) {
            if (previousId) {
              let newWindow = Object.values(stories[previousId]).length - 1;
              setCurrentWindow(newWindow);
              return history.push(`/stories/${previousId}`);
            } else {
              let foundId;
              let target = Object.keys(stories).length - 1;
              let currentCount = 0;
              for (const userId in stories) {
                currentCount += 1;
                if (
                  simpleUsers[userId] !== undefined &&
                  parseInt(userId) !== sessionUserId &&
                  currentCount === target
                ) {
                  if (parseInt(userId) === sessionUserId) {
                    setCurrentWindow(Object.keys(stories[foundId]).length - 1);
                    return history.push(`/stories/${foundId}`);
                  } else {
                    setCurrentWindow(Object.keys(stories[userId]).length - 1);
                    return history.push(`/stories/${userId}`);
                  }
                }
                previousId = id;
              }
            }
          } else {
            previousId = userId;
          }
        }
      } else {
        const newWindow = currentWindow - 1;
        setCurrentWindow(newWindow);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(intervalId);
  }, [
    dispatch,
    handleNext,
    id,
    sessionUser,
    simpleUsers,
    stories,
    currentWindow,
  ]);

  if (Object.values(simpleUsers).length === 0) {
    return null;
  }

  if (!stories[id]) {
    return null;
  }

  const currentStory = stories[id][currentWindow];

  if (currentStory === undefined) {
    return null;
  }

  const usersWithStories = {};
  for (const id in stories) {
    if (simpleUsers[id] !== undefined && parseInt(id) !== sessionUserId) {
      usersWithStories[id] = simpleUsers[id];
    }
  }

  return (
    <>
      <div className="stories-show-omega-container">
        <div className="story-show-preview-container">
          <div
            style={{
              cursor: "pointer",
              position: "absolute",
              left: "0",
              margin: "10px",
            }}
          >
            <button
              onClick={() => history.push("/")}
              type="button"
              className="btn-close"
            >
              <span style={{ fontSize: "2rem", color: "lightgrey" }}>X</span>
            </button>
          </div>
          <div
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "0",
              margin: "5px",
              marginRight: "65px",
            }}
            onClick={() => history.push("/")}
          >
            <svg
              viewBox="0 0 36 36"
              class="x1lliihq x1k90msu x2h7rmj x1qfuztq x1ssd25i"
              height="50"
              width="50"
            >
              <defs>
                <linearGradient
                  x1="50%"
                  x2="50%"
                  y1="97.0782153%"
                  y2="0%"
                  id="jsc_s_2"
                >
                  <stop offset="0%" stop-color="#0062E0"></stop>
                  <stop offset="100%" stop-color="#19AFFF"></stop>
                </linearGradient>
              </defs>
              <path
                d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8"
                fill="url(#jsc_s_2)"
              ></path>
              <path
                class="xe3v8dz"
                d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4"
                fill="#fff"
              ></path>
            </svg>
          </div>

          <img
            className="profile-pic-in-story-show"
            alt="123131s"
            onClick={() => setToggleProfileModal((prevState) => !prevState)}
            src={simpleUsers[sessionUserId]?.profile_picture || profilePic}
          />
          {toggleProfileModal ? (
            <Modal onClose={() => setToggleProfileModal(false)}>
              <ProfilePicModal />
            </Modal>
          ) : null}

          <div className="story-show-top-bar">
            <StoriesSideBar
              usersWithStories={usersWithStories}
              setCurrentWindow={setCurrentWindow}
            />
          </div>
          <h2 style={{ padding: "10px" }}>Your Story</h2>
          {stories[sessionUserId] !== undefined ? (
            <Link
              onClick={() => setCurrentWindow(0)}
              style={{
                display: "flex",
                paddingLeft: "10px",
                borderRadius: "5px",
                padding: "5px",
                height: "65px",
                textDecoration: "none",
              }}
              to={`/stories/${sessionUser.id}`}
            >
              <img
                alt=""
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50px",
                  border:
                    sessionUser.id === parseInt(id)
                      ? "5px solid #166fe5"
                      : "5px solid black",
                }}
                src={simpleUsers[sessionUser.id]?.profile_picture || profilePic}
              />
              <p
                style={{
                  color: sessionUser.id === parseInt(id) ? "#166fe5" : "#fff",
                  fontSize: "1.5rem",
                }}
              >
                {`${(sessionUser.first_name, sessionUser.last_name)}`}
              </p>
            </Link>
          ) : null}
          <h2 style={{ padding: "10px" }}>Create</h2>
          <button
            className="create-story-button-story-show"
            onClick={() => history.push("/stories/create")}
          >
            {"+"}
          </button>
          <div className="story-preview-container">
            <button
              className="stories-show-handle-previous"
              onClick={handlePrevious}
            >
              <div>&#8249;</div>
            </button>
            <PreviewCurrentStory
              currentStory={currentStory}
              stories={stories[id]}
              currentWindow={currentWindow}
            />
            <button className="stories-show-handle-next" onClick={handleNext}>
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoryShow;
