import ProfileTop from "../components/ProfilePage/ProfileTop";
import { useEffect } from "react";
import { fetchUser } from "../store/user";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../store/friend";
import Friends from "../components/ProfilePage/Friends";
import { profilePage } from "../store/profilePage";

function ProfileFriends() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friends);

  const noPosts = true 

  useEffect(() => {
    dispatch(profilePage(id, noPosts))
  }, [id]);

  if (!currentUser || !sessionUser || !id) {
    return null;
  }

  // if (Object.keys(currentUser.friends).length !== Object.keys(friends).length) {
  //   dispatch(fetchFriends(Object.values(currentUser.friends)));
  // }

  return (
    <>
      {friends ? (
        <ProfileTop sessionUser={sessionUser} currentUser={currentUser} />
      ) : null}
      <div style={{ display: "flex" }}>
        <div style={{ width: "15vw" }}></div>
        <div
          style={{
            width: "70vw",
            maxWidth: "1250px",
            justifyContent: "center",
          }}
        >
          {friends ? (
            <Friends
              sessionUser={sessionUser}
              currentUser={currentUser}
              friends={friends}
            />
          ) : null}
          <div style={{ width: "15vw" }}></div>
        </div>
      </div>
    </>
  );
}

export default ProfileFriends;
