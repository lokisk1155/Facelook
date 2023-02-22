import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { getSimpleUsers } from "../../store/simpleUsers";
import { fetchStories } from "../../store/story";
import Facebook from "../NavBar/imgs/Facebook.png";
import profilePic from "../NavBar/imgs/blank.png";
import "./StoryShow.css";
import ProgressBar from "./ProgressBar";
import { useCallback } from "react";
import PreviewCurrentStory from "./PreviewCurrentStory";

function StoryShow() {
  const dispatch = useDispatch();

  const history = useHistory();

  const { id } = useParams();

  const [currentWindow, setCurrentWindow] = useState(0);

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

  let loading = true;

  if (!stories[id]) {
    loading = false;
    dispatch(fetchStories());
    return null;
  }

  if (Object.values(simpleUsers).length === 0) {
    loading = false;
    dispatch(getSimpleUsers());
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
              alt=""
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
          {stories[sessionUserId] !== undefined ? (
            <Link
              onClick={() => setCurrentWindow(0)}
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
                borderRadius: "5px",
                padding: "5px",
                backgroundColor:
                  sessionUser.id === parseInt(id) ? "lightgrey" : "#fff",
                height: "65px",
                width: "100%",
              }}
              to={`/stories/${sessionUser.id}`}
            >
              <img
                alt=""
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50px",
                }}
                src={simpleUsers[sessionUser.id].profile_picture || profilePic}
              />
              <p>{simpleUsers[sessionUser.id].name}</p>
            </Link>
          ) : null}
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
              Object.values(usersWithStories).map((user, index) => {
                return (
                  <div onClick={() => setCurrentWindow(0)} key={index}>
                    <Link
                      className="all-stories-mapped"
                      to={`/stories/${user.user_id}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "10px",
                        borderRadius: "5px",
                        padding: "5px",
                        backgroundColor:
                          user.user_id === parseInt(id) ? "lightgrey" : "#fff",
                        height: "65px",
                        width: "100%",
                      }}
                    >
                      <img
                        alt=""
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50px",
                        }}
                        src={user.profile_picture || profilePic}
                      />
                      <p>{user.name}</p>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>

        <div
          className="story-show-preview-container"
          style={{
            width: "80%",
            backgroundColor: "black",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "90%",
              width: "60%",
              top: "50%",
              right: "50%",
              bottom: "50%",
              left: "50%",
              position: "absolute",
              transform: "translate(-50%, -50%)",
              minWidth: "200px",
              minHeight: "200px",
            }}
          >
            <ProgressBar
              stories={stories[id]}
              currentStoryId={currentStory.id}
              currentWindow={currentWindow}
            />
            <PreviewCurrentStory
              currentStory={currentStory}
            />
            <div
              style={{
                display: "flex",
                width: "200px",
                maxWidth: "30%",
                minHeight: "50px",
                height: "70px",
              }}
            >
              <button
                style={{
                  width: "50%",
                  minWidth: "45px",
                  maxWidth: "65px",
                  borderRadius: "50%",
                  backgroundColor: "#1b74e4",
                  margin: "5px",
                  color: "#fff",
                  border: "none",
                }}
                onClick={handlePrevious}
              >
                &#8249;
              </button>
              <button
                style={{
                  width: "50%",
                  minWidth: "45px",
                  maxWidth: "65px",
                  borderRadius: "50%",
                  backgroundColor: "#1b74e4",
                  margin: "5px",
                  color: "#fff",
                  border: "none",
                }}
                onClick={handleNext}
              >
                &#8250;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoryShow;
