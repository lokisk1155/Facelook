import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import EditBio from "./EditBio";
import "./SessionUserIntro.css";

function SessionUserIntro({ currentUser, changeHeight }) {
  const [toggleBio, setToggleBio] = useState(false);

  const [divHeight, setCount] = useState(200);

  useEffect(() => {
    if (toggleBio) {
      changeHeight(divHeight + 100);
    } else {
      changeHeight(divHeight);
    }
  }, [divHeight, toggleBio]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <p style={{ justifyContent: "center" }}>{currentUser.bio}</p>
      {toggleBio ? <EditBio closeModal={setToggleBio} /> : null}
      <div
        style={{
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
        <button
          className="add-bio-edit-details-buttons"
          style={{
            width: "90%",
            height: "40%",
            margin: "2.5px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Edit details
        </button>
      </div>
    </div>
  );
}

export default SessionUserIntro;
