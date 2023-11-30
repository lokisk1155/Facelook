import ProfileTop from '../components/ProfilePage/ProfileTop'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import AboutPageLinks from '../components/ProfilePage/AboutPage/AboutLinks'
import ContactInfo from '../components/ProfilePage/AboutPage/ContactInfo'
import Overview from '../components/ProfilePage/AboutPage/Overview'
import Relationship from '../components/ProfilePage/AboutPage/Relationship'
import WorkEd from '../components/ProfilePage/AboutPage/WorkEd'
import './profileAbout.css'

function ProfileAbout() {
  const { id } = useParams()

  const sessionUser = useSelector((state) => state.session.user)

  const currentUser = useSelector((state) => state.user[id])

  const friends = useSelector((state) => state.friends)

  return (
    <>
      <ProfileTop sessionUser={sessionUser} currentUser={currentUser} friends={friends} />
      <div className="about-content-container">
        <div className="about-page-links">
          <AboutPageLinks />
        </div>
        <div className="about-page-links-results">
          <>
            <Route
              exact
              path="/ProfilePage/:id/about"
              render={() => <Overview sessionUser={sessionUser} currentUser={currentUser} />}
            />
            <Route
              path="/ProfilePage/:id/about/work_and_education"
              render={() => <WorkEd sessionUser={sessionUser} currentUser={currentUser} />}
            />
            <Route
              path="/ProfilePage/:id/about/contact_info"
              render={() => <ContactInfo sessionUser={sessionUser} currentUser={currentUser} />}
            />
            <Route
              path="/ProfilePage/:id/about/family_and_relationships"
              render={() => <Relationship sessionUser={sessionUser} currentUser={currentUser} />}
            />
          </>
        </div>
      </div>
    </>
  )
}

export default ProfileAbout
