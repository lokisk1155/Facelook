import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProgressBar({ stories }) {
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
        top: "10%",
        alignItems: "center",
        right: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
    >
      {stories.map((story, index) => (
        <div
          key={index}
          style={{
            width: `${progressBarWidth}%`,
            height: "100%",
            backgroundColor: "red",
            borderRadius: "2.5px",
          }}
        ></div>
      ))}
    </div>
  );
}

export default ProgressBar;
