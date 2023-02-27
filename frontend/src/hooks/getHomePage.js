import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchStories } from "../store/story";
import { fetchPosts } from "../store/post";
import { getSimpleUsers } from "../store/simpleUsers";

export default function GetHomePage() {
  const dispatch = useDispatch();

  const storiesData = useSelector((state) => state.stories);

  const postsData = useSelector((state) => state.posts);

  const simpleUsersData = useSelector((state) => state.simpleUsers);

  const [cashedData, setCashedData] = useState(null);

  useEffect(() => {
    let dataFetched = false;
    if (!Object.keys(storiesData).length) {
      dispatch(fetchStories(10));
      dataFetched = true;
    }

    if (!Object.keys(postsData).length) {
      dispatch(fetchPosts());
      dataFetched = true;
    }

    if (!Object.keys(simpleUsersData).length) {
      dispatch(getSimpleUsers());
      dataFetched = true;
    }
    if (dataFetched) {
      setTimeout(() => {
        setCashedData(true);
      }, 1000);
    } else {
      setCashedData(true);
    }
  }, [dispatch, storiesData, postsData, simpleUsersData, cashedData]);

  return cashedData;
}
