import csrfFetch from "./csrf";
import { receiveFriends, RECEIVE_FRIEND, REMOVE_FRIEND } from "./friend";

export const SET_CURRENT_PROFILE = "users/SET_CURRENT_PROFILE";
export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const SET_CURRENT_ARRAY = "users/SET_CURRENT_ARRAY";

export const setCurrentProfile = (user) => {
  return {
    type: SET_CURRENT_PROFILE,
    payload: user,
  };
};

export const setCurrentArray = (user) => {
  return {
    type: SET_CURRENT_ARRAY,
    payload: user,
  };
};

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  payload: users,
});

export const fetchUsers = (userIds) => async (dispatch) => {
  let res;
  if (userIds) {
    res = await csrfFetch(`/api/users?userIds=${userIds}`)
    const data = await res.json();
    return data 
  } else {  
    res = await csrfFetch(`/api/users`);
    const data = await res.json();
    dispatch(receiveUsers(data));
    return data
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}`);

  const data = await res.json();
  dispatch(setCurrentProfile(data.user));
};

export const getCurrent = (id) => (state) => {
  return state.user[id];
};

export const updateUser = (user) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify({ user }),
  });
  const data = await res.json();
  dispatch(setCurrentProfile(data.user));
  return data;
};

export const updateUserArray = (user) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify({ user }),
  });
  const data = await res.json();
  dispatch(setCurrentArray(data.user));
  return data;
};

const userReducer = (previousState = {}, action) => {
  let newState = { ...previousState };
  switch (action.type) {
    case SET_CURRENT_PROFILE:
      newState = { [action.payload.id]: action.payload };
      return newState;
    case SET_CURRENT_ARRAY:
      newState = { ...previousState, [action.payload.id]: action.payload };
      return newState;
    case RECEIVE_USERS:
      return { ...previousState, ...action.payload };
    case RECEIVE_FRIEND:
      return { ...previousState, ...action.payload.user };
    default:
      return previousState;
  }
};

export default userReducer;
