import ProfileTop from "../components/ProfilePage/ProfileTop";
import Posts from "../components/ProfilePage/Posts";
import { useEffect } from "react";
import { fetchUser } from "../store/user";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../store/friend";
import { fetchPosts } from "../store/post";
import Intro from "../components/ProfilePage/Intro";
import FriendsContainer from "../components/ProfilePage/FriendsContainer";
import { profilePage } from "../store/profilePage";

function ProfileDefault() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friends);

  useEffect(() => {
    dispatch(profilePage(id))
  }, [id]);

  if (!currentUser || !sessionUser || !id || !friends) {
    return null;
  }

  return (
    <>
      <ProfileTop sessionUser={sessionUser} currentUser={currentUser} />
      <div style={{ display: "flex" }}>
        <div style={{ width: "10vw" }}></div>
        <div
          style={{ width: "80vw", display: "flex", justifyContent: "center" }}
        >
          <div style={{ width: "29.9vw", flexDirection: "column" }}>
            <Intro currentUser={currentUser} sessionUser={sessionUser} />
            <FriendsContainer
              currentUser={currentUser}
              sessionUser={sessionUser}
              friends={friends}
            />
          </div>
          <Posts sessionUser={sessionUser} currentUser={currentUser} />
        </div>
        <div style={{ width: "10vw" }}></div>
      </div>
    </>
  );
}

export default ProfileDefault;
