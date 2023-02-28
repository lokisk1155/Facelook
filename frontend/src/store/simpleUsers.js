import csrfFetch from "./csrf";

export const SET_SIMPLE_USERS = "users/SET_SIMPLE_USERS";

export const setSimpleUsers = (users) => ({
  type: SET_SIMPLE_USERS,
  payload: users,
});

export const getSimpleUsers = () => async (dispatch) => {
  const res = await csrfFetch("/api/users");
  const data = await res.json();
  const simpleUsers = {};
  for (const key in data) {
    const user = data[key];
    simpleUsers[user.id] = {
      user_id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      profile_picture: user.profile_picture,
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

const cachedData = localStorage.getItem("simpleUsers");

// if (cachedData) {
//   const parsedData = JSON.parse(cachedData);
//   const simpleUsers = {};
//   for (const key in parsedData) {
//     const user = parsedData[key];
//     const user_id = window.atob(user.user_id);
//     simpleUsers[user_id] = {
//       user_id: parseInt(user_id),
//       name: user.name,
//       profile_picture: user.profile_picture,
//     };
//   }
//   return dispatch(setSimpleUsers(simpleUsers));
// }
// const encryptedData = JSON.stringify(simpleUsers);
// localStorage.setItem("simpleUsers", encryptedData);
// setTimeout(() => {
//   localStorage.removeItem("simpleUsers");
// }, 10 * 60 * 500);
