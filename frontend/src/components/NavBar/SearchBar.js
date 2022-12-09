import { Redirect } from "react-router-dom";
import "./SearchBar.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers, updateUser } from "../../store/user";
import { useEffect } from "react";
import csrfFetch from "../../store/csrf";
import { Link } from "react-router-dom";
import SearchModal from "./SearchModal";
import profilePic from "./imgs/blank.png";

function SearchBar({ autoFocus, closeModal }) {
  const history = useHistory()
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
    <div className="search-bar-modal">
      <button className="back-arrow-search-bar-modal" onClick={(() => closeModal(false))}>{"<"}</button>
        <input
          type="text"
          placeholder="    Search FaceLook"
          className="search-input-modal"
          onChange={(e) => setTyped(e.target.value)}
          autoFocus={true}
        ></input>
      </div>
      
      {/* {recentSearches.length > 0 && !filteredUsers && Object.keys(recentSearches).length > 0 &&
              Object.values(recentSearches).map((user) => {
                return (
                  <Link
                    className="result-user"
                    to={`/ProfilePage/${user.id}`}
                  >{`${user.first_name} ${user.last_name}`}</Link>
              );
                
      })} */}

      {!typed && recentSearches.length < 1 && <h3 className="no-recent-searches">No Recent Searches</h3>}
      <div className="adjust-container">
      {filteredUsers && (
        <div className="search-results-container">
            {" "}
            {filteredUsers.map((user) => {
              return (
                <div
                  onClick={() => { history.push(`/ProfilePage/${user.id}`)
                    // setRecentSearches((users) => {
                    //   return { ...users, user };
                    // });
                  }}
                >
                  <div className="result-user-div">
                  <img className="result-user-profile-pic" src={profilePic} />   
                  
                  <text className="result-user-name">{`${user.first_name} ${user.last_name}`}</text>
                  </div>
                
                </div>
              );
            })}
           
        </div>
      )}
      </div>

    </>
  );
}

export default SearchBar;
