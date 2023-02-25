import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingBar from "./LoadingBar";
import profilePic from "../NavBar/imgs/blank.png";

function ProgressBar({ stories, currentStoryId, currentWindow }) {
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
  }, [id, stories]);

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
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  margin: "2px",
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
      <img
        style={{
          position: "absolute",
          top: "5%",
          marginLeft: "20px",
          height: "50px",
          width: "50px",
          borderRadius: "50%",
        }}
        src={profilePicture}
      />
    </>
  );
}

export default ProgressBar;
// simpleUsers[currentStoryUserId].picture ||
