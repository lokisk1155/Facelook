import { useParams } from "react-router-dom"
import { fetchUser, updateUser} from "../../store/user"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getCurrent } from "../../store/user"
import Featured from "./Featured"
import EditDetails from "./EditDetails"
import './Posts.css'



function Posts({ redirect }) {
    const dispatch = useDispatch()

    const { id } = useParams() 

    const currentUser = useSelector(getCurrent(id));

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [bio, setBio] = useState('')
    const [toggleBio, setToggleBio] = useState(false)
    const [details, setDetails] = useState(false)
    const [featured, setFeatured] = useState(false)
    const [location, setLocation] = useState('')
    const [customFeatured, setCustomFeatured] = useState(true)
    const [customEdit, setCustomEdit] = useState(true)
    const [customBio, setCustomBio] = useState(true)

    const [work, setWork] = useState(null)

    function checkUser() {
        if (currentUser) {
            if (currentUser.work) {
                setWork(currentUser.work)
            }
        }
        return 
    }

    let antiToggle = !toggleBio

    let bioHeader;

    let placeHolderLocation; 


    if (location.length > 1) {
        placeHolderLocation = location
    }

    if (bio.length < 1) {
        bioHeader = 'Add Bio'
    } 

    useEffect(() => {
        checkUser()
        setTimeout(() => {
            dispatch(fetchUser(id))
        }, 100);
    }, [id])

   
    if (!currentUser) {
        return <h1>Fetching...</h1>;
    } 

    const handleBioSubmit = (e) => {
        e.preventDefault() 
        setCustomBio(!customBio)
        setToggleBio(customBio)
        const user = {
            ...currentUser, bio
        }
        user.password = currentUser.password
        dispatch(updateUser(user))
    }

   


    return (
        <div className="intro-container">
            <h2 className="intro-header">Intro </h2>
            <div>
            <h4 className="actual-bio">{bio}</h4>
            {antiToggle && <button className="add-bio-button" onClick={(() => {setCustomBio(!customBio)
                setToggleBio(customBio)})}>{bioHeader || 'Edit Bio'}</button>}
                <div className="edit-bio-container">   
                    {toggleBio && <textarea className="text-area-bio" defaultValue="Describe who you are" onChange={(e) => setBio(e.target.value)}>
                        </textarea>}
                    <div>
                        <div>
                        {toggleBio && <button className="bio-cancel-button" onClick={(() => {setCustomBio(!customBio)
                            setToggleBio(customBio)})}>Cancel</button>}
                        {toggleBio && <button className="bio-save-button" onClick={handleBioSubmit}>Save</button>}
                        </div>
                    </div>
                    
                </div>
            </div>
                    {work && <h3>{work}</h3>}
            <div>
                
            </div>

            <div>
                    <button className="edit-details-button" onClick={(() => {setCustomEdit(!customEdit)
                    setDetails(customEdit)})}>Edit Details</button>

                    {details && <EditDetails closeForm={setDetails} redirect={redirect} currentUser={currentUser}/>}
            </div>
            <div>
            <div>
                <button className="add-featured-button" onClick={(() => {setCustomFeatured(!customFeatured)
                            setFeatured(customFeatured)})}>Add featured</button>
            </div>
            <div>
                {featured && <Featured />}
            </div>



            </div>
        </div>
    )
}

export default Posts

{/* <li>{`${user[2]} ${user[3]}`}</li>
<li>{user[1]}</li>
<li>{`${user[4]}/${user[5]}/${user[6]}`}</li>
<li>{user[7]}</li>
<li>{user[8]}</li> */}