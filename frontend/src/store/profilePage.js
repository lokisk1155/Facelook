import csrfFetch from "./csrf";
import { receivePosts } from "./post";
import { setCurrentProfile } from "./user";
import { receiveFriends } from "./friend";

export const profilePage = (id, noPosts, noFriends) => async (dispatch) => {
  const userRes = await csrfFetch(`/api/users/${id}`);
  const userData = await userRes.json();
  if (noFriends) return dispatch(setCurrentProfile(userData.user));
  const userIds = Object.values(userData.user.friends);
  const friendsRes = await csrfFetch(`/api/users?userIds=${userIds}`);
  const friendsData = await friendsRes.json();
  if (noPosts) {
    dispatch(setCurrentProfile(userData.user));
    return dispatch(receiveFriends(friendsData));
  }
  const postRes = await csrfFetch(`/api/posts/${id}`);
  const postData = await postRes.json();
  dispatch(receivePosts(postData));
  dispatch(setCurrentProfile(userData.user));
  dispatch(receiveFriends(friendsData));
};

export const profilePagePosts = (id) => async (dispatch) => {
  const postRes = await csrfFetch(`/api/posts/${id}`);
  const postData = await postRes.json();
  dispatch(receivePosts(postData));
};
