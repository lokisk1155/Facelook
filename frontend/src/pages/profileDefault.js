import ProfileTop from "../components/ProfilePage/ProfileTop";
import Posts from "../components/ProfilePage/Posts";
import { useEffect } from "react";
import { fetchUser } from "../store/user";
import { useLocation, useParams } from "react-router-dom";
import { fetchFriend } from "../store/friend";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../store/friend";
import { useState } from "react";
import Friends from "../components/ProfilePage/Friends";
import { fetchPosts } from "../store/post";
import AboutPage from "../components/ProfilePage/AboutPage/AboutPage";
import ContactInfo from "../components/ProfilePage/AboutPage/ContactInfo";
import Overview from "../components/ProfilePage/AboutPage/Overview";
import PlacesLived from "../components/ProfilePage/AboutPage/PlacesLived";
import Relationship from "../components/ProfilePage/AboutPage/relationship";
import WorkEd from "../components/ProfilePage/AboutPage/WorkEd";
import { fetchUsers } from "../store/user";

function ProfileDefault({ componentName, about }) {

  const location = useLocation()

  const { id } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const [friends, setFriends] = useState(null);

  const [divHeight, setDivHeight] = useState(null);

  const [currentUserName, setCurrentUserName] = useState(null);

  const [notSelf, setNotSelf] = useState(null);



  useEffect(() => {
    Promise.all([
      dispatch(fetchPosts()),
      dispatch(fetchUser(id)),
      dispatch(fetchFriends(id)),
    ]);
    const getData = async () => {
      // await checkFriendCrednetials();
      if (!currentUser) return null 
      const users = await dispatch(
        fetchUsers(Object.values(currentUser.friends))
      );
      setFriends(users);
      if (Object.values(users).length > 2) {
        let dividedLength = Math.floor(Object.values(users).length / 2);
        let divCalc = dividedLength * 125 + 175;
        setDivHeight(`${divCalc}px`);
      } else {
        setDivHeight(`250px`);
      }
    };
    getData();
  }, [id]);

  // console.log(friends, "yooooo");

  return (
    <>
      <ProfileTop
        sessionUser={sessionUser}
        currentUser={currentUser}
        notSelf={notSelf}
      />
      {componentName === "Posts" ? (
        <Posts
          sessionUser={sessionUser}
          currentUser={currentUser}
          friends={friends}
        />
      ) : null}
      {componentName === "Friends" ? (
        <Friends
          sessionUser={sessionUser}
          currentUser={currentUser}
          friends={friends}
          divHeight={divHeight}
        />
      ) : null}
      {componentName === "About" ? (
        <div className="about-page-container">
          <div className="about-page-block">
            <AboutPage />
            {about === "Overview" ? <Overview /> : null}
            {about === "Contact" ? <ContactInfo /> : null}
            {about === "Relationship" ? <Relationship /> : null}
            {about === "PlacesLived" ? <PlacesLived /> : null}
            {about === "WorkEd" ? <WorkEd /> : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ProfileDefault;
