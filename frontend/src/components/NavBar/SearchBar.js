import "./SearchBar.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import profilePic from "./imgs/blank.png";
import { Link } from "react-router-dom";

function SearchBar({ setTyped, closeModal, setDiv }) {
  const users = useSelector((state) => state.simpleUsers);

  const history = useHistory();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  const [frTyped, setfrTyped] = useState("");

  useEffect(() => {
    if (users) {
      let currentMatches = Object.values(users)?.filter((user) => {
        return user?.name.startsWith(frTyped.toLowerCase());
      });

      if (currentMatches) {
        setFilteredUsers(currentMatches);
      } else {
        setFilteredUsers(Object.values(users).slice(0, 10));
      }
    }
    if (frTyped.length === 0) {
      setDiv(0);
    } else {
      setDiv(Object.values(filteredUsers)?.length);
    }
    setTyped(frTyped);
  }, [frTyped]);

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
          value={frTyped}
          placeholder={frTyped ? frTyped : "Search FaceLook"}
          className="search-input-modal"
          onChange={(e) => setfrTyped(e.target.value)}
          autoFocus={true}
        ></input>
      </div>

      {!frTyped && recentSearches.length < 1 && (
        <h4 className="no-recent-searches">No Recent Searches</h4>
      )}
      {filteredUsers && (
        <div className="search-results-container">
          {" "}
          {filteredUsers.map((user) => {
            console.log(user);
            return (
              <Link
                to={`/ProfilePage/${user?.user_id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div key={user?.id}>
                  <div className="result-user-div">
                    <img
                      className="result-user-profile-pic"
                      src={user.profile_picture || profilePic}
                    />

                    <p className="result-user-name">{user?.name}</p>
                  </div>
                </div>
              </Link>
            );
          })}
          <div className="search-for-typed-button">
            <button className="mi-icon-holder">
              <i className="material-icons" id="searchFor">
                search
              </i>
            </button>
            <p className="search-for-typed-text">{`Search for ${frTyped}`}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchBar;
