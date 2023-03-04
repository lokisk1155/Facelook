import { Route } from "react-router-dom";
import ProfileDefault from "../pages/profileDefault";
import ProfileFriends from "../pages/profileFriends";
import ProfileAbout from "../pages/profileAbout";
import NavBar from "../components/NavBar/NavBar";
import GetUserProfile from "../hooks/getUserProfile";
import ProfileTopLoading from "../components/loading/profileTopLoading";
import ProfileDefaultLoading from "../components/loading/profileDefaultLoading";

export function ProfilePageRoutes() {
  const loading = GetUserProfile();
  return (
    <>
      <NavBar />
      {loading ? (
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
