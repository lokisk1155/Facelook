import './createPostModal.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createPost } from '../../store/post'
import profilePic from '../HomePage/NavBar/imgs/blank.png'
import { updatePost } from '../../store/post'
import { useParams } from 'react-router-dom'


function CreatePostModal({ currentUser, closeModal, postContent, header, type, postId }) {
    const dispatch = useDispatch()

    const { id } = useParams()

    const [content, setContent] = useState('')
    const [user_id, setUser_id] = useState(id)

    const [title, setHeader] = useState(header)
    const [placeHolder, setPlaceHolder] = useState(postContent)

    console.log(user_id)
    console.log(postId)

    const handlePostSubmit = (e) => {
        e.preventDefault()
        if (type === "create") {
            let post = {content, user_id}
            dispatch(createPost(post))
            return closeModal(false)
        } else if (type === "update") {
            let post = {content, id: postId}
            dispatch(updatePost(post))
            return closeModal(false)
        }
    }
    return (
        <div className='omega-create-post-modal'>

            
        <form  className="actual-create-post-form" onSubmit={handlePostSubmit}>
            <div className='modal-header'>
                <h3>{title}</h3>
                <button className="close-button" onClick={(() => closeModal(false))}>X</button>
                
            </div>          
            <div className="pic-holder">
                {<img className="profile-pic-inside-create-post" src={profilePic}></img>}

                <p className='user-name-text'>{`${currentUser.first_name} ${currentUser.last_name}`}</p>
            </div>  
            <textarea className="new-post-input" type="text" placeholder={placeHolder} 
                    onChange={((e) => setContent(e.target.value))}>

            </textarea>
            <input className="submit-post-button" value="post" type="submit" />
        </form>

        </div>
    )


}

export default CreatePostModal