import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { fetchUsersPosts, userReceivePosts } from '../store/profilePage'
import { fetchUser, setCurrentProfile } from '../store/user'
import { fetchFriends, receiveFriends } from '../store/friend'

export default function GetUserProfile() {
  const dispatch = useDispatch()

  const { id } = useParams()

  const [storeHydrated, setStoreHydrated] = useState(null)

  useEffect(() => {
    const profilePage = async () => {
      const postData = fetchUsersPosts(id)
      const userData = await fetchUser(id)
      const friendsData = await fetchFriends(Object.values(userData.friends))
      dispatch(setCurrentProfile(userData))
      dispatch(userReceivePosts(postData))
      dispatch(receiveFriends(friendsData))
    }
    profilePage().then(() => {
      setTimeout(() => {
        setStoreHydrated(true)
      }, 750)
    })
  }, [dispatch, id])

  return storeHydrated
}
