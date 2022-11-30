import { Switch, Route } from "react-router-dom"
import ProfileHeader from "../components/ProfilePage/ProfileHeader"
import AboutPage from "../components/ProfilePage/AboutPage/AboutPage"
import ProfileTop from "../components/ProfilePage/ProfileTop"

export function ProfilePageRoutes() {
    return (
        <> 
            <Switch>
                <Route exact path="/ProfilePage/:id">
                    <ProfileHeader />
                    <Route exact path="/posts" /> 
                    <Route exact path="/about">
                        <ProfileTop />
                        <AboutPage renderString={"overview"}/>
                        <Route exact path="/overview" /> 
                        <Route exact path="/work_and_education" /> 
                        <Route exact path="/places_lived" /> 
                        <Route exact path="/Contact Info" /> 
                        <Route exact path="/Family and Relationships" />
                    </Route>
                    <Route exact path="/friends" /> 
                    <Route exact path="/photos" /> 
                </Route>
            </Switch>
        </>
    )

}