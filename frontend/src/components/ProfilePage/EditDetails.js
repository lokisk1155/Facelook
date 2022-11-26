import './EditDetails.css'

function EditDetails({ currentUser, redirect, closeForm }) {
    const self = currentUser

    const handleSubmit = (e, component) => {
        e.preventDefault()
        return redirect(false, component)
    }

    const handleCloseForm = (e) => {
        e.preventDefault() 
        return closeForm(false)
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
                    {<p>{currentUser.work}</p> ||<button onClick={((e) => handleSubmit(e, 'workEd'))}>add a work place</button>}
                </div>

                <div>
                    <h4>Education</h4>
                    <button onClick={((e) => handleSubmit(e, 'education'))}>From {self.high_school || 'Add your hometown'}</button>
                    <button onClick={((e) => handleSubmit(e, 'education'))}>From {self.college || 'Add your hometown'}</button>

                </div>


                <div>
                    <h4>Current City</h4>
                    <button onClick={((e) => handleSubmit(e, 'placesLived'))}>Lives in {self.location || 'Add your current city'}</button>
                </div>
              


                <div>
                    <h4>Relationship</h4>
                    <button onClick={((e) => handleSubmit(e, 'relationship'))}> {self.relationship || 'Add Relationship status'}</button>
                </div>

                <div>
                    <h4>Joined Facebook</h4>
                    <p>Joined on {self.created_at}</p>
                </div>
            
                <div>
                <button onClick={((e) => handleSubmit(e, 'overview'))}>Update your information</button>
                <button onClick={handleCloseForm}>Cancel</button>
                <button onClick={handleCloseForm}>Save</button>
                </div>
            </div>
        </div>
    )

}

export default EditDetails

