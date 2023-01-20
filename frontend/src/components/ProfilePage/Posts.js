import { useParams } from "react-router-dom";
import { fetchUser, updateUser } from "../../store/user";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Featured from "./Featured";
import EditDetails from "./EditDetails";
import { fetchPosts, updatePost } from "../../store/post";
import "./Posts.css";
import CreatePostModal from "./createPostModal";
import profilePic from "../NavBar/imgs/blank.png";
import { deletePost } from "../../store/post";
import { profilePage } from "../../store/profilePage";
import { Modal } from "../../context/Modal";
import { Link } from "react-router-dom";

function Posts({ currentUser, sessionUser }) {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [togglePost, setTogglePost] = useState(false);

  const [editPost, setEditPost] = useState(null);

  const posts = useSelector((state) =>
    Object.values(state.posts).filter((post) => post.user_id === currentUser.id)
  );

  const simpleUsers = useSelector((state) => state.simpleUsers);

  if (Object.values(simpleUsers).length < 1) {
    return null;
  }

  const self = currentUser.id === sessionUser.id ? true : false;

  const location = "profile";

  const handleNewPost = (e) => {
    e.preventDefault();
    setTogglePost(true);
  };

  const handleDeletePost = (post) => {
    if (post.user_id === currentUser.id) {
      dispatch(deletePost(post.id, id, location));
      return;
    }
    return;
  };

  const handleEditPost = (postId) => (e) => {
    e.preventDefault();
    setEditPost(postId);
  };

  return (
    <div className="post-feed-profile-page-container">
      <div className="create-post-modal">
        <button className="new-post-button" onClick={handleNewPost}>
          <p className="text-inside-new-post">What is on your mind?</p>
        </button>

        <div className="pic-holder">
          {
            <img
              className="profile-pic-inside-create-post"
              src={currentUser.profile_picture || profilePic}
            ></img>
          }
        </div>
        {togglePost && self ? (
          <Modal onClose={() => setTogglePost(false)}>
            <CreatePostModal
              type={"create"}
              currentUser={sessionUser}
              postContent={"What's on your mind?"}
              header={"Create post"}
              closeModal={setTogglePost}
              userId={sessionUser.id}
              location={"home"}
            />
          </Modal>
        ) : null}
      </div>

      {posts && (
        <>
          {Object.values(posts)
            .map((post) => {
              return (
                <div
                  key={post.id}
                  className="individual-post"
                  style={{
                    height: post.picture ? "40vw" : "10vw",
                    minHeight: post.picture ? "400px" : "100px",
                    minWidth: "300px",
                  }}
                >
                  <div className="post-header">
                    <div
                      className="picture-and-name"
                      style={{ display: "flex" }}
                    >
                      <Link to={`/ProfilePage/${post.user_id}`}>
                        <img
                          style={{
                            height: "25px",
                            width: "25px",
                            borderRadius: "50px",
                          }}
                          src={
                            simpleUsers[post.user_id].profile_picture ||
                            profilePic
                          }
                        ></img>
                      </Link>
                      <h5 className="current-user-name">
                        {simpleUsers[post.user_id].name}
                      </h5>
                    </div>
                    <div className="svg-dots">
                      {post.user_id === sessionUser.id ? (
                        <svg
                          onClick={handleEditPost(post.id)}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          width="1em"
                          height="1em"
                        >
                          <g
                            fillRule="evenodd"
                            transform="translate(-446 -350)"
                          >
                            <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                          </g>
                        </svg>
                      ) : null}
                    </div>
                  </div>
                  <div
                    style={{
                      height: "10%",
                      margin: post.picture ? "auto" : "50px",
                    }}
                  >
                    <p className="post-content">{post.content}</p>
                    {editPost === post.id ? (
                      <div className="edit-delete-post-popdown">
                        <button onClick={() => handleDeletePost(post)}>
                          Delete Post
                        </button>
                        <button
                          onClick={(e) => {
                            setEditPost(post.id);
                          }}
                        >
                          Edit Post
                        </button>
                        <button onClick={() => setEditPost(null)}>close</button>
                      </div>
                    ) : null}
                  </div>
                  {post.picture ? (
                    <img
                      src={post.picture}
                      style={{ width: "100%", height: "70%" }}
                    />
                  ) : null}
                  <div style={{ margin: "25px" }}></div>
                  {editPost && editPost.user_id === sessionUser.id && (
                    <Modal onClose={() => setEditPost(false)}>
                      <CreatePostModal
                        type="update"
                        currentUser={currentUser}
                        postId={editPost.id}
                        postContent={editPost.content}
                        header={"Edit post"}
                        closeModal={setEditPost}
                        location={"home"}
                      />
                    </Modal>
                  )}
                </div>
              );
            })
            .reverse()}
        </>
      )}
    </div>
  );
}

export default Posts;

