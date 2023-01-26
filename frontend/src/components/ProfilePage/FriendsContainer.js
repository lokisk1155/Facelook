import "./FriendsContainer.css";
import profilePic from "../NavBar/imgs/blank.png";
import { Link, useParams } from "react-router-dom";
import capitalizeFirstLetter from "../../utils/capFirstLetter";
import { useSelector } from "react-redux";

function FriendsContainer({ currentUser, sessionUser }) {
  const friends = useSelector((state) => Object.values(state.friends));

  if (!friends) return null;

  let mutualFriends = friends;

  if (currentUser.id !== sessionUser.id) {
    mutualFriends = {};
    for (const key in friends) {
      if (friends[key].friends.includes(sessionUser.id)) {
        mutualFriends[key] = friends[key];
      }
    }
    if (Object.keys(mutualFriends).length < 1) {
      mutualFriends = friends;
    }
  }

  mutualFriends = Object.values(mutualFriends).slice(0, 3);

  return (
    <div style={{ height: "90%" }}>
      <p>
        {friends.length} {friends.length === 1 ? "Friend" : "Friends"}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {mutualFriends
          ? mutualFriends.map((friend) => {
              return (
                <div
                  key={friend.id}
                  style={{
                    width: "33%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/ProfilePage/${friend.id}`}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "60%",
                        borderRadius: "5px",
                      }}
                      src={friend.profile_picture || profilePic}
                    ></img>
                    <p style={{ textDecoration: "none", alignSelf: "center" }}>
                      {capitalizeFirstLetter(friend.first_name)}{" "}
                      {capitalizeFirstLetter(friend.last_name)}
                    </p>
                  </Link>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default FriendsContainer;
