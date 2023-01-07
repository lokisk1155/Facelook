import Posts from "../components/ProfilePage/Posts";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Intro from "../components/ProfilePage/Intro";
import FriendsContainer from "../components/ProfilePage/FriendsContainer";

function ProfileDefault() {
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const currentUser = useSelector((state) => state.user[id]);

  if (!currentUser || !sessionUser) {
    return null;
  }

  return (
    <>
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
