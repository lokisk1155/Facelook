import csrfFetch from "./csrf";
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
  dispatch(userReceivePosts(postData));
  dispatch(setCurrentProfile(userData.user));
  dispatch(receiveFriends(friendsData));
  if (postData && postData && friendsData) {
    return true 
  } 
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
