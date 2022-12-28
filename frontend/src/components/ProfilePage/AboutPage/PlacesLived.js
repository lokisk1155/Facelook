import { useDispatch } from "react-redux";
import { updateUserArray } from "../../../store/user";
import { useState } from "react";

function PlacesLived({ currentUser, sessionUser }) {

  const dispatch = useDispatch();

  const isUser = currentUser.id === sessionUser.id;

  const [placesLived, setPlacesLived] = useState(currentUser.places_worked);
  const [fakeCity, setFakeCity] = useState("");
  const [toggleAddCity, setToggleAddCity] = useState(false);



  const handleAddCity = (e) => {
    e.preventDefault();
    setPlacesLived(fakeCity)
    let places_worked = fakeCity;
    const user = {
      ...currentUser,
      places_worked,
    };
    return dispatch(updateUserArray(user));
  };

  return (
    <div>
      <p>{placesLived}</p>
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
        ) : null }
      </div>
    </div>
  );
}

export default PlacesLived;
