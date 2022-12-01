import { useDispatch } from "react-redux";
import { updateUser } from "../../../store/user";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrent } from "../../../store/user";
import { useParams } from "react-router-dom";

function Relationship() {
  const dispatch = useDispatch();
  const { id } = useParams() 
  const sessionUser = useSelector((state) => state.session.user)
  const currentUser = useSelector(getCurrent(id))
  const isUser = currentUser.id === sessionUser.id 

  const [relationship, setRelationship] = useState(null);
  const [fakeRelationship, setFakeRelationship] = useState("");
  const [toggleRelationship, setToggleRelationship] = useState(false);

  useEffect(() => {
    checkUser();
  });

  function checkUser() {
    if (currentUser) {
      setRelationship(currentUser.relationship);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setRelationship(fakeRelationship);
    setToggleRelationship(false);
    let relationship = fakeRelationship;
    const user = {
      ...currentUser,
      relationship,
    };
    return dispatch(updateUser(user));
  };

  return (
    <div>
      <div>
        <h4>Relationship</h4>

        {(relationship && <p>{relationship}</p>) ||
          (isUser && (
            <button
              onClick={() => {
                setToggleRelationship(true);
              }}
            >
              Add Relationship Status
            </button>
          ))}
        {isUser && toggleRelationship && !relationship && (
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

        {isUser && relationship && (
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
      </div>
    </div>
  );
}

export default Relationship;
