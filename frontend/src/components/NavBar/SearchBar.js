import { Redirect } from "react-router-dom";
import "./SearchBar.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers, updateUser } from "../../store/user";
import { useEffect } from "react";
import csrfFetch from "../../store/csrf";
import { Link } from "react-router-dom";

function SearchBar() {
  const dispatch = useDispatch();

  const [typed, setTyped] = useState("");
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

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

    if (users && typed.length > 0) {
      let currentMatches = Object.values(users).filter((user) => {
        let userName = `${user.first_name} ${user.last_name}`.toLowerCase();
        return userName.startsWith(typed.toLowerCase());
      });

      if (currentMatches) {
        setFilteredUsers(currentMatches);
      }
    } else {
      setFilteredUsers(null);
    }
  }, [typed]);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="    Search FaceLook"
          className="search-input"
          onChange={(e) => setTyped(e.target.value)}
        ></input>
      </div>

      {filteredUsers && (
        <div className="search-results-container">
          <label>
            {" "}
            Results:
            {filteredUsers.map((user) => {
              return (
                <Link
                  className="result-user"
                  to={`/ProfilePage/${user.id}`}
                  onClick={() => {
                    setRecentSearches((users) => {
                      return { ...users, user };
                    });
                  }}
                >{`${user.first_name} ${user.last_name}`}</Link>
              );
            })}
          </label>
          <label>
            Recent:
            {Object.keys(recentSearches).length > 0 &&
              Object.values(recentSearches).map((user) => {
                return (
                  <Link
                    className="result-user"
                    to={`/ProfilePage/${user.id}`}
                  >{`${user.first_name} ${user.last_name}`}</Link>
                );
              })}
          </label>
        </div>
      )}
    </>
  );
}

export default SearchBar;
