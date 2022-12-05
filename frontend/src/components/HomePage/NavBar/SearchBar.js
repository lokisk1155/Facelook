import { Redirect } from "react-router-dom";
import "./SearchBar.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../../store/user";
import { useEffect } from "react";

function SearchBar() {
  const dispatch = useDispatch() 
  
  const [queryUsers, setQueryUsers] = useState(false)

  console.log(queryUsers)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [queryUsers])

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="    search-faceOok"
        className="search-box"
        onClick={(e) => setQueryUsers(!queryUsers)}
      ></input>
    </div>
  );
}

export default SearchBar;
