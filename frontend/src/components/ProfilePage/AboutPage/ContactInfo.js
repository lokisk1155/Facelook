import { useEffect } from "react";
import { setCurrentProfile } from "../../../store/user";
import { useState } from "react";
import { updateUser } from "../../../store/user";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function ContactInfo({ currentUser, isUser }) {
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState(false);
  const [togglePhone, setTogglePhone] = useState(false);
  const [togglePhoneEdit, setTogglePhoneEdit] = useState(false);
  const [fakePhoneNumber, setFakePhoneNumber] = useState("");

  const [email, setEmail] = useState(currentUser.email);
  const [toggleEmailEdit, setToggleEmailEdit] = useState(false);
  const [fakeEmail, setFakeEmail] = useState("");

  const [gender, setGender] = useState(currentUser.gender);
  const [toggleEditGender, setToggleEditGender] = useState(false);
  const [fakeGender, setFakeGender] = useState("");
  const [customGender, setCustomGender] = useState(false);

  const [website, setWebsite] = useState(null);
  const [fakeWebsite, setFakeWebsite] = useState("");
  const [toggleWebsite, setTogggleWebsite] = useState(false);
  const [toggleEditWebsite, setToggleEditWebsite] = useState(false);

  const [sociallink, setSocialLink] = useState(null);
  const [fakeSocial, setFakeSocial] = useState("");
  const [toggleSocial, setToggleSocial] = useState(false);
  const [toggleEditSocial, setToggleEditSocial] = useState(false);

  const [monthName, setMonthName] = useState(null);

  useEffect(() => {
    setMonth();
    checkUser();
  }, []);

  function checkUser() {
    if (currentUser.phone_number) {
      setPhoneNumber(currentUser.phone_number);
    }

    if (currentUser.website) {
      setWebsite(currentUser.website);
    }

    if (currentUser.social_link) {
      setSocialLink(currentUser.social_link);
    }
  }

  function setMonth() {
    switch (currentUser.month) {
      case "1":
        return setMonthName("January");
      case "2":
        return setMonthName("Febuary");
      case "3":
        return setMonthName("March");
      case "4":
        return setMonthName("Apirl");
      case "5":
        return setMonthName("May");
      case "6":
        return setMonthName("June");
      case "7":
        return setMonthName("July");
      case "8":
        return setMonthName("August");
      case "9":
        return setMonthName("September");
      case "10":
        return setMonthName("October");
      case "11":
        return setMonthName("November");
      case "12":
        return setMonthName("December");
      default:
        return setMonthName("default");
    }
  }

  const handlePhoneNumber = () => {
    setTogglePhone(false);
    setTogglePhoneEdit(false);
    setPhoneNumber(fakePhoneNumber);
    let phone_number = fakePhoneNumber;
    const user = {
      ...currentUser,
      phone_number,
    };
    return dispatch(updateUser(user));
  };

  const handleEmail = () => {
    setToggleEmailEdit(false);
    setEmail(fakeEmail);
    let email = fakeEmail;
    const user = {
      ...currentUser,
      email,
    };
    return dispatch(updateUser(user));
  };

  const handleGender = () => {
    setToggleEditGender(false);
    setGender(fakeGender);
    let gender = fakeGender;
    const user = {
      ...currentUser,
      gender,
    };
    return dispatch(updateUser(user));
  };

  const handleWebsite = () => {
    setTogggleWebsite(false);
    setToggleEditWebsite(false);
    setWebsite(fakeWebsite);
    let website = fakeWebsite;
    const user = {
      ...currentUser,
      website,
    };
    return dispatch(updateUser(user));
  };

  const handleSocialLink = () => {
    setToggleSocial(false);
    setToggleEditSocial(false);
    setSocialLink(fakeSocial);
    let social_link = fakeSocial;
    let user = {
      ...currentUser,
      social_link,
    };
    return dispatch(updateUser(user));
  };

  return (
    <div>
      <div>
        <p>{email}</p>
        {isUser && email && (
          <button onClick={() => setToggleEmailEdit(true)}>Edit Email</button>
        )}
        {toggleEmailEdit && (
          <form onSubmit={handleEmail}>
            <input
              type="text"
              onChange={(e) => setFakeEmail(e.target.value)}
              default="Email"
            ></input>
            <button onClick={() => setToggleEmailEdit(false)}>Cancel</button>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>

      <div>
        {phoneNumber ? (
          <p>{phoneNumber}</p>
        ) : (
          isUser && (
            <button onClick={() => setTogglePhone(true)}>Add Phone</button>
          )
        )}
        {togglePhone && (
          <form onSubmit={handlePhoneNumber}>
            <input
              type="text"
              onChange={(e) => setFakePhoneNumber(e.target.value)}
              default="Phone Number"
            ></input>
            <button onClick={() => setTogglePhone(false)}>Cancel</button>
            <button type="submit">Submit</button>
          </form>
        )}
        {isUser && phoneNumber && (
          <button onClick={() => setTogglePhoneEdit(true)}>
            Edit Phone Number
          </button>
        )}
        {togglePhoneEdit && (
          <form onSubmit={handlePhoneNumber}>
            <input
              type="text"
              onChange={(e) => setFakePhoneNumber(e.target.value)}
              default="Phone Number"
            ></input>
            <button onClick={() => setTogglePhone(false)}>Cancel</button>
            <button type="submit">Submit temp temp</button>
          </form>
        )}
      </div>

      <p>{gender}</p>
      {isUser && (
        <button onClick={() => setToggleEditGender(true)}>Edit Gender</button>
      )}
      {toggleEditGender && (
        <form onSubmit={handleGender}>
          <div>
            <label>
              Female
              <input
                type="radio"
                name="gender"
                value="female"
                onClick={() => setFakeGender("female")}
              />
            </label>
            <label>
              Male
              <input
                type="radio"
                name="gender"
                value="male"
                onClick={() => setFakeGender("male")}
              />
            </label>
            <input
              placeholder="Custom gender here"
              onChange={(e) => setFakeGender(e.target.value)}
            ></input>
            <input type="submit" placeholder="submit" />
          </div>
        </form>
      )}

      <div>
        {website ? (
          <p>
            personal website:{" "}
            <a
              href={`https://${website}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {website.slice(0, -4)}
            </a>
          </p>
        ) : (
          isUser && (
            <button onClick={() => setTogggleWebsite(true)}>Add Website</button>
          )
        )}
        {toggleWebsite && (
          <form onSubmit={handleWebsite}>
            <input
              type="text"
              onChange={(e) => setFakeWebsite(e.target.value)}
              default="Website"
            ></input>
            <button onClick={() => setTogggleWebsite(false)}>Cancel</button>
            <button type="submit">Submit</button>
          </form>
        )}
        {website && (
          <button onClick={() => setToggleEditWebsite(true)}>
            Edit Website
          </button>
        )}
        {toggleEditWebsite && (
          <form onSubmit={handleWebsite}>
            <input
              type="text"
              onChange={(e) => setFakeWebsite(e.target.value)}
              default="Phone Number"
            ></input>
            <button onClick={() => setToggleEditWebsite(false)}>Cancel</button>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>

      <div>
        {sociallink ? (
          <p>
            Social Media:{" "}
            <a
              href={`https://${sociallink}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {sociallink.slice(0, -4)}
            </a>
          </p>
        ) : (
          isUser && (
            <button onClick={() => setToggleSocial(true)}>Add Social</button>
          )
        )}
        {toggleSocial && (
          <form onSubmit={handleSocialLink}>
            <input
              type="text"
              onChange={(e) => setFakeSocial(e.target.value)}
              default="Website"
            ></input>
            <button onClick={() => setToggleSocial(false)}>Cancel</button>
            <button type="submit">Submit</button>
          </form>
        )}
        {isUser && sociallink && (
          <button onClick={() => setToggleEditSocial(true)}>Edit Social</button>
        )}
        {toggleEditSocial && (
          <form onSubmit={handleSocialLink}>
            <input
              type="text"
              onChange={(e) => setFakeSocial(e.target.value)}
              default="Phone Number"
            ></input>
            <button onClick={() => setToggleEditSocial(false)}>Cancel</button>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>

      <div></div>

      <p>birth date: {`${monthName} ${currentUser.day}`}</p>
      <p>birth year: {currentUser.year}</p>
    </div>
  );
}

export default ContactInfo;
