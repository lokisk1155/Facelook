import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import profilePic from "../NavBar/imgs/blank.png";
import { Link } from "react-router-dom";
import { deleteFriend } from "../../store/friend";
import capitalizeFirstLetter from "../../utils/capFirstLetter";
import "./Friends.css";
import { profilePage } from "../../store/profilePage";

function Friends({ friends, setDeletedFriend }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const sessionUserId = useSelector((state) => state.session.user.id);

  const currentUserFriends = useSelector((state) => state.user[id].friends);

  let divHeight;

  const [filteredUsers, setFilteredUsers] = useState(null);

  const [typed, setTyped] = useState("");

  const [friendDeleted, setFriendDeleted] = useState(false);

  useEffect(() => {
    if (typed.length > 0) {
      let currentMatches = Object.values(friends).filter((user) => {
        let userName = `${user.first_name} ${user.last_name}`.toLowerCase();
        return userName.startsWith(typed.toLowerCase());
      });
      setFilteredUsers(currentMatches);
    } else {
      setFilteredUsers(null);
    }
  }, [typed]);

  if (Object.values(friends).length > 2) {
    let dividedLength = Math.floor(Object.values(friends).length / 2);
    let divCalc = dividedLength * 125 + 175;
    divHeight = `${divCalc}px`;
  } else {
    divHeight = `250px`;
  }

  const handleDelete = (userId) => (e) => {
    e.preventDefault();
    setTyped("");
    dispatch(deleteFriend(userId));
  };

  function MutualFriendCount({ friends }) {
    let count = 0;
    for (const idUser in currentUserFriends) {
      for (const idFriends in friends) {
        if (currentUserFriends[idUser] === friends[idFriends]) {
          count += 1;
        }
      }
    }
    return `${count} mutual friends`;
  }

  return (
    <div className="friends-container" style={{ height: divHeight }}>
      <div className="friends-headers">
        <h2 style={{ margin: `25px` }}>Friends</h2>
        <div className="friends-search-bar-container">
          <i className="material-icons">search</i>
          <input
            className="friends-search-input"
            placeholder=" Search"
            onChange={(e) => setTyped(e.target.value)}
          />
        </div>
      </div>
      {friends && !filteredUsers ? (
        <div
          className="please-work-oh-my"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          {Object.values(friends).map((friend) => {
            return (
              <div key={friend.id} className="actual-friend-container">
                <Link
                  style={{
                    display: "flex",
                    textDecoration: "none",
                    height: "80%",
                    justifyContent: "space-around",
                  }}
                  to={`/ProfilePage/${friend.id}`}
                >
                  <img
                    style={{
                      height: "95%",
                      margin: "auto",
                      marginLeft: "10px",
                      maxHeight: "100px",
                    }}
                    src={friend.profile_picture || profilePic}
                  ></img>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "black",
                        margin: "0",
                      }}
                    >{`${capitalizeFirstLetter(
                      friend.first_name
                    )} ${capitalizeFirstLetter(friend.last_name)}`}</p>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        color: "black",
                        margin: "0",
                      }}
                    >
                      {MutualFriendCount(friend)}
                    </p>
                  </div>
                </Link>
                {sessionUserId == id ? (
                  <button
                    className="delete-on-friend"
                    onClick={handleDelete(friend.id)}
                  >
                    <i className="unfriend-button-in-map"></i>
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
      {filteredUsers ? (
        <div
          className="please-work-oh-my"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          {Object.values(filteredUsers).map((friend) => {
            return (
              <div key={friend.id} className="actual-friend-container">
                <Link to={`/ProfilePage/${friend.id}`}>
                  <img
                    className="friend-profile-pic"
                    src={friend.profile_picture || profilePic}
                  ></img>
                </Link>
                <p className="friend-profile-name">{`${capitalizeFirstLetter(
                  friend.first_name
                )} ${capitalizeFirstLetter(friend.last_name)}`}</p>
                {sessionUserId == id ? (
                  <button
                    className="delete-on-friend"
                    onClick={handleDelete(friend.id)}
                  >
                    <i className="unfriend-button-in-map"></i>
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Friends;
