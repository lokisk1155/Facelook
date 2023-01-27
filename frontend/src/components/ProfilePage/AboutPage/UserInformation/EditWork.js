import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../../../store/user";

function EditWork({ currentUser }) {
  const dispatch = useDispatch();

  const [fakeWork, setFakeWork] = useState("");

  const [toggle, setToggle] = useState(false);

  const handleWork = (e) => {
    e.preventDefault();
    let work = fakeWork;
    let cloneWithoutRedux = { ...currentUser };
    delete cloneWithoutRedux.friends;
    delete cloneWithoutRedux.profile_picture;
    delete cloneWithoutRedux.cover_photo;
    delete cloneWithoutRedux.password;
    const user = {
      ...cloneWithoutRedux,
      work,
    };
    dispatch(updateUser(user));
    setToggle(false);
  };

  return (
    <>
      {currentUser.work ? (
        <>
          <p>{currentUser.work}</p>{" "}
          {toggle ? null : (
            <button onClick={() => setToggle(true)}>Edit work</button>
          )}
        </>
      ) : (
        <button
          onClick={() => {
            setToggle(true);
          }}
        >
          Add a workplace
        </button>
      )}
      {toggle && (
        <form onSubmit={handleWork}>
          <input
            type="text"
            placeholder="Company"
            onChange={(e) => setFakeWork(e.target.value)}
          />
          <button onClick={() => setToggle(false)}>cancel</button>
          <input type="submit" value="save" />
        </form>
      )}
    </>
  );
}

export default EditWork;
