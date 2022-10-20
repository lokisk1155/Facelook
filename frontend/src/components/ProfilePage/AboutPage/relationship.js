import { useDispatch } from "react-redux"
import { updateUser } from "../../../store/user"

import { useEffect, useState } from "react"

function Relationship({ currentUser }) {
    const dispatch = useDispatch()

    const [relationship, setRelationship] = useState(null) 
    const [fakeRelationship, setFakeRelationship] = useState('')
    const [toggleWork, setToggleWork] = useState(false)
    
    useEffect(() => {
        checkUser()
    })

    function checkUser() {
        if (currentUser){
            setRelationship(currentUser.relationship)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setRelationship(fakeRelationship)
        let relationship = fakeRelationship
        const user = {
            ...currentUser, relationship
        }
        return dispatch(updateUser(user))
    }

    const handleClick = (e) => {
        e.preventDefault() 
        return setToggleWork(false)

    }

    
    return (
        <div>
            <div>
                <h4>Relationship</h4>
                
                {relationship && <p>{relationship}</p> || <button onClick={(() => {
                    setToggleWork(!toggleWork)
                })}>Add Relationship Status</button>}
                {toggleWork && !relationship &&
                <form onSubmit={handleSubmit}>
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

                {relationship && <button onClick={handleClick}>Edit Post</button>}
                    {!toggleWork && <form onSubmit={handleSubmit}>
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
                    <button onClick={(() => setToggleWork(true))}>cancel</button>
                    <input type="submit" value="save"/>
                </form>}
            </div>
            
        </div>
    )
}

export default Relationship