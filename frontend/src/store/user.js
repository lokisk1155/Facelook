import csrfFetch from "./csrf";
import { RECEIVE_FRIEND } from "./friend";

export const SET_CURRENT_PROFILE = "users/SET_CURRENT_PROFILE";
export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const SET_CURRENT_ARRAY = "users/SET_CURRENT_ARRAY";

export const setCurrentProfile = (user) => ({
  type: SET_CURRENT_PROFILE,
  payload: user,
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  payload: users,
});

export const fetchUser = (userId) => async (dispatch) => {
  const userRes = await csrfFetch(`/api/users/${userId}`);
  const userData = await userRes.json();
  dispatch(setCurrentProfile(userData.user));
};

export const fetchUsers = (userIds) => async (dispatch) => {
  let usersRes;
  if (userIds) {
    usersRes = await csrfFetch(`/api/users?userIds=${userIds}`);
    const usersData = await usersRes.json();
    return usersData;
  } else {
    usersRes = await csrfFetch(`/api/users`);
    const usersData = await usersRes.json();
    dispatch(receiveUsers(usersData));
    return usersData;
  }
};

export const updateUser = (user, formData) => async (dispatch) => {
  let userRes;
  if (formData) {
    userRes = await csrfFetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: formData,
    });
  } else {
    userRes = await csrfFetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({ user }),
    });
  }
  const userData = await userRes.json();
  dispatch(setCurrentProfile(userData.user));
  return userData;
};

const userReducer = (previousState = {}, action) => {
  let newState = { ...previousState };
  switch (action.type) {
    case SET_CURRENT_PROFILE:
      newState = { [action.payload.id]: action.payload };
      return newState;
    case RECEIVE_USERS:
      return { ...action.payload };
    case RECEIVE_FRIEND:
      return { ...action.payload.user };
    default:
      return previousState;
  }
};

export default userReducer;
