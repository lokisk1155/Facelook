import { useDispatch } from "react-redux"
import { updateUser } from "../../../store/user"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

function WorkEd({ currentUser }) {
    const dispatch = useDispatch()

    const [work, setWork] = useState(null)
    const [toggleWork, setToggleWork] = useState(false)
    const [fakeWork, setFakeWork] = useState('')
    const [toggleWorkEdit, setToggleWorkEdit] = useState(false)
    const [toggleAddWork, setToggleAddWork] = useState(false)

    const [college, setCollege] = useState(null)
    const [fakeCollege, setFakeCollege] = useState('')
    const [toggleCollege, setToggleCollege] = useState(false)
    const [toggleEditCollege, setToggleEditCollege] = useState(false)

    const [highschool, setHighschool] = useState(null)
    const [fakeHighschool, setFakeHighscool] = useState('')
    const [toggleHighscool, setToggleHighscool] = useState(false)
    const [toggleEditHighscool, setToggleEditHighschool] = useState(false)
 

    useEffect(() => {
        checkUser()
    })

    function checkUser() {
        if (currentUser){
            setWork(currentUser.work)
            setCollege(currentUser.education)
            setHighschool(currentUser.highschool)
        }
    }

    const handleSubmit = () => {
        setToggleWork(false)
        setToggleWorkEdit(false)
        setToggleAddWork(false)
        setWork(fakeWork)
        let work = fakeWork
        console.log(fakeWork)
        const user = {
            ...currentUser, work
        }
        return dispatch(updateUser(user))
    }

    const handleCollege = () => {
        setToggleEditCollege(false)
        setToggleCollege(false)
        setCollege(fakeCollege)
        let education = fakeCollege
        const user = {
            ...currentUser, education
        }
        return dispatch(updateUser(user))
    }

    const handleHighschool = () => {
        setToggleEditHighschool(false)
        setToggleHighscool(false)
        setHighschool(fakeHighschool)
        let highschool = fakeHighschool
        const user = {
            ...currentUser, highschool
        }
        return dispatch(updateUser(user))
    }

    const handleAddWork = () => {
        setWork(fakeWork)
        let places_lived = currentUser.places_worked.push(fakeWork)
        const user = {
            ...currentUser, places_lived
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

                <button onClick={(() => setToggleAddWork(true))}>Add Work</button>
                {toggleAddWork && <form onSubmit={handleAddWork}>
                    <input type="text" placeholder="Company" onChange={((e) => setFakeWork(e.target.value))}></input>
                    <button onClick={(() => setToggleAddWork(false))}>cancel</button>
                    <input type="submit" value="save"/>
                </form>}
            </div>

            <div>
                <h4>College</h4>
                {college || <button onClick={(() => {
                    setToggleCollege(!toggleCollege)
                })}>Add College</button>}
                {toggleCollege && <form onSubmit={handleCollege}>
                    <input type="text" placeholder="Company" onChange={((e) => setFakeCollege(e.target.value))}></input>
                    <button onClick={(() => setToggleCollege(false))}>cancel</button>
                    <input type="submit" value="save"/>
                </form>}
                {college && !toggleCollege && <button onClick={(() => {
                    setToggleEditCollege(true)
                })}>Edit</button>}
                
                {toggleEditCollege && <form onSubmit={handleCollege}>
                    <input type="text" placeholder="Company" onChange={((e) => setFakeCollege(e.target.value))}></input>
                    <button onClick={(() => setToggleEditCollege(false))}>cancel</button>
                    <input type="submit" value="save"/>
                </form>}

            </div>

            <div>
                <h4>Highschool</h4>
                {highschool || <button onClick={(() => {
                    setToggleHighscool(!toggleHighscool)
                })}>Add highschool</button>}
                {toggleHighscool && <form onSubmit={handleHighschool}>
                    <input type="text" placeholder="Company" onChange={((e) => setFakeHighscool(e.target.value))}></input>
                    <button onClick={(() => setToggleHighscool(false))}>cancel</button>
                    <input type="submit" value="save"/>
                </form>}
                {highschool && !toggleHighscool && <button onClick={(() => {
                    setToggleEditHighschool(true)
                })}>Edit</button>}
                {toggleEditHighscool && <form onSubmit={handleHighschool}>
                    <input type="text" placeholder="Company" onChange={((e) => setFakeHighscool(e.target.value))}></input>
                    <button onClick={(() => setToggleEditHighschool(false))}>cancel</button>
                    <input type="submit" value="save"/>
                </form>}

            </div>
            
        </div>
    )
}

export default WorkEd