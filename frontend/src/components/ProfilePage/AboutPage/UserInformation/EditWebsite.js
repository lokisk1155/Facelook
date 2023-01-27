import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../../../store/user";

function EditWebsite({ currentUser }) {
  const dispatch = useDispatch();

  const [fakeWebsite, setFakeWebsite] = useState("");

  const [toggleWebsiteEdit, setToggleWebsiteEdit] = useState(false);

  const [toggle, setToggle] = useState(false);
  const handleWebsite = () => {
    let website = fakeWebsite;
    let cloneWithoutRedux = { ...currentUser };
    delete cloneWithoutRedux.friends;
    delete cloneWithoutRedux.profile_picture;
    delete cloneWithoutRedux.cover_photo;
    delete cloneWithoutRedux.password;
    const user = {
      ...cloneWithoutRedux,
      website,
    };
    dispatch(updateUser(user));
    setToggle(false);
  };

  return (
    <>
      {currentUser.website ? (
        <>
          {" "}
          <p>{currentUser.website}</p>{" "}
          <button onClick={() => setToggle(true)}>Edit Website</button>
        </>
      ) : (
        <button onClick={() => setToggle(true)}>Add Website</button>
      )}
      {toggle && (
        <form onSubmit={handleWebsite}>
          <input
            type="text"
            onChange={(e) => setFakeWebsite(e.target.value)}
            default="Website"
          ></input>
          <button onClick={() => setToggle(false)}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}

export default EditWebsite;
