import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { profilePage, profilePagePosts } from "../store/profilePage";
import { useParams } from "react-router-dom";
import { fetchUser, setCurrentProfile } from "../store/user";
import { receivePosts } from "../store/post";
import { useState } from "react";

export default function GetUserProfile() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);

  const currentUserState = useSelector((state) => state.user[id])

  const postsCachedRef = useRef(posts);

  const currentUserCachedRef = useRef(currentUserState);

  useEffect(() => {
    if (!currentUserState) {
      dispatch(fetchUser(id)).then((data) => {
        currentUserCachedRef.current = data; 
      });
    } else {
        dispatch(setCurrentProfile(currentUserCachedRef.current))
    }

    if (!Object.keys(postsCachedRef.current).length) {
      dispatch(profilePagePosts()).then((data) => {
        postsCachedRef.current = data;
      });
    } else {
      dispatch(receivePosts(postsCachedRef.current));
    }
  }, [dispatch]);

  return postsCachedRef && currentUserCachedRef ? true : false 
}