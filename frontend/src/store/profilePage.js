import csrfFetch from './csrf';

const USER_RECEIVE_POST = 'userPosts/userReceivePost';
const USER_RECEIVE_POSTS = 'userPosts/userReceivePosts';
const USER_REMOVE_POST = 'userPosts/userRemovePost';

export const userReceivePost = (post) => ({
  type: USER_RECEIVE_POST,
  payload: post,
});

export const userReceivePosts = (posts) => ({
  type: USER_RECEIVE_POSTS,
  payload: posts,
});

export const userRemovePost = (postId) => ({
  type: USER_REMOVE_POST,
  payload: postId,
});

export const fetchUsersPosts = async (userId) => {
  const postRes = await csrfFetch(`/api/posts/${userId}`);
  const postData = await postRes.json();
  return postData;
};

const userPostsReducer = (previousState = {}, action) => {
  let newState = { ...previousState };
  switch (action.type) {
    case USER_RECEIVE_POST:
      return { ...newState, [action.payload.id]: action.payload };
    case USER_RECEIVE_POSTS:
      return { ...action.payload };
    case USER_REMOVE_POST:
      delete newState[action.payload];
      return newState;
    default:
      return previousState;
  }
};

export default userPostsReducer;
