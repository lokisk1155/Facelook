import './createPostModal.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createPost } from '../../store/post'


function CreatePostModal({ currentUser}) {
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
        <form onSubmit={handlePostSubmit}>
            <input className="new-post-input" type="text" placeholder="post content here!" onChange={((e) => setContent(e.target.value))}></input>
            <input type="submit" />
        </form>
    )


}

export default CreatePostModal