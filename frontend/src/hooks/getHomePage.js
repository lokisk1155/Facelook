import React from "react";
import { homePage } from "../store/homePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function GetHomePage() {
  const dispatch = useDispatch();

  const [storiesData, setStoriesData] = useState(null);

  const [postsData, setPostsData] = useState(null);

  const [simpleUsersData, setSimpleUsersData] = useState(null);

  const [cashedData, setCashedData] = useState(null);

  useEffect(() => {
    let getStories = false;
    let getPosts = false;
    let getUsers = false;
    if (!storiesData) {
      getStories = true;
    }

    if (!postsData) {
      getPosts = true;
    }

    if (!simpleUsersData) {
      getUsers = true;
    }
    dispatch(homePage(getStories, getPosts, getUsers)).then((data) => {
      const { stories, posts, users } = data;
      console.log(data);
      if (stories.ok) {
        setStoriesData(true);
      } else {
        setStoriesData(null);
      }

      if (posts.ok) {
        setPostsData(true);
      } else {
        setPostsData(false);
      }

      if (users) {
        setSimpleUsersData(true);
      }
      {
        setSimpleUsersData(false);
      }

      if (stories.ok && posts.ok && users) {
        setCashedData(true);
      } else {
        setCashedData(null);
      }
    });
  }, [dispatch]);

  return [cashedData, setCashedData];
}
