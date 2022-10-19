import { Link } from "react-router-dom"
import { logout } from "../../../store/session"
import { useDispatch, useSelector } from "react-redux"
import './profilePicModal.css'
import profilePic from './imgs/blank.png'


function ProfilePicModal({ closeModal }) {
    const dispatch = useDispatch() 
    const user = useSelector(state => state.session.user)

    return (
        <div className="omega-profile-modal-container">
            <div className="profile-pic-modal-container">
                
                    <Link className="link-to-profile-page" to={`/ProfilePage/${user.id}`}>
                        <button className="link-button">
                            <img className="link-profile-pic" src={profilePic} />
                            <p className="link-user-name">{user.first_name} {user.last_name}</p>
                        </button>
                    </Link>
               

                <div>
                <button className="logout-button" onClick={() => dispatch(logout())}>
                    <label className="logout-button-text">
                        Log Out
                    </label>
                </button>
                </div>
            </div>
        </div>
    )

}

export default ProfilePicModal




