import ProfileTop from "../components/ProfilePage/ProfileTop";
import Posts from "../components/ProfilePage/Posts";
import { useEffect } from "react";
import { fetchUser } from "../store/user";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../store/friend";
import { useState } from "react";
import { fetchPosts } from "../store/post";
import Intro from "../components/ProfilePage/Intro";

function ProfileDefault() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friend);

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    Promise.all([dispatch(fetchPosts()), dispatch(fetchUser(id))]);
  }, [id, toggle]);

  if (!currentUser) {
    return null;
  }
  if (Object.keys(currentUser.friends).length !== Object.keys(friends).length) {
    dispatch(fetchFriends(Object.values(currentUser.friends)));
  }

  return (
    <>
      <ProfileTop
        sessionUser={sessionUser}
        currentUser={currentUser}
        toggle={toggle}
        setToggle={setToggle}
      /> 
      <div style={{ display: "flex"}}>
      <div style={{ width: "10vw"}}></div>
      <div style={{ width: "80vw", display: "flex", justifyContent: "center"}}>
      <Intro currentUser={currentUser} sessionUser={sessionUser} toggle={toggle}
        setToggle={setToggle}/>
      <Posts
        sessionUser={sessionUser}
        currentUser={currentUser}
      /> 
      </div>
      <div style={{ width: "10vw"}}></div>
      </div>
    </>
  );
}

export default ProfileDefault;
