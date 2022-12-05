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

  const [typed, setTyped] = useState("")
  const [users, setUsers] = useState(null)
  const [filteredUsers] = useState(users)
  const [queryUsers, setQueryUsers] = useState(false)

  const getUsers = async () => {
    const res = await csrfFetch(`api/users`);
    const data = await res.json();
    return data
  }

  console.log(typed, 'typed')
  console.log(users, 'users')

  useEffect(() => {
    if (!users) {
      getUsers().then((data) => {
        setUsers(data)
      })   
    }
  }, [queryUsers])

  return (
    <>
    <div className="search-bar">
      <input
        type="text"
        placeholder="    search-faceOok"
        className="search-box"
        onChange={((e) => setTyped(e.target.value))}
        onClick={(e) => setQueryUsers(!queryUsers)}
      ></input>
    </div>
    </>
  );
}

export default SearchBar
