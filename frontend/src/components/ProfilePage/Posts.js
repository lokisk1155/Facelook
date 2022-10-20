import { useParams } from "react-router-dom"
import { fetchUser, updateUser} from "../../store/user"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getCurrent } from "../../store/user"
import Featured from "./Featured"
import EditDetails from "./EditDetails"
import { fetchtPosts, updatePost } from "../../store/post"
import { createPost } from "../../store/post"
import './Posts.css'
import CreatePostModal from "./createPostModal"
import profilePic from '../HomePage/NavBar/imgs/blank.png'
import { deletePost } from "../../store/post"


function Posts({ redirect, currentUser }) {
    const dispatch = useDispatch()

    const posts = useSelector(state => {
        if (state.post) {
            return Object.values(state.post)
        } else {
            return []
        }
    })

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
    const [name, setName] = useState('')

    const [togglePost, setTogglePost] = useState(false)
    const [customPost, setCustomPost] = useState(false)

    const [work, setWork] = useState('')
    const [content, setContent] = useState('ayeee')

    const reversedArray = posts.reverse()

    function checkUser() {
        if (currentUser) {
            setName(`${currentUser.first_name} ${currentUser.last_name}`)
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

    function forceRender() {
        return 
    }

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


    const handleNewPost = (e) => {
        e.preventDefault()
        return setTogglePost(true)
    }

    function handleDeletePost(postId) {
        dispatch(deletePost(postId))
        return forceRender() 
    }

    function handleUpdatePost(id) {
        let post = {content, id}
        dispatch(updatePost(post))
        return forceRender()
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
        <div className="omega-posts-container">
            <div className="post-feed-container">
                
            <div className="create-post-modal">
                    <button className="new-post-button" onClick={handleNewPost}><label className="place-holder-text-new-post">What's on your mind?</label>
                    </button>

                    <div className="pic-holder">
                        {<img className="profile-pic-inside-create-post" src={profilePic}></img>}
                    </div>

                    <div className="modal-holder">
                        {togglePost && <CreatePostModal currentUser={currentUser} closeModal={setTogglePost}/>}
                    </div>           
            </div>
                

                    {posts && <div className="individual-post-container">{posts.map(post => {
                        return <div key={post.id}className="individual-post">
                                <div className="post-header">
                                    <img className="post-pic" src={profilePic}></img>
                                        <h5 className="current-user-name">{name}</h5>
                                </div>
                                <p className="post-content">{post.content}</p>  
                                <button onClick={(() => handleDeletePost(post.id))}>Delete Post</button>
                                <button onClick={(() => handleUpdatePost(post.id))}>Edit Post</button>
                            
                            </div>})}
                        </div>
                    }
            

                </div>

        </div>
    </div>
    )
}

export default Posts

// const [togglePost, setTogglePost] = useState(false)
// const [customPost, setCustomPost] = useState(false)