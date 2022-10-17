import { useDispatch } from "react-redux"
import { updateUser } from "../../../store/user"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { getCurrent } from "../../../store/user"
import { fetchUser } from "../../../store/user"
import { useEffect } from "react"
import { useState } from "react"

function WorkEd({ }) {
    const dispatch = useDispatch()

    const { id } = useParams() 

    const currentUser = useSelector(getCurrent(id));

    const [works, setWork] = useState(currentUser.work)
    const [toggleWork, setToggleWork] = useState(false)
    const [fakeWork, setFakeWork] = useState('')

    useEffect(() => {
        handleSubmit() 
        dispatch(fetchUser(id))

    }, [])



    const handleSubmit = () => {
        let work = fakeWork
        const user = {
            ...currentUser, work
        }
        return dispatch(updateUser(user))
    }

    
    return (
        <div>
            <div>
                <h4>Work</h4>
                {works && <p>{works}</p> || <button onClick={(() => {
                    setToggleWork(!toggleWork)
                })}>Add a workplace</button>}
                {toggleWork && !works &&
                <form onSubmit={handleSubmit}>

                    <button type="submit" />
                </form>}
            </div>
            
        </div>
    )
}

export default WorkEd