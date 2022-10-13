import { Link } from "react-router-dom"
import { logout } from "../../../store/session"
import { useDispatch, useSelector } from "react-redux"


function ProfilePicModal() {
    const dispatch = useDispatch() 
    const user = useSelector(state => state.session.user)

    return (
        <div>
            <Link to={`/ProfilePage/${user.id}`} className="navItem">Profile Page!</Link>
            <button onClick={() => dispatch(logout())} className="navItem">Sign Out</button>
        </div>
    )

}

export default ProfilePicModal




