import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../../store/post";
import CreatePostModal from "../../ProfilePage/createPostModal";
import { deletePost } from "../../../store/post";
import profilePic from "../../NavBar/imgs/blank.png";
import { fetchsimpleUsers } from "../../../store/user";
import { Link } from "react-router-dom";
import "./PostFeed.css";
import { Modal } from "../../../context/Modal";

function PostFeed() {
  const dispatch = useDispatch();
  const [postDeleted, setPostDeleted] = useState(false);
  const [checkPost, setCheckPost] = useState(false);
  const [togglePost, setTogglePost] = useState(false);
  const [targetedPost, setTargetedPost] = useState(null);

  const posts = useSelector((state) => state.post)

  const simpleUsers = useSelector((state) => state.simpleUsers);

  const currentUser = useSelector((state) => state.session.user);

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
    if (post.user_id === currentUser.id) {
      dispatch(deletePost(post.id));
      setPostDeleted(true);
      return;
    }
    return;
  }

  if (Object.keys(simpleUsers).length === 0) {
    return null;
  }

  if  (Object.keys(posts).length === 0) {
    return null 
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
              src={profilePic}
            ></img>
          }
        </div>
        {togglePost && (
          <Modal onClose={() => setTogglePost(false)}>
            <CreatePostModal
              type={"create"}
              currentUser={currentUser}
              postContent={"What's on your mind?"}
              header={"Create post"}
              closeModal={setTogglePost}
              userId={currentUser.id}
            />
          </Modal>
        )}
      </div>

      {posts && (
        <div className="individual-post-container">
          {Object.values(posts)
            .map((post) => {
              return (
                  <div key={post.id} className="individual-post">
                      <div className="post-header">
                        <Link to={`/ProfilePage/${post.user_id}`}>
                          <img className="post-pic" src={profilePic}></img>
                        </Link>
                        <h5 className="current-user-name">
                            {simpleUsers[post.user_id].name}
                        </h5>
                      </div>
                      <p className="post-content">{post.content}</p>
                      {currentUser.id === post.user_id ? (
                        <button onClick={() => handleDeletePost(post)}>
                          Delete Post
                        </button>
                      ) : (
                        <div />
                      )}
                      {currentUser.id === post.user_id ? (
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
                      {checkPost && targetedPost.user_id === currentUser.id && (
                        <Modal onClose={() => setCheckPost(false)}>
                          <CreatePostModal
                            type="update"
                            currentUser={currentUser}
                            postId={targetedPost.id}
                            postContent={targetedPost.content}
                            header={"Edit post"}
                            closeModal={setCheckPost}
                          />
                        </Modal>
                      )}
                </div>
                );
            })
            .reverse()}
        </div>
      )}
    </>
  );
}

export default PostFeed;
