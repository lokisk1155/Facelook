import { Route } from "react-router-dom";
import ProfileDefault from "../pages/profileDefault";
import ProfileFriends from "../pages/profileFriends";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileTop from "../components/ProfilePage/ProfileTop";
import { useEffect } from "react";
import { profilePage } from "../store/profilePage";
import ProfileAbout from "../pages/profileAbout";

export function ProfilePageRoutes() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const currentUser = useSelector((state) => state.user[id]);
  const friends = useSelector((state) => state.friends);

  useEffect(() => {
    dispatch(profilePage(id));
  }, [id, dispatch]);

  if (!currentUser || !sessionUser || !friends) {
    return null;
  }

  return (
    <>
      <ProfileTop
        sessionUser={sessionUser}
        currentUser={currentUser}
        friends={friends}
      />
      <Route exact path="/ProfilePage/:id" render={() => <ProfileDefault />} />
      <Route
        path="/ProfilePage/:id/friends"
        render={() => <ProfileFriends />}
      />
      <Route path="/ProfilePage/:id/about">
        <ProfileAbout sessionUser={sessionUser} currentUser={currentUser} />
      </Route>
    </>
  );
}
