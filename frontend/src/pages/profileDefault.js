import ProfileTop from "../components/ProfilePage/ProfileTop";
import Posts from "../components/ProfilePage/Posts";
import { useEffect } from "react";
import { fetchUser } from "../store/user";
import { useLocation, useParams } from "react-router-dom";
import { fetchFriend } from "../store/friend";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../store/friend";
import { useState } from "react";
import Friends from "../components/ProfilePage/Friends";
import { fetchPosts } from "../store/post";
import AboutPage from "../components/ProfilePage/AboutPage/AboutPage";
import ContactInfo from "../components/ProfilePage/AboutPage/ContactInfo";
import Overview from "../components/ProfilePage/AboutPage/Overview";
import PlacesLived from "../components/ProfilePage/AboutPage/PlacesLived";
import Relationship from "../components/ProfilePage/AboutPage/relationship";
import WorkEd from "../components/ProfilePage/AboutPage/WorkEd";
import { fetchUsers } from "../store/user";

function ProfileDefault() {
  const location = useLocation();

  const { id } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friend);

  useEffect(() => {
    Promise.all([dispatch(fetchPosts()), dispatch(fetchUser(id))]);
  }, [id]);

  if (!currentUser) {
    return null;
  }
  if (Object.keys(currentUser.friends).length !== Object.keys(friends).length) {
    dispatch(fetchFriends(Object.values(currentUser.friends)));
  }

  return (
    <>
      <ProfileTop
        sessionUser={sessionUser}
        currentUser={currentUser}
      />
        <Posts
          sessionUser={sessionUser}
          currentUser={currentUser}
          friends={friends}
        />
    </>
  );
}

export default ProfileDefault;
