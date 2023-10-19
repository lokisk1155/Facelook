import { receivePost, updatePost } from '../../store/post';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import PostImageLoading from '../loading/PostImageLoading';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import { userReceivePost } from '../../store/profilePage';
import { useParams } from 'react-router-dom';

function PostIndex({ post, sessionUser, simpleUsers }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [editPost, setEditPost] = useState(null);

  const [editId, setEditId] = useState(null);

  const [editContent, setEditContent] = useState('');

  const submitUpdate = (postId) => (e) => {
    e.preventDefault();
    const post = {
      id: postId,
      content: editContent,
    };
    setEditId(null);
    dispatch(updatePost(post)).then((data) => {
      if (id) {
        dispatch(userReceivePost(data));
      } else {
        dispatch(receivePost(data));
      }
    });
  };

  return (
    <div
      style={{
        marginTop: '1vw',
        backgroundColor: 'white',
        borderRadius: '7px',
        boxShadow: '0 0.5px 3px 1px rgb(228, 228, 228)',
        border: '1px solid rgb(213, 213, 213)',
        paddingLeft: '0',
        paddingRight: '0',
        paddingBottom: '1vw',
        paddingTop: '0.45vw',
        /* position:relative; */
      }}
    >
      {post.picture ? (
        <div
          style={{
            minHeight: '400px',
            width: '100%',
            backgroundColor: '#fff',
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
              minHeight: '85px',
              width: '100%',
              backgroundColor: '#fff',
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
    </div>
  );
}

export default PostIndex;
