import './createPostModal.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createPost } from '../../store/post'


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
                <button className="close-button" onClick={(() => closeModal(false))}>X</button>
                <h3>Create Post</h3>
            </div>            
            <textarea className="new-post-input" type="text" placeholder="post content here!" 
                    onChange={((e) => setContent(e.target.value))}>

            </textarea>
            <input className="submit-post-button" type="submit" />
        </form>

        </div>
    )


}

export default CreatePostModal