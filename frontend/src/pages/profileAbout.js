import AboutPage from "../components/ProfilePage/AboutPage/AboutPage";
import ContactInfo from "../components/ProfilePage/AboutPage/ContactInfo";
import Overview from "../components/ProfilePage/AboutPage/Overview";
import PlacesLived from "../components/ProfilePage/AboutPage/PlacesLived";
import Relationship from "../components/ProfilePage/AboutPage/relationship";
import WorkEd from "../components/ProfilePage/AboutPage/WorkEd";
import { Route } from "react-router-dom";

function ProfileAbout({ currentUser, sessionUser }) {
  return (
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
            <PlacesLived sessionUser={sessionUser} currentUser={currentUser} />
          )}
        />
        <Route
          path="/ProfilePage/:id/about/contact_info"
          render={() => (
            <ContactInfo sessionUser={sessionUser} currentUser={currentUser} />
          )}
        />
        <Route
          path="/ProfilePage/:id/about/family_and_relationships"
          render={() => (
            <Relationship sessionUser={sessionUser} currentUser={currentUser} />
          )}
        />
      </div>
    </div>
  );
}

export default ProfileAbout;
