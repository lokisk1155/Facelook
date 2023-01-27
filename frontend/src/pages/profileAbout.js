import ProfileTop from "../components/ProfilePage/ProfileTop";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AboutPageLinks from "../components/ProfilePage/AboutPage/AboutLinks";
import ContactInfo from "../components/ProfilePage/AboutPage/ContactInfo";
import Overview from "../components/ProfilePage/AboutPage/Overview";
import Relationship from "../components/ProfilePage/AboutPage/UserInformation/EditRelationship";
import WorkEd from "../components/ProfilePage/AboutPage/WorkEd";
import { profilePage } from "../store/profilePage";
import "./profileAbout.css";

function ProfileAbout({ about }) {
  const { id } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friends);

  const noPosts = true;

  useEffect(() => {
    dispatch(profilePage(id, noPosts));
  }, [id]);

  if (!currentUser || !sessionUser || !id) {
    return null;
  }

  return (
    <>
      <ProfileTop
        sessionUser={sessionUser}
        currentUser={currentUser}
        friends={friends}
      />
      <div
        className="about-content-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        <div
          className="about-page-links"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            width: "20%",
            justifyContent: "center",
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
          {about === "Overview" ? (
            <Overview sessionUser={sessionUser} currentUser={currentUser} />
          ) : null}
          {about === "Contact" ? (
            <ContactInfo sessionUser={sessionUser} currentUser={currentUser} />
          ) : null}
          {about === "Relationship" ? (
            <Relationship sessionUser={sessionUser} currentUser={currentUser} />
          ) : null}
          {about === "WorkEd" ? (
            <WorkEd sessionUser={sessionUser} currentUser={currentUser} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ProfileAbout;
