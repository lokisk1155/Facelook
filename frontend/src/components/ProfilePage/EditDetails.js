import { useState } from 'react'
import './EditDetails.css'
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

    const handleEducation = (e) => {
        e.preventDefault(0)
        return redirect(false, "education")
    }

    const handleRelationship = (e) => {
        e.preventDefault() 
        return redirect(false, "relationship")
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
                    {<p>{currentUser.work}</p> ||<button onClick={handleWorkEd}>add a work place</button>}
                </div>

                <div>
                    <h4>Education</h4>
                    <button onClick={handleEducation}>From {self.high_school || 'Add your hometown'}</button>
                    <button onClick={handleEducation}>From {self.college || 'Add your hometown'}</button>

                </div>


                <div>
                    <h4>Current City</h4>
                    <button onClick={handleLocation}>Lives in {self.current_location || 'Add your current city'}</button>
                </div>
                <div>
                    <h4>Hometown</h4>
                    <button onClick={handleLocation}>From {self.hometown || 'Add your hometown'}</button>
                </div>

                <div>
                    <h4>Relationship</h4>
                    {<p>{self.relationship}</p> || <button onClick={handleRelationship}>Add your hometown</button>}
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

