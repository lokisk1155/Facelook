import "./createPostModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createPost } from "../../store/post";
import profilePic from "../NavBar/imgs/blank.png";
import { updatePost } from "../../store/post";
import { useParams } from "react-router-dom";
import CropEasy from "../crop/CropEasy";

function CreatePostModal({
  currentUser,
  closeModal,
  postContent,
  header,
  type,
  postId,
  userId,
  location,
}) {
  const dispatch = useDispatch();

  const simpleUsers = useSelector((state) => state.simpleUsers);

  const { id } = useParams();

  const [content, setContent] = useState("");

  const [title, setHeader] = useState(header);
  const [placeHolder, setPlaceHolder] = useState(postContent);

  const [photoFile, setPhotoFile] = useState(null);

  const [photoUrl, setPhotoUrl] = useState(null);

  const [openCrop, setOpenCrop] = useState(false);

  const [containerHeight, setContainerHeight] = useState(null);

  useEffect(() => {
    if (photoFile || photoUrl) {
      setContainerHeight("600px");
    } else {
      setContainerHeight("375px");
    }
  }, [photoFile, photoUrl]);

  function handlePostSubmit() {
    if (content.length < 1) return closeModal(null);
    let formData;
    if (photoFile) {
      formData = new FormData();
      formData.append("postAttached[photo]", photoFile);
    }
    if (type === "create") {
      let post;
      if (userId) {
        post = { content, user_id: userId };
      } else if (id) {
        post = { content, id: postId, user_id: currentUser.id };
      }
      dispatch(createPost(post, id, location, formData));
      return closeModal(null);
    } else if (type === "update") {
      let post = { content, id: postId, user_id: currentUser.id };
      dispatch(updatePost(post, id, location, formData));
      return closeModal(null);
    }
  }

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
    setOpenCrop(true);
  };

  return (
    <div
      className="omega-create-post-modal"
      style={{ height: containerHeight }}
    >
      {!openCrop ? (
        <>
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="close-button" onClick={() => closeModal(null)}>
              X
            </button>
          </div>
          <div className="pic-holder">
            {
              <img
                className="profile-pic-inside-create-post"
                src={
                  simpleUsers[userId]?.profile_picture ||
                  currentUser.profile_picture ||
                  profilePic
                }
              ></img>
            }
            <p className="user-name-text">{`${currentUser.first_name} ${currentUser.last_name}`}</p>
          </div>
          <textarea
            autoFocus={true}
            className="textarea-post"
            type="text"
            placeholder={placeHolder}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {photoFile ? (
            <img src={photoUrl} style={{ height: "50%", width: "100%" }} />
          ) : (
            <div style={{ width: "100%", height: "15%", alignItems: "center" }}>
              <label className="custom-file-upload">
                <p>Add to your post</p>
                <i
                  style={{
                    height: "24px",
                    width: "24px",
                    backgroundImage:
                      "url(https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/IbmEpilFoF1.png)",
                    backgroundPosition: "0px -208px",
                    backgroundSize: "33px 605px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                    justifyContent: "center",
                    alignSelf: "center",
                    marginRight: "20px",
                  }}
                />
                <input
                  className="input-file-post"
                  type="file"
                  onChange={handleFile}
                />
              </label>
            </div>
          )}

          <input
            className="submit-post-button"
            value="post"
            type="submit"
            onClick={() => handlePostSubmit()}
          />
        </>
      ) : null}
      {openCrop ? (
        <CropEasy
          photoURL={photoUrl}
          setOpenCrop={setOpenCrop}
          setPhotoURL={setPhotoUrl}
          setFile={setPhotoFile}
        />
      ) : null}
    </div>
  );
}

export default CreatePostModal;
