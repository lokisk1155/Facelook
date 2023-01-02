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

function Posts({ currentUser, sessionUser }) {
  const { id } = useParams();

  const dispatch = useDispatch();

  const ownsPost = currentUser.id === sessionUser.id ? true : false;

  const posts = useSelector((state) => Object.values(state.posts));

  const [togglePost, setTogglePost] = useState(false);

  const [editPost, setEditPost] = useState(null);

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
    <div className="omega-posts-container-profile-page ">
      <div className="post-feed-container">
        <div className="create-post-modal">
          <button className="new-post-button" onClick={handleNewPost}>
            <label className="place-holder-text-new-post">
              What's on your mind?
            </label>
          </button>

          <div className="pic-holder">
            {
              <img
                className="profile-pic-inside-create-post"
                src={currentUser.profile_picture || profilePic}
              ></img>
            }
          </div>

          <div className="modal-holder">
            {togglePost ? (
              <CreatePostModal
                type={"create"}
                currentUser={currentUser}
                postContent={"What's on your mind?"}
                header={"Create post"}
                closeModal={setTogglePost}
                location={location}
              />
            ) : null}
          </div>
        </div>

        {posts && (
          <div className="individual-post-container">
            {posts
              .map((post, index) => {
                return (
                  <div key={index} className="individual-post">
                    <div className="post-header">
                      <img
                        className="post-pic"
                        src={currentUser.profile_picture || profilePic}
                      ></img>
                      <h5 className="current-user-name">{`${currentUser.first_name} ${currentUser.last_name}`}</h5>
                    </div>
                    <p className="post-content">{post.content}</p>
                    {post.picture ? <img src={post.picture} style={{ height: "50px", width: "50px"}}/> : null }
                    {ownsPost && (
                      <button onClick={() => handleDeletePost(post)}>
                        Delete Post
                      </button>
                    )}
                    {ownsPost && (
                      <button onClick={handleEditPost(post.id)}>
                        Edit Post
                      </button>
                    )}
                    {editPost === post.id ? (
                      <CreatePostModal
                        type="update"
                        currentUser={currentUser}
                        postId={post.id}
                        postContent={post.content}
                        header={"Edit post"}
                        closeModal={setEditPost}
                        location={location}
                      />
                    ) : null}
                  </div>
                );
              })
              .reverse()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;

// onClick={(() => handleUpdatePost(post.id))}>

// const [togglePost, setTogglePost] = useState(false)
// const [customPost, setCustomPost] = useState(false)

// useEffect(() => {
//   if (postDeleted) {
//     setPostDeleted(false);
//   }
//   if (sessionUser.id === id) {
//     setDisplayEditDelete(true);
//   }
//   if (allPosts) {
//     if (id) {
//       const filteredPosts = Object.values(allPosts);
//       filteredPosts.filter((post) => post.user_id === id);
//       setPosts(filteredPosts.reverse());
//     } else {
//       setPosts(allPosts.reverse());
//     }
//   }
//   setBio(currentUser.bio);
// }, [postDeleted]);
