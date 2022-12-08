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


  const demoEmail = "ooo@aol.com";
  const demoPassword = "12345678";


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
    <>
    
    <div className="container">
    
      <div className="login">
          <form className="login-form" onSubmit={handleSubmit}>
            <ul>
              {errors &&
                errors.map((error) => {
                  return <div className="login-error">{error}</div>;
                })}
            </ul>
            <div>
              <input
                className="credential"
                type="text"
                value={credential}
                placeholder={"Email or Phone number"}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                className="password"
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
