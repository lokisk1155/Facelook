import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../../../store/user";

function EditHighschool({ currentUser }) {
  const dispatch = useDispatch();

  const [fakeHighschool, setFakeHighschool] = useState("");

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
          {toggle ? null : (
            <button style={{ margin: "5px" }} onClick={() => setToggle(true)}>
              Edit highschool
            </button>
          )}
        </>
      ) : (
        <button style={{ margin: "5px" }} onClick={() => setToggle(true)}>
          Add Highschool
        </button>
      )}
      {toggle && (
        <form onSubmit={handleHighschool}>
          <input
            type="text"
            onChange={(e) => setFakeHighschool(e.target.value)}
            default="Highschool"
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

export default EditHighschool;
