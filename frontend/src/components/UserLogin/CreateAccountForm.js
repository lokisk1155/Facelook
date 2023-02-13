import { useState } from "react";
import { useDispatch } from "react-redux";
import { generateCredentials } from "../../utils/generateCredentials";
import "./CreateAccountForm.css";

function CreateAccountForm({ closeForm }) {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const desiredCredentials = {
      first_name: firstName ? firstName : null,
      last_name: lastName ? lastName : null,
      email: email ? email : null,
      password: password ? password : null,
    };
    try {
      return dispatch(generateCredentials(desiredCredentials));
    } catch (error) {
      window.alert(`${error.message}`);
    }
  };

  return (
    <div
      style={{
        height: "485px",
        width: "425px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 7px 7px 0px lightgrey",
        bordeRadius: "10px",
        padding: "10px 10px 20px 10px",
      }}
    >
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        Set basic info (Optional)
        <input
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
          style={{
            width: "90%",
            margin: "5px",
            padding: "10px",
            backgroundColor: "#f0f2f5",
            borderRadius: "5px",
            color: "black",
            border: "none",
          }}
        />
        <input
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
          style={{
            width: "90%",
            margin: "5px",
            padding: "10px",
            backgroundColor: "#f0f2f5",
            borderRadius: "5px",
            color: "black",
            border: "none",
          }}
        />
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "90%",
            margin: "5px",
            padding: "10px",
            backgroundColor: "#f0f2f5",
            borderRadius: "5px",
            color: "black",
            border: "none",
          }}
        />
        <input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "90%",
            margin: "5px",
            padding: "10px",
            backgroundColor: "#f0f2f5",
            borderRadius: "5px",
            color: "black",
            border: "none",
          }}
        />
      </label>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          className="submit-button3"
          style={{
            width: "40%",
            height: "50px",
            margin: "5px",
            padding: "10px",
          }}
          onClick={() => closeForm(false)}
        >
          Cancel
        </button>
        <button
          className="submit-button2"
          style={{
            width: "40%",
            height: "50px",
            margin: "5px",
            padding: "10px",
          }}
          onClick={handleSubmit}
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default CreateAccountForm;
