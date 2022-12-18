import "./createPostModal.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createPost } from "../../store/post";
import profilePic from "../NavBar/imgs/blank.png";
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

  function handlePostSubmit() {
    if (content.length > 0) {
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
      return closeModal(null);
    }
  }
  return (
    <div className="omega-create-post-modal">
      <form className="actual-create-post-form">
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
        <input
          className="submit-post-button"
          value="post"
          type="submit"
          onClick={() => handlePostSubmit()}
        />
      </form>
    </div>
  );
}

export default CreatePostModal;
