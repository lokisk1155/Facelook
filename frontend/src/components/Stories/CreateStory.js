import { useState } from "react";
import PreviewStory from "./PreviewStory";
import TextStory from "./TextStory";
import ProfilePicModal from "../NavBar/ProfilePicModal";
import { Modal } from "../../context/Modal";
import profilePic from "../NavBar/imgs/blank.png";
import "./CreateStory.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function CreateStoryIntro() {
  const history = useHistory();
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [textStory, setTextStory] = useState(null);
  const [toggleProfileModal, setToggleProfileModal] = useState(false);
  const simpleUsers = useSelector((state) => state.simpleUsers);
  const sessionUserId = useSelector((state) => state.session.user.id);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPhotoFile(file);
        setPhotoUrl(fileReader.result);
      };
    }
  };

  return (
    <>
      <div
        style={{
          height: "100px",
          width: "100vw",
          position: "absolute",
          top: "0",
        }}
      >
        <div
          style={{
            cursor: "pointer",
            position: "absolute",
            left: "0",
            margin: "10px",
          }}
        >
          <button
            onClick={() => history.push("/")}
            type="button"
            className="btn-close-create"
            style={{ position: "relative", height: "50px", width: "50px" }}
          >
            <div style={{ fontSize: "2rem", textAlign: "center" }}>X</div>
          </button>
        </div>
        <div
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "0",
            margin: "5px",
            marginRight: "65px",
            zIndex: "35",
          }}
          onClick={() => history.push("/")}
        >
          <svg viewBox="0 0 36 36" height="50" width="50">
            <defs>
              <linearGradient
                x1="50%"
                x2="50%"
                y1="97.0782153%"
                y2="0%"
                id="jsc_s_2"
              >
                <stop offset="0%" stopColor="#0062E0"></stop>
                <stop offset="100%" stopColor="#19AFFF"></stop>
              </linearGradient>
            </defs>
            <path
              d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8"
              fill="url(#jsc_s_2)"
            ></path>
            <path
              d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4"
              fill="#fff"
            ></path>
          </svg>
        </div>

        <img
          className="profile-pic-in-create"
          alt="123131s"
          onClick={() => setToggleProfileModal((prevState) => !prevState)}
          src={simpleUsers[sessionUserId]?.profile_picture || profilePic}
        />
        {toggleProfileModal ? (
          <Modal onClose={() => setToggleProfileModal(false)}>
            <ProfilePicModal />
          </Modal>
        ) : null}
      </div>
      <div className="omega-story-container">
        {!photoFile && !textStory ? (
          <div
            className="story-creation-container"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15%",
            }}
          >
            <label
              className="text-story-button"
              style={{
                backgroundImage: `url(https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/eDvxJuy2gCL.png)`,
                backgroundPosition: "0px -331px",
                backgroundSize: "221px 687px",
                width: "220px",
                height: "330px",
                backgroundRepeat: "no-repeat",
                display: "inline-block",
                margin: "5px",
                borderRadius: "15px",
              }}
            >
              {" "}
              <input
                type="file"
                onChange={handleFile}
                style={{ display: "none" }}
              />
              <p
                style={{
                  textAlign: "center",
                  color: "#fff",
                  marginTop: "150px",
                  fontSize: "18px",
                }}
              >
                Create a photo story
              </p>
            </label>
            <label
              className="picture-story-button"
              onClick={() => setTextStory(true)}
              style={{
                backgroundImage: `url(https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/eDvxJuy2gCL.png)`,
                backgroundPosition: "0px 0px",
                backgroundSize: "221px 687px",
                width: "220px",
                height: "330px",
                backgroundRepeat: "no-repeat",
                display: "inline-block",
                borderRadius: "15px",
                margin: "5px",
              }}
            >
              <p
                style={{
                  justifyContent: "center",
                  color: "#fff",
                  marginTop: "150px",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                Create a text story
              </p>
            </label>
          </div>
        ) : null}
        {photoFile && photoUrl ? (
          <PreviewStory
            file={photoFile}
            setFile={setPhotoFile}
            url={photoUrl}
            setUrl={setPhotoUrl}
          />
        ) : null}
        {textStory ? <TextStory /> : null}
      </div>
    </>
  );
}

export default CreateStoryIntro;
