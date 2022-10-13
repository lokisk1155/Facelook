import { Redirect, useParams } from "react-router-dom"
import { fetchUser, getUser } from "../../store/user"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"



function ProfilePage() {
    const dispatch = useDispatch()

    const { id } = useParams() 

    const user = useSelector((state) => {
        if (!state.user.user) {
            return null 
        } else {
            return Object.values(state.user.user)
        }
    })


    useEffect(() => {
        dispatch(fetchUser(id))
    }, [id])

    if (user === null) {
        return <Redirect to="/" />
    }
    
    return (
        <div>
            <li>{`${user[2]} ${user[3]}`}</li>
            <li>{user[1]}</li>
            <li>{`${user[4]}/${user[5]}/${user[6]}`}</li>
            <li>{user[7]}</li>
            <li>{user[8]}</li> 
        </div>
    )
}

export default ProfilePage

{/* <li>{`${user[2]} ${user[3]}`}</li>
<li>{user[1]}</li>
<li>{`${user[4]}/${user[5]}/${user[6]}`}</li>
<li>{user[7]}</li>
<li>{user[8]}</li> */}