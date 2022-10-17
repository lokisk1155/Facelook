import './ProfileHeaders.css'
import { useState } from 'react'
import Posts from './Posts'
import AboutPage from './AboutPage/AboutPage'
import Overview from "./AboutPage/Overview";
import PlacesLived from "./AboutPage/PlacesLived";
import { useEffect } from 'react';

function ProfileHeader() {


    const [showPosts, setShowPosts] = useState(true)
    const [customPosts, setCustomPosts] = useState(false)

    const [showAbout, setShowAbout] = useState(false)
    const [customAbout, setCustomAbout] = useState(false)

    const [renderString, setRenderString] = useState('')


    useEffect(() => {
        fireEmergency() 
    }, [showPosts, showAbout])

    function fireEmergency() {

    }

    function redirect(header, component) {
        
        if (!header) {
            setShowAbout(true)
            setShowPosts(false)
            setCustomPosts(false)
            fireEmergency()
        } else {
            setShowAbout(false)
            setShowPosts(true)
            setCustomPosts(false)
            fireEmergency()
        }

        switch(component) {
            case "overview":
                break 
            case "workEd":
                setRenderString('workEd')
                break 
            case "placesLived":
                setRenderString("placesLived")
                break 
        }
        return 
    }
    
    return (
        <div>

        <div className="profile-selectors" >
            <button className="posts-selector-button" onClick={(() => {setCustomPosts(!customPosts)
                setShowPosts(true)
                setShowAbout(false)
                setCustomAbout(false)
                fireEmergency()
                
                })}>Posts</button>

            <button className="about-selector-button" onClick={(() => {setCustomAbout(!customAbout)
                setShowAbout(true)
                setShowPosts(false)
                setCustomPosts(false)
                fireEmergency()
                })}>About</button>
        </div>

        {showPosts && <Posts redirect={redirect}/>}
        {showAbout && <AboutPage renderString={renderString}/>}


        </div>
    )


}


export default ProfileHeader