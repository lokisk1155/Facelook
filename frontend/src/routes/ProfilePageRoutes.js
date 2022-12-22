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

export function ProfilePageRoutes() {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/ProfilePage/:id"
          render={() => (
            <>
              <ProfileDefault componentName={"Posts"}/>
            </>
          )}
        />
        <Route
          exact
          path="/ProfilePage/:id/friends"
          render={() => (
            <>
              <ProfileDefault componentName={"Friends"}/>
            </>
          )}
        />
        <Route
          exact
          path="/ProfilePage/:id/about"
          render={() => (
            <>
              <ProfileDefault componentName={"About"} about={"Overview"}/>
            </>
          )}
        />
        <Route
          exact
          path="/ProfilePage/:id/about/work_and_education"
          render={() => (
            <>
               <ProfileDefault componentName={"About"} about={"WorkEd"}/>
            </>
          )}
        />
        <Route
          exact
          path="/ProfilePage/:id/about/places_lived"
          render={() => (
            <>
               <ProfileDefault componentName={"About"} about={"PlacesLived"}/>
            </>
          )}
        />
        <Route
          exact
          path="/ProfilePage/:id/about/contact_info"
          render={() => (
            <>
               <ProfileDefault componentName={"About"} about={"Contact"}/>
            </>
          )}
        />
        <Route
          exact
          path="/ProfilePage/:id/about/family_and_relationships"
          render={() => (
            <>
               <ProfileDefault componentName={"About"} about={"Relationship"}/>
            </>
          )}
        />
      </Switch>
    </>
  );
}
