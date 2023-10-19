import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import profilePic from './imgs/blank.png';
import { useRef } from 'react';
import { useMemo } from 'react';
import './SearchBar.css';

function SearchBar({ setTyped, closeModal, setDiv }) {
  const [frTyped, setfrTyped] = useState('');

  const users = useSelector((state) => state.simpleUsers);

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return filterUsers(users, frTyped);
  }, [frTyped, users]);

  const div = useMemo(() => {
    return calculateDiv(filteredUsers, frTyped);
  }, [filteredUsers, frTyped]);

  const divRef = useRef(div);

  useEffect(() => {
    divRef.current = div;
    setTyped(frTyped);
  }, [filteredUsers, frTyped, setTyped, div]);

  useEffect(() => {
    setDiv(divRef.current);
  }, [setDiv]);

  function filterUsers(users, typed) {
    const currentMatches = Object.values(users).filter((user) => {
      return user.name
        .toLowerCase()
        .replace(' ', '')
        .startsWith(typed.replace(' ', '').toLowerCase());
    });

    return currentMatches.length < 10
      ? currentMatches
      : Object.values(currentMatches).slice(0, 7);
  }

  function calculateDiv(users, typed) {
    return typed.length === 0 ? 0 : Object.values(users).length;
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
          value={frTyped}
          placeholder={frTyped ? frTyped : 'Search FaceLook'}
          className="search-input-modal"
          onChange={(e) => setfrTyped(e.target.value)}
          autoFocus={true}
        ></input>
      </div>

      {filteredUsers && (
        <div className="search-results-container">
          {' '}
          {filteredUsers.map((user, index) => {
            return (
              <Link
                key={index}
                to={`/ProfilePage/${user?.user_id}`}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <div key={user?.id}>
                  <div className="result-user-div">
                    <img
                      alt=""
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
