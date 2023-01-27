import { updateUser } from "../../../store/user";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "./overview.css";

function Overview({ currentUser, sessionUser }) {
  const dispatch = useDispatch();

  const isUser = currentUser.id === sessionUser.id;

  const [toggleWork, setToggleWork] = useState(false);
  const [fakeWork, setFakeWork] = useState("");
  const [toggleWorkEdit, setToggleWorkEdit] = useState(false);

  const [toggleEducation, setToggleEducation] = useState(false);
  const [fakeEducation, setFakeEducation] = useState("");
  const [toggleEducationEdit, setToggleEducationEdit] = useState(false);

  const [toggleLocation, setToggleLocation] = useState(false);
  const [fakeLocation, setFakeLocation] = useState("");
  const [toggleLocationEdit, setToggleLocationEdit] = useState(false);

  const [toggleRelationship, setToggleRelationship] = useState(false);
  const [fakeRelationship, setFakeRelationship] = useState("");
  const [toggleRelationshipEdit, setToggleRelationshipEdit] = useState(false);

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
    return dispatch(updateUser(user));
  };

  const handleEducation = (e) => {
    e.preventDefault();
    let education = fakeEducation;
    let cloneWithoutRedux = { ...currentUser };
    delete cloneWithoutRedux.friends;
    delete cloneWithoutRedux.profile_picture;
    delete cloneWithoutRedux.cover_photo;
    delete cloneWithoutRedux.password;
    const user = {
      ...cloneWithoutRedux,
      education,
    };
    return dispatch(updateUser(user));
  };

  const handleLocation = (e) => {
    e.preventDefault();
    let location = fakeLocation;
    let cloneWithoutRedux = { ...currentUser };
    delete cloneWithoutRedux.friends;
    delete cloneWithoutRedux.profile_picture;
    delete cloneWithoutRedux.cover_photo;
    delete cloneWithoutRedux.password;
    const user = {
      ...cloneWithoutRedux,
      location,
    };
    return dispatch(updateUser(user));
  };

  const handleRelationship = (e) => {
    e.preventDefault();
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
      <div>
        {currentUser.work ? <p>{currentUser.work}</p> : null}
        {!currentUser.work && isUser && (
          <button
            onClick={() => {
              setToggleWork(true);
            }}
          >
            Add a workplace
          </button>
        )}
        {toggleWork && !currentUser.work && (
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

        {isUser && currentUser.work && (
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
        {currentUser.education ? <p>{currentUser.education}</p> : null}
        {!currentUser.education && isUser && (
          <button
            onClick={() => {
              setToggleEducation(true);
            }}
          >
            Add Education
          </button>
        )}
        {toggleEducation && !currentUser.education && (
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

        {isUser && currentUser.education && (
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
        {currentUser.location ? <p>{currentUser.location}</p> : null}
        {!currentUser.location && isUser && (
          <button
            onClick={() => {
              setToggleLocation(true);
            }}
          >
            Add Location
          </button>
        )}
        {toggleLocation && !currentUser.location && (
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

        {isUser && currentUser.location && (
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
        {currentUser.relationship ? <p>{currentUser.relationship}</p> : null}
        {!currentUser.relationship && isUser && (
          <button
            onClick={() => {
              setToggleRelationship(!toggleRelationship);
            }}
          >
            Add Relationship Status
          </button>
        )}
        {toggleRelationship && !currentUser.relationship && (
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

        {isUser && currentUser.relationship && (
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
    </>
  );
}

export default Overview;
