import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriend, addFriend, fetchFriend } from "../../store/friend";
import { fetchUser } from '../../store/user';
import { setCurrentProfile } from "../../store/user";
import { useState } from "react";
import csrfFetch from "../../store/csrf";

function ProfileTop({ sessionUser, currentUser }) {
    const dispatch = useDispatch();

    const [profilePic, setProfilePic] = useState();
    const [profilePicUrl, setProfilePicUrl] = useState(null);


    const friend = useSelector(({friend}) => {
        const output = Object.values(friend).filter((f) => {
            return (f.sender_id == sessionUser.id && f.receiver_id == currentUser.id) ||
            (f.sender_id == currentUser.id && f.receiver_id == sessionUser.id);
        });
        return output;
    });

    const is_friend = currentUser.friends.includes(sessionUser.id);

    useEffect(() => {
        
    }, [sessionUser.id]);


    const handleAdd = (e) => {
        e.preventDefault()
        const friendRequest = {sender_id: sessionUser.id, receiver_id: currentUser.id }
        return dispatch(addFriend(friendRequest))
    }
    
    const handleDelete = (e) => {
        e.preventDefault()
        if (is_friend) {
            const friendshipId = friend[0].id;
            dispatch(deleteFriend(friendshipId)).then(() => {
                dispatch(fetchUser(currentUser.id));
            });
        };
    }
    const uploadPic = async e => {

        const formData = new FormData();
        if (profilePic) formData.append('user[profilePic]', profilePic);

        const res = await csrfFetch(`/api/users/${currentUser.id}`, {
                method: 'PUT',
                body: formData
            });
        const data = await res.json();
        return dispatch(setCurrentProfile(data.user));
    }

    const handleFile = e => {
        const file = e.target.files[0];
        const selectButton = document.getElementById("upload-photo-button");
        const uploadButton = document.getElementById("submit-photo-button-dead");
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setProfilePic(file);
                setProfilePicUrl(fileReader.result);
            }
            selectButton.id = "upload-photo-button-dead";
            uploadButton.id = "submit-photo-button";
        }
    }

    const preview = profilePicUrl ? <img src={profilePicUrl} style={{width: "200px"}}/> : null

    return (
        <div>
        { is_friend ? 
            <button onClick={handleDelete}>Delete Friend</button> : 
            <button onClick={handleAdd}>Add Friend</button>
        }
        <form onSubmit={uploadPic}>
            <input type="file" onChange={handleFile} />
            <button type="submit">Submit</button>
        </form>

        <div id="img-preview" >
                {preview && <h4>Image preview</h4>}
                <br></br>
                {preview}
            </div>
        </div>
    )

}

export default ProfileTop