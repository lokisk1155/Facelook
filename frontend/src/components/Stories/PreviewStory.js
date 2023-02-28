import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createStory } from "../../store/story";
import StoryCrop from "../crop/StoryCrop";

function PreviewStory({ file, setFile, url, setUrl }) {
  const dispatch = useDispatch();

  const history = useHistory();

  const [fileSaved, setFileSaved] = useState(null);

  const simpleUsers = useSelector((state) => state.simpleUsers);

  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData;
    if (file) {
      formData = new FormData();
      formData.append("story[photo]", file);
    }
    let story = {
      user_id: sessionUser.id,
    };
    dispatch(createStory(story, formData));
    return history.push("/");
  };

  return (
    <>
      {!fileSaved ? (
        <StoryCrop
          photoURL={url}
          setPhotoURL={setUrl}
          setFile={setFile}
          fileSaved={setFileSaved}
        />
      ) : (
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
                  style={{
                    height: "50px",
                    borderRadius: "50px",
                    padding: "5px",
                  }}
                  src={simpleUsers[sessionUser.id]?.profile_picture}
                />
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
                <img
                  alt=""
                  className="actual-text-story-background"
                  src={url}
                  style={{
                    height: "90%",
                    width: "40%",
                    position: "absolute",
                    borderRadius: "7px",
                    minWidth: "200px",
                    minHeight: "200px",
                    top: "50%",
                    right: "50%",
                    bottom: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    maxWidth: "300px",
                  }}
                ></img>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PreviewStory;
