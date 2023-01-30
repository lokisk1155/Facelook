import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profilePage } from "../store/profilePage";
import Friends from "../components/ProfilePage/Friends";
import ProfileTop from "../components/ProfilePage/ProfileTop";
import "./profileFriends.css";

function ProfileFriends() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friends);

  useEffect(() => {
    dispatch(profilePage(id));
  }, [id, dispatch]);

  if (!currentUser || !sessionUser || !id || !friends) {
    return null;
  }

  return (
    <>
      {friends ? (
        <ProfileTop
          sessionUser={sessionUser}
          currentUser={currentUser}
          friends={friends}
        />
      ) : null}
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
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ProfileFriends;
