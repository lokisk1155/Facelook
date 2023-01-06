import csrfFetch from "./csrf";

const ADD_STORY = "stories/ADD_STORY";

export const addStory = (story) => ({
  type: ADD_STORY,
  payload: story,
});

export const createStory = (userId) => async (dispatch) => {
  const storyRequest = await csrfFetch(`/api/stories?userId=${userId}`, {
    method: "POST",
  });
  const storyResponse = await storyRequest.json();
  return dispatch(addStory(storyResponse));
};

export const storiesReducer = (previousState = {}, action) => {
  switch (action.type) {
    case ADD_STORY:
      return { ...previousState, [action.payload.id]: action.payload };
    default:
      return previousState;
  }
};
