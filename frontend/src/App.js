import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./components/UserLogin/LoginPage";
import { ProfilePageRoutes } from "./routes/ProfilePageRoutes";
import { useSelector } from "react-redux";
import HomePage from "./components/HomePage/HomePage";
import CreateStoryIntro from "./components/Stories/CreateStory";
import GetAllStories from "./hooks/getAllStories";

function App() {
  const sessionUser = useSelector((state) => state.session.user);
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
