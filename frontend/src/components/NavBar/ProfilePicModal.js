import { Link, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./profilePicModal.css";
import profilePic from "./imgs/blank.png";
import Github from "./imgs/GitHub.png";
import Li from "./imgs/Li.png";
import wellfound from "./imgs/wellfound.png";

function ProfilePicModal({ closeModal }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const name = useSelector((state) => state.simpleUsers[user.id].name);

  const developerPictures = [Github, Li, wellfound];
  const developerWebsiteLinks = [
    "https://github.com/lokisk1155/FaceOok",
    "https://www.linkedin.com/in/shawn-mallon/",
    "https://angel.co/u/shawn-mallon",
  ];
  const developerWebsiteNames = [
    "Project's Repo",
    "Creator's Linkedin",
    "Creator's Wellfound",
  ];

  const handleLogout = () => {
    dispatch(logout(user));
    history.push("/");
  };

  return (
    <div className="omega-profile-modal-container">
      <div
        className="profile-pic-modal-container"
        style={{ width: "350px", padding: "2.5px" }}
      >
        <div
          className="container-header-profile-modal"
          style={{
            height: "35%",
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
              margin: "1%",
            }}
          ></div>
          <button
            className="logout-button"
            style={{
              height: "35%",
              width: "95%",
              marginLeft: "2.5%",
              marginRight: "2.5%",
              marginTop: "1%",
              borderRadius: "7px",
              border: "none",
            }}
            onClick={handleLogout}
          >
            Log Out
          </button>
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
          {developerPictures.map((website, index) => {
            return (
              <Link
                key={index}
                className="developer-links"
                target="_blank"
                style={{
                  height: "30%",
                  display: "flex",
                  marginRight:
                    developerPictures[index] === wellfound ? "5px" : "0px",
                  margin:
                    developerPictures[index] === wellfound ? "0px" : "2px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  textDecoration: "none",
                }}
                to={{ pathname: developerWebsiteLinks[index] }}
              >
                <img style={{ height: "60%", padding: "1px" }} src={website} />
                <h3 style={{ textDecoration: "none", color: "black" }}>
                  {developerWebsiteNames[index]}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfilePicModal;
{
  /* <div
className="main-buttons-of-modal"
style={{
  height: "35%",
  backgroundColor: "#fff",
  width: "90%",
  marginleft: "5%",
  marginRight: "5%",
}}
>
<Link to={`/ProfilePage/${user.id}`}></Link>
<div
  style={{
    height: "1px",
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    borderBottom: "1px solid lightgrey",
  }}
></div>
</div> */
}
