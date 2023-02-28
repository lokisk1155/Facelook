import "./PreviewCurrentStory.css";
import ProgressBar from "./ProgressBar";
function PreviewCurrentStory({ stories, currentStory, currentWindow }) {
  return (
    <>
      {!currentStory.picture ? (
        <div
          className="actual-story-show-background"
          style={{
            backgroundColor: currentStory.background_color,
          }}
        >
          {stories ? (
            <ProgressBar
              stories={stories}
              currentStoryId={currentStory.id}
              currentStoryCreatedAt={currentStory.created_at}
              currentWindow={currentWindow}
            />
          ) : null}
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
        <div className="actual-story-show-background">
          {stories ? (
            <ProgressBar
              stories={stories}
              currentStoryId={currentStory.id}
              currentWindow={currentWindow}
            />
          ) : null}
          <img
            alt=""
            src={currentStory.picture}
            style={{ width: "100%", height: "100%" }}
          ></img>
        </div>
      )}
    </>
  );
}

export default PreviewCurrentStory;
