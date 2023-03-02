import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addAll, fetchStories } from "../store/story";
import { fetchPosts, receivePosts } from "../store/post";
import { getSimpleUsers, setSimpleUsers } from "../store/simpleUsers";
import { useRef } from "react";

export default function GetHomePage() {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories);
  const posts = useSelector((state) => state.posts);
  const simpleUsers = useSelector((state) => state.simpleUsers);

  const storiesCachedRef = useRef(stories);
  const postsCachedRef = useRef(posts);
  const simpleUsersCachedRef = useRef(simpleUsers);

  useEffect(() => {
    if (!Object.keys(simpleUsersCachedRef.current).length) {
      dispatch(getSimpleUsers()).then((data) => {
        simpleUsersCachedRef.current = data;
      });
    } else {
      dispatch(setSimpleUsers(simpleUsersCachedRef.current));
    }

    if (!Object.keys(postsCachedRef.current).length) {
      dispatch(fetchPosts()).then((data) => {
        postsCachedRef.current = data;
      });
    } else {
      dispatch(receivePosts(postsCachedRef.current));
    }

    if (!Object.keys(storiesCachedRef.current).length) {
      dispatch(fetchStories(10)).then((data) => {
        storiesCachedRef.current = data;
      });
    } else {
      dispatch(addAll(storiesCachedRef.current));
    }
  }, [dispatch]);

  return Object.keys(simpleUsersCachedRef.current).length && Object.keys(postsCachedRef.current).length && Object.keys(storiesCachedRef.current).length ? true : null;
}
