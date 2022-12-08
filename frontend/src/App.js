import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./components/UserLogin/LoginPage";
import { ProfilePageRoutes } from "./routes/ProfilePageRoutes";
import { useSelector } from "react-redux";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      {sessionUser && <NavBar />}
      <Switch>
        <Route
          exact
          path="/"
          render={() => (sessionUser ? <HomePage /> : <LoginPage />)}
        />
        <ProfilePageRoutes />
      </Switch>
    </>
  );
}
export default App;
