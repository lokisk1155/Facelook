import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import CreatePost from "../../Post/CreatePost";
import profilePic from "../../NavBar/imgs/blank.png";
import PostIndex from "../../Post/PostIndex";
import "./PostFeed.css";

function PostFeed({ currentUserId }) {
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
      {currentUserId === undefined ? (
        <div
          style={{
            backgroundColor: "#fff",
            width: "100%",
            minHeight: "5vw",
            borderRadius: "10px",
            border: "1px solid rgb(213, 213, 213)",
            boxShadow: "0 0.5px 3px 1px rgb(228, 228, 228)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: "5px",
          }}
        >
          <img
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            alt=""
            src={simpleUsers[sessionUser.id]?.profile_picture || profilePic}
          ></img>
          <button
            className="whats-on-ur-mind"
            style={{
              width: "85%",
              marginLeft: "-0.5vw",
              height: "3vw",
              border: "none",
              display: "flex",
              alignItems: "center",
              borderRadius: "20px",
              color: "grey",
              fontSize: "1.4vw",
              paddingLeft: "1.3vw",
            }}
            onClick={handleNewPost}
          >
            <p className="text-inside-new-post">{`What is on your mind, ${sessionUser.first_name}?`}</p>
          </button>
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
      {togglePost && (
        <Modal onClose={() => setTogglePost(false)}>
          <CreatePost
            closeModal={setTogglePost}
            location={currentUserId ? "profile" : "home"}
          />
        </Modal>
      )}
    </div>
  );
}

export default PostFeed;
