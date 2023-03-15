import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { userReceivePosts } from "../store/profilePage";
import { setCurrentProfile } from "../store/user";
import { receiveFriends } from "../store/friend";
import csrfFetch from "../store/csrf";

export default function GetUserProfile() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [storeHydrated, setStoreHydrated] = useState(null);

  useEffect(() => {
    const profilePage = async () => {
      const userRes = await csrfFetch(`/api/users/${id}`);
      const userData = await userRes.json();
      const userIds = Object.values(userData.user.friends);
      const friendsRes = await csrfFetch(`/api/users?userIds=${userIds}`);
      const friendsData = await friendsRes.json();
      const postRes = await csrfFetch(`/api/posts/${id}`);
      const postData = await postRes.json();
      dispatch(userReceivePosts(postData));
      dispatch(setCurrentProfile(userData.user));
      dispatch(receiveFriends(friendsData));
      if (postData && postData && friendsData) {
        return true;
      }
    };
    profilePage().then((storeStatus) => {
      setTimeout(() => {
        setStoreHydrated(storeStatus);
      }, 750);
    });
  }, [dispatch, id]);

  return storeHydrated;
}
