import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../../../store/user";

function EditEducation({ currentUser }) {
  const dispatch = useDispatch();

  const [fakeEducation, setFakeEducation] = useState("");

  const [toggleEducationEdit, setToggleEducationEdit] = useState(false);

  const [toggle, setToggle] = useState(false);
  const handleEducation = () => {
    let education = fakeEducation;
    let cloneWithoutRedux = { ...currentUser };
    delete cloneWithoutRedux.friends;
    delete cloneWithoutRedux.profile_picture;
    delete cloneWithoutRedux.cover_photo;
    delete cloneWithoutRedux.password;
    const user = {
      ...cloneWithoutRedux,
      education,
    };
    dispatch(updateUser(user));
    setToggle(false);
  };

  return (
    <>
      {currentUser.education ? (
        <>
          {" "}
          <p>{currentUser.education}</p>{" "}
          <button onClick={() => setToggle(true)}>Edit Education</button>
        </>
      ) : (
        <button onClick={() => setToggle(true)}>Add Education</button>
      )}
      {toggle && (
        <form onSubmit={handleEducation}>
          <input
            type="text"
            onChange={(e) => setFakeEducation(e.target.value)}
            default="Education"
          ></input>
          <button onClick={() => setToggle(false)}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}

export default EditEducation;
