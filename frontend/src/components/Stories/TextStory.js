import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createStory } from "../../store/story";
import PreviewCurrentStory from "./PreviewCurrentStory";
import TextControls from "./TextControls";
import "./TextStory.css";

function TextStory({ photoUrl = null, file = null }) {
  const dispatch = useDispatch();

  const history = useHistory();

  const [backgroundColor, setBackgroundColor] = useState("#1b74e4");

  const [fontSize, setFontSize] = useState("20px");

  const [paddingLeft, setPaddingLeft] = useState("10px");

  const [fakePaddingLeft, setFakePaddingLeft] = useState(10);

  const [paddingRight, setPaddingRight] = useState("10px");

  const [fakePaddingRight, setFakePaddingRight] = useState(0);

  const [fontType, setFontType] = useState("'Montserrat', sans-serif;");

  const [paddingY, setPaddingY] = useState("240px");

  const [fakePaddingY, setFakePaddingY] = useState(240);

  const [color, setColor] = useState("red");

  const [textContent, setTextContent] = useState("");

  const styles = {
    background_color: backgroundColor,
    font_size: fontSize,
    font_type: fontType,
    padding_right: paddingRight,
    padding_left: paddingLeft,
    padding_y: paddingY,
    color: color,
    text_content: textContent,
    picture: photoUrl,
  };

  const sessionUser = useSelector((state) => state.session.user);

  const simpleUsers = useSelector((state) => state.simpleUsers);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = false;
    if (file) {
      formData = new FormData();
      formData.append("story[photo]", file);
      Object.entries(styles).forEach(([key, value]) => {
        formData.append(`story[styles][${key}]`, value);
      });
    }
    let story = {
      user_id: sessionUser.id,
      ...styles,
    };
    dispatch(createStory(story, formData));
    return history.push("/");
  };

  const moveUp = (e) => {
    e.preventDefault();
    if (fakePaddingY <= 10) {
      return;
    } else {
      let newPadding = fakePaddingY - 10;
      setFakePaddingY(newPadding);
      setPaddingY(`${newPadding}px`);
    }
  };

  const moveDown = (e) => {
    e.preventDefault();
    if (fakePaddingY >= 320) {
      return;
    } else {
      let newPadding = fakePaddingY + 10;
      setFakePaddingY(newPadding);
      setPaddingY(`${newPadding}px`);
    }
  };

  const moveLeft = (e) => {
    e.preventDefault();
    let newPadding = fakePaddingRight + 10;
    setFakePaddingRight(newPadding);
    setPaddingRight(`${newPadding}px`);
  };

  const moveRight = (e) => {
    e.preventDefault();
    let newPadding = fakePaddingLeft + 10;
    setFakePaddingLeft(newPadding);
    setPaddingLeft(`${newPadding}px`);
  };

  const resetMoves = (e) => {
    e.preventDefault();
    setPaddingLeft("0");
    setPaddingRight("0");
    setPaddingY("0");
    setFakePaddingLeft(0);
    setFakePaddingRight(0);
    setFakePaddingY(0);
    setBackgroundColor("#1b74e4");
    setFontSize("20");
    setTextContent("");
    setColor("");
  };

  return (
    <>
      <div
        className="text-preview-container"
        style={{
          display: "flex",
          width: "100%",
          height: "90%",
          marginTop: "100px",
        }}
      >
        <div
          className="text-actual-preview-container"
          style={{
            width: "100%",
            height: "90%",
            borderRadius: "7px",
            marginRight: "2.5%",
            marginLeft: "2.5%",
            boxShadow: "0px 75px 75px 0px lightgrey",
          }}
        >
          <p style={{ fontSize: "15px", color: "black", marginLeft: "1%" }}>
            Preview
          </p>
          <div
            className="black-container"
            style={{
              backgroundColor: "black",
              width: "95%",
              height: "85%",
              marginLeft: "2.5%",
              marginRight: "2.5%",
              borderRadius: "7px",
              paddingTop: "25px",
              minWidth: "300px",
              minHeight: "250px",
              position: "relative",
            }}
          >
            <TextControls
              simpleUsers={simpleUsers}
              sessionUser={sessionUser}
              textContent={textContent}
              fontType={fontType}
              handleSubmit={handleSubmit}
              setTextContent={setTextContent}
              setColor={setColor}
              setFontSize={setFontSize}
              setFontType={setFontType}
              setBackgroundColor={setBackgroundColor}
              moveDown={moveDown}
              moveLeft={moveLeft}
              moveRight={moveRight}
              moveUp={moveUp}
              resetMoves={resetMoves}
            />
            <PreviewCurrentStory currentStory={styles} />
            <div
              className="storyButtons"
              style={{
                position: "absolute",
                bottom: "0",
                marinLeft: "5px",
              }}
            >
              <button
                style={{
                  backgroundColor: "grey",
                  border: "none",
                  color: "#fff",
                  margin: "5px",
                  width: "100px",
                  height: "35px",
                  borderRadius: "2.5px",
                }}
                onClick={resetMoves}
              >
                reset
              </button>

              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#1b74e4",
                  border: "none",
                  color: "#fff",
                  margin: "5px",
                  width: "100px",
                  height: "35px",
                  borderRadius: "2.5px",
                }}
              >
                save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TextStory;

// <div
// className="actual-text-story-background"
// style={{
//   height: "90%",
//   width: "40%",
//   position: "absolute",
//   borderRadius: "7px",
//   backgroundColor: backgroundColor,
//   minWidth: "200px",
//   minHeight: "200px",
//   top: "50%",
//   right: "50%",
//   bottom: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   maxWidth: "300px",
// }}
// >
// <p
//   className="actual-text-story-text"
//   style={{
//     fontSize: fontSize,
//     fontFamily: fontType,
//     justifyContent: "center",
//     paddingTop: paddingY,
//     paddingLeft: paddingLeft,
//     paddingRight: paddingRight,
//     color: color,
//     minWidth: "150px",
//     minHeight: "200px",
//   }}
// >
//   {textContent}
// </p>
// </div>
