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
  const postRes = await csrfFetch(`/api/posts/${postId}`);
  const postData = await postRes.json();
  return postData;
};

export const fetchPosts = (limit) => async (dispatch) => {
  const postRes = await csrfFetch(
    `/api/posts${limit ? `?limit=${limit}` : ""}`
  );
  const postData = await postRes.json();
  dispatch(receivePosts(postData));
  return postData;
};

export const createPost = (post, formData) => async (dispatch) => {
  const postRes = await csrfFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(post),
  });
  const postData = await postRes.json();
  const newPost =
    postData[Object.keys(postData)[Object.keys(postData).length - 1]];
  if (formData instanceof FormData) {
    return dispatch(updatePost(newPost, formData));
  }
  return newPost;
};

export const updatePost = (post, formData) => async (dispatch) => {
  const photoAttached = formData instanceof FormData;
  const postRes = await csrfFetch(`/api/posts/${post.id}`, {
    method: "PUT",
    body: photoAttached ? formData : JSON.stringify({ post }),
  });
  const postData = await postRes.json();
  dispatch(receivePost(postData));
  return postData;
};

export const deletePost = (postId) => async (dispatch) => {
  await csrfFetch(`/api/posts/${postId}`, { method: "DELETE" });
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
      delete newState[action.payload];
      return newState;
    default:
      return previousState;
  }
};

export default postsReducer;
