import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriend, addFriend, fetchFriend } from "../../store/friend";
import { fetchUser } from "../../store/user";
import { useState } from "react";
import { getCurrent } from "../../store/user";
import { Link, useParams } from "react-router-dom";
import profilePicBlank from "../NavBar/imgs/blank.png";
import "./ProfileTop.css";
import capitalizeFirstLetter from "../../utils/capFirstLetter";

function ProfileTop({ currentUser, sessionUser }) {
  const dispatch = useDispatch();

  const [toggleDropDown, setToggleDropDown] = useState(false);

  const { id } = useParams();

  if (currentUser === undefined) return null;

  const currentUserName = `${capitalizeFirstLetter(
    currentUser.first_name
  )} ${capitalizeFirstLetter(currentUser.last_name)}`;

  const friendCount = Object.values(currentUser.friends).length;

  const isFriend = currentUser.friends.includes(sessionUser.id) ? true : false;

  const notSelf = currentUser.id !== sessionUser.id ? true : false;

  const handleAdd = (e) => {
    e.preventDefault();
    const friendRequest = {
      sender_id: sessionUser.id,
      receiver_id: currentUser.id,
    };
    return dispatch(addFriend(friendRequest));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setToggleDropDown(!toggleDropDown);
    if (isFriend) {
      return dispatch(deleteFriend(currentUser.id));
    }
  };

  return (
    <div className="profile-top-container">
      <div className="background-photo-container-profile-page">
        <div className="background-photo-profile-page"></div>
      </div>

      <div className="profile-page-header">
          <img className="profile-top-profile-pic" src={profilePicBlank} />
          <div className="name-friend-count-container">
            <p className="current-user-name">{currentUserName}</p>
            <p>{friendCount} friends</p>
            {toggleDropDown && (
              <button onClick={handleDelete}>delete friend</button>
            )}
        </div>

          <div className="friends-toggle-button-container">
            {isFriend && notSelf ? (
              <div
                className="toggle-friends-button"
                onClick={() => setToggleDropDown(!toggleDropDown)}
              >
                Friends
              </div>
            ) : null}
            {!isFriend && notSelf ? (
              <button className="toggle-friends-button" onClick={handleAdd}>
                Add Friend
              </button>
            ) : null}
          </div>
        </div>

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
    </div>
  );
}

export default ProfileTop;

/* <h2 id="h1">Upload profile picture</h2>
      <hr />
      <br></br>
      <form id="submit-form">
        <label id="upload-photo-button">
          Select photo
          <input type="file" onChange={handleFile} id="upload-photo-input" />
        </label>
        <button type="submit" id="submit-photo-button-dead">
          Upload
        </button>
      </form>
      <div id="img-preview">
        {preview && <h4>Image preview</h4>}
        <br></br>
        {preview}
      </div> */

// const friend = useSelector(({ friend }) => {
//   const output = Object.values(friend).filter((f) => {
//     return (
//       (f.sender_id == sessionUser.id && f.receiver_id == currentUser.id) ||
//       (f.sender_id == currentUser.id && f.receiver_id == sessionUser.id)
//     );
//   });
//   return output;
// });

// const handleFile = (e) => {
//   const file = e.target.files[0];
//   const selectButton = document.getElementById("upload-photo-button");
//   const uploadButton = document.getElementById("submit-photo-button-dead");
//   if (file) {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => {
//       setProfilePic(file);
//       setProfilePicUrl(fileReader.result);
//     };
//     selectButton.id = "upload-photo-button-dead";
//     uploadButton.id = "submit-photo-button";
//   }
// };

// const preview = profilePicUrl ? (
//   <img src={profilePicUrl} style={{ width: "200px" }} />
// ) : null;

// const [profilePicUrl, setProfilePicUrl] = useState(null);
