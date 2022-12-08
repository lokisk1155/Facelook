import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/HomePage/NavBar/NavBar";
import Posts from "./components/ProfilePage/Posts";
import CreateAccountForm from "./components/UserLogin/CreateAccountForm";
import ForgotPassword from "./components/UserLogin/ForgotPassword";
import LoginPage from "./components/UserLogin/LoginPage";
import RecentLogins from "./components/UserLogin/RecentLogins";
import ProfileIndex from "./components/ProfilePage/ProfileIndex";
import { ProfilePageRoutes } from "./routes/ProfilePageRoutes";
import { useSelector } from "react-redux";

function App() {

  const sessionUser = useSelector((state) => state.session.user)

  return (
    <div className="omega-container">
      {sessionUser && <NavBar />}
      <Switch>
        <Route exact path="/" render={() => sessionUser ? <HomePage /> : <LoginPage />} />
        <ProfilePageRoutes />
      </Switch>
    </div>
  );
}

export default App;
