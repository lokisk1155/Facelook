import csrfFetch from "./csrf";

const RECEIVE_POST = 'post/receivePost';
const RECEIVE_POSTS = 'post/receivePosts';

export const receivePost = post => ({
    type: RECEIVE_POST,
    payload: post
})

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    payload: posts
})

export const fetchtPosts = () => async dispatch => {
    const res = await csrfFetch(`/api/posts`);

    if (res.ok) {
        const data = await res.json();
        dispatch(receivePosts(data));
    }
}


export const createPost = post => async dispatch => {
    const res = await csrfFetch('/api/posts', {
        method: "POST",
        body: JSON.stringify(post)
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePosts(data));
    }
}

const postsReducer = (previousState = {}, action) => {
    switch(action.type) {
        case RECEIVE_POST:
            return { ...previousState, [action.payload.id]: action.payload };
        case RECEIVE_POSTS:
            return { ...previousState, ...action.payload };
        default:
            return previousState; 
    }
}

export default postsReducer;