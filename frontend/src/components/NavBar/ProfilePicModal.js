import { Link, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./profilePicModal.css";
import profilePic from "./imgs/blank.png";
import {
  faBug,
  faComments,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProfilePicModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const name = `${user.first_name} ${user.last_name}`;

  const handleLogout = () => {
    dispatch(logout(user));
    history.push("/");
  };

  return (
    <div className="omega-profile-modal-container">
      <div
        className="profile-pic-modal-container"
        style={{ width: "375px", padding: "2.5px" }}
      >
        <div
          className="container-header-profile-modal"
          style={{
            height: "25%",
            width: "325px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            margin: "10px",
            boxShadow: "0px 4px 4px 0px lightgrey",
            borderTop: "0.25px solid lightgrey",
          }}
        >
          <Link
            style={{ width: "100%", height: "35%", textDecoration: "none" }}
            to={`/ProfilePage/${user.id}`}
          >
            <div
              className="link-too-profile-page-modal"
              style={{
                height: "35%",
                width: "92%",
                marginTop: "7.5px",
                borderRadius: "7px",
                border: "none",
                display: "flex",
                alignItems: "center",
                padding: "5px",
                justifyContent: "flex-start",
                marginLeft: "2.5%",
                marginRight: "2.5%",
              }}
            >
              <img
                alt=""
                style={{ height: "90%", borderRadius: "50%" }}
                src={user.profile_picture || profilePic}
              />
              <h3
                style={{
                  paddingLeft: "7px",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {name}
              </h3>
            </div>
          </Link>
          <div
            style={{
              borderBottom: "1px solid lightgrey",
              width: "98%",
              height: "1px",
              margin: "1%",
              display: "flex",
              alignItems: "center",
            }}
          ></div>
          <a
            href="https://www.facebook.com/"
            style={{
              textDecoration: "none",
              margin: "5px",
              height: "27%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: "lightblue",
                width: "160px",
                padding: "0",
                paddingLeft: "10px",
                margin: "0",
              }}
            >
              visit the real facebook
            </p>
          </a>
        </div>
        <div
          className="person-links-container"
          style={{
            height: "60%",
            width: "325px",
            marginRight: "10px",
            marginLeft: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            style={{
              height: "31.5%",
              width: "95%",
              marginLeft: "2.5%",
              marginRight: "2.5%",
              marginTop: "1%",
              borderRadius: "7px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              textDecoration: "none",
              backgroundColor: "whitesmoke",
            }}
          >
            <FontAwesomeIcon
              style={{ paddingLeft: "10px" }}
              color="black"
              icon={faComments}
            />
            <p style={{ color: "black", fontSize: "1rem", paddingLeft: "5px" }}>
              Give feedback
            </p>
          </a>
          <a
            href="https://www.youtube.com/watch?v=4V40BQtAGIQ"
            style={{
              height: "31.5%",
              width: "95%",
              marginLeft: "2.5%",
              marginRight: "2.5%",
              marginTop: "1%",
              borderRadius: "7px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              textDecoration: "none",
              backgroundColor: "whitesmoke",
            }}
          >
            <FontAwesomeIcon
              style={{ paddingLeft: "10px" }}
              color="black"
              icon={faBug}
            />
            <p style={{ color: "black", fontSize: "1rem", paddingLeft: "5px" }}>
              Report a bug
            </p>
          </a>
          <button
            className="logout-button"
            style={{
              height: "31.5%",
              width: "95%",
              marginLeft: "2.5%",
              marginRight: "2.5%",
              marginTop: "1%",
              borderRadius: "7px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            onClick={handleLogout}
          >
            <FontAwesomeIcon
              style={{ paddingLeft: "10px" }}
              icon={faDoorOpen}
            />
            <p style={{ fontSize: "1rem", paddingLeft: "5px" }}>LogOut</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePicModal;
