import { useDispatch } from "react-redux";
import { deletePost, removePost } from "../../store/post";
import { Link, useParams } from "react-router-dom";
import PostLoading from "../loading/PostLoading";
import profilePic from "../NavBar/imgs/blank.png";
import { userRemovePost } from "../../store/profilePage";
import { getTimeElapsed } from "./utils/Date";
function PostHeader({
  post,
  simpleUsers,
  sessionUser,
  editPost,
  setEditPost,
  setEditId,
}) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const handleDeletePost = (post) => (e) => {
    e.preventDefault();
    dispatch(deletePost(post.id)).then(() => {
      if (id) {
        dispatch(userRemovePost(post.id));
      } else {
        dispatch(removePost(post.id));
      }
    });
  };

  return (
    <div
      style={{
        height: "50px",
        minHeight: "33px",
        display: "flex",
        justifyContent: "space-between",
        paddingTop: "5px",
      }}
    >
      <div className="picture-and-name" style={{ display: "flex" }}>
        <Link to={`/ProfilePage/${post.user_id}`}>
          <PostLoading
            src={simpleUsers[post.user_id]?.profile_picture || profilePic}
          />
        </Link>
        <div style={{ padding: "5px" }}>
          <Link
            style={{ textDecoration: "none" }}
            to={`/ProfilePage/${post.user_id}`}
          >
            <h5
              style={{
                height: "50%",
                margin: "0",
                padding: "2px",
                textDecoration: "none",
                color: "black",
              }}
            >
              {post.user_id === sessionUser.id
                ? `${sessionUser.first_name} ${sessionUser.last_name}`
                : simpleUsers[post.user_id].name}
            </h5>
          </Link>
          <p
            style={{
              color: "#65676b",
              fontSize: ".55rem",
              height: "30%",
              margin: "0",
              padding: "3px",
            }}
          >
            {getTimeElapsed(post.created_at)}
          </p>
        </div>
      </div>
      <>
        {post.user_id === sessionUser.id ? (
          <div className="svg-dots">
            <>
              <div className="svg-container">
                <svg
                  style={{
                    visibility: editPost === post.id ? "hidden" : "",
                  }}
                  onClick={() => setEditPost(post.id)}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  width="1em"
                  height="1em"
                >
                  <g fillRule="evenodd" transform="translate(-446 -350)">
                    <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                  </g>
                </svg>
              </div>
              {editPost === post.id ? (
                <div
                  className="svg-dots-dropdown-container"
                  style={{
                    padding: "0.5px",
                  }}
                >
                  <button
                    style={{
                      height: "35px",
                      width: "85px",
                      backgroundColor: "#fff",
                      border: "0.5px solid black",
                      zIndex: "3",
                    }}
                    onClick={() => {
                      setEditId(post.id);
                      setEditPost(null);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    style={{
                      height: "35px",
                      width: "85px",
                      backgroundColor: "#fff",
                      border: "0.5px solid black",
                      zIndex: "3",
                    }}
                    onClick={handleDeletePost(post)}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      height: "35px",
                      width: "85px",
                      backgroundColor: "#fff",
                      border: "0.5px solid black",
                      zIndex: "3",
                    }}
                    onClick={() => setEditPost(null)}
                  >
                    Close
                  </button>
                </div>
              ) : null}
            </>
          </div>
        ) : null}
      </>
    </div>
  );
}

export default PostHeader;
