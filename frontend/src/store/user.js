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
  const res = await csrfFetch(`/api/users/${userId}`);
  const data = await res.json();
  dispatch(setCurrentProfile(data.user));
};

export const fetchUsers = (userIds) => async (dispatch) => {
  let res;
  if (userIds) {
    res = await csrfFetch(`/api/users?userIds=${userIds}`);
    const data = await res.json();
    return data;
  } else {
    res = await csrfFetch(`/api/users`);
    const data = await res.json();
    dispatch(receiveUsers(data));
    return data;
  }
};

export const updateUser = (user, formData) => async (dispatch) => {
  let res;
  if (formData) {
    res = await csrfFetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: formData,
    });
  } else {
    res = await csrfFetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({ user }),
    });
  }
  const data = await res.json();
  dispatch(setCurrentProfile(data.user));
  return data;
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
