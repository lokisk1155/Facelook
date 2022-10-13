import csrfFetch from './csrf';

export const SET_CURRENT_PROFILE = "users/SET_CURRENT_PROFILE"

export const setCurrentProfile = (user) => ({
      type: SET_CURRENT_PROFILE,
      user
})

export const fetchUser = userId => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`)
  
      const user = await res.json() 
      dispatch(setCurrentProfile(user))
}


const userReducer = (previousState = {}, action) => {
    let newState = {...previousState}
      switch(action.type) {
        case SET_CURRENT_PROFILE: 
            newState = action.user
            return newState 
        default:
            return previousState
    }
}

export default userReducer