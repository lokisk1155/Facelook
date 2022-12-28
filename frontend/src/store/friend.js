import csrfFetch from "./csrf";
import { fetchUser } from "./user";
export const REMOVE_FRIEND = "friends/REMOVE_FRIEND";
export const RECEIVE_FRIEND = "friends/RECEIVE_FRIEND";
export const RECEIVE_FRIENDS = "friends/RECEIVE_FRIENDS";

export const removeFriend = (friendship) => ({
  type: REMOVE_FRIEND,
  friendship,
});
export const receiveFriend = (payload) => ({
  type: RECEIVE_FRIEND,
  payload,
});

export const receiveFriends = (friends) => ({
  type: RECEIVE_FRIENDS,
  payload: friends,
});

export const fetchFriend = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/friends?userId=${userId}`);
  const data = await res.json();
  if (res.ok) {
    dispatch(receiveFriend({ friend: { [data.id]: data } }));
  }
};

export const fetchFriends = (userIds) => async (dispatch) => {
  const res = await csrfFetch(`/api/users?userIds=${userIds}`);
  const data = await res.json();
  dispatch(receiveFriends(data));
};

export const addFriend = (friendRequest) => async (dispatch) => {
  const res = await csrfFetch(`/api/friends`, {
    method: "POST",
    body: JSON.stringify(friendRequest),
  });
  const data = await res.json();
  await dispatch(receiveFriend(data));
  dispatch(fetchUser(friendRequest.receiver_id));
};

export const deleteFriend = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/friends/${userId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  await dispatch(removeFriend(data));
  dispatch(fetchUser(userId));
};

const friendReducer = (previousState = {}, action) => {
  let newState = {};
  switch (action.type) {
    case RECEIVE_FRIEND:
      newState = { ...previousState, ...action.payload.friend };
      return newState;
    case REMOVE_FRIEND:
      newState = { ...previousState };
      delete newState[action.friendship.id];
      return newState;
    case RECEIVE_FRIENDS:
      newState = { ...action.payload };
      return newState;
    default:
      return previousState;
  }
};

export default friendReducer;
