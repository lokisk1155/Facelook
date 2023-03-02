import ProfileTop from "../components/ProfilePage/ProfileTop";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AboutPageLinks from "../components/ProfilePage/AboutPage/AboutLinks";
import ContactInfo from "../components/ProfilePage/AboutPage/ContactInfo";
import Overview from "../components/ProfilePage/AboutPage/Overview";
import Relationship from "../components/ProfilePage/AboutPage/Relationship";
import WorkEd from "../components/ProfilePage/AboutPage/WorkEd";
import { profilePage } from "../store/profilePage";
import "./profileAbout.css";
import ProfileTopLoading from "../components/loading/profileTopLoading";
import { Route } from "react-router-dom";
import GetUserProfile from "../hooks/getUserProfile";

function ProfileAbout() {
  const { id } = useParams();

  const loading = GetUserProfile();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friends);

  return (
    <>
      {loading ? (
        <ProfileTop
          sessionUser={sessionUser}
          currentUser={currentUser}
          friends={friends}
        />
      ) : (
        <ProfileTopLoading />
      )}
      <div
        className="about-content-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="about-page-links"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            width: "20%",
            backgroundColor: "#fff",
            border: "1px solid lightgrey",
            borderRight: "3px solidLightgrey",
            height: "100%",
          }}
        >
          <AboutPageLinks />
        </div>
        <div
          className="about-page-links-results"
          style={{
            backgroundColor: "#fff",
            border: "1px solid lightgrey",

            height: "100%",
          }}
        >
          {" "}
          {loading ? (
            <>
              <Route
                exact
                path="/ProfilePage/:id/about"
                render={() => (
                  <Overview
                    sessionUser={sessionUser}
                    currentUser={currentUser}
                  />
                )}
              />
              <Route
                path="/ProfilePage/:id/about/work_and_education"
                render={() => (
                  <WorkEd sessionUser={sessionUser} currentUser={currentUser} />
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
            </>
          ) : (
            <div
              className="skeleton"
              style={{ height: "400px", width: "80vw", alignSelf: "center" }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileAbout;
