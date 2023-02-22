function PreviewCurrentStory({ currentStory }) {
  return (
    <>
      {!currentStory.picture ? (
        <div
          className="actual-story-show-background"
          style={{
            height: "75%",
            width: "65%",
            position: "absolute",
            borderRadius: "7px",
            minWidth: "200px",
            minHeight: "200px",
            top: "50%",
            right: "50%",
            bottom: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "300px",
            backgroundColor: currentStory.background_color,
          }}
        >
          <p
            className="actual-story-show-text"
            style={{
              fontSize: currentStory.font_size,
              justifyContent: "center",
              paddingTop: `${currentStory.padding_top}px`,
              paddingLeft: `${currentStory.padding_left}px`,
              paddingRight: `${currentStory.padding_right}px`,
              color: "black",
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
          style={{
            height: "75%",
            width: "65%",
            position: "absolute",
            borderRadius: "7px",
            minWidth: "200px",
            minHeight: "200px",
            top: "50%",
            right: "50%",
            bottom: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "300px",
          }}
        ></img>
      )}
    </>
  );
}

export default PreviewCurrentStory;
