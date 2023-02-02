import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import EditBio from "./EditBio";
import "./SessionUserIntro.css";

function SessionUserIntro({ currentUser, changeHeight }) {
  const [toggleBio, setToggleBio] = useState(false);

  const divHeight = 200;

  useEffect(() => {
    if (toggleBio) {
      changeHeight(divHeight + 100);
    } else {
      changeHeight(divHeight);
    }
  }, [divHeight, toggleBio, changeHeight]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <p style={{ justifyContent: "center" }}>{currentUser.bio}</p>
      {toggleBio ? <EditBio closeModal={setToggleBio} /> : null}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "60%",
        }}
      >
        <button
          className="add-bio-edit-details-buttons"
          onClick={() => setToggleBio(true)}
          style={{
            width: "90%",
            height: "40%",
            margin: "2.5px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {currentUser.bio ? "Edit bio" : "Add bio"}
        </button>
        <Link
          style={{ margin: "2.5px", padding: "0", width: "90%", height: "40%" }}
          to={`/ProfilePage/${currentUser.id}/about`}
        >
          <button
            className="add-bio-edit-details-buttons"
            style={{
              border: "none",
              borderRadius: "5px",
              width: "100%",
              height: "100%",
            }}
          >
            Edit details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SessionUserIntro;
