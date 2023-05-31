import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import CreatePost from "../../Post/CreatePost";
import profilePic from "../../NavBar/imgs/blank.png";
import PostIndex from "../../Post/PostIndex";
import "./PostFeed.css";
import React from "react";

function PostFeed({ currentUserId }) {
  const { id } = useParams();

  const [togglePost, setTogglePost] = useState(false);

  const simpleUsers = useSelector((state) => state.simpleUsers);

  const sessionUser = useSelector((state) => state.session.user);

  const posts = useSelector((state) =>
    currentUserId
      ? Object.values(state.posts).filter(
          (post) => post.user_id === currentUserId
        )
      : Object.values(state.posts)
  );

  const handleNewPost = (e) => {
    e.preventDefault();
    setTogglePost(true);
  };

  return (
    <div className="post-feed-omega-container">
      {currentUserId === undefined || parseInt(id) === sessionUser.id ? (
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
              <CreatePost
                closeModal={setTogglePost}
                location={currentUserId ? "profile" : "home"}
              />
            </Modal>
          )}
        </div>
      ) : null}
      <div className="actual-post-feed-container">
        {posts
          .map((post, index) => {
            return (
              <React.Fragment key={index}>
                <PostIndex
                  post={post}
                  sessionUser={sessionUser}
                  simpleUsers={simpleUsers}
                />
              </React.Fragment>
            );
          })
          .reverse()}
      </div>
    </div>
  );
}

export default PostFeed;
