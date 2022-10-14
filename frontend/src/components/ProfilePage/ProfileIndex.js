import ProfileHeader from "./ProfileHeader";
import Posts from "./Posts";
import NavBar from "../HomePage/NavBar/NavBar";
import './ProfileIndex.css'

function ProfileIndex() {


    return (
       <div>
            <NavBar />
            <ProfileHeader />
            <Posts /> 
        </div>
    )

}

export default ProfileIndex 