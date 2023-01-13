import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./components/UserLogin/LoginPage";
import { ProfilePageRoutes } from "./routes/ProfilePageRoutes";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./components/HomePage/HomePage";
import { getSimpleUsers } from "./store/simpleUsers";
import { useParams } from "react-router-dom";
import CreateStory from "./components/Stories/CreateStory";
import { getFourStories } from "./store/story";

function App() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSimpleUsers());
  }, [id]);

  return (
    <>
      {sessionUser && <NavBar />}
      <Switch>
        <Route
          exact
          path="/"
          render={() => (sessionUser ? <HomePage /> : <LoginPage />)}
        />
        <Route exact path="/stories/create" render={() => <CreateStory />} />
        <ProfilePageRoutes />
      </Switch>
    </>
  );
}
export default App;
