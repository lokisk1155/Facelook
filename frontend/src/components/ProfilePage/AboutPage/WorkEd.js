import { useDispatch } from "react-redux"
import { updateUser } from "../../../store/user"

import { useEffect, useState } from "react"

function WorkEd({ currentUser }) {
    const dispatch = useDispatch()

    const [work, setWork] = useState(null)
    const [toggleWork, setToggleWork] = useState(false)
    const [fakeWork, setFakeWork] = useState('')
    const [toggleWorkEdit, setToggleWorkEdit] = useState(false)

    
    useEffect(() => {
        checkUser()
    })

    function checkUser() {
        if (currentUser){
            setWork(currentUser.work)
        }
    }

    const handleSubmit = () => {
        setWork(fakeWork)
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
                
                {work || <button onClick={(() => {
                    setToggleWork(!toggleWork)
                })}>Add a workplace</button>}
                {toggleWork && !work &&
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={((e) => setFakeWork(e.target.value))}/>
                    <input type="submit" />
                </form>}

                {work && <button onClick={(() => setToggleWorkEdit(true))}>Edit Work</button>}
                {toggleWorkEdit && <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Company" onChange={((e) => setFakeWork(e.target.value))}></input>
                    <button onClick={(() => setToggleWorkEdit(false))}>cancel</button>
                    <input type="submit" value="save"/>
                </form>}
            </div>
            
        </div>
    )
}

export default WorkEd