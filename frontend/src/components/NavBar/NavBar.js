import "./NavBar.css";
import profilePic from "./imgs/blank.png";
import { useState } from "react";
import ProfilePicModal from "./ProfilePicModal";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Facebook from "./imgs/Facebook.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import SearchModal from "./SearchModal";
import { useLocation } from "react-router-dom";

function NavBar() {
  const searchRef = useRef();
  const user = useSelector((state) => state.session.user);
  const [profileModal, setProfileModal] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [fillColor, setFillColor] = useState('#ffffff');
  const [stroke, setStroke] = useState('#2c2c2c');
  const [typed, setTyped] = useState("")
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const checkClickElseWhere = (e) => {
      e.preventDefault();
      if (
        toggleSearch &&
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setToggleSearch(false);
      }
    };
    document.addEventListener("click", checkClickElseWhere);
    return () => {
      document.removeEventListener("click", checkClickElseWhere);
    };
  }, [toggleSearch]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setFillColor('#ffffff')
    }
    
    if (fillColor === '#ffffff') {
      setStroke('#2c2c2c')
    } else {
      setStroke('none')
    }
    
  }, [location, fillColor])

  if (!user) {
    return <Redirect to="/login_page" />;
  }

  return (
    <div className="navbar-container">
      <div className="left-container-navbar" ref={searchRef}>
        <div className="facebook-picture">
          <img
            src={Facebook}
            width="40px"
            height="40px"
            alt="facebook"
            onClick={() => history.push("/")}
          ></img>
        </div>

        {!toggleSearch && (
          <div className="search-bar">
            <i className="material-icons">search</i>
            <input
              type="text"
              placeholder={typed ? typed : "Search FaceLook"}
              className="search-input"
              onClick={() => setToggleSearch(true)}
            ></input>
          </div>
        )}

        {toggleSearch && <SearchModal typed={typed} setTyped={setTyped} closeModal={setToggleSearch} />}
      </div>

      <div className="middle-column-navbar">
        <div className="link-wrapper">
        <div className="home-link">
          <Link to="/" onClick={() => {
            setFillColor('#1b74e4');
        }}>
          <svg viewBox="0 0 28 28"  class="home-svg" style={{ fill: fillColor, stroke }}><path d="M25.825 12.29C25.824 12.289 25.823 12.288 25.821 12.286L15.027 2.937C14.752 2.675 14.392 2.527 13.989 2.521 13.608 2.527 13.248 2.675 13.001 2.912L2.175 12.29C1.756 12.658 1.629 13.245 1.868 13.759 2.079 14.215 2.567 14.479 3.069 14.479L5 14.479 5 23.729C5 24.695 5.784 25.479 6.75 25.479L11 25.479C11.552 25.479 12 25.031 12 24.479L12 18.309C12 18.126 12.148 17.979 12.33 17.979L15.67 17.979C15.852 17.979 16 18.126 16 18.309L16 24.479C16 25.031 16.448 25.479 17 25.479L21.25 25.479C22.217 25.479 23 24.695 23 23.729L23 14.479 24.931 14.479C25.433 14.479 25.921 14.215 26.132 13.759 26.371 13.245 26.244 12.658 25.825 12.29"></path></svg>
          </Link>
        </div>
        {/* <div className="github">
          <a href="https://github.com/lokisk1155/FaceOok" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" className="github-svg" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
        <div className="linkedin">
          <a
            href="https://www.linkedin.com/in/shawn-mallon-3050b7161"
            target="_blank"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="linkedin-picture" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div> */}
        {/* <div className="runaway">
          <a href="https://lokisk1155.github.io/RunAway/" target="_blank">
          <svg viewBox="0 0 28 28" class="game-picture"><path d="M23.5 9.5H10.25a.75.75 0 00-.75.75v7c0 .414.336.75.75.75H17v5.5H4.5v-19h19v5zm0 14h-5v-6.25a.75.75 0 00-.75-.75H11V11h12.5v12.5zm1.5.25V4.25C25 3.561 24.439 3 23.75 3H4.25C3.561 3 3 3.561 3 4.25v19.5c0 .689.561 1.25 1.25 1.25h19.5c.689 0 1.25-.561 1.25-1.25z"></path></svg>
          </a>
        </div> */}
        </div>
      </div>

      <div className="right-container-navbar">
        <div className="navbar-profile-modal">
          <img
            src={profilePic}
            alt="profile-pic"
            className="profile-pic-modal"
            onClick={() => {
              setToggle(!toggle);
              setProfileModal(toggle);
            }}
          />
        </div>
      </div>
      {profileModal && (
        <ProfilePicModal closeModal={setProfileModal} user={user} />
      )}
    </div>
  );
}

export default NavBar;

{
  /* <img
          src={linkedin}
          alt="linkedin"
          className="linkedin"
          onClick={() =>
            window.open("https://www.linkedin.com/in/shawn-mallon-3050b7161")
          }
        ></img>
        <img
          src={github}
          alt="github"
          className="github"
          onClick={() => window.open("https://github.com/lokisk1155/FaceOok")}
        ></img> */
}
