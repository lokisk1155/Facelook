import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFriend } from "../../store/friend";
import { useSelector } from "react-redux";
import { fetchFriends } from "../../store/friend";
import { useParams } from "react-router-dom";
import csrfFetch from "../../store/csrf";
import { useState } from "react";
import { fetchUsers } from "../../store/user";

function Friends() {
  const dispatch = useDispatch();
  const { id } = useParams() 

  const [friendsArray, setFriendsArray] = useState(null)

  const friends = useSelector((state) => {
    return Object.values(state.user[id].friends)
  });

  useEffect(() => {
    const fetchData = async () => {
      // Wait for dispatch(fetchFriends(id)) to complete before calling fetchUsers
      await dispatch(fetchFriends(id));
      if (friends) {
        const users = await dispatch(fetchUsers(friends))
        setFriendsArray(users);
      } else {
        setFriendsArray(['You have no friends idiot'])
      }
    }
    fetchData() 
  }, []);

  console.log(friendsArray, 'yo')

  if (!friendsArray) {
    return null
  }

  return (
    <div>
      {Object.values(friendsArray).map((friend) => {
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
