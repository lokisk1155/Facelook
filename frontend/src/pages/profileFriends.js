import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Friends from "../components/ProfilePage/Friends";

function ProfileFriends() {
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const currentUser = useSelector((state) => state.user[id]);
  const friends = useSelector((state) => state.friends);

  if (!currentUser || !sessionUser || !friends) {
    return null;
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "15vw" }}></div>
        <div
          style={{
            width: "70vw",
            maxWidth: "1250px",
            justifyContent: "center",
          }}
        >
          <Friends
            sessionUser={sessionUser}
            currentUser={currentUser}
            friends={friends}
          />
          <div style={{ width: "15vw" }}></div>
        </div>
      </div>
    </>
  );
}

export default ProfileFriends;
