import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../../store/user";

function PlacesLived({ currentUser, sessionUser }) {
  const dispatch = useDispatch();

  const isUser = currentUser.id === sessionUser.id;

  const [fakeCity, setFakeCity] = useState("");
  const [toggleAddCity, setToggleAddCity] = useState(false);

  const handleAddCity = (e) => {
    e.preventDefault();
    let places_worked = fakeCity;
    const user = {
      ...currentUser,
      places_worked,
    };
    return dispatch(updateUser(user));
  };

  return (
    <div>
      {currentUser.location ? <p>{currentUser.location}</p> : null}
      <button onClick={() => setToggleAddCity(!toggleAddCity)}>Add City</button>
      <div>
        {toggleAddCity && isUser ? (
          <form onSubmit={handleAddCity}>
            <input
              type="text"
              onChange={(e) => setFakeCity(e.target.value)}
              placeholder="City"
            ></input>
            <button onClick={() => setToggleAddCity(false)}>Cancel</button>
            <input type="submit" />
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default PlacesLived;
