import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./components/UserLogin/LoginPage";
import { ProfilePageRoutes } from "./routes/ProfilePageRoutes";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./components/HomePage/HomePage";
import { getUsers } from "./store/simpleUsers";

function App() {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUsers())
  }, [])

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
