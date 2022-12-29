import "./NavBar.css";
import profilePic from "./imgs/blank.png";
import { useState } from "react";
import ProfilePicModal from "./ProfilePicModal";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Facebook from "./imgs/Facebook.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import SearchModal from "./SearchModal";
import { useLocation } from "react-router-dom";
import { Modal } from "../../context/Modal";

function NavBar() {
  //const searchRef = useRef();
  const user = useSelector((state) => state.session.user);
  const [profileModal, setProfileModal] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [fillColor, setFillColor] = useState("#1B74E4");
  const [stroke, setStroke] = useState("#2c2c2c");
  const [typed, setTyped] = useState("");
  const location = useLocation();
  const history = useHistory();
  const temp = "#2c2c2c";

  // useEffect(() => {
  //   const checkClickElseWhere = (e) => {
  //     e.preventDefault();
  //     if (
  //       toggleSearch &&
  //       searchRef.current &&
  //       !searchRef.current.contains(e.target)
  //     ) {
  //       setToggleSearch(false);
  //     }
  //   };
  //   document.addEventListener("click", checkClickElseWhere);
  //   return () => {
  //     document.removeEventListener("click", checkClickElseWhere);
  //   };
  // }, [toggleSearch]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setFillColor("#ffffff");
    }

    if (fillColor === "#ffffff") {
      setStroke("#2c2c2c");
    } else {
      setStroke("none");
    }
  }, [location, fillColor]);

  if (!user) {
    return <Redirect to="/login_page" />;
  }

  return (
    <div className="navbar-container">
      <div className="left-container-navbar">
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

        {toggleSearch && (
          <Modal onClose={() => setToggleSearch(false)}>
            <SearchModal
              typed={typed}
              setTyped={setTyped}
              closeModal={setToggleSearch}
            />
          </Modal>
        )}
      </div>

      <div className="middle-column-navbar">
        <div className="link-wrapper">
          <div className="home-link" style={{ borderBottom: temp }}>
            <Link
              to="/"
              onClick={() => {
                setFillColor("#1b74e4");
              }}
            >
              <svg
                viewBox="0 0 28 28"
                className="home-svg"
                style={{ fill: fillColor, stroke }}
              >
                <path d="M25.825 12.29C25.824 12.289 25.823 12.288 25.821 12.286L15.027 2.937C14.752 2.675 14.392 2.527 13.989 2.521 13.608 2.527 13.248 2.675 13.001 2.912L2.175 12.29C1.756 12.658 1.629 13.245 1.868 13.759 2.079 14.215 2.567 14.479 3.069 14.479L5 14.479 5 23.729C5 24.695 5.784 25.479 6.75 25.479L11 25.479C11.552 25.479 12 25.031 12 24.479L12 18.309C12 18.126 12.148 17.979 12.33 17.979L15.67 17.979C15.852 17.979 16 18.126 16 18.309L16 24.479C16 25.031 16.448 25.479 17 25.479L21.25 25.479C22.217 25.479 23 24.695 23 23.729L23 14.479 24.931 14.479C25.433 14.479 25.921 14.215 26.132 13.759 26.371 13.245 26.244 12.658 25.825 12.29"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="right-container-navbar">
        <button className="menu-button-navbar">
          <svg fill="currentColor" viewBox="0 0 44 44" className="menu-svg">
            <circle cx="7" cy="7" r="6"></circle>
            <circle cx="22" cy="7" r="6"></circle>
            <circle cx="37" cy="7" r="6"></circle>
            <circle cx="7" cy="22" r="6"></circle>
            <circle cx="22" cy="22" r="6"></circle>
            <circle cx="37" cy="22" r="6"></circle>
            <circle cx="7" cy="37" r="6"></circle>
            <circle cx="22" cy="37" r="6"></circle>
            <circle cx="37" cy="37" r="6"></circle>
          </svg>
        </button>
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
        <Modal onClose={() => setProfileModal(false)}>
          <ProfilePicModal closeModal={setProfileModal} user={user} />
        </Modal>
      )}
    </div>
  );
}

export default NavBar;
