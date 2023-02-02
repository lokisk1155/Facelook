import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../../../store/user";

function Editlocation({ currentUser }) {
  const dispatch = useDispatch();

  const [fakelocation, setFakelocation] = useState("");

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
          {toggle ? null : (
            <button style={{ margin: "5px" }} onClick={() => setToggle(true)}>
              Edit location
            </button>
          )}
        </>
      ) : (
        <button style={{ margin: "5px" }} onClick={() => setToggle(true)}>
          Add location
        </button>
      )}
      {toggle && (
        <form onSubmit={handlelocation}>
          <input
            type="text"
            onChange={(e) => setFakelocation(e.target.value)}
            default="location"
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

export default Editlocation;
