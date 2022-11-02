import './ProfileHeaders.css'
import { useState } from 'react'
import Posts from './Posts'
import AboutPage from './AboutPage/AboutPage'
import Overview from "./AboutPage/Overview";
import PlacesLived from "./AboutPage/PlacesLived";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent } from '../../store/user';
import { fetchUser } from '../../store/user';
import { fetchtPosts } from '../../store/post';

function ProfileHeader() {
    const dispatch = useDispatch() 


    const [showPosts, setShowPosts] = useState(true)
    const [customPosts, setCustomPosts] = useState(false)

    const [showAbout, setShowAbout] = useState(false)
    const [customAbout, setCustomAbout] = useState(false)

    const [renderString, setRenderString] = useState('')

    const { id } = useParams() 


    const currentUser = useSelector(getCurrent(id));

    const sessionUser = useSelector(state => {
        return state.session.user.id
    })

    useEffect(() => {
       // fireEmergency() 
        dispatch(fetchUser(id))
    }, [id])


    

    function redirect(header, component) {
        
        if (!header) {
            setShowAbout(true)
            setShowPosts(false)
            setCustomPosts(false)
            // fireEmergency()
        } else {
            setShowAbout(false)
            setShowPosts(true)
            setCustomPosts(false)
            // fireEmergency()
        }

        switch(component) {
            case "overview":
                setRenderString('overview')
                break 
            case "workEd":
                setRenderString('workEd')
                break 
            case "placesLived":
                setRenderString("placesLived")
                break 
            case "relationship":
                setRenderString("relationship")
                break
        }
        
        return 
    }
    if (!currentUser) {
        return null 
    }
    return ( 
        <div>

        <div className="profile-selectors" >
            <button className="posts-selector-button" onClick={(() => {setCustomPosts(!customPosts)
                setShowPosts(true)
                setShowAbout(false)
                setCustomAbout(false)
                // fireEmergency()
                
                })}>Posts</button>

            <button className="about-selector-button" onClick={(() => {setCustomAbout(!customAbout)
                setShowAbout(true)
                setShowPosts(false)
                setCustomPosts(false)
                // fireEmergency()
                })}>About</button>
        </div>

        {showPosts && <Posts currentUser={currentUser} sessionUser={sessionUser} redirect={redirect}/>}
        {showAbout && <AboutPage currentUser={currentUser} sessionUser={sessionUser} renderString={renderString}/>}


        </div>
    )


}


export default ProfileHeader