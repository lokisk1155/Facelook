import csrfFetch from "./csrf";
import { profilePage } from "./profilePage";

const ADD_STORY = "stories/ADD_STORY";

export const addStory = (story) => ({
  type: ADD_STORY,
  payload: story,
});

export const createStory =
  (story, location, formData) => async (dispatch) => {
    const storyRequest = await csrfFetch(`/api/stories?userId=${story.user_id}`, {
      method: "POST",
      body: formData instanceof FormData ? formData : JSON.stringify(story),
    });
    const storyResponse = await storyRequest.json();
    if (location === "profile") {
      return dispatch(profilePage(story.user_id));
    }
    return dispatch(addStory(storyResponse));
  };

export const fetchStories = () => async (dispatch) => {
  const stories = await csrfFetch("/api/stories");
  const storiesResponse = await stories.json();
  return dispatch(addStory(storiesResponse));
};

export const storiesReducer = (previousState = {}, action) => {
  switch (action.type) {
    case ADD_STORY:
      return { ...previousState, [action.payload.id]: action.payload };
    default:
      return previousState;
  }
};
