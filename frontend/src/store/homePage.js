import csrfFetch from "./csrf";
import { addStory } from "./story";
import { receivePosts } from "./post";
import { getSimpleUsers } from "./simpleUsers";

export const homePage = (getStories, getPosts, getUsers) => async (dispatch) => {
  console.log(getStories, getPosts, getUsers)
  let postRes = false 
  let postData = false
  let storiesRes = false
  let storiesData = false 
  let simpleUsers = false
  if (getUsers) {
    dispatch(getSimpleUsers());
    simpleUsers = true 
  }
  if (getPosts) {
    postRes = await csrfFetch(`/api/posts`);
    postData = await postRes.json();
  }

  if (getStories) {
    storiesRes = await csrfFetch(`/api/stories?limit=${10}`);
    storiesData = await storiesRes.json();
  }

  dispatch(addStory(storiesData));
  dispatch(receivePosts(postData));
  const cashedResults = {
    stories: getStories ? storiesRes : true,
    posts: getPosts ? postRes : true,
    users:  getUsers ? simpleUsers : true,
  }
  return cashedResults
};
