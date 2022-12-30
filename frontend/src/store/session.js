import csrfFetch from "./csrf";

export const SET_CURRENT_USER = "session/setCurrentUser";
export const REMOVE_CURRENT_USER = "session/removeCurrentUser";

export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    payload: user,
});

const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER,
});

const storeCSRFToken = (response) => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
};

const storeCurrentUser = (user) => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
};

export const login =
  ({ credential, password }) =>
  async (dispatch) => {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password }),
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
  };

export const logout = () => async (dispatch) => {
  const res = await csrfFetch("/api/session", { method: "DELETE" });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return res;
};

export const signup = (user) => async (dispatch) => {
  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ user }),
  });
  const data = await res.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return res;
};

export const restoreSession = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser")),
};

const sessionReducer = (previousState = initialState, action) => {
  let newState = { ...previousState };
  switch (action.type) {
    case SET_CURRENT_USER:
      newState = { ...previousState, user: action.payload };
      return newState;
    case REMOVE_CURRENT_USER:
      newState = { ...previousState, user: null };
      return newState;
    default:
      return previousState;
  }
};

export default sessionReducer;
