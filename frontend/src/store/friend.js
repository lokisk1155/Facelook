import csrfFetch from "./csrf";
import { UpdateSessionUser } from "./session";
import { updateUserFriends } from "./user";

export const REMOVE_FRIEND = "friends/REMOVE_FRIEND";
export const RECEIVE_FRIEND = "friends/RECEIVE_FRIEND";
export const RECEIVE_FRIENDS = "friends/RECEIVE_FRIENDS";

export const removeFriend = (friendId) => ({
  type: REMOVE_FRIEND,
  payload: friendId,
});
export const receiveFriend = (friend) => ({
  type: RECEIVE_FRIEND,
  payload: friend,
});

export const receiveFriends = (friends) => ({
  type: RECEIVE_FRIENDS,
  payload: friends,
});

export const fetchFriends = async (userIds) => {
  const friendsRes = await csrfFetch(`/api/users?userIds=${userIds}`);
  const friendsData = await friendsRes.json();
  return friendsData;
};

export const addFriend =
  (friendRequest, sessionUser, notProfilePage) => async (dispatch) => {
    await csrfFetch(`/api/friends`, {
      method: "POST",
      body: JSON.stringify(friendRequest),
    });
    if (notProfilePage) {
      return dispatch(UpdateSessionUser(sessionUser.id));
    } else {
      dispatch(receiveFriend(sessionUser));
      dispatch(updateUserFriends(friendRequest.receiver_id));
    }
  };

export const deleteFriend =
  (friendId, sessionUserId, paramsId) => async (dispatch) => {
    await csrfFetch(`/api/friends/${friendId}`, { method: "DELETE" });
    if (parseInt(paramsId) === sessionUserId) {
      dispatch(removeFriend(friendId));
    } else {
      dispatch(removeFriend(sessionUserId));
    }
  };

const friendReducer = (previousState = {}, action) => {
  let newState = { ...previousState };
  switch (action.type) {
    case RECEIVE_FRIEND:
      return { ...previousState, [action.payload.id]: action.payload };
    case REMOVE_FRIEND:
      delete newState[action.payload];
      return newState;
    case RECEIVE_FRIENDS:
      newState = { ...action.payload };
      return newState;
    default:
      return previousState;
  }
};

export default friendReducer;
