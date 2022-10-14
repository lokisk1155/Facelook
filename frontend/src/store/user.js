import csrfFetch from './csrf';
import { SET_CURRENT_USER } from './session';

export const SET_CURRENT_PROFILE = "users/SET_CURRENT_PROFILE"

export const setCurrentProfile = (user) => {
  return {
    type: SET_CURRENT_PROFILE,
    payload: user
  };
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
  const { id } = user 
  const res = await csrfFetch(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({user})
  })

  const data = await res.json()
  console.log(data, 'data')
  dispatch(setCurrentProfile(data.user))
}


const userReducer = (previousState = {}, action) => {
    let newState = {...previousState}
      switch(action.type) {
        case SET_CURRENT_USER:
          newState = {...previousState, [action.payload.id]: action.payload}
          return newState;
        case SET_CURRENT_PROFILE: 
            newState = {...previousState, [action.payload.id]: action.payload}
            return newState 
        default:
            return previousState
    }
}

export default userReducer