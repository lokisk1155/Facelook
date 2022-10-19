import './createPostModal.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createPost } from '../../store/post'
import profilePic from '../HomePage/NavBar/imgs/blank.png'


function CreatePostModal({ currentUser, closeModal }) {
    const dispatch = useDispatch()


    const [content, setContent] = useState('')
    const [user_id, setUser_id] = useState('')


    useEffect(() => {
        setUser() 
    },[])


    function handlePostSubmit(e) {
        e.preventDefault()
        let post = {content, user_id}
        dispatch(createPost(post))
        return closeModal(false)
    }

    function setUser() {
        if (currentUser) {
            setUser_id(currentUser.id)
        }
    }


    return (
        <div className='omega-create-post-modal'>

            
        <form  className="actual-create-post-form" onSubmit={handlePostSubmit}>
            <div className='modal-header'>
                <h3>Create Post</h3>
                <button className="close-button" onClick={(() => closeModal(false))}>X</button>
                
            </div>          
            <div className="pic-holder">
                {<img className="profile-pic-inside-create-post" src={profilePic}></img>}

                <p className='user-name-text'>{`${currentUser.first_name} ${currentUser.last_name}`}</p>
            </div>  
            <textarea className="new-post-input" type="text" placeholder="What's on your mind?" 
                    onChange={((e) => setContent(e.target.value))}>

            </textarea>
            <input className="submit-post-button" value="post" type="submit" />
        </form>

        </div>
    )


}

export default CreatePostModal