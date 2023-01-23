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

  const divMultiplyer = mutualFriends.length > 3 ? mutualFriends.length / 3 : 0;

  const containerHeight = Math.floor(divMultiplyer) * 175 + 175;

  return (
    <div
      style={{ height: `${containerHeight}px` }}
      className="friends-container-container"
    >
      <h2 style={{ padding: "10px" }} className="intro-header">
        Friends{" "}
      </h2>
      <div
        style={{ justifyContent: "center" }}
        className="actual-friends-container"
      >
        {mutualFriends
          ? Object.values(mutualFriends).map((friend) => {
              return (
                <div
                  key={friend.id}
                  style={{
                    height: "140px",
                    width: "120px",
                    padding: "2%",
                    justifyContent: "center",
                  }}
                  className="indi-friend"
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/ProfilePage/${friend.id}`}
                  >
                    <img
                      style={{ height: "110px", borderRadius: "5px" }}
                      src={friend.profile_picture || profilePic}
                    ></img>
                    <p style={{ textAlign: "center", textDecoration: "none" }}>
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
