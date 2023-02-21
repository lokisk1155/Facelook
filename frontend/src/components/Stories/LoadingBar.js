import "./LoadingBar.css";

function LoadingBar({ progressBarWidth, index }) {
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
      <div className="stories-loading-bar" />
    </div>
  );
}

export default LoadingBar;
