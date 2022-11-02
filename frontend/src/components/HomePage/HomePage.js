import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './HomePage.css'
import NavBar from "./NavBar/NavBar";
import { useEffect, useState } from "react";
import { createPost } from "../../store/post";
import { fetchtPosts } from "../../store/post";
import CreatePostModal from "../ProfilePage/createPostModal";
import { deletePost } from "../../store/post";
import profilePic from './NavBar/imgs/blank.png'
import { fetchUsers } from "../../store/user";
import { Link } from "react-router-dom";


function HomePage() {
    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.session.user);
    const posts = useSelector(state => {
            if (state.post) {
                return Object.values(state.post)
            } else {
                return []
            }
    })


    const users = useSelector(state => {
        if (state.user) {
            return state.user
        } else {
            return []
        }
    })

    const [postDeleted, setPostDeleted] = useState(false)
    const [checkPost, setCheckPost] = useState(null)
    const [togglePost, setTogglePost] = useState(false)
  
    useEffect(() => {
        dispatch(fetchUsers()).then((data) => {
            dispatch(fetchtPosts())
        })

        if (postDeleted) {
            setPostDeleted(false)
        }
    }, [postDeleted])


    const handleNewPost = (e) => {
        e.preventDefault()
        setTogglePost(true)
    }

    function handleDeletePost(post) {
        if (post.user_id === currentUser.id) {
            dispatch(deletePost(post.id))
            setPostDeleted(true)
            return 
        }
        return 
    }

    const handleCheckPost = (postId) => (e) => {
        e.preventDefault()
        setCheckPost(postId)
    }

    const temp = users[1]
    if (!temp) {
        return null
    }

    return (
        <div className="omega-posts-container">
            <div className="post-feed-container-homepage">
                
            <div className="create-post-modal">
                    <button className="new-post-button" onClick={handleNewPost}><label className="place-holder-text-new-post">What's on your mind?</label>
                    </button>

                    <div className="pic-holder">
                        {<img className="profile-pic-inside-create-post" src={profilePic}></img>}
                    </div>

                    <div className="modal-holder">
                        {togglePost && <CreatePostModal type={"create"} currentUser={currentUser} postContent={"What's on your mind?"} header={'Create post'} closeModal={setTogglePost} userId={currentUser.id}/>}
                    </div>           
            </div>
                

                    {posts && <div className="individual-post-container">{posts.map(post => {
                        return <div key={post.id}className="individual-post">
                                    <div key={post.id} className="post-header">
                                        <Link to={`/ProfilePage/${post.user_id}`}>
                                            <img key={post.id} className="post-pic" src={profilePic}></img>
                                        </Link>
                                            <h5 key={post.id} className="current-user-name">{`${users[post.user_id].first_name} ${users[post.user_id].last_name}`}</h5>
                                    </div>
                                    <p key={post.id} className="post-content">{post.content}</p>  
                                    {currentUser.id === post.user_id ? <button onClick={(() => handleDeletePost(post))}>Delete Post</button> : <div />}
                                    {currentUser.id === post.user_id ? <button onClick={handleCheckPost(post.id)}>Edit Post</button> : <div />}
                                    {checkPost === post.id && <CreatePostModal type="update" currentUser={currentUser} postId={post.id} postContent={post.content} header={'Edit post'} closeModal={setCheckPost}/>}
                            
                            </div>}).reverse()}
                        </div>
                    }
            

                </div>

        </div>
    
    )

}

export default HomePage