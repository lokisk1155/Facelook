import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./CreateAccountForm.css";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getCurrent } from "../../store/user";

function CreateAccountForm({ closeForm }) {

  const currentUser = useSelector((state) => state.session.user)

  const history = useHistory() 
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [day, setDay] = useState("1");
  const [month, setMonth] = useState("1");
  const [year, setYear] = useState("2020");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [clicked, setClicked] = useState(false);

  let years = [];
  for (let i = 1950; i < 2023; i++) {
    years.push(i);
  }
  years = years.reverse();
  let days = [];
  for (let i = 1; i < 32; i++) {
    days.push(i);
  }

  // let credential;
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
      day,
      month, 
      year, 
      gender,
    }
    debugger 
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup(user)
      ).catch(async (res) => {
        let data;
        history.push("/");
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };


  if (currentUser) return <Redirect to="/" />;


  return (
    <>
      <form className="signup-modal-form" onSubmit={handleSubmit}>
        <div className="line-break"></div>
        <div className="signup-modal">
          <ul>
            {errors &&
              errors.map((error) => {
                return <li key={error}>{error}</li>;
              })}
          </ul>
          <div>
            <h1>Sign Up</h1>
            <h4 id="h4">It's quick and easy.</h4>
            <hr />
          </div>
          <div className="name-container">
            <label className="firstname">
              <input
                id="firstname"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="  First Name"
                required
              />
            </label>
            <div className="line-break1"></div>
            <label className="lastname">
              <input
                id="lastname"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="  Last Name"
                required
              />
            </label>
          </div>
          <div className="line-break"></div>
          <div className="email-container">
            <label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="  Email"
                required
              />
            </label>
          </div>
          <div className="line-break"></div>
          <div className="password-container">
            <label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="  New Password"
                required
              />
            </label>
          </div>
          <div className="line-break"></div>
          <div className="confirm-pw-container">
            <label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="  Confirm Password"
                required
              />
            </label>
          </div>
          <div className="line-break"></div>
          <div className="birthday">
            <label id="birthday">Birthday:</label>
          </div>
          <div className="birthday-container">
            <select id="month" onChange={(e) => setMonth(e.target.value)}>
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            <div className="line-break2"></div>
            <select id="day" onChange={(e) => setDay(e.target.value)}>
              {days.map((dy, i) => {
                return (
                  <option key={i} value={dy}>
                    {dy}
                  </option>
                );
              })}
            </select>
            <div className="line-break2"></div>
            <select id="year" onChange={(e) => setYear(e.target.value)}>
              {years.map((yr, i) => {
                return (
                  <option key={i} value={yr}>
                    {yr}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="line-break"></div>
          <div className="gender">
            Gender
            <div className="gender-container">
              <div className="gender-container1">
                <label htmlFor="gender">
                  &nbsp;Male&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    value="male"
                    id="male"
                    name="gender"
                    onChange={() => setGender("male")}
                    onClick={() => setClicked(false)}
                  />
                </label>
              </div>
              <div className="line-break2"></div>
              <div className="gender-container2">
                <label htmlFor="gender">
                  &nbsp;Female
                  <input
                    type="radio"
                    value="female"
                    id="female"
                    name="gender"
                    onChange={() => setGender("female")}
                    onClick={() => setClicked(false)}
                  />
                </label>
              </div>
            </div>
          </div>
          <br />
          <div className="line-break11">
            <p>
              People who use our service may have uploaded your contact
              information to Facebook. Learn more.
            </p>
          </div>
          <div className="line-break11">
            <p>
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy. You may receive SMS Notifications from us and can
              opt out any time.
            </p>
          </div>
        </div>
        <button className="submit-button2" type="submit" >
          Sign up
        </button>
        <button className="submit-button3" onClick={() => closeForm(false)}>
          Cancel
        </button>
      </form>
    </>
  );
}

export default CreateAccountForm