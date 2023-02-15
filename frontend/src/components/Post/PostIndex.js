import { updatePost } from "../../store/post";
import { useDispatch } from "react-redux";
import { useState } from "react";
import PostImageLoading from "../loading/PostImageLoading";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";

function PostIndex({ post, key, sessionUser, simpleUsers }) {
  const dispatch = useDispatch();
  const [editPost, setEditPost] = useState(null);

  const [editId, setEditId] = useState(null);

  const [editContent, setEditContent] = useState("");

  const submitUpdate = (id) => (e) => {
    e.preventDefault();
    const post = {
      id: id,
      content: editContent,
    };
    setEditId(null);
    dispatch(updatePost(post));
  };

  return (
    <>
      {post.picture ? (
        <div
          key={key}
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
            key={key}
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
