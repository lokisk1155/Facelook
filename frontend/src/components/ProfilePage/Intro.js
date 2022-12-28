import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/user";
import "./Intro.css";

function Intro({ currentUser, sessionUser }) {
  const dispatch = useDispatch();

  const isUser = currentUser.id === sessionUser.id;

  const [bio, setBio] = useState(currentUser.bio);

  const [toggleBio, setToggleBio] = useState(false);

  const work = currentUser.work ? currentUser.work : null;

  const education = currentUser.education ? currentUser.education : null;

  const location = currentUser.location ? currentUser.location : null;

  const relationship = currentUser.relationship
    ? currentUser.relationship
    : null;

  const handleBioSubmit = (e) => {
    e.preventDefault();
    setToggleBio(false);
    const user = {
      ...currentUser,
      bio,
    };
    return dispatch(updateUser(user));
  };

  return (
    <div className="intro-container">
      <h2 className="intro-header">Intro </h2>
      <p style={{ justifyContent: "center" }}>{bio}</p>
      <div
        style={{ borderBottom: "1px solid lightgrey", margin: "10px" }}
      ></div>
      {isUser && toggleBio ? (
        <>
          <button
            style={{ justifyContent: "center" }}
            onClick={() => setToggleBio(true)}
          >
            Edit Bio
          </button>
          <form onSubmit={handleBioSubmit}>
            <textarea onChange={(e) => setBio(e.target.value)}></textarea>
            <button onClick={() => setToggleBio(false)}>X</button>
            <button type="submit">save</button>
          </form>
        </>
      ) : null}
      <div className="content-container">
        {work ? <p className="user-info">Works at {work}</p> : null}
        {education ? (
          <p className="user-info">Graduated from {education}</p>
        ) : null}
        {location ? <p className="user-info">lives in {location}</p> : null}
        {relationship ? <p className="user-info">{relationship}</p> : null}
      </div>
    </div>
  );
}
export default Intro;
