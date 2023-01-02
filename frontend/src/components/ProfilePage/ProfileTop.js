import { useDispatch } from "react-redux";
import { deleteFriend, addFriend } from "../../store/friend";
import { updateUser } from "../../store/user";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import profilePicBlank from "../NavBar/imgs/blank.png";
import "./ProfileTop.css";
import capitalizeFirstLetter from "../../utils/capFirstLetter";

function ProfileTop({ currentUser, sessionUser, friends}) {
  const dispatch = useDispatch();

  const [toggleDropDown, setToggleDropDown] = useState(false);

  const [photoFile, setPhotoFile] = useState(null);

  const [photoUrl, setPhotoUrl] = useState(null);

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

  let friendsTemp = 'Friends'

  let mutualFriends = friends

  let friendsHeader;

  if (currentUser.id !== sessionUser.id) {
    mutualFriends = {} 
    for (const key in friends) {
      if ((friends[key].friends).includes(sessionUser.id)) {
        mutualFriends[key] = friends[key]
      }
    }
    const mutualLength = Object.values(mutualFriends).length
      if (mutualLength !== 0) {
        if (mutualLength === 1) friendsTemp = 'Mutual Friend'
        else friendsTemp = 'Mutual Friends'
        friendsHeader = `${mutualLength} ${friendsTemp}` 
      } else {
        if (mutualLength === 1) friendsTemp = 'Friend'
        friendsHeader = `${friendCount} ${friendsTemp}`
    }
  } else {
    friendsHeader = `${friendCount} Friends`
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (photoFile) {
      formData.append("user[profile_pic]", photoFile);
    }
    dispatch(updateUser(currentUser, formData));
  };

  const handleUpdateCoverPhoto = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (photoFile) {
      formData.append("user[cover_photo]", photoFile);
    }
    dispatch(updateUser(currentUser, formData));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPhotoFile(file);
        setPhotoUrl(fileReader.result);
      };
    }
  };

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
    }
  };

  const preview = currentUser.profile_picture
    ? currentUser.profile_picture
    : profilePicBlank;

  const coverPhotoPreview = currentUser.cover_photo
    ? currentUser.cover_photo
    : null;

    console.log(friendsHeader)

  return (
    <>
      <div className="profile-top-container">
        <div className="background-photo-container-profile-page">
          <img
            src={coverPhotoPreview}
            className="background-photo-profile-page"
          />
        </div>
        <label>
          edit cover photo
          <input type="file" onChange={handleFile} />
          <button onClick={handleUpdateCoverPhoto}>upload</button>
        </label>
        <div className="profile-page-header">
          <div className="profile-picture-and-name-container">
            <img className="profile-top-profile-pic" src={preview} />
            <button onClick={() => setToggle(true)}> change pic</button>
            {toggle && (
              <div>
                <input type="file" onChange={handleFile} />
                <button onClick={handleUpdateProfile}>upload</button>
              </div>
            )}
            <div>
              <p className="current-user-name-profile-top">{currentUserName}</p>
              <p>{friendsHeader}</p>
            </div>
          </div>

          <div className="friends-toggle-button-container">
            {!toggleDropDown && isFriend && notSelf ? (
              <button
                className="toggle-friends-button"
                onClick={() => setToggleDropDown(!toggleDropDown)}
              >
                Friends
              </button>
            ) : (
              (!isFriend && notSelf && (
                <button className="toggle-friends-button" onClick={handleAdd}>
                  Add Friend
                </button>
              )) ||
              (isFriend && notSelf && (
                <button
                  className="toogle-friends-button"
                  onClick={handleDelete}
                >
                  delete friend
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="col-container-links">
        <div className="page-link-col"></div>
        <div className="profile-selectors">
          <Link to={`/ProfilePage/${id}`}>
            <button className="post-selector-button">Posts</button>
          </Link>

          <Link to={`/ProfilePage/${id}/about`}>
            <button className="about-selector-button">About</button>
          </Link>

          <Link to={`/ProfilePage/${id}/Friends`}>
            <button className="about-selector-button">Friends</button>
          </Link>
        </div>
        <div className="page-link-col"></div>
      </div>
    </>
  );
}

export default ProfileTop;
