import csrfFetch from "./csrf";

export const SET_SIMPLE_USERS = "users/SET_SIMPLE_USERS";

export const setSimpleUsers = (users) => ({
  type: SET_SIMPLE_USERS,
  payload: users,
});

export const getUsers = () => async (dispatch) => {
  const res = await csrfFetch(`/api/users`);
  const data = await res.json();
  const filtered = Object.values(data).map((user) => {
    return {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      photo: user.photo,
    };
  });

  dispatch(setSimpleUsers(filtered));
  return data;
};

const simpleUsersReducer = (previousState = {}, action) => {
  let newState = { ...previousState };
  switch (action.type) {
    case SET_SIMPLE_USERS:
      newState = { ...action.payload };
      return newState;
    default:
      return previousState;
  }
};

export default simpleUsersReducer;
