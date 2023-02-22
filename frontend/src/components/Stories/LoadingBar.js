import { useEffect, useState } from "react";
import "./LoadingBar.css";

function LoadingBar({ progressBarWidth, index, id, window }) {
  const [animationOn, setAnimationOn] = useState(false);

  useEffect(() => {
    setAnimationOn(!animationOn);
  }, [window, id, index]);

  return (
    <div
      key={index}
      style={{
        width: `${progressBarWidth}%`,
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        margin: "2px",
      }}
    >
      <div
        className={
          animationOn ? `stories-loading-bar` : `stories-loading-bar-2`
        }
      />
    </div>
  );
}

export default LoadingBar;
