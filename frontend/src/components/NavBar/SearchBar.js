import "./SearchBar.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import profilePic from "./imgs/blank.png";

function SearchBar({
  autoFocus,
  closeModal,
  typed,
  setTyped,
  setFilteredUserCount,
}) {
  const users = useSelector((state) => state.simpleUsers);

  const history = useHistory();
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (users && typed.length > 0) {
      let currentMatches = Object.values(users).filter((user) => {
        return user.name.startsWith(typed.toLowerCase());
      });

      if (currentMatches) {
        setFilteredUsers(currentMatches);
        if (currentMatches.length > 0) {
          setFilteredUserCount(currentMatches.length);
        }
      }
    } else {
      setFilteredUsers(null);
    }

    if (typed.length === 0) {
      setFilteredUserCount(0);
    }
  }, [typed]);

  if (!users) {
    return null;
  }

  return (
    <>
      <div className="search-bar-modal">
        <button
          className="back-arrow-search-bar-modal"
          onClick={() => closeModal(false)}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="back-arrow-svg"
          >
            <g fillRule="evenodd" transform="translate(-446 -350)">
              <g fillRule="nonzero">
                <path
                  d="M100.249 201.999a1 1 0 0 0-1.415-1.415l-5.208 5.209a1 1 0 0 0 0 1.414l5.208 5.209A1 1 0 0 0 100.25 211l-4.501-4.501 4.5-4.501z"
                  transform="translate(355 153.5)"
                ></path>
                <path
                  d="M107.666 205.5H94.855a1 1 0 1 0 0 2h12.813a1 1 0 1 0 0-2z"
                  transform="translate(355 153.5)"
                ></path>
              </g>
            </g>
          </svg>
        </button>
        <input
          type="text"
          value={typed}
          placeholder={typed ? typed : "Search FaceLook"}
          className="search-input-modal"
          onChange={(e) => setTyped(e.target.value)}
          autoFocus={true}
        ></input>
      </div>

      {!typed && recentSearches.length < 1 && (
        <h4 className="no-recent-searches">No Recent Searches</h4>
      )}
      {filteredUsers && (
        <div className="search-results-container">
          {" "}
          {filteredUsers.map((user) => {
            return (
              <div
                key={user.id}
                onClick={() => {
                  history.push(`/ProfilePage/${user.id}`);
                }}
              >
                <div className="result-user-div">
                  <img className="result-user-profile-pic" src={profilePic} />

                  <p className="result-user-name">{user.name}</p>
                </div>
              </div>
            );
          })}
          {typed.length > 0 && (
            <div className="search-for-typed-button">
              <button className="mi-icon-holder">
                <i className="material-icons" id="searchFor">
                  search
                </i>
              </button>
              <p className="search-for-typed-text">{`Search for ${typed}`}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SearchBar;

{
  /* {recentSearches.length > 0 && !filteredUsers && Object.keys(recentSearches).length > 0 &&
              Object.values(recentSearches).map((user) => {
                return (
                  <Link
                    className="result-user"
                    to={`/ProfilePage/${user.id}`}
                  >{`${user.first_name} ${user.last_name}`}</Link>
              );
                
      })} */
}

// setRecentSearches((users) => {
//   return { ...users, user };
// });

//const [typed, setTyped] = useState("");
