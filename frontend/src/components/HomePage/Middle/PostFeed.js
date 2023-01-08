import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts, updatePost } from "../../../store/post";
import CreatePostModal from "../../ProfilePage/createPostModal";
import { deletePost } from "../../../store/post";
import profilePic from "../../NavBar/imgs/blank.png";
import { Link } from "react-router-dom";
import "./PostFeed.css";
import { Modal } from "../../../context/Modal";

function PostFeed() {
  const dispatch = useDispatch();
  const [postDeleted, setPostDeleted] = useState(false);
  const [checkPost, setCheckPost] = useState(false);
  const [togglePost, setTogglePost] = useState(false);
  const [targetedPost, setTargetedPost] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const [editContent, setEditContent] = useState(null);
  const [editId, setEditId] = useState(null);

  const posts = useSelector((state) => state.posts);

  const simpleUsers = useSelector((state) => state.simpleUsers);

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchPosts());
    if (postDeleted) {
      setPostDeleted(false);
    }
  }, [postDeleted, checkPost, targetedPost]);

  const handleNewPost = (e) => {
    e.preventDefault();
    setTogglePost(true);
  };

  const submitUpdate = (id) => (e) => {
    e.preventDefault();
    const post = {
      id: id,
      user_id: sessionUser.id,
      content: editContent,
    };
    setEditId(null);
    dispatch(updatePost(post));
  };

  const handleDeletePost = (post) => (e) => {
    e.preventDefault();
    if (post.user_id === sessionUser.id) {
      dispatch(deletePost(post.id));
      setPostDeleted(true);
    }
  };

  function formatDateTime(comparedTime) {
    const sec = Math.floor(comparedTime / 1000);
    if (sec < 60) {
      return `${sec}s`;
    }
    const min = Math.floor(sec / 60);
    if (min < 60) {
      return `${min}m`;
    }
    const hr = Math.floor(min / 60);
    if (hr < 24) {
      return `${hr}h`;
    }
    const day = Math.floor(hr / 24);
    if (day < 7) {
      return `${day}d`;
    }
    return `${Math.floor(day / 7)}w`;
  }

  function getTimeElapsed(createdAt) {
    const previous = new Date(createdAt);
    const now = new Date(); // get current datetime
    const comparedTime = now.valueOf() - previous.valueOf();
    return formatDateTime(comparedTime);
  }

  function getPostContentHeight(string) {
    if (string.length > 50) {
      return "50px";
    } else {
      return "100px";
    }
  }

  if (Object.keys(simpleUsers).length < 1) {
    return null;
  }

  if (Object.keys(posts).length < 1) {
    return null;
  }

  if (simpleUsers[sessionUser.id]?.profile_picture === undefined) {
    return null;
  }
  return (
    <>
      <div className="create-post-modal">
        <button className="new-post-button" onClick={handleNewPost}>
          <p className="text-inside-new-post">What is on your mind?</p>
        </button>

        <div className="pic-holder">
          {
            <img
              className="profile-pic-inside-create-post"
              src={simpleUsers[sessionUser.id].profile_picture || profilePic}
            ></img>
          }
        </div>
        {togglePost && (
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
        )}
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
                    height: post.picture ? "40vw" : "15vw",
                    minHeight: post.picture ? "400px" : "150px",
                    minWidth: "300px",
                  }}
                >
                  <div
                    className="post-header"
                    style={{ height: post.picture ? "10%" : "50%" }}
                  >
                    <div
                      className="picture-and-name"
                      style={{ display: "flex" }}
                    >
                      <Link to={`/ProfilePage/${post.user_id}`}>
                        <img
                          className="post-pic"
                          src={
                            simpleUsers[post.user_id].profile_picture ||
                            profilePic
                          }
                        ></img>
                      </Link>
                      <div className="name-and-time-elasped">
                        <h5
                          className="current-user-name"
                          style={{ margin: "0", paddingTop: "10%" }}
                        >
                          {simpleUsers[post.user_id].name}
                        </h5>
                        <p>{getTimeElapsed(post.created_at)}</p>
                      </div>
                    </div>
                    {post.user_id === sessionUser.id ? (
                      <div className="svg-dots">
                        <>
                          <div className="svg-container">
                            <svg
                              style={{
                                visibility:
                                  editPost === post.id ? "hidden" : "",
                              }}
                              onClick={() => setEditPost(post.id)}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              width="1em"
                              height="1em"
                            >
                              <g
                                fill-rule="evenodd"
                                transform="translate(-446 -350)"
                              >
                                <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                              </g>
                            </svg>
                          </div>
                          {editPost === post.id ? (
                            <div className="svg-dots-dropdown-container">
                              <button
                                onClick={() => {
                                  setEditId(post.id);
                                  setEditPost(null);
                                }}
                              >
                                Edit
                              </button>
                              <button onClick={handleDeletePost(post)}>
                                Delete
                              </button>
                              <button onClick={() => setEditPost(null)}>
                                Close
                              </button>
                            </div>
                          ) : null}
                        </>
                      </div>
                    ) : null}
                  </div>
                  <div
                    className="post-content-container"
                    style={{
                      width: "90%",
                      marginLeft: "10%",
                      height: getPostContentHeight(post.content),
                    }}
                  >
                    {editId !== post.id ? (
                      <p className="post-content" style={{ width: "90%" }}>
                        {post.content}
                      </p>
                    ) : (
                      <div
                        className="edit-update-post-button-container"
                        style={{ display: "flex" }}
                      >
                        <textarea
                          className="post-content"
                          autoFocus={editId}
                          onChange={(e) => setEditContent(e.target.value)}
                          style={{ width: "50%", resize: "none" }}
                        >
                          {post.content}
                        </textarea>

                        <button onClick={submitUpdate(post.id)}>save</button>
                        <button onClick={() => setEditId(null)}>cancel</button>
                      </div>
                    )}
                  </div>
                  {post.picture ? (
                    <img
                      src={post.picture}
                      style={{ width: "100%", height: "70%" }}
                    />
                  ) : null}
                  <div style={{ margin: "25px" }}></div>
                  {checkPost && targetedPost.user_id === sessionUser.id && (
                    <Modal onClose={() => setCheckPost(false)}>
                      <CreatePostModal
                        type="update"
                        currentUser={sessionUser}
                        postId={targetedPost.id}
                        postContent={targetedPost.content}
                        header={"Edit post"}
                        closeModal={setCheckPost}
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
    </>
  );
}

export default PostFeed;
