import { Route, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDefaultLoading from "../components/loading/profileDefaultLoading";
import ProfileTopLoading from "../components/loading/profileTopLoading";
import GetUserProfile from "../hooks/getUserProfile";
import ProfileDefault from "../pages/profileDefault";
import ProfileFriends from "../pages/profileFriends";
import ProfileAbout from "../pages/profileAbout";
import NavBar from "../components/NavBar/NavBar";

export function ProfilePageRoutes() {
  const { id } = useParams();

  const state = GetUserProfile();

  const currentUser = useSelector((state) => state.user[id]);

  if (currentUser === undefined) {
    return null;
  }

  return (
    <>
      <NavBar />
      {state ? (
        <>
          <Route exact path="/ProfilePage/:id">
            <ProfileDefault />;
          </Route>
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
