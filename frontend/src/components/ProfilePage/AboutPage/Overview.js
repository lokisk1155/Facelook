import { updateUser } from "../../../store/user"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getCurrent } from "../../../store/user"
import { useSelector } from "react-redux"
import { fetchUser } from "../../../store/user"
import { useEffect, useState } from "react"


function Overview({ currentUser }) {
    const dispatch = useDispatch()

    const [workPlace, setWorkPlace] = useState('')
    const [toggleWork, setToggleWork] = useState(false)
    const [fakeWork, setFakeWork] = useState('')
    const [toggleWorkEdit, setToggleWorkEdit] = useState(false)

    const [education, setEducation] = useState('')
    const [toggleEducation, setToggleEducation] = useState(false)

    const [location, setLocation] = useState('')
    const [toggleLocation, setToggleLocation] = useState(false)

    const [relationship, setRelationShip] = useState('')
    const [toggleRelationship, setToggleRelationship] = useState(false)

    useEffect(() => {
        checkParams()
    }, [])

    function checkParams() {
        if (currentUser) {
            setWorkPlace(currentUser.work)
        }
    }


    const handleSubmit = () => {
        setWorkPlace(fakeWork)
        let work = fakeWork
        const user = {
            ...currentUser, work
        }
        return dispatch(updateUser(user))
    }

    function handleClick() {
        return setToggleWorkEdit(true)
    }


    return (
        <div>
            <div>
                {workPlace || <button onClick={(() => {
                    setToggleWork(true)
                })}>Add a workplace</button>}
                {toggleWork && !workPlace &&
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Company" onChange={((e) => setFakeWork(e.target.value))}/>
                    <button onClick={(() => setToggleWork(false))}>cancel</button>
                    <input type="submit" value="save"/>
                </form>}
            <div>

            <div>
                <div>
                {workPlace && <button onClick={handleClick}>Edit Post</button>}
                {toggleWorkEdit && <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Company" onChange={((e) => setFakeWork(e.target.value))}></input>
                    <button onClick={(() => setToggleWorkEdit(false))}>cancel</button>
                    <input type="submit" value="save"/>
                </form>}
            </div>

      
            </div>
            
            </div>
                {education || <button>Add College</button>}
            </div>

            <div>
                {location || <button>Add Location</button>}
            </div>

            <div>
                {relationship || <button>Add a relationship status</button>}
            </div>

        </div>
    )

}

export default Overview