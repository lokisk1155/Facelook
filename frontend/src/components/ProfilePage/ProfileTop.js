import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom"; /*  */
import { deleteFriend, addFriend } from "../../store/friend";
import { Modal } from "../../context/Modal";
import capitalizeFirstLetter from "../../utils/capFirstLetter";
import EditProfile from "./EditProfile";
import profilePicBlank from "../NavBar/imgs/blank.png";
import "./ProfileTop.css";
import { updateUserFriends } from "../../store/user";
import { UpdateSessionUser } from "../../store/session";

function ProfileTop({ currentUser, sessionUser, friends }) {
  const dispatch = useDispatch();

  const history = useHistory();

  const [toggleDropDown, setToggleDropDown] = useState(false);

  const [editProfile, setEditProfile] = useState(null);

  const { id } = useParams();

  if (currentUser === undefined) return null;

  const currentUserName = `${capitalizeFirstLetter(
    currentUser.first_name
  )} ${capitalizeFirstLetter(currentUser.last_name)}`;

  const friendsHeader = `${Object.keys(friends).length} Friends`;

  const notSelf = currentUser.id !== sessionUser.id ? true : false;

  let isFriend = false;

  if (friends[sessionUser.id]) {
    isFriend = true;
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    setToggleDropDown(null);
    const friendRequest = {
      sender_id: sessionUser.id,
      receiver_id: currentUser.id,
    };
    if (!isFriend) {
      dispatch(addFriend(friendRequest, sessionUser, null));
      dispatch(updateUserFriends(currentUser.id));
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteFriend(currentUser.id, sessionUser, id));
    dispatch(updateUserFriends(currentUser.id));
    dispatch(UpdateSessionUser(sessionUser.id));
  };

  const preview = currentUser.profile_picture
    ? currentUser.profile_picture
    : profilePicBlank;

  const coverPhotoPreview = currentUser.cover_photo
    ? currentUser.cover_photo
    : null;

  return (
    <>
      <div className="profile-top-container">
        <div className="background-photo-container-profile-page">
          <img
            alt=""
            src={coverPhotoPreview}
            className="background-photo-profile-page"
          />
        </div>
        <div className="profile-page-header">
          <div className="profile-picture-and-name-container">
            <img alt="" className="profile-top-profile-pic" src={preview} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <p style={{ margin: 0 }}>{currentUserName}</p>
              <p style={{ margin: 0 }}>{friendsHeader}</p>
            </div>
          </div>

          {notSelf ? (
            <div
              className="friends-toggle-button-container"
              style={{ maxWidth: "" }}
            >
              {isFriend ? (
                toggleDropDown ? (
                  <button
                    className="toogle-friends-button"
                    onClick={handleDelete}
                  >
                    delete friend
                  </button>
                ) : (
                  <button
                    className="toggle-friends-button"
                    onClick={() => setToggleDropDown(!toggleDropDown)}
                  >
                    Friends
                  </button>
                )
              ) : (
                <button className="toggle-friends-button" onClick={handleAdd}>
                  Add Friend
                </button>
              )}
            </div>
          ) : (
            <div className="edit-details-and-add-story-container">
              <button
                className="edit-profile-add-story-buttons"
                style={{
                  alignSelf: "center",
                  border: "none",
                  color: "#fff",
                  fontSize: "1rem",
                  backgroundColor: "#166fe5",
                  borderRadius: "7px",
                  margin: "10px",
                }}
                onClick={() => history.push("/stories/create")}
              >
                Add Story
              </button>
              <button
                className="edit-profile-add-story-buttons"
                onClick={() => setEditProfile(true)}
                style={{
                  alignSelf: "center",
                  border: "none",
                  color: "#fff",
                  fontSize: "1rem",
                  backgroundColor: "#166fe5",
                  borderRadius: "7px",
                }}
              >
                Edit profile/cover photo
              </button>
            </div>
          )}
        </div>
      </div>

      {editProfile ? (
        <Modal onClose={() => setEditProfile(false)}>
          <EditProfile
            closeModal={setEditProfile}
            cover={coverPhotoPreview}
            profile={preview}
          />
        </Modal>
      ) : null}
      <div className="profile-top-container-links">
        <div className="profile-selectors">
          <Link className="post-selector-link" to={`/ProfilePage/${id}`}>
            <button className="post-selector-button">Posts</button>
          </Link>

          <Link className="post-selector-link" to={`/ProfilePage/${id}/about`}>
            <button className="about-selector-button">About</button>
          </Link>

          <Link
            className="post-selector-link"
            to={`/ProfilePage/${id}/Friends`}
          >
            <button className="about-selector-button">Friends</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ProfileTop;
