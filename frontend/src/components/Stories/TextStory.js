import "./TextStory.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TextStory() {
  const sessionUser = useSelector((state) => state.session.user);

  const [backgroundColor, setBackgroundColor] = useState("#1b74e4");

  const [fontSize, setFontSize] = useState("20px");

  const [paddingLeft, setPaddingLeft] = useState("10px");

  const [fakePaddingLeft, setFakePaddingLeft] = useState(10);

  const [paddingRight, setPaddingRight] = useState("10px");

  const [fakePaddingRight, setFakePaddingRight] = useState(10);

  const [paddingY, setPaddingY] = useState("");

  const [fakePaddingY, setFakePaddingY] = useState(0);

  const [color, setColor] = useState("red");

  const [textContent, setTextContent] = useState("");

  const submitStory = (e) => {
    const storyBackground = document.getElementById(
      "actual-text-story-background"
    );
    const storyText = document.getElementById("actual-text-story-text");
    return;
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
  };

  return (
    <>
      <div
        className="text-preview-container"
        style={{
          display: "flex",
          margin: "10%",
          marginTop: "100px",
          marginBottom: "100px",
        }}
      >
        <div
          className="edit-preview-container"
          style={{
            width: "30%",
            marginRight: "20px",
            marginLeft: "20px",
            borderRadius: "7px",
            boxShadow: "0px 75px 75px 0px lightgrey",
          }}
        >
          <h3 style={{ paddingLeft: "7px" }}>Your Story</h3>
          <label>
            <textarea
              maxLength="100"
              placeholder="Start Typing..."
              style={{
                height: "10%",
                width: "84%",
                border: "0.5px solid lightgrey",
                borderRadius: "7px",
                margin: "4%",
                overflowWrap: "break-word",
                fontFamily: "#4d4e53",
                fontFamily: "Open Sans, sans-serif",
                fontSize: "15px",
                lineHeight: "1",
              }}
              onChange={(e) => setTextContent(e.target.value)}
            />
          </label>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "2%",
              }}
            >
              <input
                style={{
                  border: "0.5px solid lightgrey",
                  marginLeft: "4%",
                  marginRight: "4%",
                  textDecoration: "none",
                  height: "25px",
                  width: "70%",
                }}
                placeholder="Type your color..."
                onChange={(e) => setColor(e.target.value)}
              ></input>
              <input
                style={{
                  border: "0.5px solid lightgrey",
                  marginLeft: "4%",
                  marginRight: "4%",
                  textDecoration: "none",
                  height: "25px",
                  width: "70%",
                }}
                placeholder="Font height #..."
                onChange={(e) => setFontSize(`${e.target.value * 5}px`)}
              ></input>
            </div>
            <label
              style={{
                border: "0.5px solid lightgrey",
                width: "33%",
                padding: "5%",
                fontSize: "15px",
              }}
            >
              Move Text
              <div
                onClick={moveUp}
                style={{ margin: "15px", cursor: "pointer" }}
                class="arrow-button arrow-button--t"
              />
              <div
                onClick={moveDown}
                style={{ margin: "15px", cursor: "pointer" }}
                class="arrow-button arrow-button--b"
              />
              <div
                onClick={moveRight}
                style={{ margin: "15px", cursor: "pointer" }}
                class="arrow-button arrow-button--r"
              />
              <div
                onClick={moveLeft}
                style={{ margin: "15px", cursor: "pointer" }}
                class="arrow-button arrow-button--l"
              />
              <button
                style={{
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#1b74e4",
                  color: "white",
                }}
                onClick={resetMoves}
              >
                Reset
              </button>
            </label>
          </div>
        </div>
        <div
          className="text-actual-preview-container"
          style={{
            width: "70%",
            borderRadius: "7px",
            marginRight: "20px",
            marginLeft: "20px",
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
              height: "84%",
              marginLeft: "2.5%",
              marginRight: "2.5%",
              borderRadius: "7px",
              paddingTop: "25px",
            }}
          >
            <div
              className="actual-text-story-background"
              style={{
                height: "90%",
                width: "40%",
                marginLeft: "30%",
                marginRight: "30%",
                borderRadius: "7px",
                backgroundColor: backgroundColor,
              }}
            >
              <p
                className="actual-text-story-text"
                style={{
                  fontSize: fontSize,
                  justifyContent: "center",
                  paddingTop: paddingY,
                  paddingLeft: paddingLeft,
                  paddingRight: paddingRight,
                  color: color,
                }}
              >
                {textContent}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TextStory;
