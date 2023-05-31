import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import "./YourShortcuts.css";

function YourShortcuts() {
  return (
    <div
      style={{
        width: "80%",
        height: "300px",
        backgroundColor: "hsla(0,0%,100%,.4)",
        marginTop: "65px",
        borderRadius: "15px",
        boxShadow: "0px 4px 4px 0px lightgrey",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2
        style={{
          paddingTop: "10px",
          paddingLeft: "10px",
          margin: "0",
          color: "grey",
        }}
      >
        Your shortcuts
      </h2>
      <hr color="lightgrey" width="95%"></hr>
      <article
        style={{
          display: "flex",
          flexDirection: "column",
          height: "80%",
          justifyContent: "space-evenly",
          cursor: "pointer",
        }}
      >
        <a
          className="icon-links"
          href="https://github.com/lokisk1155/FaceOok"
          style={{ width: "90%", borderRadius: "5px", height: "40px" }}
        >
          {" "}
          <FontAwesomeIcon icon={faGithub} /> {":      Github"}
        </a>
        <a
          className="icon-links"
          href="https://www.linkedin.com/in/shawn-mallon/"
          style={{ width: "90%", borderRadius: "5px", height: "40px" }}
        >
          {" "}
          <FontAwesomeIcon icon={faLinkedin} /> {":      Linkedin"}
        </a>
        <a
          className="icon-links"
          href="https://mailmeaa.herokuapp.com/login"
          style={{ width: "90%", borderRadius: "5px", height: "40px" }}
        >
          {" "}
          <FontAwesomeIcon size="1x" icon={faEnvelope} /> {":      Mail"}
        </a>
        <a
          className="icon-links"
          href="https://bejewelled-cactus-d214e5.netlify.app/"
          style={{ width: "90%", borderRadius: "5px", height: "40px" }}
        >
          {" "}
          <FontAwesomeIcon size="sm" icon={faPaintBrush} /> {":      Threejs"}
        </a>
      </article>
    </div>
  );
}

export default YourShortcuts;
