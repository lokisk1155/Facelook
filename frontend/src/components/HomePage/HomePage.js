import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './HomePage.css'
import NavBar from "./NavBar/NavBar";
import { useEffect, useState } from "react";
import { createPost } from "../../store/post";
import { fetchtPosts } from "../../store/post";
import { getPosts } from "../../store/post";


function HomePage() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user);
    const posts = useSelector(state => {
            if (state.post) {
                return Object.values(state.post)
            } else {
                return []
            }
    })

    const [content, setContent] = useState('')
    const [user_id, setUser_id] = useState('')

    useEffect(() => {
        loadUser()
        dispatch(fetchtPosts())
    }, [])

    if (!user) {
        return <Redirect to="/login_page" />;
    }

    function loadUser() {
        if (user) {
            setUser_id(user.id)
        } 
    }

   

    function handleSubmit(e) {
        e.preventDefault()
        let post = {content, user_id}
        dispatch(createPost(post))
    }



    return (
        <div>
            <div>
            <   NavBar user={user} />
            </div>

            <div className="omega-home-page-container">
                <div className="left-nav-bar-container"></div>
                <div className="middle-nav-bar-container">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="post content here!" onChange={((e) => setContent(e.target.value))}></input>
                        <input type="submit" />
                    </form>

                    {posts && <p>{posts.map(post => <div>{post.content}</div>)}</p>}
                </div>
                <div className="right-nav-bar-container"></div>
            

            </div>
        </div>
    
    )

}

export default HomePage