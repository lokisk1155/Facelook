import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../../../store/user";

function EditPhoneNumber({ currentUser }) {
  const dispatch = useDispatch();

  const [fakePhoneNumber, setFakePhoneNumber] = useState("");

  const [togglePhoneEdit, setTogglePhoneEdit] = useState(false);

  const [toggle, setToggle] = useState(false);
  const handlePhoneNumber = () => {
    let phone_number = fakePhoneNumber;
    let cloneWithoutRedux = { ...currentUser };
    delete cloneWithoutRedux.friends;
    delete cloneWithoutRedux.profile_picture;
    delete cloneWithoutRedux.cover_photo;
    delete cloneWithoutRedux.password;
    const user = {
      ...cloneWithoutRedux,
      phone_number,
    };
    dispatch(updateUser(user));
    setToggle(false);
  };

  return (
    <>
      {currentUser.phone_number ? (
        <>
          {" "}
          <p>{currentUser.phone_number}</p>{" "}
          <button onClick={() => setToggle(true)}>Edit Phone Number</button>
        </>
      ) : (
        <button onClick={() => setToggle(true)}>Add Phone</button>
      )}
      {toggle && (
        <form onSubmit={handlePhoneNumber}>
          <input
            type="text"
            onChange={(e) => setFakePhoneNumber(e.target.value)}
            default="Phone Number"
          ></input>
          <button onClick={() => setToggle(false)}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}

export default EditPhoneNumber;
