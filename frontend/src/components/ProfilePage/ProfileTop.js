import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriend, addFriend, fetchFriend } from "../../store/friend";
import { fetchUser } from "../../store/user";
import { useState } from "react";
import { getCurrent } from "../../store/user";
import { Link, useParams } from "react-router-dom";
import profilePicBlank from "../NavBar/imgs/blank.png";
import "./ProfileTop.css";

function ProfileTop() {
  const dispatch = useDispatch();

  const [notSelf, setNotSelf] = useState(true);
  const [profilePic, setProfilePic] = useState();
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [isFriend, setIsFriend] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const { id } = useParams();

  const currentUser = useSelector(getCurrent(id));

  const sessionUser = useSelector((state) => {
    return state.session.user;
  });

  const friendCount = useSelector((state) => {
    return state.user[id].friends.length;
  });

  useEffect(() => {
    dispatch(fetchUser(id))
      .then(() => {
        dispatch(fetchFriend(id));
      })
      .then(() => {
        setIsFriend(currentUser.friends.includes(sessionUser.id));
      });

    if (currentUser.id === sessionUser.id) {
      setNotSelf(false);
    }
  }, []);

  const friend = useSelector(({ friend }) => {
    const output = Object.values(friend).filter((f) => {
      return (
        (f.sender_id == sessionUser.id && f.receiver_id == currentUser.id) ||
        (f.sender_id == currentUser.id && f.receiver_id == sessionUser.id)
      );
    });
    return output;
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    const selectButton = document.getElementById("upload-photo-button");
    const uploadButton = document.getElementById("submit-photo-button-dead");
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setProfilePic(file);
        setProfilePicUrl(fileReader.result);
      };
      selectButton.id = "upload-photo-button-dead";
      uploadButton.id = "submit-photo-button";
    }
  };

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
    if (isFriend) {
      dispatch(deleteFriend(currentUser.id)).then(() => {
        dispatch(fetchUser(currentUser.id));
      });
    }
  };

  const preview = profilePicUrl ? (
    <img src={profilePicUrl} style={{ width: "200px" }} />
  ) : null;

  return (
    <div className="profile-top-container">
      <div className="background-photo-container-profile-page">
        <div className="background-photo-profile-page"></div>
      </div>

      <div className="profile-page-header">
        <div className="left-side-of-page-header">
          <img className="profile-top-profile-pic" src={profilePicBlank} />
          <div className="name-friend-count-container">
            <p>{`${currentUser.first_name} ${currentUser.last_name}`}</p>
            <p>{friendCount} friends</p>
          </div>
        </div>

        <div className="right-side-of-page-header">
          <div className="friends-toggle-button-container">
            {isFriend && notSelf ? (
              <button
                className="toggle-friends-button"
                onClick={() => setToggleDropDown(!toggleDropDown)}
              >
                Friends
              </button>
            ) : null}
            {!isFriend && notSelf ? (
              <button className="toggle-friends-button" onClick={handleAdd}>
                Add Friend
              </button>
            ) : null}
          </div>
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

{
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
}
