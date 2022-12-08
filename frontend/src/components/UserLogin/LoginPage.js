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
  const [errors, setErrors] = useState(false);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const [open, setOpen] = useState(false)


  const demoEmail = "ooo@aol.com";
  const demoPassword = "12345678";


  // if (errors) {
  //   const error = document.getElementsByClassName('credential')
  //   error.focus()
  // }

  const handleClick = (e) => {
    e.preventDefault() 
    const user = { credential: demoEmail, password: demoPassword };
    dispatch(sessionActions.login(user)).then(() => {
      history.push("/");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setOpen(true)
      }
    );
  };
  return (
    <>
    
    <div className="container">
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

              <Link onClick={handleClick} className="forgot-pw">Demo User</Link>

              <hr id ="hr"/>
              <button
                  className="create-new-account"
                  onClick={() => setCreateFormOpen(true)}
                  >
                  Create New Account
                </button>
            </div>
          </form>
          </div>
        
        {createFormOpen && (
          <Modal onClose={() => setShowModal(false)}>
            <CreateAccountForm closeForm={setCreateFormOpen} />
          </Modal>
        )}
        </div>
        </>
  );
}

export default LoginPage;
