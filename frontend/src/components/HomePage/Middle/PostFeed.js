import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../../store/post";
import CreatePostModal from "../../ProfilePage/createPostModal";
import { deletePost } from "../../../store/post";
import profilePic from "../../NavBar/imgs/blank.png";
import { Link } from "react-router-dom";
import "./PostFeed.css";
import { Modal } from "../../../context/Modal";
import { getSimpleUsers } from "../../../store/simpleUsers";
import CropEasy from "../../crop";

function PostFeed() {
  const dispatch = useDispatch();
  const [postDeleted, setPostDeleted] = useState(false);
  const [checkPost, setCheckPost] = useState(false);
  const [togglePost, setTogglePost] = useState(false);
  const [targetedPost, setTargetedPost] = useState(null);

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

  function handleDeletePost(post) {
    if (post.user_id === sessionUser.id) {
      dispatch(deletePost(post.id));
      setPostDeleted(true);
      return;
    }
    return;
  }

  if (Object.keys(simpleUsers).length === 0) {
    return null;
  }

  if (Object.keys(posts).length === 0) {
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
                  style={{ height: post.picture ? "40vw" : "10vw" }}
                >
                  <div className="post-header">
                    <Link to={`/ProfilePage/${post.user_id}`}>
                      <img
                        className="post-pic"
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
                  <div
                    style={{
                      height: "10%",
                      margin: post.picture ? "auto" : "50px",
                    }}
                  >
                    <p className="post-content">{post.content}</p>
                  </div>
                  {post.picture ? (
                    <img
                      src={post.picture}
                      style={{ width: "100%", height: "70%" }}
                    />
                  ) : null}
                  <div style={{ margin: "25px" }}>
                    {sessionUser.id === post.user_id ? (
                      <button onClick={() => handleDeletePost(post)}>
                        Delete Post
                      </button>
                    ) : (
                      <div />
                    )}
                    {sessionUser.id === post.user_id ? (
                      <button
                        onClick={(e) => {
                          setCheckPost(true);
                          setTargetedPost(post);
                        }}
                      >
                        Edit Post
                      </button>
                    ) : (
                      <div />
                    )}
                  </div>
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
