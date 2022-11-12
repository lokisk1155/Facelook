import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchFriend } from "../../store/friend"
import { useSelector } from "react-redux"

function Friends({ currentUser, sessionUser }) {
    const dispatch = useDispatch() 

    const friends = useSelector(state => {
        return state.friend 
    })

    console.log(friends)

    

    return (
        <div>testest</div>
    )

}

export default Friends 
