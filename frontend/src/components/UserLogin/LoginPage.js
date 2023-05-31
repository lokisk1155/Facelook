import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import LoginFooter from "./LoginFooter";
import { generateCredentials } from "../../utils/generateCredentials";
import "./LoginPage.css";
import LoginHeader from "./LoginHeader";

function LoginPage() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const generateUser = (e) => {
    e.preventDefault();
    const desiredCredentials = {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
    };
    try {
      return dispatch(generateCredentials(desiredCredentials));
    } catch (error) {
      window.alert(`${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setOpen(true);
        setCredential("");
        setPassword("");
      });
  };

  return (
    <>
      <div className="login-container">
        <LoginHeader />
        <div className="login">
          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <input
                className={`credential ${open ? "active" : "inactive"}`}
                type="text"
                value={credential}
                placeholder={"Email or Phone number"}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                className={`password ${open ? "active" : "inactive"}`}
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
              <hr id="hr" />
              <button className="create-new-account" onClick={generateUser}>
                Demo User
              </button>
            </div>
          </form>
        </div>
        <LoginFooter />
      </div>
    </>
  );
}

export default LoginPage;
