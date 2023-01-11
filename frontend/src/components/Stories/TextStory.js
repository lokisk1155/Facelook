function TextStory() {
  return (
    <>
      <div
        style={{
          height: "500px",
          display: "flex",
          margin: "10%",
          marginTop: "100px",
          marginBottom: "100px",
        }}
      >
        <div
          className="edit-preview-container"
          style={{ border: "3px solid red", height: "100%", width: "30%" }}
        ></div>
        <div
          className="preview-container"
          style={{ width: "70%", height: "100%", border: "3px solid blue" }}
        ></div>
      </div>
    </>
  );
}

export default TextStory;
