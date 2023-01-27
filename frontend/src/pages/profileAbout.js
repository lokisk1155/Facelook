import ProfileTop from "../components/ProfilePage/ProfileTop";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AboutPage from "../components/ProfilePage/AboutPage/AboutPage";
import ContactInfo from "../components/ProfilePage/AboutPage/ContactInfo";
import Overview from "../components/ProfilePage/AboutPage/Overview";
import Relationship from "../components/ProfilePage/AboutPage/relationship";
import WorkEd from "../components/ProfilePage/AboutPage/WorkEd";
import { profilePage } from "../store/profilePage";

function ProfileAbout({ about }) {
  const { id } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friends);

  const noPosts = true;

  const noFriends = true;

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
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          height: "25vw",
          marginTop: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            width: "20%",
            height: "100%",
            justifyContent: "center",
            backgroundColor: "#fff",
            border: "1px solid lightgrey",
            borderRight: "3px solidLightgrey",
          }}
        >
          <AboutPage />
        </div>
        <div
          style={{
            width: "40%",
            backgroundColor: "#fff",
            border: "1px solid lightgrey",
            display: "flex",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
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
