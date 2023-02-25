import "./PreviewCurrentStory.css";
function PreviewCurrentStory({ currentStory }) {
  return (
    <>
      {!currentStory.picture ? (
        <div
          className="actual-story-show-background"
          style={{
            backgroundColor: currentStory.background_color,
          }}
        >
          <p
            className="actual-story-show-text"
            style={{
              fontSize: currentStory.font_size,
              justifyContent: "center",
              paddingTop: `${currentStory.padding_y}`,
              paddingLeft: `${currentStory.padding_left}`,
              paddingRight: `${currentStory.padding_right}`,
              color: `${currentStory.color}`,
              minWidth: "150px",
              minHeight: "200px",
              position: "absolute",
            }}
          >
            {currentStory.text_content}
          </p>
        </div>
      ) : (
        <img
          alt=""
          className="actual-text-story-background"
          src={currentStory.picture}
        ></img>
      )}
    </>
  );
}

export default PreviewCurrentStory;
