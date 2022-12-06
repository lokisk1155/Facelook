import { Redirect } from "react-router-dom";
import "./SearchBar.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../../store/user";
import { useEffect } from "react";
import csrfFetch from "../../../store/csrf";

function SearchBar() {
  const dispatch = useDispatch();

  const [typed, setTyped] = useState("");
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [queryUsers, setQueryUsers] = useState(false);

  const getUsers = async () => {
    const res = await csrfFetch(`api/users`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    if (!users) {
      getUsers().then((data) => {
        setUsers(data);
      });
    }
    if (users) {
      let currentMatches = Object.values(users).filter((user) => {
        let userName = `${user.first_name} ${user.last_name}`.toLowerCase();
        return userName.startsWith(typed.toLowerCase());
      });

      if (currentMatches) {
        setFilteredUsers(currentMatches);
      } else {
        setFilteredUsers(null);
      }
    }
  }, [typed]);

  console.log(typed, "typed");
  console.log(filteredUsers, "filtered");
  console.log(users, "orginal");

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="    search-faceOok"
          className="search-box"
          onChange={(e) => setTyped(e.target.value)}
          onClick={() => setQueryUsers(true)}
        ></input>
      </div>

      {filteredUsers &&
        filteredUsers.map((user) => {
          return <div>{user.first_name}</div>;
        })}
    </>
  );
}

export default SearchBar;
