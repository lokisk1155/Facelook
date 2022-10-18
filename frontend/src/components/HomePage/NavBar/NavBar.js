import './NavBar.css'
import linkedin from './imgs/Li.png'
import github from './imgs/GitHub.png'
import profilePic from './imgs/blank.png'
import { useState } from "react"
import ProfilePicModal from "./ProfilePicModal"
import SearchBar from './SearchBar'
import { useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import Facebook from './imgs/Facebook.png'


function NavBar() {

    const user = useSelector(state => state.session.user)
    const [profileModal, setProfileModal] = useState(false)
    const [toggle, setToggle] = useState(true)  
    const history = useHistory()

    function closeModal() {
        return setProfileModal(!toggle)
    }


    if (!user) {
        return <Redirect to="/login_page" />
    }

    return (
        <div className="omega-navbar">
                <div className="navbar-search-bar">
                    <img src={Facebook} width="40px" alt="facebook" onClick={() => history.push("/")}></img>
                    <SearchBar />
                </div>
                <div className="personal-plugs">
                    <img src={linkedin} alt="linkedin" className="linkedin" onClick={() => window.open("https://www.linkedin.com/in/shawn-mallon-3050b7161")}></img>
                    <img src={github} alt="github" className="github"  onClick={() => window.open("https://github.com/lokisk1155/FaceOok")}></img>
                
                    <div className="navbar-profile-modal">
                        <img src={profilePic} alt="profile-pic" className="profile-pic-modal" onClick={() => {setToggle(!toggle)
                            setProfileModal(toggle)}}/>
                        {profileModal && <ProfilePicModal closeModal={closeModal} user={user}/>}
                    </div>
                </div>
        </div>
    )

}

export default NavBar 