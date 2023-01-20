import csrfFetch from "./csrf";
import { profilePage } from "./profilePage";

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


export const createStory = (story, location, formData) => async (dispatch) => {
  const storyRequest = await csrfFetch(`/api/stories`, {
    method: "POST",
    body: formData instanceof FormData ? formData : JSON.stringify(story),
  });
  const storyResponse = await storyRequest.json();
  if (location === "profile") {
    return dispatch(profilePage(story.user_id));
  }
  return dispatch(addStory(storyResponse));
};

export const fetchStories = (limit) => async (dispatch) => {
  let storiesReq;
  if (limit) {
    storiesReq = await csrfFetch(`/api/stories?limit=${limit}`);
  } else {
    storiesReq = await csrfFetch(`/api/stories`);
  }

  const storiesResponse = await storiesReq.json();
  if (limit) {
    return dispatch(addStory(storiesResponse));
  }
  return dispatch(addAll(storiesResponse.stories));
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


