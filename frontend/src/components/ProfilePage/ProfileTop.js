import { useDispatch } from "react-redux";
import { deleteFriend, addFriend } from "../../store/friend";
import { updateUser } from "../../store/user";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import profilePicBlank from "../NavBar/imgs/blank.png";
import "./ProfileTop.css";
import capitalizeFirstLetter from "../../utils/capFirstLetter";
import { profilePage } from "../../store/profilePage";
import { Modal } from "../../context/Modal";
import EditProfile from "./EditProfile";

function ProfileTop({ currentUser, sessionUser, friends }) {
  const dispatch = useDispatch();

  const history = useHistory();

  const [toggleDropDown, setToggleDropDown] = useState(false);

  const [editProfile, setEditProfile] = useState(null);

  const { id } = useParams();

  const [toggle, setToggle] = useState(false);

  if (currentUser === undefined) return null;

  const currentUserName = `${capitalizeFirstLetter(
    currentUser.first_name
  )} ${capitalizeFirstLetter(currentUser.last_name)}`;

  const friendCount = Object.values(currentUser.friends).length;

  const isFriend = currentUser.friends.includes(sessionUser.id) ? true : false;

  const notSelf = currentUser.id !== sessionUser.id ? true : false;

  let friendsInHeader;

  let friendsTemp = "Friends";

  let mutualFriends = friends;

  let friendsHeader;

  if (currentUser.id !== sessionUser.id) {
    mutualFriends = {};
    for (const key in friends) {
      if (friends[key].friends.includes(sessionUser.id)) {
        mutualFriends[key] = friends[key];
      }
    }
    const mutualLength = Object.values(mutualFriends).length;
    if (mutualLength !== 0) {
      if (mutualLength === 1) friendsTemp = "Mutual Friend";
      else friendsTemp = "Mutual Friends";
      friendsHeader = `${mutualLength} ${friendsTemp}`;
    } else {
      if (mutualLength === 1) friendsTemp = "Friend";
      friendsHeader = `${friendCount} ${friendsTemp}`;
    }
  } else {
    friendsHeader = `${friendCount} Friends`;
  }

  const handleAdd = (e) => {
    e.preventDefault();
    const friendRequest = {
      sender_id: sessionUser.id,
      receiver_id: currentUser.id,
    };
    if (!isFriend) {
      dispatch(addFriend(friendRequest));
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (isFriend) {
      dispatch(deleteFriend(currentUser.id));
    } else {
      dispatch(profilePage(id));
    }
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
            src={coverPhotoPreview}
            className="background-photo-profile-page"
          />
        </div>
        <div className="profile-page-header">
          <div className="profile-picture-and-name-container">
            <img className="profile-top-profile-pic" src={preview} />
            <div>
              <p className="current-user-name-profile-top">{currentUserName}</p>
              <p>{friendsHeader}</p>
            </div>
          </div>

          {notSelf ? (
            <div className="friends-toggle-button-container">
              {!toggleDropDown && isFriend ? (
                <button
                  className="toggle-friends-button"
                  onClick={() => setToggleDropDown(!toggleDropDown)}
                >
                  Friends
                </button>
              ) : (
                (!isFriend && (
                  <button className="toggle-friends-button" onClick={handleAdd}>
                    Add Friend
                  </button>
                )) ||
                (isFriend && (
                  <button
                    className="toogle-friends-button"
                    onClick={handleDelete}
                  >
                    delete friend
                  </button>
                ))
              )}
            </div>
          ) : (
            <div
              className="edit-details-and-add-story-container"
              style={{
                display: "flex",
                width: "40%",
                justifyContent: "space-between",
              }}
            >
              <button
                style={{
                  height: "40%",
                  width: "45%",
                  alignSelf: "center",
                  border: "none",
                  color: "#fff",
                  fontSize: "1rem",
                  backgroundColor: "#166fe5",
                  borderRadius: "7px",
                }}
                onClick={() => history.push("/stories/create")}
              >
                Add Story
              </button>
              <button
                onClick={() => setEditProfile(true)}
                style={{
                  height: "40%",
                  width: "45%",
                  alignSelf: "center",
                  border: "none",
                  color: "#fff",
                  fontSize: "1rem",
                  backgroundColor: "#166fe5",
                  borderRadius: "7px",
                }}
              >
                Edit Profile
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

      <div className="col-container-links">
        <div className="page-link-col"></div>
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
        <div className="page-link-col"></div>
      </div>
    </>
  );
}

export default ProfileTop;
