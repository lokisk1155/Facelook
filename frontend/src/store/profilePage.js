import csrfFetch from "./csrf";
import { receivePosts } from "./post";
import { setCurrentProfile } from "./user";
import { receiveFriends } from "./friend";

const USER_RECEIVE_POST = "userPosts/userReceivePost";
const USER_RECEIVE_POSTS = "userPosts/userReceivePosts";
const USER_REMOVE_POST = "userPosts/userRemovePost";

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

export const profilePage = (id) => async (dispatch) => {
  const userRes = await csrfFetch(`/api/users/${id}`);
  const userData = await userRes.json();
  const userIds = Object.values(userData.user.friends);
  const friendsRes = await csrfFetch(`/api/users?userIds=${userIds}`);
  const friendsData = await friendsRes.json();
  const postRes = await csrfFetch(`/api/posts/${id}`);
  const postData = await postRes.json();
  setTimeout(() => {
    dispatch(userReceivePosts(postData));
    dispatch(setCurrentProfile(userData.user));
    dispatch(receiveFriends(friendsData));
  }, 500);
};

export const profilePagePosts = (id) => async (dispatch) => {
  const postRes = await csrfFetch(`/api/posts/${id}`);
  const postData = await postRes.json();
  dispatch(userReceivePosts(postData));
};

export const userUpdatePost =
  (post, location, formData) => async (dispatch) => {
    const photoAttached = formData instanceof FormData;
    const postRes = await csrfFetch(`/api/posts/${post.id}`, {
      method: "PUT",
      body: photoAttached ? formData : JSON.stringify({ post }),
    });
    dispatch(profilePagePosts(post.user_id));
  };

export const userDeletePost = (postId, id) => async (dispatch) => {
  await csrfFetch(`/api/posts/${postId}`, { method: "DELETE" });
  dispatch(profilePagePosts(id));
};

const userPostsReducer = (previousState = {}, action) => {
  let newState = { ...previousState };
  switch (action.type) {
    case USER_RECEIVE_POST:
      return { ...newState, [action.payload.id]: action.payload };
    case USER_RECEIVE_POSTS:
      newState = { ...action.payload };
      return newState;
    case USER_REMOVE_POST:
      delete newState[action.payload.postId];
      return newState;
    default:
      return previousState;
  }
};

export default userPostsReducer;
