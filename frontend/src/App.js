import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import { ProfilePageRoutes } from "./routes/ProfilePageRoutes";
import { getSimpleUsers } from "./store/simpleUsers";
import LoginPage from "./components/UserLogin/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import CreateStoryIntro from "./components/Stories/CreateStory";
import GetAllStories from "./hooks/getAllStories";
import AllUsersPage from "./components/AllUsers.js/AllUsersPage";
import { UpdateSessionUser } from "./store/session";

function App() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSimpleUsers());
    dispatch(UpdateSessionUser(sessionUser, true));
  }, [dispatch, id]);

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (sessionUser ? <HomePage /> : <LoginPage />)}
        />
        <Route exact path="/users" render={() => <AllUsersPage />} />
        <Route
          exact
          path="/stories/create"
          render={() => <CreateStoryIntro />}
        />
        <Route exact path="/stories/:id" render={() => <GetAllStories />} />
        <Route path="/ProfilePage/:id" render={() => <ProfilePageRoutes />} />
      </Switch>
    </>
  );
}
export default App;
