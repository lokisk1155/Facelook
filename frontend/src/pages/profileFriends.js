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

  const loading = GetUserProfile();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friends);

  const currentUserFriends = useSelector((state) => state.user[id]?.friends);

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
        className="friends-profile-page-page-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            width: "100vw",
            maxWidth: "1250px",
          }}
        >
          {friends ? (
            <Friends
              sessionUser={sessionUser}
              currentUser={currentUser}
              friends={friends}
              currentUserFriends={currentUserFriends}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ProfileFriends;
