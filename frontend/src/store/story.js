import csrfFetch from "./csrf";

const ADD_ALL = "stories/ADD_ALL";

export const addAll = (stories) => ({
  type: ADD_ALL,
  payload: stories,
});

export const createStory = (story, formData) => async (dispatch) => {
  const storyReq = await csrfFetch(`/api/stories`, {
    method: "POST",
    body: formData instanceof FormData ? formData : JSON.stringify(story),
  });
  const storiesData = await storyReq.json();
  return storiesData;
};

export const fetchStories = (limit) => async (dispatch) => {
  const storiesReq = await csrfFetch(
    `/api/stories${limit ? `?limit=${limit}` : ""}`
  );
  const storiesData = await storiesReq.json();
  dispatch(addAll(storiesData));
  return storiesData;
};

export const storiesReducer = (previousState = {}, action) => {
  switch (action.type) {
    case ADD_ALL:
      return { ...previousState, ...action.payload };
    default:
      return previousState;
  }
};
