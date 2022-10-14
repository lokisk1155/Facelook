import './ProfileHeaders.css'
import { useState } from 'react'
import Posts from './Posts'
import AboutPage from './AboutPage/AboutPage'

function ProfileHeader() {


    const [showPosts, setShowPosts] = useState(true)
    const [customPosts, setCustomPosts] = useState(false)

    const [showAbout, setShowAbout] = useState(false)
    const [customAbout, setCustomAbout] = useState(false)



    return (
        <div>

        <div className="profile-selectors" >
            <button className="posts-selector-button" onClick={(() => {setCustomPosts(!customPosts)
                setShowPosts(customPosts)
                setShowAbout(false)
                setCustomAbout(false)
                
                })}>Posts</button>

            <button className="about-selector-button" onClick={(() => {setCustomAbout(!customAbout)
                setShowAbout(customAbout)
                setShowPosts(false)
                setCustomPosts(false)
                })}>About</button>
        </div>

        {showPosts && <Posts />}
        {showAbout && <AboutPage />}


        </div>
    )


}


export default ProfileHeader