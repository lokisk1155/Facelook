import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFriend } from "../../store/friend";
import { useSelector } from "react-redux";
import { fetchFriends } from "../../store/friend";
import { useParams } from "react-router-dom";
import csrfFetch from "../../store/csrf";
import { useState } from "react";
import { fetchUsers } from "../../store/user";
import profilePic from "../NavBar/imgs/blank.png";

function Friends() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [friendsArray, setFriendsArray] = useState(null);

  const friends = useSelector((state) => {
    return Object.values(state.user[id].friends);
  });

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFriends(id));
      if (friends) {
        const users = await dispatch(fetchUsers(friends));
        setFriendsArray(users);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {friendsArray
        ? Object.values(friendsArray).map((friend) => {
            return (
              <div key={friend.id} className="friend-profile-page-container">
                <img className="friend-profile-pic" src={profilePic}></img>
                <p className="friend-profile-name">{`${friend.first_name} ${friend.last_name}`}</p>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Friends;
