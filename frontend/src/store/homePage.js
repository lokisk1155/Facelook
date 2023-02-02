import csrfFetch from "./csrf";
import { addStory } from "./story";
import { receivePosts } from "./post";

export const homePage = () => async (dispatch) => {
  const postRes = await csrfFetch(`/api/posts?limit=${10}`);
  const postData = await postRes.json();
  const storiesRes = await csrfFetch(`/api/stories?limit=${3}`);
  const storiesData = await storiesRes.json();
  if (!postRes.ok || !storiesRes.ok) {
    return false;
  }
  dispatch(addStory(storiesData));
  dispatch(receivePosts(postData));
  return true;
};
