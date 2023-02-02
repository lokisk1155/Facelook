import csrfFetch from "./csrf";
import { receivePosts } from "./post";
import { setCurrentProfile } from "./user";
import { receiveFriends } from "./friend";

export const profilePage = (id) => async (dispatch) => {
  const userRes = await csrfFetch(`/api/users/${id}`);
  const userData = await userRes.json();
  const userIds = Object.values(userData.user.friends);
  const friendsRes = await csrfFetch(`/api/users?userIds=${userIds}`);
  const friendsData = await friendsRes.json();
  const postRes = await csrfFetch(`/api/posts/${id}`);
  const postData = await postRes.json();
  setTimeout(() => {
    dispatch(receivePosts(postData));
    dispatch(setCurrentProfile(userData.user));
    dispatch(receiveFriends(friendsData));
  }, 500);
};

export const profilePagePosts = (id) => async (dispatch) => {
  const postRes = await csrfFetch(`/api/posts/${id}`);
  const postData = await postRes.json();
  dispatch(receivePosts(postData));
};
