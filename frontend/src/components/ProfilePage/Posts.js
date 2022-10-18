import { useParams } from "react-router-dom"
import { fetchUser, updateUser} from "../../store/user"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getCurrent } from "../../store/user"
import Featured from "./Featured"
import EditDetails from "./EditDetails"
import { fetchtPosts } from "../../store/post"
import { createPost } from "../../store/post"
import './Posts.css'



function Posts({ redirect, currentUser }) {
    const dispatch = useDispatch()

    const posts = useSelector(state => {
        if (state.post) {
            return Object.values(state.post)
        } else {
            return []
        }
    })

    const [content, setContent] = useState('')
    const [user_id, setUser_id] = useState('')
 

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [bio, setBio] = useState('')
    const [toggleBio, setToggleBio] = useState(false)
    const [details, setDetails] = useState(false)
    const [featured, setFeatured] = useState('')
    const [location, setLocation] = useState('')
    const [customFeatured, setCustomFeatured] = useState(true)
    const [customEdit, setCustomEdit] = useState(true)
    const [customBio, setCustomBio] = useState(true)

    const [work, setWork] = useState('')


    function checkUser() {
        if (currentUser) {
            setUser_id(currentUser.id)
            setDay(currentUser.day)
            setMonth(currentUser.month)
            setYear(currentUser.year)
            setBio(currentUser.bio)
            setFeatured(currentUser.featured)
            setLocation(currentUser.location)
            setWork(currentUser.work)
        }

    }

    let antiToggle = !toggleBio

    useEffect(() => {
        checkUser()
        dispatch(fetchtPosts())
    }, [])

   
  

    const handleBioSubmit = (e) => {
        e.preventDefault() 
        setCustomBio(!customBio)
        setToggleBio(customBio)
        const user = {
            ...currentUser, bio
        }
        user.password = currentUser.password
        dispatch(updateUser(user))
    }

    function handlePostSubmit(e) {
        e.preventDefault()
        let post = {content, user_id}
        dispatch(createPost(post))
    }

   


    return (
    <div className="omega-profile-page-container">
        <div className="intro-container">
            <h2 className="intro-header">Intro </h2>
            <div>
            <h4 className="actual-bio">{bio}</h4>
            {antiToggle && <button className="add-bio-button" onClick={(() => {setCustomBio(!customBio)
                setToggleBio(customBio)})}>{'Edit Bio'}</button>}
                <div className="edit-bio-container">   
                    {toggleBio && <textarea className="text-area-bio" defaultValue="Describe who you are" onChange={(e) => setBio(e.target.value)}>
                        </textarea>}
                    <div>
                        <div>
                        {toggleBio && <button className="bio-cancel-button" onClick={(() => {setCustomBio(!customBio)
                            setToggleBio(customBio)})}>Cancel</button>}
                        {toggleBio && <button className="bio-save-button" onClick={handleBioSubmit}>Save</button>}
                        </div>
                    </div>
                    
                </div>
            </div>
                    {work && <h3>Works at {work}</h3>}
                    {location && <h3>Lives at {location}</h3>}
            <div>
                
            </div>

            <div>
                    <button className="edit-details-button" onClick={(() => {setCustomEdit(!customEdit)
                    setDetails(customEdit)})}>Edit Details</button>

                    {details && <EditDetails closeForm={setDetails} redirect={redirect} currentUser={currentUser}/>}
            </div>
            <div>
            <div>
                <button className="add-featured-button" onClick={(() => {setCustomFeatured(!customFeatured)
                            setFeatured(customFeatured)})}>Add featured</button>
            </div>
            <div>
                {featured && <Featured />}
            </div>
            </div>
        </div>
        <div className="posts-container">
        <   form onSubmit={handlePostSubmit}>
                <input type="text" placeholder="post content here!" onChange={((e) => setContent(e.target.value))}></input>
                <input type="submit" />
            </form>
            <div>
                {posts && <p>{posts.map(post => <div>{post.content}</div>)}</p>}
            </div>
        </div>
    </div>
    )
}

export default Posts

