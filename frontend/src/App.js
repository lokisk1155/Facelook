import React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import LoginPage from "./components/UserLogin/LoginPage";
import { ProfilePageRoutes } from "./routes/ProfilePageRoutes";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./components/HomePage/HomePage";
import CreateStoryIntro from "./components/Stories/CreateStory";
import GetAllStories from "./hooks/getAllStories";
import { useEffect } from "react";
import { getSimpleUsers } from "./store/simpleUsers";

function App() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSimpleUsers());
  }, [dispatch, id]);
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (sessionUser ? <HomePage /> : <LoginPage />)}
        />
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
