import { updateUser } from "../../../store/user"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getCurrent } from "../../../store/user"
import { useSelector } from "react-redux"
import { fetchUser } from "../../../store/user"
import { useEffect, useState } from "react"


function Overview() {
    const dispatch = useDispatch()

    const { id } = useParams() 

    const currentUser = useSelector(getCurrent(id));

    const [workPlace, setWorkPlace] = useState(currentUser.work)
    const [toggleWork, setToggleWork] = useState(false)
    const [fakeWork, setFakeWork] = useState('')
    const [toggleWorkEdit, setToggleWorkEdit] = useState(false)

    const [education, setEducation] = useState(currentUser.education)
    const [toggleEducation, setToggleEducation] = useState(false)

    const [location, setLocation] = useState(currentUser.location)
    const [toggleLocation, setToggleLocation] = useState(false)

    const [relationship, setRelationShip] = useState(currentUser.relationship)
    const [toggleRelationship, setToggleRelationship] = useState(false)

    console.log(currentUser, 'overview')

    const handleSubmit = () => {
        setWorkPlace(fakeWork)
        console.log(workPlace)
        let work = fakeWork
        const user = {
            ...currentUser, work
        }
        return dispatch(updateUser(user))
    }

    function handleClick() {
        return setToggleWorkEdit(true)
    }

    useEffect(() => {
        handleSubmit() 
        setTimeout(() => {
            dispatch(fetchUser(id))
        }, 100);
    }, [id])

    if (!currentUser) {
        return <h1>Fetching...</h1>;
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