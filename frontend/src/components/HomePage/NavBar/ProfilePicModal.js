import { Link } from "react-router-dom"
import { logout } from "../../../store/session"
import { useDispatch, useSelector } from "react-redux"
import './profilePicModal.css'


function ProfilePicModal({ closeModal }) {
    const dispatch = useDispatch() 
    const user = useSelector(state => state.session.user)

    return (
        <div className="omega-profile-modal-container">
            <div className="profile-pic-modal-container">
                <Link className="link-to-profile-page" to={`/ProfilePage/${user.id}`}>Profile Page!</Link>
                <button className="logout-button" onClick={() => dispatch(logout())}>Sign Out</button>
            </div>
        </div>
    )

}

export default ProfilePicModal




