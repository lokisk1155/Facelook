import "./LoginFooter.css";

function LoginFooter() {
  const styles = {
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "rgb(145, 145, 145)",
    textDecoration: "none",
    fontSize: "1.2rem",
    margin: "5px",
  };

  const isViewportUnderCertainWidth = window.innerWidth < 768; // Adjust the width as per your needs

  if (isViewportUnderCertainWidth) {
    return null; // Render nothing if the viewport width is under the specified value
  }
  return (
    <footer
      className="foooooter"
      style={{
        position: "absolute",
        bottom: "0",
        width: "100%",
        height: "25%",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <article
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "50%",
          ...styles,
        }}
      >
        <a
          style={{ ...styles }}
          href="https://github.com/lokisk1155"
        >
          GitHub
        </a>
        <a
          style={{ ...styles }}
          href="https://www.linkedin.com/in/"
        >
          LinkedIn
        </a>
      </article>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "50%",
        }}
      >
        <div style={{ ...styles }}>
          Technologies: Ruby Rails(Ruby on Rails) PostgreSql JavaScript React.js
          Redux.js AWS(S3) HTML5 CSS3{" "}
        </div>
        <div style={{ ...styles }}>Shawn Mallon</div>
      </section>
    </footer>
  );
}

export default LoginFooter;
