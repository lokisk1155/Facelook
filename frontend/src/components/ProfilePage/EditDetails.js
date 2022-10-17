import { useState } from 'react'
import './EditDetails.css'
import { updateUser } from '../../store/user'
import { useDispatch } from 'react-redux'

function EditDetails({ currentUser, redirect, closeForm }) {
    const dispatch = useDispatch() 

    const self = currentUser

    const [location, setLocation] = useState('')

    const [renderString, setRenderString] = useState('')


    if (self.location) {
        setLocation(self.location)
    }


    const handleCloseForm = (e) => {
        e.preventDefault() 
        return closeForm(false)
    }

    const handleLocation = (e) => {
        e.preventDefault() 
        return redirect(false, "placesLived")
    }

    const handleWorkEd = (e) => {
        e.preventDefault() 
        return redirect(false, "workEd")
    }

    const handleOverview = (e) => {
        e.preventDefault() 
        return redirect(false, "overview")
    }



    return (
    <div className="edit-details-modal">

    <div className="edit-details-container" >
        <h2 className='edit-details-header'>Edit details</h2> 
        <button className='edit-details-header' onClick={handleCloseForm}>X</button>
            <h3>Customize your intro</h3>
                <p>details will be set to public</p>
                <div className='edit-details-work'>
                    <h4>Work</h4>
                    {currentUser.work || <button onClick={handleWorkEd}>add a work place</button>}
                </div>


                <div>
                    <h4>Current City</h4>
                    <button onClick={handleLocation}>Lives in {self.location || 'Add your current city'}</button>
                </div>
                <div>
                    <h4>Hometown</h4>
                    <button onClick={handleLocation}>From {self.location || 'Add your hometown'}</button>
                </div>

                <div>
                    <h4>Relationship</h4>
                    <button>Add a relationship status</button>
                </div>

                <div>
                    <h4>Joined Facebook</h4>
                    <p>Joined on {self.created_at}</p>
                </div>
            
                <div>
                <button onClick={handleOverview}>Update your information</button>
                <button onClick={handleCloseForm}>Cancel</button>
                <button onClick={handleCloseForm}>Save</button>
                </div>
            </div>
        </div>
    )

}

export default EditDetails