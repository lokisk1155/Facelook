import csrfFetch from "./csrf";

const ADD_STORY = "stories/ADD_STORY";

const ADD_ALL = "stories/ADD_ALL";

export const addStory = (story) => ({
  type: ADD_STORY,
  payload: story,
});

export const addAll = (stories) => ({
  type: ADD_ALL,
  payload: stories,
});

export const createStory = (story, formData) => async (dispatch) => {
  await csrfFetch(`/api/stories`, {
    method: "POST",
    body: formData instanceof FormData ? formData : JSON.stringify(story),
  });
};

export const fetchStories = (limit) => async (dispatch) => {
  let storiesReq;
  if (limit) {
    storiesReq = await csrfFetch(`/api/stories?limit=${limit}`);
  } else {
    storiesReq = await csrfFetch(`/api/stories`);
  }

  const storiesData = await storiesReq.json();
  if (limit) {
    return dispatch(addStory(storiesData));
  }
  return dispatch(addAll(storiesData.stories));
};

export const storiesReducer = (previousState = {}, action) => {
  switch (action.type) {
    case ADD_ALL:
      return action.payload;
    case ADD_STORY:
      return { ...action.payload };
    default:
      return previousState;
  }
};
