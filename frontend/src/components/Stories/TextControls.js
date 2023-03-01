import { Link } from "react-router-dom";

function TextControls({
  simpleUsers,
  sessionUser,
  textContent,
  fontType,
  handleSubmit,
  setTextContent,
  setColor,
  setFontSize,
  setFontType,
  setBackgroundColor,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  resetMoves,
}) {
  return (
    <div
      style={{
        height: "50%",
        width: "15%",
        backgroundColor: "grey",
        marginLeft: "20px",
      }}
    >
      <label>
        <textarea
          maxLength="200"
          placeholder="Start Typing..."
          value={textContent}
          style={{
            height: "10%",
            width: "20%",
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
    </div>
  );
}

export default TextControls;
