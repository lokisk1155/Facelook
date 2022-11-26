import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFriend } from "../../store/friend";
import { useSelector } from "react-redux";
import { fetchFriends } from "../../store/friend";

function Friends({ currentUser, sessionUser }) {
  const dispatch = useDispatch();

  const friends = useSelector((state) => {
    return state.friend.users;
  });
  console.log(friends);

  useEffect(() => {
    dispatch(fetchFriends(currentUser.id));
  }, []);

  if (!friends) {
    return null;
  }

  return (
    <div>
      {Object.values(friends).map((friend) => {
        return (
          <div>
            <p>{friend.first_name}</p>
            <p>{friend.last_name}</p>
            <p>{friend.day}</p>
            <p>{friend.month}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Friends;
