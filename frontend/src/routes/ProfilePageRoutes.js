import { Switch, Route } from "react-router-dom"
import ProfileHeader from "../components/ProfilePage/ProfileHeader"
import AboutPage from "../components/ProfilePage/AboutPage/AboutPage"
import ProfileTop from "../components/ProfilePage/ProfileTop"
import Overview from "../components/ProfilePage/AboutPage/Overview"
import HomePage from "../components/HomePage/HomePage"
import Posts from "../components/ProfilePage/Posts"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import WorkEd from "../components/ProfilePage/AboutPage/WorkEd"
import PlacesLived from "../components/ProfilePage/AboutPage/PlacesLived"
import ContactInfo from "../components/ProfilePage/AboutPage/ContactInfo"
import Relationship from "../components/ProfilePage/AboutPage/Relationship"
import Friends from "../components/ProfilePage/Friends"
import { fetchUser } from "../store/user"

export function ProfilePageRoutes() {
    return (
        <> 
            <Switch>
                <Route exact path="/ProfilePage/:id" render={() => <><ProfileTop/><Posts/></>} />
                <Route exact path="/ProfilePage/:id/friends" render={() => <><ProfileTop/><Friends/></>}/>   
                <Route exact path="/ProfilePage/:id/about" render={() => <><ProfileTop/><AboutPage/><Overview /></>}/>
                <Route exact path="/ProfilePage/:id/about/work_and_education" render={() => <><ProfileTop/><AboutPage/><WorkEd /></>} />
                <Route exact path="/ProfilePage/:id/about/places_lived" render={() => <><ProfileTop/><AboutPage/><PlacesLived/></>}/>
                <Route exact path="/ProfilePage/:id/about/contact_info" render={() => <><ProfileTop/><Posts/></>} /> 
                <Route exact path="/ProfilePage/:id/about/family_and_relationships" render={() => <><ProfileTop/><AboutPage/><Relationship/></>} />
            </Switch>
        </>
    )

}