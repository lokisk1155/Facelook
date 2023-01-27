import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../../../store/user";

function Editlocation({ currentUser }) {
  const dispatch = useDispatch();

  const [fakelocation, setFakelocation] = useState("");

  const [togglelocationEdit, setTogglelocationEdit] = useState(false);

  const [toggle, setToggle] = useState(false);
  const handlelocation = () => {
    let location = fakelocation;
    let cloneWithoutRedux = { ...currentUser };
    delete cloneWithoutRedux.friends;
    delete cloneWithoutRedux.profile_picture;
    delete cloneWithoutRedux.cover_photo;
    delete cloneWithoutRedux.password;
    const user = {
      ...cloneWithoutRedux,
      location,
    };
    dispatch(updateUser(user));
    setToggle(false);
  };

  return (
    <>
      {currentUser.location ? (
        <>
          {" "}
          <p>{currentUser.location}</p>{" "}
          <button onClick={() => setToggle(true)}>Edit location</button>
        </>
      ) : (
        <button onClick={() => setToggle(true)}>Add location</button>
      )}
      {toggle && (
        <form onSubmit={handlelocation}>
          <input
            type="text"
            onChange={(e) => setFakelocation(e.target.value)}
            default="location"
          ></input>
          <button onClick={() => setToggle(false)}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}

export default Editlocation;
