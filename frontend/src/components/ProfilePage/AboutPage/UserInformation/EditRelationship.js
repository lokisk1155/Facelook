import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../../../store/user";

function EditRelationship({ currentUser }) {
  const dispatch = useDispatch();

  const [fakeRelationship, setFakeRelationship] = useState("");

  const [toggleRelationshipEdit, setToggleRelationshipEdit] = useState(false);

  const [toggle, setToggle] = useState(false);

  const handleRelationship = () => {
    let relationship = fakeRelationship;
    let cloneWithoutRedux = { ...currentUser };
    delete cloneWithoutRedux.friends;
    delete cloneWithoutRedux.profile_picture;
    delete cloneWithoutRedux.cover_photo;
    delete cloneWithoutRedux.password;
    const user = {
      ...cloneWithoutRedux,
      relationship,
    };
    dispatch(updateUser(user));
    setToggle(false);
  };

  return (
    <>
      {currentUser.relationship ? (
        <>
          {" "}
          <p>{currentUser.relationship}</p>{" "}
          {toggle ? null : (
            <button style={{ margin: "5px" }} onClick={() => setToggle(true)}>
              Edit Relationship
            </button>
          )}
        </>
      ) : (
        <>
          {toggle ? null : (
            <button style={{ margin: "5px" }} onClick={() => setToggle(true)}>
              Add Relationship
            </button>
          )}
        </>
      )}
      {toggle && (
        <form onSubmit={handleRelationship}>
          <select
            type="text"
            onChange={(e) => setFakeRelationship(e.target.value)}
          >
            <option value="Single">Single</option>
            <option value="In a relationship">In a relationship</option>
            <option value="Married">Married</option>
            <option value="In a civil union">In a civil union</option>
            <option value="In a domestic partnership">
              In a domestic partnership
            </option>
            <option value="In an open relationship">
              In an open relationship
            </option>
            <option value="It's complicated">It's complicated</option>
            <option value="Seperated">Seperated</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
          <input type="submit" />
        </form>
      )}
    </>
  );
}

export default EditRelationship;
