import { useParams } from "react-router-dom"
import { fetchUser, updateUser} from "../../store/user"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getCurrent } from "../../store/user"
import Featured from "./Featured"
import EditDetails from "./EditDetails"



function ProfilePage() {
    const dispatch = useDispatch()

    const { id } = useParams() 

    const currentUser = useSelector(getCurrent(id));

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [bio, setBio] = useState('')
    const [details, setDetails] = useState(false)
    const [featured, setFeatured] = useState(false)
    const [location, setLocation] = useState('')
    const [customFeatured, setCustomFeatured] = useState(true)
    const [customEdit, setCustomEdit] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchUser(id))
        }, 1500);
    }, [id])

   
    if (!currentUser) {
        return <h1>Fetching...</h1>;
    } 

    const handleSubmit = (e) => {
        e.preventDefault() 
        const user = {
            ...currentUser, bio, location, featured
        }
        user.password = currentUser.password
        dispatch(updateUser(user))
    }

    const handleClick = (e) => {
        e.preventDefault(0)
        setCustomFeatured(!customFeatured)
        setFeatured(customFeatured)
    }

    return (
        <div>
            <h1>Hi {currentUser.first_name} {currentUser.last_name}</h1>
            <h3>Add bio</h3>
            <p>{currentUser.bio}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" onChange={((e) => setBio(e.target.value))} />
                </div>
                <input type="submit" value="submit changes"></input>
            </form>

            <div>
                    <button onClick={(() => {setCustomEdit(!customEdit)
                    setDetails(customEdit)})}>Edit Details</button>

                    {details && <EditDetails />}
            </div>
            <div>
            <div>
                <button onClick={(() => {setCustomFeatured(!customFeatured)
                            setFeatured(customFeatured)})}>Add featured</button>
            </div>
            <div>
                {featured && <Featured />}
            </div>



            </div>
        </div>
    )
}

export default ProfilePage

{/* <li>{`${user[2]} ${user[3]}`}</li>
<li>{user[1]}</li>
<li>{`${user[4]}/${user[5]}/${user[6]}`}</li>
<li>{user[7]}</li>
<li>{user[8]}</li> */}