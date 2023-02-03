import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import CreateAccountForm from "./CreateAccountForm";
import "./LoginPage.css";

function LoginPage() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const history = useHistory();
  const [open, setOpen] = useState(false);

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
      <div className="container">
        {!createFormOpen ? (
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
                <button
                  className="create-new-account"
                  onClick={() => setCreateFormOpen(true)}
                >
                  Generate Profile
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {createFormOpen ? (
          <div
            style={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CreateAccountForm closeForm={setCreateFormOpen} />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default LoginPage;
