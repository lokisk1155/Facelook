import { useDispatch } from "react-redux"
import { updateUser } from "../../../store/user"

import { useEffect, useState } from "react"

function WorkEd({ currentUser }) {
    const dispatch = useDispatch()

    const [works, setWorks] = useState(null)
    const [toggleWork, setToggleWork] = useState(false)
    const [fakeWork, setFakeWork] = useState('')

    
    useEffect(() => {
        checkUser()
    })

    function checkUser() {
        if (currentUser){
            setWorks(currentUser.work)
        }
    }

    const handleSubmit = () => {
        setWorks(fakeWork)
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
                    <input type="text" onChange={((e) => setFakeWork(e.target.value))}/>
                    <input type="submit" />
                </form>}
            </div>
            
        </div>
    )
}

export default WorkEd