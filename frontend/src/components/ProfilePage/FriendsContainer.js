import "./FriendsContainer.css";
import profilePic from "../NavBar/imgs/blank.png";
import { Link } from "react-router-dom";
import capitalizeFirstLetter from "../../utils/capFirstLetter";

function FriendsContainer({ friends }) {
  const mutualFriends = Object.values(friends).slice(0, 9);

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
          ? mutualFriends.map((friend) => {
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
