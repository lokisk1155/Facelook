import "./EditProfile.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/user";
import { useParams } from "react-router-dom";

function EditProfile({ closeModal, cover, profile }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const currentUser = useSelector((state) => state.user[id]);

  console.log(currentUser);

  const [photoFile, setPhotoFile] = useState(null);

  const [photoUrl, setPhotoUrl] = useState(null);

  const [photoFileCover, setPhotoFileCover] = useState(null);

  const [photoUrlCover, setPhotoUrlCover] = useState(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (photoFile) {
      formData.append("user[profile_pic]", photoFile);
    }
    debugger;
    dispatch(updateUser(currentUser, formData));
  };

  const handleUpdateCoverPhoto = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (photoFileCover) {
      formData.append("user[cover_photo]", photoFileCover);
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

  const handleFileCover = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPhotoFileCover(file);
        setPhotoUrlCover(fileReader.result);
      };
    }
  };

  return (
    <div
      className="edit-profile-modal-container"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Edit Profile</h3>
      <div
        style={{
          height: "1px",
          width: "100%",
          borderBottom: "1px solid lightgrey",
        }}
      ></div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{}}>Profile Picture</h3>
        <input type="file" onChange={handleFile} />
        <button onClick={handleUpdateProfile}>upload</button>
        <img
          style={{
            height: "75px",
            width: "75px",
            borderRadius: "50%",
            alignSelf: "center",
          }}
          src={photoFile || profile}
        />
        <h3 style={{}}>Cover Photo</h3>
        <input type="file" onChange={handleFileCover} />
        <button onClick={handleUpdateCoverPhoto}>upload</button>
        <img
          style={{
            height: "150px",
            width: "80%",
            backgroundColor: "grey",
            alignSelf: "center",
          }}
          src={photoFileCover || cover}
        />
      </div>
    </div>
  );
}

export default EditProfile;
