import { Route, useParams } from "react-router-dom";
import ProfileDefault from "../pages/profileDefault";
import ProfileFriends from "../pages/profileFriends";
import ProfileAbout from "../pages/profileAbout";
import NavBar from "../components/NavBar/NavBar";
import GetUserProfile from "../hooks/getUserProfile";
import ProfileTopLoading from "../components/loading/profileTopLoading";
import ProfileDefaultLoading from "../components/loading/profileDefaultLoading";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function ProfilePageRoutes() {
  const { id } = useParams();

  const state = GetUserProfile();

  const currentUser = useSelector((state) => state.user[id]);

  if (!currentUser) {
    return null;
  }
  return (
    <>
      <NavBar />
      {state.loading ? (
        <>
          <ProfileDefault />;
          <Route path="/ProfilePage/:id/friends">
            <ProfileFriends />;
          </Route>
          <Route path="/ProfilePage/:id/about">
            <ProfileAbout />;
          </Route>
        </>
      ) : (
        <>
          <ProfileTopLoading />
          <ProfileDefaultLoading />
        </>
      )}
    </>
  );
}
