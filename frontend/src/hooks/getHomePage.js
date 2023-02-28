import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addAll, fetchStories } from "../store/story";
import { fetchPosts, receivePosts } from "../store/post";
import { getSimpleUsers, setSimpleUsers } from "../store/simpleUsers";

export default function GetHomePage() {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories);
  const posts = useSelector((state) => state.posts);
  const simpleUsers = useSelector((state) => state.simpleUsers);
  const [storiesCached, setStoriesCached] = useState(stories);
  const [postsCached, setPostsCached] = useState(posts);
  const [simpleUsersCached, setSimpleUsersCached] = useState(simpleUsers);

  const [cashedData, setCashedData] = useState(null);

  useEffect(() => {
    let dataFetched = false;
    if (!Object.keys(simpleUsersCached).length) {
      dispatch(getSimpleUsers()).then((data) => setSimpleUsersCached(data));
      dataFetched = true;
    } else {
      setSimpleUsers(simpleUsersCached);
    }

    if (!Object.keys(postsCached).length) {
      dispatch(fetchPosts()).then((data) => setPostsCached(data));
      dataFetched = true;
    } else {
      receivePosts(postsCached);
    }

    if (!Object.keys(storiesCached).length) {
      dispatch(fetchStories(10)).then((data) => setStoriesCached(data));
      dataFetched = true;
    } else {
      addAll(storiesCached);
    }

    if (dataFetched) {
      setTimeout(() => {
        setCashedData(true);
      }, 1000);
    } else {
      setCashedData(true);
    }
  }, []);

  return cashedData;
}
