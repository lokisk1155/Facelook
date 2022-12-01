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

function App() {
  return (
    <div className="omega-container">
      <NavBar />
      <Switch>
        <Route exact path="/" render={(() => <HomePage />)} />
        <Route exact path="/login_page" render={() => <LoginPage />} />
        <ProfilePageRoutes />
      </Switch>
    </div>
  );
}

export default App;
