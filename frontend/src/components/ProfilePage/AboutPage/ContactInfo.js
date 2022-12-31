import { useState } from "react";
import { updateUser } from "../../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ContactInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const sessionUser = useSelector((state) => state.session.user);
  const currentUser = useSelector((state) => state.user[id]);
  const isUser = currentUser.id === sessionUser.id;

  const [togglePhone, setTogglePhone] = useState(false);
  const [togglePhoneEdit, setTogglePhoneEdit] = useState(false);
  const [fakePhoneNumber, setFakePhoneNumber] = useState("");

  const [toggleEmailEdit, setToggleEmailEdit] = useState(false);
  const [fakeEmail, setFakeEmail] = useState("");

  const [toggleEditGender, setToggleEditGender] = useState(false);
  const [fakeGender, setFakeGender] = useState("");
  const [customGender, setCustomGender] = useState(false);

  const [fakeWebsite, setFakeWebsite] = useState("");
  const [toggleWebsite, setTogggleWebsite] = useState(false);
  const [toggleEditWebsite, setToggleEditWebsite] = useState(false);

  const [fakeSocial, setFakeSocial] = useState("");
  const [toggleSocial, setToggleSocial] = useState(false);
  const [toggleEditSocial, setToggleEditSocial] = useState(false);

  const handlePhoneNumber = () => {
    setTogglePhone(false);
    setTogglePhoneEdit(false);
    let phone_number = fakePhoneNumber;
    const user = {
      ...currentUser,
      phone_number,
    };
    return dispatch(updateUser(user));
  };

  const handleEmail = () => {
    setToggleEmailEdit(false);
    let email = fakeEmail;
    const user = {
      ...currentUser,
      email,
    };
    return dispatch(updateUser(user));
  };

  const handleGender = () => {
    setToggleEditGender(false);
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
    const social_link = fakeSocial;
    const user = {
      ...currentUser,
      social_link,
    };
    return dispatch(updateUser(user));
  };

  

  return (
    <div>
      <div>
      {currentUser.email ? <p>{currentUser.email}</p> : null}
        {isUser && currentUser.email && (
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
        {currentUser.phone_number ? (
          <p>{currentUser.phone_number}</p>
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
        {isUser && currentUser.phone_number && (
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

      {currentUser.gender ? <p>{currentUser.gender}</p> : null}
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
        {currentUser.website ? (
          <p>
            personal website:{" "}
            <a
              href={`https://${currentUser.website}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {currentUser.website.slice(0, -4)}
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
        {currentUser.website && (
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
        {currentUser.social_link ? (
          <p>
            Social Media:{" "}
            <a
              href={`https://${currentUser.social_link}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {currentUser.social_link.slice(0, -4)}
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
        {isUser && currentUser.social_link && (
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

      <p>birth date: {`${currentUser.month} ${currentUser.day}`}</p>
      <p>birth year: {currentUser.year}</p>
    </div>
  );
}

export default ContactInfo;
