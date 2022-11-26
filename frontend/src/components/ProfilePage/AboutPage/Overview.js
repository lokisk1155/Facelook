import { updateUser } from "../../../store/user"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getCurrent } from "../../../store/user"
import { useSelector } from "react-redux"
import { fetchUser } from "../../../store/user"
import { useEffect, useState } from "react"


function Overview({ currentUser, isUser }) {
    const dispatch = useDispatch()

    const [workPlace, setWorkPlace] = useState('')
    const [toggleWork, setToggleWork] = useState(false)
    const [fakeWork, setFakeWork] = useState('')
    const [toggleWorkEdit, setToggleWorkEdit] = useState(false)

    const [education, setEducation] = useState('')
    const [toggleEducation, setToggleEducation] = useState(false)
    const [fakeEducation, setFakeEducation] = useState('')
    const [toggleEducationEdit, setToggleEducationEdit] = useState(false)

    const [location, setLocation] = useState('')
    const [toggleLocation, setToggleLocation] = useState(false)
    const [fakeLocation, setFakeLocation] = useState('')
    const [toggleLocationEdit, setToggleLocationEdit] = useState(false)

    const [relationship, setRelationShip] = useState('')
    const [toggleRelationship, setToggleRelationship] = useState(false)
    const [fakeRelationship, setFakeRelationship] = useState('')
    const [toggleRelationshipEdit, setToggleRelationshipEdit] = useState(false)


    useEffect(() => {
        checkParams()
    }, [])

    function checkParams() {
        if (currentUser) {
            setWorkPlace(currentUser.work)
            setRelationShip(currentUser.relationship)
            setEducation(currentUser.education)
            setLocation(currentUser.location)
        }
    }


    const handleWork = () => {
        setWorkPlace(fakeWork)
        let work = fakeWork
        const user = {
            ...currentUser, work
        }
        return dispatch(updateUser(user))
    }

    const handleEducation = () => {
        setEducation(fakeEducation)
        let education = fakeEducation
        const user = {
            ...currentUser, education
        }
        return dispatch(updateUser(user))
    }

    const handleLocation = () => {
        setLocation(fakeLocation)
        let location = fakeLocation 
        const user = {
            ...currentUser, location
        }
        return dispatch(updateUser(user))
    }

    const handleRelationship = () => {
        setRelationShip(fakeRelationship)
        let relationship = fakeRelationship
        const user = {
            ...currentUser, relationship
        }
        return dispatch(updateUser(user))
    }

    function handleClick() {
        return setToggleWorkEdit(true)
    }


    return (
        <div>
            <div>
                <p>{workPlace}</p>
                {!workPlace && isUser && <button onClick={(() => {
                    setToggleWork(true)
                })}>Add a workplace</button>}
                {toggleWork && !workPlace &&
                <form onSubmit={handleWork}>
                    <input type="text" placeholder="Company" onChange={((e) => setFakeWork(e.target.value))}/>
                    <button onClick={(() => setToggleWork(false))}>cancel</button>
                    <input type="submit" value="save"/>
                </form>}

                {isUser && workPlace && <button onClick={handleClick}>Edit Post</button>}
                {toggleWorkEdit && <form onSubmit={handleWork}>
                    <input type="text" placeholder="Company" onChange={((e) => setFakeWork(e.target.value))}></input>
                    <button onClick={(() => setToggleWorkEdit(false))}>cancel</button>
                    <input type="submit" value="save"/>
                </form>}
            </div>

            <div>
                <p>{education}</p>
                {!education && isUser && <button onClick={(() => {
                    setToggleEducation(true)
                })}>Add Education</button>}
                {toggleEducation && !education && 
                 <form onSubmit={handleEducation}>
                    <input type="text" placeholder="Institution" onChange={((e) => setFakeEducation(e.target.value))}/>
                    <button onClick={(() => setToggleEducation(false))}>cancel</button>
                    <input type="submit" value="save"/>
                </form>}

                {isUser && education && <button onClick={(() => setToggleEducationEdit(true))}>Edit Education</button>}
                {toggleEducationEdit && <form onSubmit={handleEducation}>
                    <input type="text" placeholder="Institution" onChange={((e) => setFakeEducation(e.target.value))}></input>
                    <button onClick={(() => setToggleEducationEdit(false))}>cancel</button>
                    <input type="submit" value="save"/>
                </form>}
            </div>

            <div>
                <p>{location}</p>
                {!location && isUser && <button onClick={(() => {
                        setToggleLocation(true)
                    })}>Add Location</button>}
                    {toggleLocation && !location&& 
                    <form onSubmit={handleLocation}>
                        <input type="text" placeholder="Location" onChange={((e) => setFakeLocation(e.target.value))}/>
                        <button onClick={(() => setToggleLocation(false))}>cancel</button>
                        <input type="submit" value="save"/>
                    </form>}

                    {isUser && location && <button onClick={(() => setToggleLocationEdit(true))}>Change Primary Location</button>}
                    {toggleLocationEdit && <form onSubmit={handleLocation}>
                        <input type="text" placeholder="Location" onChange={((e) => setFakeLocation(e.target.value))}></input>
                        <button onClick={(() => setToggleLocationEdit(false))}>cancel</button>
                        <input type="submit" value="save"/>
                    </form>}
                </div>

            <div>
                <p>{relationship}</p>
            {!relationship && isUser && <button onClick={(() => {
                    setToggleRelationship(!toggleRelationship)
                })}>Add Relationship Status</button>}
                {toggleRelationship && !relationship &&
                <form onSubmit={handleRelationship}>
                    <select type="text" onChange={((e) => setFakeRelationship(e.target.value))}>
                            <option value="Single">Single</option>
                            <option value="In a relationship">In a relationship</option>
                            <option value="Married">Married</option>
                            <option value="In a civil union">In a civil union</option>
                            <option value="In a domestic partnership">In a domestic partnership</option>
                            <option value="In an open relationship">In an open relationship</option>
                            <option value="It's complicated">It's complicated</option>
                            <option value="Seperated">Seperated</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                    </select>
                    <input type="submit" />
                </form>}

                {isUser && relationship && <button onClick={(() => setToggleRelationshipEdit(true))}>Edit Relationship Status</button>}
                    {toggleRelationshipEdit && <form onSubmit={handleRelationship}>
                    <select type="text" onChange={((e) => setFakeRelationship(e.target.value))}>
                            <option value="Single">Single</option>
                            <option value="In a relationship">In a relationship</option>
                            <option value="Married">Married</option>
                            <option value="In a civil union">In a civil union</option>
                            <option value="In a domestic partnership">In a domestic partnership</option>
                            <option value="In an open relationship">In an open relationship</option>
                            <option value="It's complicated">It's complicated</option>
                            <option value="Seperated">Seperated</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                    </select>
                    <button onClick={(() => setToggleRelationshipEdit(true))}>cancel</button>
                    <input type="submit" value="save"/>
                </form>}
            </div>

        </div>
    )

}

export default Overview