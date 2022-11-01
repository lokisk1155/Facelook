import csrfFetch from './csrf';

export const SET_CURRENT_PROFILE = "users/SET_CURRENT_PROFILE"
export const RECEIVE_USERS = "users/RECEIVE_USERS"

export const setCurrentProfile = (user) => {
  return {
    type: SET_CURRENT_PROFILE,
    payload: user
  };
}

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  payload: users
})

export const fetchUsers = () => async dispatch => {
  const res = await csrfFetch(`api/users`)
  const data = await res.json() 
  dispatch(receiveUsers(data))
}

export const fetchUser = userId => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`)

      const data = await res.json() 
      dispatch(setCurrentProfile(data.user))
}

export const getCurrent = id => state => {
  return state.user[id];
}

export const updateUser = user => async dispatch => {
  const res = await csrfFetch(`/api/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify({user})
  })
  const data = await res.json()
  dispatch(setCurrentProfile(data.user))
  return data
}


const userReducer = (previousState = {}, action) => {
    let newState = {...previousState}
      switch(action.type) {
        case SET_CURRENT_PROFILE: 
            newState = {...previousState, [action.payload.id]: action.payload}
            return newState 
        case RECEIVE_USERS:
            return { ...previousState, ...action.payload};
        default:
            return previousState
    }
}

export default userReducer