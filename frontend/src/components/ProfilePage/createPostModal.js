import "./createPostModal.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { createPost } from "../../store/post";
import profilePic from "../HomePage/NavBar/imgs/blank.png";
import { updatePost } from "../../store/post";
import { useParams } from "react-router-dom";

function CreatePostModal({
  currentUser,
  closeModal,
  postContent,
  header,
  type,
  postId,
  userId,
}) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [content, setContent] = useState("");

  const [title, setHeader] = useState(header);
  const [placeHolder, setPlaceHolder] = useState(postContent);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log(content, "inside submit");

    if (content.length > 0) {
      console.log("in if ");
      if (type === "create") {
        let post;
        if (userId) {
          post = { content, user_id: userId };
        } else if (id) {
          post = { content, user_id: id };
        }
        dispatch(createPost(post));
        return closeModal(null);
      } else if (type === "update") {
        let post = { content, id: postId };
        dispatch(updatePost(post));
        return closeModal(null);
      }
    } else {
      console.log("in else");
      return closeModal(null);
    }
  };
  return (
    <div className="omega-create-post-modal">
      <form className="actual-create-post-form" onSubmit={handlePostSubmit}>
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
              src={profilePic}
            ></img>
          }

          <p className="user-name-text">{`${currentUser.first_name} ${currentUser.last_name}`}</p>
        </div>
        <textarea
          className="new-post-input"
          type="text"
          placeholder={placeHolder}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input className="submit-post-button" value="post" type="submit" />
      </form>
    </div>
  );
}

export default CreatePostModal;
