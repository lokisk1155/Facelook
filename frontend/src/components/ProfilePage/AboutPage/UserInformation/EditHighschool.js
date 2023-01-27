import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../../../store/user";

function EditHighschool({ currentUser }) {
  const dispatch = useDispatch();

  const [fakeHighschool, setFakeHighschool] = useState("");

  const [toggleHighschoolEdit, setToggleHighschoolEdit] = useState(false);

  const [toggle, setToggle] = useState(false);
  const handleHighschool = () => {
    let highschool = fakeHighschool;
    let cloneWithoutRedux = { ...currentUser };
    delete cloneWithoutRedux.friends;
    delete cloneWithoutRedux.profile_picture;
    delete cloneWithoutRedux.cover_photo;
    delete cloneWithoutRedux.password;
    const user = {
      ...cloneWithoutRedux,
      highschool,
    };
    dispatch(updateUser(user));
    setToggle(false);
  };

  return (
    <>
      {currentUser.highschool ? (
        <>
          {" "}
          <p>{currentUser.highschool}</p>{" "}
          <button onClick={() => setToggle(true)}>Edit Highschool</button>
        </>
      ) : (
        <button onClick={() => setToggle(true)}>Add Highschool</button>
      )}
      {toggle && (
        <form onSubmit={handleHighschool}>
          <input
            type="text"
            onChange={(e) => setFakeHighschool(e.target.value)}
            default="Highschool"
          ></input>
          <button onClick={() => setToggle(false)}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}

export default EditHighschool;
