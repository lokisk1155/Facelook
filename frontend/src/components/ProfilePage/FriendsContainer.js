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

  mutualFriends = Object.values(mutualFriends).slice(0, 6);

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
          justifyContent: mutualFriends.length > 3 ? "flex-start" : "center",
        }}
      >
        {mutualFriends
          ? mutualFriends.map((friend) => {
              return (
                <div
                  key={friend.id}
                  style={{
                    width: "31%",
                    display: "flex",
                    margin: "2.5px",
                  }}
                >
                  <Link
                    style={{
                      textDecoration: "none",
                      margin: 0,
                      padding: 0,
                      width: "100%",
                    }}
                    to={`/ProfilePage/${friend.id}`}
                  >
                    <img
                      style={{
                        width: "95%",
                        height: "75%",
                        borderRadius: "5px",
                        margin: "5px",
                        padding: 0,
                      }}
                      src={friend.profile_picture || profilePic}
                    ></img>
                    <p
                      style={{
                        textDecoration: "none",
                        color: "black",
                        margin: "0",
                        marginLeft: "3px",
                        width: "100%",
                        height: "12%",
                        fontSize: "0.8rem",
                        transform: "translateY(-5px)",
                      }}
                    >
                      {friend.first_name} {friend.last_name}
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
