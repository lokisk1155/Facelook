import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriend, addFriend, fetchFriend } from "../../store/friend";
import { fetchUser } from "../../store/user";
import { setCurrentProfile } from "../../store/user";
import { useState } from "react";
import csrfFetch from "../../store/csrf";
import { fetchFriends } from "../../store/friend";

function ProfileTop({ sessionUser, currentUser }) {
  const dispatch = useDispatch();

  const [notSelf, setNotSelf] = useState(false);

  const [profilePic, setProfilePic] = useState();
  const [profilePicUrl, setProfilePicUrl] = useState(null);

  const friend = useSelector(({ friend }) => {
    const output = Object.values(friend).filter((f) => {
      return (
        (f.sender_id == sessionUser.id && f.receiver_id == currentUser.id) ||
        (f.sender_id == currentUser.id && f.receiver_id == sessionUser.id)
      );
    });
    return output;
  });

  const is_friend = currentUser.friends.includes(sessionUser.id);
  const not_self = currentUser.id === sessionUser.id

  useEffect(() => {
    dispatch(fetchFriend(currentUser.id));
  }, [sessionUser.id]);

  const uploadPic = async (e) => {
    const formData = new FormData();
    if (profilePic) formData.append("user[profilePic]", profilePic);
    debugger;
    const res = await csrfFetch(`/api/users/${currentUser.id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();
    dispatch(setCurrentProfile(data.user));
  };

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
    if (is_friend) {
      const friendshipId = friend[0].id;
      dispatch(deleteFriend(friendshipId)).then(() => {
        dispatch(fetchUser(currentUser.id));
      });
    }
  };

  const preview = profilePicUrl ? (
    <img src={profilePicUrl} style={{ width: "200px" }} />
  ) : null;

  return (
    <>
      <h2 id="h1">Upload profile picture</h2>
      <hr />
      <br></br>
      <form onSubmit={uploadPic} id="submit-form">
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
      </div>
      {not_self || <div>
      {is_friend ? ( 
        <button onClick={handleDelete}>Delete Friend</button>
      ) : (
        <button onClick={handleAdd}>Add Friend</button>
      )
  
      }
      </div>}
    </>
  );
}

export default ProfileTop;
