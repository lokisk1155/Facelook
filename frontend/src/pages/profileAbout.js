import ProfileTop from "../components/ProfilePage/ProfileTop";
import { useEffect } from "react";
import { fetchUser } from "../store/user";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AboutPage from "../components/ProfilePage/AboutPage/AboutPage";
import ContactInfo from "../components/ProfilePage/AboutPage/ContactInfo";
import Overview from "../components/ProfilePage/AboutPage/Overview";
import PlacesLived from "../components/ProfilePage/AboutPage/PlacesLived";
import Relationship from "../components/ProfilePage/AboutPage/relationship";
import WorkEd from "../components/ProfilePage/AboutPage/WorkEd";

function ProfileAbout({ about }) {
  const { id } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [id]);

  if (!currentUser) return null 

  return (
    <>
      <ProfileTop sessionUser={sessionUser} currentUser={currentUser} />
      <div className="about-page-container">
        <div className="about-page-block">
          <AboutPage />
          {about === "Overview" ? (
            <Overview sessionUser={sessionUser} currentUser={currentUser} />
          ) : null}
          {about === "Contact" ? (
            <ContactInfo sessionUser={sessionUser} currentUser={currentUser} />
          ) : null}
          {about === "Relationship" ? (
            <Relationship sessionUser={sessionUser} currentUser={currentUser} />
          ) : null}
          {about === "PlacesLived" ? (
            <PlacesLived sessionUser={sessionUser} currentUser={currentUser} />
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
