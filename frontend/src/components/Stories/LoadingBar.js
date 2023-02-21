function LoadingBar({ index, progressBarWidth }) {
  return (
    <div
      key={index}
      style={{
        width: `${progressBarWidth}%`,
        height: "100%",
        backgroundColor: "red",
        borderRadius: "2.5px",
      }}
    />
  );
}

export default LoadingBar;
