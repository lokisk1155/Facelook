import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createPost } from "../../store/post";
import { useState } from "react";
import { useEffect } from "react";
import "./CreatePost.css";
import profilePic from "../NavBar/imgs/blank.png";
import CropEasy from "../crop/CropEasy";

function CreatePost({ closeModal, location }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [content, setContent] = useState("");

  const [photoFile, setPhotoFile] = useState(null);

  const [photoUrl, setPhotoUrl] = useState(null);

  const [openCrop, setOpenCrop] = useState(false);

  const [containerHeight, setContainerHeight] = useState(null);

  const [textareaHeight, setTextareaHeight] = useState("30%");

  useEffect(() => {
    if (photoFile) {
      setContainerHeight("600px");
      setTextareaHeight("10%");
    } else {
      setContainerHeight("375px");
      setTextareaHeight("30%");
    }
  }, [photoFile]);

  function handlePostSubmit() {
    if (content.length < 1) return closeModal(null);
    let formData;
    if (photoFile) {
      formData = new FormData();
      formData.append("postAttached[photo]", photoFile);
    }
    const post = {
      content,
    };
    const id = sessionUser.id;
    if (!location) {
      location = "home";
    }
    dispatch(createPost(post, id, location, formData));
    return closeModal(null);
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
      {openCrop ? (
        <CropEasy
          photoURL={photoUrl}
          setOpenCrop={setOpenCrop}
          setPhotoURL={setPhotoUrl}
          setFile={setPhotoFile}
        />
      ) : (
        <>
          {" "}
          <h3 style={{ textAlign: "center" }}>Create Post</h3>
          <div
            style={{ width: "100%", borderBottom: "1px solid lightgrey" }}
          ></div>
          <div
            style={{
              display: "flex",
              height: "15%",
              maxHeight: "45px",
              padding: "5px",
              alignItems: "center",
            }}
          >
            <img
              alt=""
              style={{ height: "90%", borderRadius: "50%" }}
              src={sessionUser.profile_picture || profilePic}
            ></img>
            <h3
              style={{ marginLeft: "15px" }}
            >{`${sessionUser.first_name} ${sessionUser.last_name}`}</h3>
          </div>
          <textarea
            autoFocus={true}
            style={{ width: "100%", height: textareaHeight }}
            type="text"
            placeholder={`What's on your mind ${sessionUser.first_name}?`}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {photoFile ? (
            <img
              alt=""
              src={photoUrl}
              style={{ height: "50%", width: "100%" }}
            />
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
          <div style={{ width: "100%", height: "12%", alignItems: "center" }}>
            <button
              style={{
                width: "98%",
                margin: "1%",
                height: "100%",
                maxHeight: "50px",
                border: "none",
                backgroundColor: content.length < 1 ? "lightgrey" : "#166fe5",
                color: content.length < 1 ? "black" : "white",
                borderRadius: "3px",
              }}
              onClick={handlePostSubmit}
            >
              Post
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CreatePost;
