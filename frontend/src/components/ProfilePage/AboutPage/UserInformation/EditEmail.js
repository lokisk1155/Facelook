import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../../../store/user";

function EditEmail({ currentUser }) {
  const dispatch = useDispatch();

  const [fakeEmail, setFakeEmail] = useState("");

  const [toggle, setToggle] = useState(false);

  const handleEmail = () => {
    let email = fakeEmail;
    let cloneWithoutRedux = { ...currentUser };
    delete cloneWithoutRedux.friends;
    delete cloneWithoutRedux.profile_picture;
    delete cloneWithoutRedux.cover_photo;
    delete cloneWithoutRedux.password;
    const user = {
      ...cloneWithoutRedux,
      email,
    };
    dispatch(updateUser(user));
    setToggle(false);
  };

  return (
    <>
      {currentUser.email ? (
        <>
          {" "}
          <p>{currentUser.email}</p>{" "}
          {toggle ? null : (
            <button style={{ margin: "5px" }} onClick={() => setToggle(true)}>
              Edit email
            </button>
          )}
        </>
      ) : (
        <button style={{ margin: "5px" }} onClick={() => setToggle(true)}>
          Add Email
        </button>
      )}
      {toggle && (
        <form onSubmit={handleEmail}>
          <input
            type="text"
            onChange={(e) => setFakeEmail(e.target.value)}
            default="Email"
          ></input>
          <button style={{ margin: "5px" }} onClick={() => setToggle(false)}>
            Cancel
          </button>
          <button style={{ margin: "5px" }} type="submit">
            Submit
          </button>
        </form>
      )}
    </>
  );
}

export default EditEmail;
