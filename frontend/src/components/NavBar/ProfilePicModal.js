import { Link } from "react-router-dom";
import { logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./profilePicModal.css";
import profilePic from "./imgs/blank.png";

function ProfilePicModal({ closeModal }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  return (
    <div className="omega-profile-modal-container">
      <div className="profile-pic-modal-container">
        <div className="main-buttons-of-modal" style={{ height: "35%", backgroundColor: "#fff", width: "90%", marginleft: "5%", marginRight: "5%"}}>
        <Link  to={`/ProfilePage/${user.id}`}>

        </Link>
        <div style={{ height: "1px", width: "90%", marginLeft: "5%", marginRight: "5%", borderBottom: "1px solid lightgrey"}}></div>
          <Link to="/">
            <button
              className="logout-button"
              onClick={() => {
                dispatch(logout());
              }}
            >
              <label className="logout-button-text">Log Out</label>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfilePicModal;
