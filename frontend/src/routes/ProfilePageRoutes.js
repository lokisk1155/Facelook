import { Switch, Route } from "react-router-dom";
import AboutPage from "../components/ProfilePage/AboutPage/AboutPage";
import ProfileTop from "../components/ProfilePage/ProfileTop";
import Overview from "../components/ProfilePage/AboutPage/Overview";
import WorkEd from "../components/ProfilePage/AboutPage/WorkEd";
import PlacesLived from "../components/ProfilePage/AboutPage/PlacesLived";
import ContactInfo from "../components/ProfilePage/AboutPage/ContactInfo";
import Relationship from "../components/ProfilePage/AboutPage/relationship";
import "./routeStyling.css";
import ProfileDefault from "../pages/profileDefault";
import ProfileFriends from "../pages/profileFriends";
import ProfileAbout from "../pages/profileAbout";

export function ProfilePageRoutes() {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/ProfilePage/:id"
          render={() => (
            <>
              <ProfileDefault />
            </>
          )}
        />
        <Route
          exact
          path="/ProfilePage/:id/friends"
          render={() => (
            <>
              <ProfileFriends />
            </>
          )}
        />
        <Route
          exact
          path="/ProfilePage/:id/about"
          render={() => (
            <>
              <ProfileAbout about={"Overview"} />
            </>
          )}
        />
        <Route
          exact
          path="/ProfilePage/:id/about/work_and_education"
          render={() => (
            <>
              <ProfileAbout about={"WorkEd"} />
            </>
          )}
        />
        <Route
          exact
          path="/ProfilePage/:id/about/places_lived"
          render={() => (
            <>
              <ProfileAbout about={"PlacesLived"} />
            </>
          )}
        />
        <Route
          exact
          path="/ProfilePage/:id/about/contact_info"
          render={() => (
            <>
              <ProfileAbout about={"Contact"} />
            </>
          )}
        />
        <Route
          exact
          path="/ProfilePage/:id/about/family_and_relationships"
          render={() => (
            <>
              <ProfileAbout about={"Relationship"} />
            </>
          )}
        />
      </Switch>
    </>
  );
}
