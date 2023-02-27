import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import CreatePost from "../../Post/CreatePost";
import profilePic from "../../NavBar/imgs/blank.png";
import PostIndex from "../../Post/PostIndex";
import "./PostFeed.css";

function PostFeed({ profilePage, currentUser }) {
  const { id } = useParams();

  const [togglePost, setTogglePost] = useState(false);

  const postsFromState = useSelector((state) => state.posts);

  const simpleUsers = useSelector((state) => state.simpleUsers);

  const sessionUser = useSelector((state) => state.session.user);

  const posts = useSelector((state) =>
    profilePage ? state.userPosts : state.posts
  );

  const handleNewPost = (e) => {
    e.preventDefault();
    setTogglePost(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflow: "scroll",
      }}
    >
      {profilePage === undefined || parseInt(id) === sessionUser.id ? (
        <div className="create-post-modal">
          <button className="new-post-button" onClick={handleNewPost}>
            <p className="text-inside-new-post">What is on your mind?</p>
          </button>

          <div className="pic-holder">
            {
              <img
                className="profile-pic-inside-create-post"
                alt=""
                src={simpleUsers[sessionUser.id]?.profile_picture || profilePic}
              ></img>
            }
          </div>
          {togglePost && (
            <Modal onClose={() => setTogglePost(false)}>
              <CreatePost closeModal={setTogglePost} location={"home"} />
            </Modal>
          )}
        </div>
      ) : null}
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "5px" }}
      >
        {Object.values(posts)
          .map((post, index) => {
            return (
              <PostIndex
                post={post}
                index={index}
                sessionUser={sessionUser}
                simpleUsers={simpleUsers}
              />
            );
          })
          .reverse()}
      </div>
    </div>
  );
}

export default PostFeed;
