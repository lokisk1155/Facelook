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
                <Route exact path="/ProfilePage/:id/posts">
                    <ProfileTop />
                    <Posts />
                </Route>

                <Route path="/ProfilePage/:id/about">
                    <ProfileTop />
                    <AboutPage  />
                    <Overview />
                </Route>
                        
                <Route exact path="/ProfilePage/:id/about/work_and_education">
                    <ProfileTop />
                    <AboutPage  />
                    <WorkEd />
                </Route>
                        
                <Route exact path="/ProfilePage/:id/about/places_lived">
                    <ProfileTop />
                    <AboutPage  />
                    <PlacesLived />
                </Route>
                        
                <Route exact path="/ProfilePage/:id/about/Contact Info">
                    <ProfileTop />
                    <AboutPage  />
                    <ContactInfo />
                </Route>
                        
                <Route exact path="/ProfilePage/:id/about/Family and Relationships">
                    <ProfileTop />
                    <AboutPage  />
                    <Relationship />
                </Route>

                <Route exact path="/ProfilePage/:id/friends">
                    <ProfileTop /> 
                    <Friends /> 
                </Route>             
            </Switch>
        </>
    )

}