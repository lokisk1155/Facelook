import React from "react";
import { homePage } from "../store/homePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchStories } from "../store/story";
import { fetchPosts } from "../store/post";
import { getSimpleUsers } from "../store/simpleUsers";

export default function GetHomePage() {
  const dispatch = useDispatch();

  const storiesData = useSelector((state) => state.stories)

  const postsData = useSelector((state) => state.posts)

  const simpleUsersData = useSelector((state) => state.simpleUsers)

  const [cashedData, setCashedData] = useState(null);

  useEffect(() => {
    if (!Object.keys(storiesData).length) {
      dispatch(fetchStories(10))
    }

    if (!Object.keys(postsData).length) {
      dispatch(fetchPosts())
    }

    if (!Object.keys(simpleUsersData).length) {
      dispatch(getSimpleUsers())
    }

    setTimeout(() => {
      setCashedData(true)
    }, 750)
  }, [dispatch]);

  return cashedData;
}
