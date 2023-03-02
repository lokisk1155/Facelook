import { Link } from "react-router-dom";
function TextControls({
  textContent,
  fontType,
  setTextContent,
  setColor,
  setFontSize,
  setFontType,
  setBackgroundColor,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
}) {
  return (
    <div
      style={{
        height: "50%",
        width: "15%",
        margin: "5px",
        backgroundColor: "#fff",
      }}
    >
      <h3 style={{ color: "black" }}>Add text</h3>
      <textarea
        maxLength="200"
        placeholder="Start Typing..."
        value={textContent}
        style={{
          height: "25%",
          width: "97.5%",
          border: "0.5px solid lightgrey",
          overflowWrap: "break-word",
          fontFamily: "Open Sans, sans-serif",
          fontSize: "15px",
          lineHeight: "1",
        }}
        onChange={(e) => setTextContent(e.target.value)}
      />
      <div
        style={{
          width: "99.5%",
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
      <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <input
          style={{
            border: "0.5px solid lightgrey",
            textDecoration: "none",
            height: "50px",
            width: "97.5%",
          }}
          placeholder="Type your font color..."
          onChange={(e) => setColor(e.target.value)}
        ></input>
        <input
          style={{
            border: "0.5px solid lightgrey",
            textDecoration: "none",
            height: "50px",
            width: "97.5%",
          }}
          placeholder="font height (numerical)..."
          onChange={(e) => setFontSize(`${e.target.value}px`)}
        ></input>
        <input
          style={{
            border: "0.5px solid lightgrey",
            textDecoration: "none",
            height: "50px",
            width: "97.5%",
          }}
          placeholder="Background color..."
          onChange={(e) => setBackgroundColor(`${e.target.value}`)}
        ></input>
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
      </div>
    </div>
  );
}

export default TextControls;
