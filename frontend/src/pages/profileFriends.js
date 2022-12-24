import ProfileTop from "../components/ProfilePage/ProfileTop";
import { useEffect } from "react";
import { fetchUser } from "../store/user";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../store/friend";
import Friends from "../components/ProfilePage/Friends";

function ProfileFriends() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friend);


  useEffect(() => {
    dispatch(fetchUser(id));
  }, [id]);

  if (!currentUser) {
    return null;
  } 

  if (Object.keys(currentUser.friends).length !== Object.keys(friends).length) {
    const setFriends = async () => {
        dispatch(fetchFriends(Object.values(currentUser.friends)));
    }
    setFriends() 
  }

  console.log(Object.keys(currentUser.friends).length !== Object.keys(friends).length, 'conditional evaluation')
  console.log(friends, 'from state')

  return (
    <>
        <ProfileTop
            sessionUser={sessionUser}
            currentUser={currentUser}
        /> 
        <Friends
          sessionUser={sessionUser}
          currentUser={currentUser}
          friends={friends}
        />
    </>
  );
}

export default ProfileFriends;
