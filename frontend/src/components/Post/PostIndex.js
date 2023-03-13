import { receivePost, updatePost } from "../../store/post";
import { useDispatch } from "react-redux";
import { useState } from "react";
import PostImageLoading from "../loading/PostImageLoading";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import { userReceivePost } from "../../store/profilePage";
import { useParams } from "react-router-dom";

function PostIndex({ post, sessionUser, simpleUsers }) {
  const dispatch = useDispatch();

  const { id } = useParams()

  const [editPost, setEditPost] = useState(null);

  const [editId, setEditId] = useState(null);

  const [editContent, setEditContent] = useState("");

  const submitUpdate = (postId) => (e) => {
    e.preventDefault();
    const post = {
      id: postId,
      content: editContent,
    };
    setEditId(null);
    dispatch(updatePost(post)).then((data) => {
      if (id) {
        dispatch(userReceivePost(data))
      } else {
        dispatch(receivePost(data))
      }
    })
  };

  return (
    <>
      {post.picture ? (
        <div
          style={{
            minHeight: "400px",
            width: "100%",
            backgroundColor: "#fff",
            marginTop: "10px",
          }}
        >
          <PostHeader
            post={post}
            simpleUsers={simpleUsers}
            sessionUser={sessionUser}
            editPost={editPost}
            setEditPost={setEditPost}
            editId={editId}
            setEditId={setEditId}
          />
          <PostContent
            post={post}
            editId={editId}
            editContent={editContent}
            setEditId={setEditId}
            setEditContent={setEditContent}
            submitUpdate={submitUpdate}
          />
          <PostImageLoading src={post.picture} />
        </div>
      ) : (
        <>
          <div
            style={{
              minHeight: "85px",
              width: "100%",
              marginBottom: "15px",
              backgroundColor: "#fff",
            }}
          >
            <PostHeader
              post={post}
              simpleUsers={simpleUsers}
              sessionUser={sessionUser}
              editPost={editPost}
              setEditPost={setEditPost}
              editId={editId}
              setEditId={setEditId}
            />
            <PostContent
              post={post}
              editId={editId}
              editContent={editContent}
              setEditId={setEditId}
              setEditContent={setEditContent}
              submitUpdate={submitUpdate}
            />
          </div>
        </>
      )}
    </>
  );
}

export default PostIndex;
