import { useDispatch } from "react-redux";
import {
  setCurrentProfile,
  updateUser,
  updateUserArray,
} from "../../../store/user";
import { useSelector } from "react-redux";
import { getCurrent } from "../../../store/user";
import { fetchUser } from "../../../store/user";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setCurrentProfileArray } from "../../../store/user";
import { useState } from "react";

function PlacesLived() {
  const dispatch = useDispatch();
  const [placesLived, setPlacesLived] = useState(null);
  const [fakeCity, setFakeCity] = useState("");
  const [toggleAddCity, setToggleAddCity] = useState(false);

  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const currentUser = useSelector(getCurrent(id));
  const isUser = currentUser.id === sessionUser.id;

  function checkPlaces() {
    if (currentUser.places_worked) {
      setPlacesLived(currentUser.places_worked);
    }
  }

  useEffect(() => {
    checkPlaces();
  }, []);

  const handleAddCity = (e) => {
    e.preventDefault();
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
        {toggleAddCity && (
          <form onSubmit={handleAddCity}>
            <input
              type="text"
              onChange={(e) => setFakeCity(e.target.value)}
              placeholder="City"
            ></input>
            <button onClick={() => setToggleAddCity(false)}>Cancel</button>
            <input type="submit" />
          </form>
        )}
      </div>
    </div>
  );
}

export default PlacesLived;
