import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createStory } from "../../store/story";
import "./TextStory.css";

function TextStory() {
  const dispatch = useDispatch();

  const history = useHistory();

  const [backgroundColor, setBackgroundColor] = useState("#1b74e4");

  const [fontSize, setFontSize] = useState("20px");

  const [paddingLeft, setPaddingLeft] = useState("10px");

  const [fakePaddingLeft, setFakePaddingLeft] = useState(10);

  const [paddingRight, setPaddingRight] = useState("10px");

  const [fakePaddingRight, setFakePaddingRight] = useState(10);

  const [fontType, setFontType] = useState("'Montserrat', sans-serif;")
 
  const [paddingY, setPaddingY] = useState("");

  const [fakePaddingY, setFakePaddingY] = useState(0);

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
  };

  const sessionUser = useSelector((state) => state.session.user);

  const simpleUsers = useSelector((state) => state.simpleUsers);

  const handleSubmit = (e) => {
    e.preventDefault();
    let story = {
      user_id: sessionUser.id,
      ...styles,
    };
    dispatch(createStory(story));
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
          marginTop: "100px",
        }}
      >
        <div
          className="edit-preview-container"
          style={{
            width: "15%",
            height: "100%",
            borderRadius: "7px",
            boxShadow: "0px 75px 75px 0px lightgrey",
            minWidth: "115px",
          }}
        >
          <div
            style={{
              display: "flex",
              minWidth: "100px",
              justifyContent: "space-between",
            }}
          >
            <h3 style={{ padding: "0", margin: "0" }}>Your Story</h3>
            <img
              alt=""
              style={{ height: "50px", borderRadius: "50px", padding: "5px" }}
              src={simpleUsers[sessionUser.id].profile_picture}
            />
          </div>
          <label>
            <textarea
              maxLength="200"
              placeholder="Start Typing..."
              value={textContent}
              style={{
                height: "10%",
                width: "90%",
                border: "0.5px solid lightgrey",
                borderRadius: "7px",
                margin: "2%",
                overflowWrap: "break-word",
                fontFamily: "Open Sans, sans-serif",
                fontSize: "15px",
                lineHeight: "1",
              }}
              onChange={(e) => setTextContent(e.target.value)}
            />
          </label>
          <div style={{ display: "flex", width: "100%", height: "40%" }}>
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
                  textDecoration: "none",
                  height: "25px",
                  width: "95%",
                }}
                placeholder="Type your color..."
                onChange={(e) => setColor(e.target.value)}
              ></input>
              <input
                style={{
                  border: "0.5px solid lightgrey",
                  textDecoration: "none",
                  height: "25px",
                  width: "95%",
                }}
                placeholder="Pixel font height..."
                onChange={(e) => setFontSize(`${e.target.value}px`)}
              ></input>
              <input
                style={{
                  border: "0.5px solid lightgrey",
                  textDecoration: "none",
                  height: "25px",
                  width: "95%",
                }}
                placeholder="Background color..."
                onChange={(e) => setBackgroundColor(`${e.target.value}`)}
              ></input>
<label>
  <select
    style={{
      border: "0.5px solid lightgrey",
      textDecoration: "none",
      height: "25px",
      width: "100%",
      fontFamily: fontType,
    }}
    className="select-text-font"
    onChange={(e) => setFontType(e.target.value)}
  >
    <option value="'Montserrat', sans-serif">Headline</option>
    <option value="'Open Sans', sans-serif">Simple</option>
    <option value="'Roboto', sans-serif">Clean</option>
    <option value="'Comic Sans MS', cursive">Casual</option>
    <option value="'Dancing Script', cursive">Fancy</option>
  </select>
</label>

              <div
                style={{
                  width: "100%",
                  height: "45%",
                  fontSize: "15px",
                  display: "grid",
                  columnCount: "4",
                  gridTemplateColumns: "repeat(2, 50%)",
                  border: "1px solid lightgrey",
                  minHeight: "50px",
                  minWidth: "50px",
                }}
              >
                <div
                  onClick={moveUp}
                  style={{ cursor: "pointer", margin: "auto" }}
                  className="arrow-button arrow-button--t"
                />
                <div
                  onClick={moveDown}
                  style={{ cursor: "pointer", margin: "auto" }}
                  className="arrow-button arrow-button--b"
                />
                <div
                  onClick={moveRight}
                  style={{ cursor: "pointer", margin: "auto" }}
                  className="arrow-button arrow-button--r"
                />
                <div
                  onClick={moveLeft}
                  style={{ cursor: "pointer", margin: "auto" }}
                  className="arrow-button arrow-button--l"
                />
              </div>
            </div>
          </div>
          <div
            className="storyButtons"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "30%",
              justifyContent: "space-evenly",
            }}
          >
            <button
              style={{
                height: "15%",
                width: "65%",
                marginLeft: "15%",
                backgroundColor: "#1b74e4",
                border: "none",
                color: "#fff",
                borderRadius: "7px",
              }}
              onClick={resetMoves}
            >
              reset
            </button>
            <Link style={{ height: "15%" }} to="/">
              <button
                style={{
                  height: "100%",
                  width: "65%",
                  marginLeft: "15%",
                  backgroundColor: "#1b74e4",
                  border: "none",
                  color: "#fff",
                  borderRadius: "7px",
                }}
              >
                discard
              </button>
            </Link>

            <button
              onClick={handleSubmit}
              style={{
                height: "15%",
                width: "65%",
                marginLeft: "15%",
                backgroundColor: "#1b74e4",
                border: "none",
                color: "#fff",
                borderRadius: "7px",
              }}
            >
              save
            </button>
          </div>
        </div>
        <div
          className="text-actual-preview-container"
          style={{
            width: "90%",
            borderRadius: "7px",
            marginRight: "2.5%",
            marginLeft: "2.5%",
            boxShadow: "0px 75px 75px 0px lightgrey",
            minWidth: "315px",
            minHeight: "275px",
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
              minWidth: "300px",
              minHeight: "250px",
              position: "relative",
            }}
          >
            <div
              className="actual-text-story-background"
              style={{
                height: "90%",
                width: "40%",
                position: "absolute",
                borderRadius: "7px",
                backgroundColor: backgroundColor,
                minWidth: "200px",
                minHeight: "200px",
                top: "50%",
                right: "50%",
                bottom: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxWidth: "300px",
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
                  minWidth: "150px",
                  minHeight: "200px",
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
