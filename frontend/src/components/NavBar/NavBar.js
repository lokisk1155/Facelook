import "./NavBar.css";
import profilePic from "./imgs/blank.png";
import { useState } from "react";
import ProfilePicModal from "./ProfilePicModal";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Facebook from "./imgs/Facebook.png";
import { Link } from "react-router-dom";

function NavBar() {
  const user = useSelector((state) => state.session.user);
  const [profileModal, setProfileModal] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [toggleSearch, setToggleSearch] = useState(false)
  const history = useHistory();

  function closeModal() {
    return setProfileModal(!toggle);
  }

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


 {!toggleSearch && <div className="search-bar">
        <input
          type="text"
          placeholder="    Search FaceLook"
          className="search-input"
          onClick={(() => setToggleSearch(true))}
        ></input>
    </div>}

    {toggleSearch && <SearchBar />}

    </div>

    <div className="middle-column-navbar">
        <div className="home-link">
          <Link to="/">
            <i className="home-picture" />
          </Link>
        </div>
        <div className="github">
          <a href="https://github.com/lokisk1155/FaceOok" target="_blank"><i className="github-pic"></i></a>
        </div>
        <div className="linkedin">
          <a href="https://www.linkedin.com/in/shawn-mallon-3050b7161" target="_blank"><i className="linkedin-picture"></i></a>
        </div>
        <div className="runaway">
          <a href="https://lokisk1155.github.io/RunAway/" target="_blank"><i className="game-picture"></i></a>
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
            <ProfilePicModal closeModal={closeModal} user={user} />
          )}
      </div>
  );
}

export default NavBar;


        {/* <img
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
        ></img> */}
