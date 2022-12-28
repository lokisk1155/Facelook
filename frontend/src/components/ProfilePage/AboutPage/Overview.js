import { updateUser } from "../../../store/user";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "./overview.css";

function Overview({ currentUser, sessionUser }) {
  const dispatch = useDispatch();

  const isUser = currentUser.id === sessionUser.id;

  const [workPlace, setWorkPlace] = useState(currentUser.work);
  const [toggleWork, setToggleWork] = useState(false);
  const [fakeWork, setFakeWork] = useState("");
  const [toggleWorkEdit, setToggleWorkEdit] = useState(false);

  const [education, setEducation] = useState(currentUser.education);
  const [toggleEducation, setToggleEducation] = useState(false);
  const [fakeEducation, setFakeEducation] = useState("");
  const [toggleEducationEdit, setToggleEducationEdit] = useState(false);

  const [location, setLocation] = useState(currentUser.location);
  const [toggleLocation, setToggleLocation] = useState(false);
  const [fakeLocation, setFakeLocation] = useState("");
  const [toggleLocationEdit, setToggleLocationEdit] = useState(false);

  const [relationship, setRelationShip] = useState(currentUser.relationship);
  const [toggleRelationship, setToggleRelationship] = useState(false);
  const [fakeRelationship, setFakeRelationship] = useState("");
  const [toggleRelationshipEdit, setToggleRelationshipEdit] = useState(false);

  const handleWork = () => {
    let work = fakeWork;
    const user = {
      ...currentUser,
      work,
    };
    return dispatch(updateUser(user));
  };

  const handleEducation = () => {
    let education = fakeEducation;
    const user = {
      ...currentUser,
      education,
    };
    return dispatch(updateUser(user));
  };

  const handleLocation = () => {
    // setLocation(fakeLocation);
    let location = fakeLocation;
    const user = {
      ...currentUser,
      location,
    };
    return dispatch(updateUser(user));
  };

  const handleRelationship = () => {
    // setRelationShip(fakeRelationship);
    let relationship = fakeRelationship;
    const user = {
      ...currentUser,
      relationship,
    };
    return dispatch(updateUser(user));
  };

  return (
    <div className="content-container">
      <div>
        <p>{workPlace}</p>
        {!workPlace && isUser && (
          <button
            onClick={() => {
              setToggleWork(true);
            }}
          >
            Add a workplace
          </button>
        )}
        {toggleWork && !workPlace && (
          <form onSubmit={handleWork}>
            <input
              type="text"
              placeholder="Company"
              onChange={(e) => setFakeWork(e.target.value)}
            />
            <button onClick={() => setToggleWork(false)}>cancel</button>
            <input type="submit" value="save" />
          </form>
        )}

        {isUser && workPlace && (
          <button onClick={() => setToggleWorkEdit(true)}>Edit work</button>
        )}
        {toggleWorkEdit && (
          <form onSubmit={handleWork}>
            <input
              type="text"
              placeholder="Company"
              onChange={(e) => setFakeWork(e.target.value)}
            ></input>
            <button onClick={() => setToggleWorkEdit(false)}>cancel</button>
            <input type="submit" value="save" />
          </form>
        )}
      </div>

      <div>
        <p>{education}</p>
        {!education && isUser && (
          <button
            onClick={() => {
              setToggleEducation(true);
            }}
          >
            Add Education
          </button>
        )}
        {toggleEducation && !education && (
          <form onSubmit={handleEducation}>
            <input
              type="text"
              placeholder="Institution"
              onChange={(e) => setFakeEducation(e.target.value)}
            />
            <button onClick={() => setToggleEducation(false)}>cancel</button>
            <input type="submit" value="save" />
          </form>
        )}

        {isUser && education && (
          <button onClick={() => setToggleEducationEdit(true)}>
            Edit Education
          </button>
        )}
        {toggleEducationEdit && (
          <form onSubmit={handleEducation}>
            <input
              type="text"
              placeholder="Institution"
              onChange={(e) => setFakeEducation(e.target.value)}
            ></input>
            <button onClick={() => setToggleEducationEdit(false)}>
              cancel
            </button>
            <input type="submit" value="save" />
          </form>
        )}
      </div>

      <div>
        <p>{location}</p>
        {!location && isUser && (
          <button
            onClick={() => {
              setToggleLocation(true);
            }}
          >
            Add Location
          </button>
        )}
        {toggleLocation && !location && (
          <form onSubmit={handleLocation}>
            <input
              type="text"
              placeholder="Location"
              onChange={(e) => setFakeLocation(e.target.value)}
            />
            <button onClick={() => setToggleLocation(false)}>cancel</button>
            <input type="submit" value="save" />
          </form>
        )}

        {isUser && location && (
          <button onClick={() => setToggleLocationEdit(true)}>
            Change Primary Location
          </button>
        )}
        {toggleLocationEdit && (
          <form onSubmit={handleLocation}>
            <input
              type="text"
              placeholder="Location"
              onChange={(e) => setFakeLocation(e.target.value)}
            ></input>
            <button onClick={() => setToggleLocationEdit(false)}>cancel</button>
            <input type="submit" value="save" />
          </form>
        )}
      </div>

      <div>
        <p>{relationship}</p>
        {!relationship && isUser && (
          <button
            onClick={() => {
              setToggleRelationship(!toggleRelationship);
            }}
          >
            Add Relationship Status
          </button>
        )}
        {toggleRelationship && !relationship && (
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

        {isUser && relationship && (
          <button onClick={() => setToggleRelationshipEdit(true)}>
            Edit Relationship Status
          </button>
        )}
        {toggleRelationshipEdit && (
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
            <button onClick={() => setToggleRelationshipEdit(true)}>
              cancel
            </button>
            <input type="submit" value="save" />
          </form>
        )}
      </div>
    </div>
  );
}

export default Overview;
