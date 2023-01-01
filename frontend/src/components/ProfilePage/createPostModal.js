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
  location
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
          post = { content, id: postId, user_id: currentUser.id };
        }
        dispatch(createPost(post, id, location));
        return closeModal(null);
      } else if (type === "update") {
        let post = { content, id: postId, user_id: currentUser.id };
        dispatch(updatePost(post, id, location));
        return closeModal(null);
      }
    } else {
      return closeModal(null);
    }
  }
  return (
    <div className="omega-create-post-modal">
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
            src={currentUser.profile_picture || profilePic}
          ></img>
        }

        <p className="user-name-text">{`${currentUser.first_name} ${currentUser.last_name}`}</p>
      </div>
      <textarea
        className=""
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
    </div>
  );
}

export default CreatePostModal;
