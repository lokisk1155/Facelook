import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { fetchUser } from "../store/user";
import { fetchFriends, receiveFriends } from "../store/friend";

export default function GetSessionUsersFriends() {
  const dispatch = useDispatch();

  const sessionUserId = useSelector((state) => state.session.user.id);

  const [storeHydrated, setStoreHydrated] = useState(null);

  useEffect(() => {
    const sessionUsersFriends = async () => {
      const userData = await fetchUser(sessionUserId);
      const friendsData = await fetchFriends(Object.values(userData.friends));
      await dispatch(receiveFriends(friendsData));
      if (friendsData) {
        return true;
      } else {
        return false;
      }
    };

    sessionUsersFriends().then((data) => {
      setStoreHydrated(data);
    });
  }, [dispatch, sessionUserId]);

  return storeHydrated;
}
