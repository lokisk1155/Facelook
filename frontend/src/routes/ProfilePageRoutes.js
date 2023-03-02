import { Switch, Route } from "react-router-dom";
import ProfileDefault from "../pages/profileDefault";
import ProfileFriends from "../pages/profileFriends";
import ProfileAbout from "../pages/profileAbout";
import NavBar from "../components/NavBar/NavBar";

export function ProfilePageRoutes() {
  return (
    <>
      <NavBar />
      <Route exact path="/ProfilePage/:id" render={() => <ProfileDefault />} />
      <Route
        path="/ProfilePage/:id/friends"
        render={() => <ProfileFriends />}
      />
      <Route path="/ProfilePage/:id/about">
        <ProfileAbout />
      </Route>
    </>
  );
}
