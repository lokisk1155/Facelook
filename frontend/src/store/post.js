import csrfFetch from "./csrf";
import { profilePage } from "./profilePage";

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
  let postRes;
  if (limit) {
    postRes = await csrfFetch(`/api/posts?limit=${limit}`);
  } else {
    postRes = await csrfFetch(`/api/posts`);
  }
  const postData = await postRes.json();
  dispatch(receivePosts(postData));
};

export const createPost =
  (post, id, location, formData) => async (dispatch) => {
    const postRes = await csrfFetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
    });
    const postData = await postRes.json();
    const newPost =
      postData[Object.keys(postData)[Object.keys(postData).length - 1]];
    if (formData instanceof FormData) {
      return dispatch(updatePost(newPost, id, location, formData));
    }
    if (location === "profile") {
      return dispatch(profilePage(id));
    }
    dispatch(fetchPosts());
    return newPost;
  };

export const updatePost = (post, location, formData) => async (dispatch) => {
  const photoAttached = formData instanceof FormData;
  const postRes = await csrfFetch(`/api/posts/${post.id}`, {
    method: "PUT",
    body: photoAttached ? formData : JSON.stringify({ post }),
  });
  const postData = await postRes.json();
  if (location === "profile") {
    return dispatch(profilePage(post.user_id));
  }
  if (photoAttached) {
    dispatch(fetchPosts());
    return true;
  }
  return dispatch(receivePost(postData));
};

export const deletePost = (postId, id, location) => async (dispatch) => {
  await csrfFetch(`/api/posts/${postId}`, { method: "DELETE" });
  if (location === "profile") {
    return dispatch(profilePage(id));
  }
  return dispatch(fetchPosts());
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
