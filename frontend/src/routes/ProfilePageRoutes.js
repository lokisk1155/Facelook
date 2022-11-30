import { Switch, Route } from "react-router-dom"
import ProfileHeader from "../components/ProfilePage/ProfileHeader"
import AboutPage from "../components/ProfilePage/AboutPage/AboutPage"
import ProfileTop from "../components/ProfilePage/ProfileTop"
import HomePage from "../components/HomePage/HomePage"
import Posts from "../components/ProfilePage/Posts"

export function ProfilePageRoutes() {
    return (
        <> 
            <Switch>
                <Route exact path="/ProfilePage/:id">
                    <ProfileHeader />
                </Route>

                <Route exact path="/ProfilePage/:id/posts" /> 

                <Route path="/ProfilePage/:id/about">

                </Route>
            
                <Route exact path="/ProfilePage/:id/about/overview">

                </Route>
                        
                <Route exact path="/ProfilePage/:id/about/work_and_education">

                </Route>
                        
                <Route exact path="/ProfilePage/:id/about/places_lived">

                </Route>
                        
                <Route exact path="/ProfilePage/:id/about/Contact Info">

                </Route>
                        
                <Route exact path="/ProfilePage/:id/about/Family and Relationships">

                </Route>

                <Route exact path="/friends">

                </Route>
                    
                <Route exact path="/photos">

                </Route>
                
            </Switch>
        </>
    )

}