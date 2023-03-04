import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profilePage } from "../store/profilePage";
import Friends from "../components/ProfilePage/Friends";
import ProfileTop from "../components/ProfilePage/ProfileTop";
import "./profileFriends.css";
import ProfileTopLoading from "../components/loading/profileTopLoading";
import GetUserProfile from "../hooks/getUserProfile";

function ProfileFriends() {
  const { id } = useParams();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friends);

  const currentUserFriends = useSelector((state) => state.user[id]?.friends);

  return (
    <>
      <ProfileTop
        sessionUser={sessionUser}
        currentUser={currentUser}
        friends={friends}
      />
      <div
        className="friends-profile-page-page-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            width: "100vw",
            maxWidth: "1250px",
          }}
        >
          <Friends
            sessionUser={sessionUser}
            currentUser={currentUser}
            friends={friends}
            currentUserFriends={currentUserFriends}
          />
        </div>
      </div>
    </>
  );
}

export default ProfileFriends;
