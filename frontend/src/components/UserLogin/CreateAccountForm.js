import { useDispatch } from "react-redux";
import "./CreateAccountForm.css";
import { useState } from "react";
import * as sessionActions from "../../store/session";
import "./CreateAccountForm.css";
import { useHistory } from "react-router-dom";

function CreateAccountForm({ closeForm }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [day, setDay] = useState("1");
  const [month, setMonth] = useState("1");
  const [year, setYear] = useState("2022");
  const [gender, setGender] = useState("");
  const [custom, setCustom] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const user = {
      email,
      password,
      firstName,
      lastName,
      day,
      month,
      year,
      gender,
    };
    return dispatch(sessionActions.signup(user))
      .then(() => {
        history.push("/");
      })
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  return (
    <div className="modal">
      <div className="create-account-container">
        <button onClick={() => closeForm(false)}> X </button>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors &&
              errors.map((error) => {
                return <li className="create-account-error">{error}</li>;
              })}
          </ul>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          ></input>
          <input type="submit"></input>

          <div>
            Birthday:
            <div>
              <select
                className="birthday-month"
                onChange={(e) => setMonth(e.target.value)}
              >
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

              <select
                className="birthday-day"
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
              </select>

              <select
                className="birthday-year"
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
              </select>
            </div>
          </div>

          <label>
            Gender
            <div>
              <label>
                Female
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={() => {
                    setGender("female");
                    setCustom(false);
                  }}
                ></input>
              </label>
              <label>
                Male
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={() => {
                    setGender("male");
                    setCustom(false);
                  }}
                ></input>
              </label>
              <label>
                Custom
                <input
                  type="radio"
                  name="gender"
                  onChange={() => setCustom(true)}
                ></input>
                {custom && (
                  <div>
                    <div>
                      <select onChange={(e) => setGender(e.target.value)}>
                        <option value="" selected disabled hidden>
                          Select your pronoun
                        </option>
                        <option value="He">
                          He: "Wish her happy birthday!"
                        </option>
                        <option value="She">
                          She: "Wish him happy birthday!"
                        </option>
                        <option value="They">
                          They: "Wish them happy birthday!"
                        </option>
                      </select>
                    </div>
                    <input
                      type="text"
                      name="gender"
                      placeholder="Gender (Optional)"
                      onChange={(e) => setGender(e.target.value)}
                    ></input>
                  </div>
                )}
              </label>
            </div>
          </label>
        </form>
      </div>
    </div>
  );
}

export default CreateAccountForm;
