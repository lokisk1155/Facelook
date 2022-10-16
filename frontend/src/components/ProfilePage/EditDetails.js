import { useState } from 'react'
import './EditDetails.css'
import { updateUser } from '../../store/user'
import { useDispatch } from 'react-redux'

function EditDetails({ currentUser, redirect }) {
    const dispatch = useDispatch() 

    const self = currentUser

    console.log(redirect, 'edit details')

    const [location, setLocation] = useState('')

    const [renderString, setRenderString] = useState('')


    if (self.location) {
        setLocation(self.location)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            ...self, location 
        }
        dispatch(updateUser(user))
        return redirect(false, renderString)
    }

    return (
        <div className="edit-details-modal" >
            <p>...work in prog...</p>
            <form onSubmit={handleSubmit}>



                <input type="submit" ></input>
            </form>
        </div>
    )

}

export default EditDetails