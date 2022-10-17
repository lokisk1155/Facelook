import { useDispatch } from "react-redux"
import { updateUser } from "../../../store/user"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { getCurrent } from "../../../store/user"
import { fetchUser } from "../../../store/user"
import { useEffect } from "react"
import { useState } from "react"

function WorkEd({ }) {
    const dispatch = useDispatch

    const { id } = useParams() 

    const currentUser = useSelector(getCurrent(id));

    const [workPlace, setWorkPlace] = useState(currentUser.work)
    const [education, setEducation] = useState(currentUser.education)

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            ...currentUser
        }
        return dispatch(updateUser(user))
    }

    return (
        <div>
            <div>
                <h4>Work</h4>
                {workPlace || <button>Add a workplace</button>}
            </div>

            <div>
                <h4>College</h4>
                {education || <button>Add College</button>}
            </div>

            <div>
                <h4>Highschool</h4>
                {education || <button>Add College</button>}
            </div>
            
        </div>
    )
}

export default WorkEd