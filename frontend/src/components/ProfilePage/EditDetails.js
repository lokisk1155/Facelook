import { useState } from 'react'
import './EditDetails.css'
import { updateUser } from '../../store/user'
import { useDispatch } from 'react-redux'

function EditDetails({ currentUser, redirect, closeForm }) {
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

    const handleCloseForm = (e) => {
        e.preventDefault() 
        return closeForm(false)
    }

    const handleLocation = (e) => {
        e.preventDefault() 
        return redirect(false, "placesLived")
    }

    return (
        <div className="edit-details-modal" >
            <p>...work in prog...</p>
            <button onClick={handleCloseForm}>X</button>
            <button onClick={handleLocation}>lets go to location in about</button>
            <form onSubmit={handleSubmit}>



                <input type="submit" ></input>
            </form>
        </div>
    )

}

export default EditDetails