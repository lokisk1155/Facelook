import { useDispatch } from "react-redux";
import { updateUser } from "../../../store/user";
import { useState } from "react";
import "./workEd.css";

function WorkEd({ currentUser, sessionUser }) {
  const dispatch = useDispatch();

  const isUser = sessionUser.id === currentUser.id;

  const [toggleWork, setToggleWork] = useState(false);
  const [fakeWork, setFakeWork] = useState("");
  const [toggleWorkEdit, setToggleWorkEdit] = useState(false);
  const [toggleAddWork, setToggleAddWork] = useState(false);

  const [fakeCollege, setFakeCollege] = useState("");
  const [toggleCollege, setToggleCollege] = useState(false);
  const [toggleEditCollege, setToggleEditCollege] = useState(false);

  const [fakeHighschool, setFakeHighscool] = useState("");
  const [toggleHighscool, setToggleHighscool] = useState(false);
  const [toggleEditHighscool, setToggleEditHighschool] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let work = fakeWork;
    const user = {
      ...currentUser,
      work,
    };
    return dispatch(updateUser(user));
  };

  const handleCollege = (e) => {
    e.preventDefault();
    let education = fakeCollege;
    const user = {
      ...currentUser,
      education,
    };
    return dispatch(updateUser(user));
  };

  const handleHighschool = (e) => {
    e.preventDefault();
    let highschool = fakeHighschool;
    const user = {
      ...currentUser,
      highschool,
    };
    return dispatch(updateUser(user));
  };

  const handleAddWork = (e) => {
    e.preventDefault();
    let places_lived = currentUser.places_worked.push(fakeWork);
    const user = {
      ...currentUser,
      places_lived,
    };
    return dispatch(updateUser(user));
  };

  return (
    <div>
      <div>
        <h4>Work</h4>
        {currentUser.work ? <p>{currentUser.work}</p> : null}
        {!currentUser.work && isUser && (
          <button
            onClick={() => {
              setToggleWork(!toggleWork);
            }}
          >
            Add a workplace
          </button>
        )}
        {toggleWork && !currentUser.work && (
          <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setFakeWork(e.target.value)} />
            <input type="submit" />
          </form>
        )}

        {isUser && currentUser.work && (
          <button
            className="edit-button"
            onClick={() => setToggleWorkEdit(true)}
          >
            Edit Work
          </button>
        )}
        {toggleWorkEdit && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Company"
              onChange={(e) => setFakeWork(e.target.value)}
            ></input>
            <button onClick={() => setToggleWorkEdit(false)}>cancel</button>
            <input type="submit" value="save" />
          </form>
        )}

        {isUser && (
          <button
            className="edit-button"
            onClick={() => setToggleAddWork(true)}
          >
            Add Work
          </button>
        )}
        {toggleAddWork && (
          <form onSubmit={handleAddWork}>
            <input
              type="text"
              placeholder="Company"
              onChange={(e) => setFakeWork(e.target.value)}
            ></input>
            <button onClick={() => setToggleAddWork(false)}>cancel</button>
            <input type="submit" value="save" />
          </form>
        )}
      </div>

      <div>
        <h4>College</h4>
        {currentUser.education ? <p>{currentUser.education}</p> : null}
        {!currentUser.education  && isUser && (
          <button
            className="edit-button"
            onClick={() => {
              setToggleCollege(!toggleCollege);
            }}
          >
            Add College
          </button>
        )}
        {toggleCollege && (
          <form onSubmit={handleCollege}>
            <input
              type="text"
              placeholder="Company"
              onChange={(e) => setFakeCollege(e.target.value)}
            ></input>
            <button onClick={() => setToggleCollege(false)}>cancel</button>
            <input type="submit" value="save" />
          </form>
        )}
        {isUser && currentUser.education && !toggleCollege && (
          <button
            className="edit-button"
            onClick={() => {
              setToggleEditCollege(true);
            }}
          >
            Edit
          </button>
        )}

        {toggleEditCollege && (
          <form onSubmit={handleCollege}>
            <input
              type="text"
              placeholder="Company"
              onChange={(e) => setFakeCollege(e.target.value)}
            ></input>
            <button onClick={() => setToggleEditCollege(false)}>cancel</button>
            <input type="submit" value="save" />
          </form>
        )}
      </div>

      <div>
        <h4>Highschool</h4>
        {currentUser.highschool ? <p>{currentUser.highschool}</p> : null}
        {!currentUser.highschool && isUser && (
          <button
            className="edit-button"
            onClick={() => {
              setToggleHighscool(!toggleHighscool);
            }}
          >
            Add highschool
          </button>
        )}
        {toggleHighscool && (
          <form onSubmit={handleHighschool}>
            <input
              type="text"
              placeholder="Company"
              onChange={(e) => setFakeHighscool(e.target.value)}
            ></input>
            <button
              className="test-button"
              onClick={() => setToggleHighscool(false)}
            >
              cancel
            </button>
            <input type="submit" value="save" />
          </form>
        )}
        {isUser && currentUser.highschool && !toggleHighscool && (
          <button
            className="edit-button"
            onClick={() => {
              setToggleEditHighschool(true);
            }}
          >
            Edit
          </button>
        )}
        {isUser && toggleEditHighscool && (
          <form onSubmit={handleHighschool}>
            <input
              type="text"
              placeholder="Company"
              onChange={(e) => setFakeHighscool(e.target.value)}
            ></input>
            <button onClick={() => setToggleEditHighschool(false)}>
              cancel
            </button>
            <input type="submit" value="save" />
          </form>
        )}
      </div>
    </div>
  );
}

export default WorkEd;
