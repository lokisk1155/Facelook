import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../../../store/user";

function EditSocial({ currentUser }) {
  const dispatch = useDispatch();

  const [fakeSocial, setFakeSocial] = useState("");

  const [toggleSocialEdit, setToggleSocialEdit] = useState(false);

  const [toggle, setToggle] = useState(false);
  const handleSocial = () => {
    let social_link = fakeSocial;
    let cloneWithoutRedux = { ...currentUser };
    delete cloneWithoutRedux.friends;
    delete cloneWithoutRedux.profile_picture;
    delete cloneWithoutRedux.cover_photo;
    delete cloneWithoutRedux.password;
    const user = {
      ...cloneWithoutRedux,
      social_link,
    };
    dispatch(updateUser(user));
    setToggle(false);
  };

  return (
    <>
      {currentUser.social_link ? (
        <>
          {" "}
          <p>{currentUser.social_link}</p>{" "}
          <button onClick={() => setToggle(true)}>Edit Social</button>
        </>
      ) : (
        <button onClick={() => setToggle(true)}>Add Social</button>
      )}
      {toggle && (
        <form onSubmit={handleSocial}>
          <input
            type="text"
            onChange={(e) => setFakeSocial(e.target.value)}
            default="Social"
          ></input>
          <button onClick={() => setToggle(false)}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}

export default EditSocial;
