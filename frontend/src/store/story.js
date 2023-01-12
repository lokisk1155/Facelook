import csrfFetch from "./csrf";
import { profilePage } from "./profilePage";

const ADD_STORY = "stories/ADD_STORY";

export const addStory = (story) => ({
  type: ADD_STORY,
  payload: story,
});

export const createStory =
  (story, userId, location, formData) => async (dispatch) => {
    const storyRequest = await csrfFetch(`/api/stories?userId=${userId}`, {
      method: "POST",
      body: formData instanceof FormData ? formData : JSON.stringify(story),
    });
    const storyResponse = await storyRequest.json();
    if (location === "profile") {
      return dispatch(profilePage(userId));
    }
    return dispatch(addStory(storyResponse));
  };

export const storiesReducer = (previousState = {}, action) => {
  switch (action.type) {
    case ADD_STORY:
      return { [action.payload.id]: action.payload };
    default:
      return previousState;
  }
};
