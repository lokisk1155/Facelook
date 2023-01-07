import { Route } from "react-router-dom";
import ProfileDefault from "../pages/profileDefault";
import ProfileFriends from "../pages/profileFriends";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileTop from "../components/ProfilePage/ProfileTop";
import { useEffect } from "react";
import { profilePage } from "../store/profilePage";
import Overview from "../components/ProfilePage/AboutPage/Overview";
import AboutPage from "../components/ProfilePage/AboutPage/AboutPage";
import ContactInfo from "../components/ProfilePage/AboutPage/ContactInfo";
import PlacesLived from "../components/ProfilePage/AboutPage/PlacesLived";
import Relationship from "../components/ProfilePage/AboutPage/relationship";
import WorkEd from "../components/ProfilePage/AboutPage/WorkEd";

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
      <Route path="/ProfilePage/:id/about">
        <div className="about-page-container">
          <div className="about-page-block">
            <AboutPage />
            <Route
              exact
              path="/ProfilePage/:id/about"
              render={() => (
                <Overview sessionUser={sessionUser} currentUser={currentUser} />
              )}
            />
            <Route
              path="/ProfilePage/:id/about/work_and_education"
              render={() => (
                <WorkEd sessionUser={sessionUser} currentUser={currentUser} />
              )}
            />
            <Route
              path="/ProfilePage/:id/about/places_lived"
              render={() => (
                <PlacesLived
                  sessionUser={sessionUser}
                  currentUser={currentUser}
                />
              )}
            />
            <Route
              path="/ProfilePage/:id/about/contact_info"
              render={() => (
                <ContactInfo
                  sessionUser={sessionUser}
                  currentUser={currentUser}
                />
              )}
            />
            <Route
              path="/ProfilePage/:id/about/family_and_relationships"
              render={() => (
                <Relationship
                  sessionUser={sessionUser}
                  currentUser={currentUser}
                />
              )}
            />
          </div>
        </div>
      </Route>
    </>
  );
}
