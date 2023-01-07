import { Route } from "react-router-dom";
import ProfileDefault from "../pages/profileDefault";
import ProfileFriends from "../pages/profileFriends";
import ProfileAbout from "../pages/profileAbout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileTop from "../components/ProfilePage/ProfileTop";
import { useEffect } from "react";
import { profilePage } from "../store/profilePage";
import AboutPage from "../components/ProfilePage/AboutPage/AboutPage";
import Overview from "../components/ProfilePage/AboutPage/Overview";

export function ProfilePageRoutes() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const currentUser = useSelector((state) => state.user[id]);
  const friends = useSelector((state) => state.friends);

  useEffect(() => {
    dispatch(profilePage(id));
  }, [id]);

  if (!currentUser || !sessionUser || !friends) {
    return null;
  }

  return (
    <>
      <ProfileTop
        sessionUser={sessionUser}
        currentUser={currentUser}
        friends={friends}
      />
      <Route exact path="/ProfilePage/:id" render={() => <ProfileDefault />} />
      <Route
        path="/ProfilePage/:id/friends"
        render={() => <ProfileFriends />}
      />
      <Route
        exact
        path="/ProfilePage/:id/about"
        render={() => <ProfileAbout about={"Overview"} />}
      />
      <Route
        path="/ProfilePage/:id/about/work_and_education"
        render={() => <ProfileAbout about={"WorkEd"} />}
      />
      <Route
        path="/ProfilePage/:id/about/places_lived"
        render={() => <ProfileAbout about={"PlacesLived"} />}
      />
      <Route
        path="/ProfilePage/:id/about/contact_info"
        render={() => <ProfileAbout about={"Contact"} />}
      />
      <Route
        path="/ProfilePage/:id/about/family_and_relationships"
        render={() => <ProfileAbout about={"Relationship"} />}
      />
    </>
  );
}
