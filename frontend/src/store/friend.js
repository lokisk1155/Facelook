import csrfFetch from './csrf';
export const REMOVE_FRIEND = "friends/REMOVE_FRIEND";
export const RECEIVE_FRIEND = "friends/RECEIVE_FRIEND";

export const removeFriend = (friendship) => ({
    type: REMOVE_FRIEND,
    friendship  
})
export const receiveFriend = payload => ({
    type: RECEIVE_FRIEND,
    payload
});

export const fetchFriend = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/friends?userId=${userId}`);
    const data = await res.json();
    if (res.ok) {
        dispatch(receiveFriend({friend: { [data.id]: data }}));
    }
};

export const fetchFriends = (id) => async dispatch => {
    const res = await csrfFetch(`/api/friends`)
}

export const addFriend = (friendRequest) => async dispatch => {
    const res = await csrfFetch(`/api/friends`, {
        method: "POST",
        body: JSON.stringify(friendRequest)
    })
    const data = await res.json()
    dispatch(receiveFriend(data))
}
  
  export const deleteFriend = (friendshipId) => async dispatch => {
    const res = await csrfFetch(`/api/friends/${friendshipId}`, {
        method: "DELETE"
    });
    const data = await res.json();

    dispatch(removeFriend(data));
}

const friendReducer = (previousState = {}, action) => {
    let newState = {...previousState}
    switch (action.type) {
        case RECEIVE_FRIEND:
            return { ...previousState, ...action.payload.friend};
        case REMOVE_FRIEND:
            delete newState[action.friendship.id];
            return newState;
        default:
            return previousState;
    }
}

export default friendReducer;