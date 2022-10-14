import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/HomePage/NavBar/NavBar';
import Posts from './components/ProfilePage/Posts';
import CreateAccountForm from './components/UserLogin/CreateAccountForm';
import ForgotPassword from './components/UserLogin/ForgotPassword';
import LoginPage from './components/UserLogin/LoginPage';
import RecentLogins from './components/UserLogin/RecentLogins';

function App() {
  return (
    <div className="omega-container">
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/login_page">
        <div className="login-page-container">
          <RecentLogins />
          <LoginPage />
        </div>
      </Route>
      <Route exact path="/sign_up">
        <CreateAccountForm />
      </Route>
      <Route exact path="/forgot_password">
        <ForgotPassword />
      </Route>
      <Route exact path="/ProfilePage/:id">
        <NavBar />
        <Posts />
      </Route>
    </Switch>
    </div>
  );
}

export default App;