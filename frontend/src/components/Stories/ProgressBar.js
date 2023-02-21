import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingBar from "./LoadingBar";

function ProgressBar({ stories, currentStoryId }) {
  const { id } = useParams();

  const [progressBarWidth, setProgressBarWidth] = useState(null);

  useEffect(() => {
    const calc = 100 / Object.keys(stories).length;
    setProgressBarWidth(calc);
  }, [id, stories]);

  return (
    <div
      style={{
        position: "absolute",
        width: "65%",
        height: "10px",
        top: "15%",
        display: "flex",
        alignItems: "center",
        right: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "20",
        minWidth: "200px",
        maxWidth: "30px",
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
            <LoadingBar progressBarWidth={progressBarWidth} index={index} />
          )}
        </>
      ))}
    </div>
  );
}

export default ProgressBar;
