import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./components/UserLogin/LoginPage";
import { ProfilePageRoutes } from "./routes/ProfilePageRoutes";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./components/HomePage/HomePage";
import { getSimpleUsers } from "./store/simpleUsers";
import { useParams } from "react-router-dom";
import CreateStoryIntro from "./components/Stories/CreateStory";
import StoryShow from "./components/Stories/StoryShow";

function App() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSimpleUsers());
  }, [id, dispatch]);

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
        <Route exact path="/stories/:id" render={() => <StoryShow />} />
        <ProfilePageRoutes />
      </Switch>
    </>
  );
}
export default App;
