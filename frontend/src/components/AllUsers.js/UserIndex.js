import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import profilePic from "../NavBar/imgs/blank.png";
import AreFriends from "./AreFriends";
import NotFriends from "./NotFriends";

function UserIndex({ user }) {
  const { name, profile_picture, user_id } = user;

  const sessionUser = useSelector((state) => state.session.user);

  if (!user_id) {
    return null;
  }

  const FriendsWithSession = sessionUser.friends.includes(user_id);

  return (
    <div
      style={{
        width: "325px",
        height: "150px",
        margin: "7.5px",
        boxShadow: "0 0.5px 3px 1px rgb(228, 228, 228)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link
        to={`/ProfilePage/${user_id}`}
        style={{
          textDecoration: "none",
          width: "100%",
          height: "75px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img
          style={{ width: "25%", height: "100%" }}
          src={profile_picture ? profile_picture : profilePic}
        />
        <p
          style={{
            fontSize: "1.5rem",
            color: "black",
            width: "70%",
            textAlign: "center",
          }}
        >
          {name}
        </p>
      </Link>
      <div
        style={{
          height: "50%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {FriendsWithSession ? (
          <AreFriends sessionUser={sessionUser} userId={user_id} />
        ) : (
          <NotFriends sessionUser={sessionUser} userId={user_id} />
        )}
      </div>
    </div>
  );
}

export default UserIndex;
