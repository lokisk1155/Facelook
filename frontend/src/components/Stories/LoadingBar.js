import "./LoadingBar.css";

function LoadingBar({ index, progressBarWidth }) {
  return (
    <div
      key={index}
      style={{
        width: `${progressBarWidth}%`,
        height: "100%",
        backgroundColor: "grey",
        borderRadius: "2.5px",
      }}
    >
      <div className="stories-loading-bar" />
    </div>
  );
}

export default LoadingBar;
