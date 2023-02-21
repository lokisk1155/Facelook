import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingBar from "./LoadingBar";

function ProgressBar({ stories, currentStoryId }) {
  const { id } = useParams();

  const [progressBarWidth, setProgressBarWidth] = useState(null);

  useEffect(() => {
    const calc = 100 / Object.keys(stories).length;
    setProgressBarWidth(calc);
  }, [id]);

  return (
    <div
      style={{
        position: "absolute",
        maxWidth: "65%",
        width: "65%",
        height: "20px",
        top: "8%",
        display: "flex",
        alignItems: "center",
        right: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
    >
      {Object.values(stories).map((story, index) => (
        <>
          {story.id !== currentStoryId ? (
            <div
              key={index}
              style={{
                width: `${progressBarWidth}%`,
                height: "100%",
                backgroundColor: "grey",
                borderRadius: "2.5px",
              }}
            ></div>
          ) : (
            <LoadingBar progressBarWidth={progressBarWidth} index={index} />
          )}
        </>
      ))}
    </div>
  );
}

export default ProgressBar;
