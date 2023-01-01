import csrfFetch from "./csrf";
import { profilePage } from "./profilePage";

export const REMOVE_FRIEND = "friends/REMOVE_FRIEND";
export const RECEIVE_FRIEND = "friends/RECEIVE_FRIEND";
export const RECEIVE_FRIENDS = "friends/RECEIVE_FRIENDS";

export const removeFriend = (friendship) => ({
  type: REMOVE_FRIEND,
  friendship,
});
export const receiveFriend = (friend) => ({
  type: RECEIVE_FRIEND,
  payload: friend,
});

export const receiveFriends = (friends) => ({
  type: RECEIVE_FRIENDS,
  payload: friends,
});

export const fetchFriend = (userId) => async (dispatch) => {
  const friendRes = await csrfFetch(`/api/friends?userId=${userId}`);
  const friendData = await friendRes.json();
  dispatch(receiveFriend({ friend: { [friendData.id]: friendData } }));
};

export const fetchFriends = (userIds) => async (dispatch) => {
  const friendsRes = await csrfFetch(`/api/users?userIds=${userIds}`);
  const friendsData = await friendsRes.json();
  dispatch(receiveFriends(friendsData));
};

export const addFriend = (friendRequest) => async (dispatch) => {
  const friendRes = await csrfFetch(`/api/friends`, {
    method: "POST",
    body: JSON.stringify(friendRequest),
  });
  const friendData = await friendRes.json();
  return dispatch(profilePage(friendRequest.receiver_id));
};

export const deleteFriend = (userId) => async (dispatch) => {
  await csrfFetch(`/api/friends/${userId}`, { method: "DELETE" });
  dispatch(removeFriend(userId))
};

const friendReducer = (previousState = {}, action) => {
  let newState = { ...previousState };
  switch (action.type) {
    case RECEIVE_FRIEND:
      newState = { ...action.friend };
      return newState;
    case REMOVE_FRIEND:
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
