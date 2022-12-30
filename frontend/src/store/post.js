import csrfFetch from "./csrf";

const RECEIVE_POST = "post/receivePost";
const RECEIVE_POSTS = "post/receivePosts";
const REMOVE_POST = "post/removePost";

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  payload: post,
});

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  payload: posts,
});

export const removePost = (postId) => ({
  type: REMOVE_POST,
  payload: postId,
});

export const fetchPost = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}`);
  const data = await res.json();
  return data;
};

export const fetchPosts = (limit) => async (dispatch) => {
  let res;
  if (limit) {
    res = await csrfFetch(`/api/posts?limit=${limit}`);
  } else {
    res = res = await csrfFetch(`/api/posts`);
  }
  const data = await res.json();
  dispatch(receivePosts(data));
};

export const createPost = (post) => async (dispatch) => {
  const res = await csrfFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(post),
  });
  const data = await res.json();
  dispatch(receivePosts(data));
};

export const updatePost = (post) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${post.id}`, {
    method: "PUT",
    body: JSON.stringify({ post }),
  });
  const data = await res.json();
  dispatch(receivePost(data));
  return data;
};

export const deletePost = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}`, { method: "DELETE" });
  dispatch(removePost(postId));
};

const postsReducer = (previousState = {}, action) => {
  let newState = { ...previousState };
  switch (action.type) {
    case RECEIVE_POST:
      return { ...newState, [action.payload.id]: action.payload };
    case RECEIVE_POSTS:
      newState = { ...action.payload };
      return newState;
    case REMOVE_POST:
      delete newState[action.payload.postId];
      return newState;
    default:
      return previousState;
  }
};

export default postsReducer;
