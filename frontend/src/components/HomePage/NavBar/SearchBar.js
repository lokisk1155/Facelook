import { Redirect } from "react-router-dom";
import "./SearchBar.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../../store/user";
import { useEffect } from "react";
import csrfFetch from "../../../store/csrf";

function SearchBar() {
  const dispatch = useDispatch() 

 
  const [users, setUsers] = useState(null)
  const [queryUsers, setQueryUsers] = useState(false)

  console.log(queryUsers)

  const getUsers = async () => {
    const res = await csrfFetch(`api/users`);
    const data = await res.json();
    setUsers(data)
    return 
  }

  useEffect(() => {
    if (!users) {
      getUsers() 
    }
  }, [queryUsers])

  return (
    <>
    <div className="search-bar">
      <input
        type="text"
        placeholder="    search-faceOok"
        className="search-box"
        onClick={(e) => setQueryUsers(!queryUsers)}
      ></input>
    </div>
    </>
  );
}

export default SearchBar
