import csrfFetch from "./csrf";

export const SET_CURRENT_PROFILE = "users/SET_CURRENT_PROFILE";
export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const UPDATE_USER = "users/UPDATE_USER";

export const setCurrentProfile = (user) => ({
  type: SET_CURRENT_PROFILE,
  payload: user,
});
export const fetchUser = async (id) => {
  const userRes = await csrfFetch(`/api/users/${id}`);
  const userData = await userRes.json();
  return userData.user;
};
export const updateUser =
  (user, formData, NotProfilePage) => async (dispatch) => {
    const id = user?.id ? user.id : user;
    let postRes;
    if (formData) {
      postRes = await csrfFetch(`/api/users/${id}`, {
        method: "PUT",
        body: formData,
      });
    } else {
      postRes = await csrfFetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({ user }),
      });
    }
    const userData = await postRes.json();
    if (NotProfilePage) {
      return userData;
    }
    dispatch(setCurrentProfile(userData.user));
    return userData;
  };

export const updateUserFriends = (userId) => async (dispatch) => {
  const userRes = await csrfFetch(`/api/users/${userId}`);
  const userData = await userRes.json();
  dispatch(setCurrentProfile(userData.user));
};

const userReducer = (previousState = {}, action) => {
  let newState = { ...previousState };
  switch (action.type) {
    case SET_CURRENT_PROFILE:
      newState = { [action.payload.id]: action.payload };
      return newState;
    default:
      return previousState;
  }
};

export default userReducer;
