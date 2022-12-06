import { Link, useHistory } from "react-router-dom";
import "./LoginPage.css";
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import CreateAccountForm from "./CreateAccountForm";
import RecentLogins from "./RecentLogins";
import { Modal } from "../../context/Modal";

function LoginPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        history.push("/");
      })
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    return;
  };

  return (
    <div className="login-page-container">
      <RecentLogins />
      <div className="flexbox-container">
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <ul>
              {errors &&
                errors.map((error) => {
                  return <div className="login-error">{error}</div>;
                })}
            </ul>
            <div>
              <input
                className="email-password-text"
                type="text"
                value={credential}
                placeholder={"Email or Phone number"}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                className="email-password-text"
                type="password"
                value={password}
                placeholder={"Password"}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button className="login-button" type="submit">
                Log In
              </button>
            </div>
          </form>
          <form action="/forgot_password">
            <input
              className="forgot-password"
              type="submit"
              value="Forgot Password?"
            />
          </form>
        </div>

        <button
          className="Create-Account-Modal"
          onClick={() => setCreateFormOpen(true)}
        >
          Create New Account
        </button>
        {createFormOpen && (
          <Modal onClose={() => setShowModal(false)}>
            <CreateAccountForm closeForm={setCreateFormOpen} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
