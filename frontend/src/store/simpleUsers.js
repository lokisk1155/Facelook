import csrfFetch from "./csrf";

export const SET_SIMPLE_USERS = "users/SET_SIMPLE_USERS";

export const setSimpleUsers = (users) => ({
  type: SET_SIMPLE_USERS,
  payload: users,
});

export const getUsers = () => async (dispatch) => {
  const res = await csrfFetch(`/api/users`);
  const data = await res.json();
  const simpleUsers = {};
  for (const key in data) {
    simpleUsers[data[key].id] = {
      user_id: data[key].id,
      name: `${data[key].first_name} ${data[key].last_name}`,
      photo: data[key].photo,
    };
  }
  dispatch(setSimpleUsers(simpleUsers));
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
