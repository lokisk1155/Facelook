import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Friends from "../components/ProfilePage/Friends";
import ProfileTop from "../components/ProfilePage/ProfileTop";
import "./profileFriends.css";

function ProfileFriends() {
  const { id } = useParams();

  const simpleUsers = useSelector((state) => state.simpleUsers);

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends =
    sessionUser.id === id ? sessionUser.friends : currentUser.friends;

  const userFriends = {};

  Object.values(simpleUsers).forEach((user) => {
    if (friends.includes(user.user_id)) {
      userFriends[user.user_id] = user;
    }
  });

  return (
    <>
      <ProfileTop
        sessionUser={sessionUser}
        currentUser={currentUser}
        friends={userFriends}
      />
      <div className="friends-profile-page-page-container">
        <div className="friends-tab-content-container">
          <Friends
            sessionUser={sessionUser}
            currentUser={currentUser}
            friends={userFriends}
            currentUserFriends={userFriends}
          />
        </div>
      </div>
    </>
  );
}

export default ProfileFriends;
