import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingBar from "./LoadingBar";
import profilePic from "../NavBar/imgs/blank.png";
import "./ProgressBar.css";

function ProgressBar({
  stories,
  currentStoryId,
  currentStoryCreatedAt,
  currentWindow,
}) {
  const { id } = useParams();

  const [progressBarWidth, setProgressBarWidth] = useState(null);

  const [profilePicture, setProfilePicture] = useState(null);

  const simpleUsers = useSelector((state) => state.simpleUsers);

  useEffect(() => {
    const calc = 100 / Object.keys(stories).length;
    setProgressBarWidth(calc);
    if (simpleUsers[id].profile_picture) {
      setProfilePicture(simpleUsers[id].profile_picture);
    } else {
      setProfilePicture(profilePic);
    }
  }, [id, stories, simpleUsers]);

  function getTimeElapsed(createdAt) {
    const previous = new Date(createdAt);
    const now = new Date();
    const comparedTime = now.valueOf() - previous.valueOf();
    return formatDateTime(comparedTime);
  }

  function formatDateTime(comparedTime) {
    const sec = Math.floor(comparedTime / 1000);
    if (sec < 60) {
      return `${sec}s`;
    }
    const min = Math.floor(sec / 60);
    if (min < 60) {
      return `${min}m`;
    }
    const hr = Math.floor(min / 60);
    if (hr < 24) {
      return `${hr}h`;
    }
    const day = Math.floor(hr / 24);
    if (day < 7) {
      return `${day}d`;
    }
    return `${Math.floor(day / 7)}w`;
  }

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "95%",
          height: "10px",
          top: "2%",
          display: "flex",
          alignItems: "center",
          right: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "20",
        }}
      >
        {stories.map((story, index) => (
          <>
            {story.id !== currentStoryId ? (
              <div
                key={index}
                style={{
                  width: `${progressBarWidth}%`,
                  height: "70%",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  margin: "2px",
                  borderRadius: "50px",
                }}
              />
            ) : (
              <LoadingBar
                progressBarWidth={progressBarWidth}
                index={index}
                id={currentStoryId}
                window={currentWindow}
              />
            )}
          </>
        ))}
      </div>
      <Link
        className="link-profile-picture-on-actual-story"
        to={`/ProfilePage/${id}`}
      >
        <img
          className="pic-on-actual-story"
          alt="947621"
          src={profilePicture}
        />

        <ul className="name-and-date-container-story">
          <p className="name-on-actual-story">{simpleUsers[id].name}</p>
          <p className="how-long-ago-on-story">
            {getTimeElapsed(currentStoryCreatedAt)}
          </p>
        </ul>
      </Link>
    </>
  );
}

export default ProgressBar;
// simpleUsers[currentStoryUserId].picture ||
