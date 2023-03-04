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

  const [storeHydrated, setStoreHydrated] = useState(null);

  useEffect(() => {
    dispatch(profilePage(id)).then((data) => {
      setTimeout(() => {
        setStoreHydrated(data);
      }, 750);
    });
  }, [dispatch, id]);

  return storeHydrated;
}
