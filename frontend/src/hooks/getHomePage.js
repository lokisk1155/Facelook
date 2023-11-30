import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import { addAll, fetchStories } from '../store/story'
import { fetchPosts, receivePosts } from '../store/post'

export default function GetHomePage() {
  const dispatch = useDispatch()

  const [storiesHydrated, setStoriesHydrated] = useState(null)
  const [postsHydrated, setPostsHydrated] = useState(null)

  const stories = useSelector((state) => state.stories)
  const posts = useSelector((state) => state.posts)
  const simpleUsersHydrated = useSelector((state) => {
    const isHydrated = Object.keys(state.simpleUsers).length > 0
    return isHydrated
  })

  const storiesCachedRef = useRef(stories)
  const postsCachedRef = useRef(posts)

  useEffect(() => {
    if (!Object.keys(postsCachedRef.current).length) {
      dispatch(fetchPosts()).then((data) => {
        postsCachedRef.current = data
        setPostsHydrated(true)
      })
    } else {
      dispatch(receivePosts(postsCachedRef.current))
      setPostsHydrated(true)
    }

    if (!Object.keys(storiesCachedRef.current).length) {
      dispatch(fetchStories()).then((data) => {
        storiesCachedRef.current = data
        setStoriesHydrated(true)
      })
    } else {
      dispatch(addAll(storiesCachedRef.current))
      setStoriesHydrated(true)
    }
  }, [dispatch])

  if (!storiesHydrated || !postsHydrated) {
    return null
  }

  return simpleUsersHydrated
}
