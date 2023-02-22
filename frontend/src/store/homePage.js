import csrfFetch from "./csrf";
import { addStory } from "./story";
import { receivePosts } from "./post";
import { getSimpleUsers } from "./simpleUsers";

export const homePage = () => async (dispatch) => {
  dispatch(getSimpleUsers());
  const postRes = await csrfFetch(`/api/posts`);
  const postData = await postRes.json();
  const storiesRes = await csrfFetch(`/api/stories?limit=${10}`);
  const storiesData = await storiesRes.json();
  if (!postRes.ok || !storiesRes.ok) {
    return false;
  }
  dispatch(addStory(storiesData));
  dispatch(receivePosts(postData));
  return true;
};
