import { useDispatch } from "react-redux";
import { updateUser } from "../../../store/user";
import { useState } from "react";

function Relationship({ currentUser, sessionUser }) {
  const dispatch = useDispatch();

  const isUser = currentUser.id === sessionUser.id;

  const [fakeRelationship, setFakeRelationship] = useState("");
  const [toggleRelationship, setToggleRelationship] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToggleRelationship(false);
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
    return dispatch(updateUser(user));
  };

  return (
    <>
      <h3>Relationship</h3>

      {(currentUser.relationship && <p>{currentUser.relationship}</p>) ||
        (isUser && (
          <button
            onClick={() => {
              setToggleRelationship(true);
            }}
          >
            Add Relationship Status
          </button>
        ))}
      {isUser && toggleRelationship && !currentUser.relationship && (
        <form onSubmit={handleSubmit}>
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

      {isUser && currentUser.relationship && (
        <button onClick={() => setToggleRelationship(true)}>
          Edit Relationship Status
        </button>
      )}
      {toggleRelationship && (
        <form onSubmit={handleSubmit}>
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
          <button onClick={() => setToggleRelationship(false)}>cancel</button>
          <input type="submit" value="save" />
        </form>
      )}
    </>
  );
}

export default Relationship;
