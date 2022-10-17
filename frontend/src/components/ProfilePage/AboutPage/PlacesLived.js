import { useDispatch } from "react-redux"
import { updateUser } from "../../../store/user"
import { useSelector } from "react-redux"
import { getCurrent } from "../../../store/user"
import { fetchUser } from "../../../store/user"
import { useEffect } from "react"
import { useParams } from "react-router-dom"



function PlacesLived({ }) {
    const dispatch = useDispatch()

    const { id } = useParams() 

    const currentUser = useSelector(getCurrent(id));

    console.log(currentUser, 'places')
   
    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchUser(id))
        }, 100);
    }, [id])

   
    if (!currentUser) {
        return <h1>Fetching...</h1>;
    } 


    return (
        <p>placesLived</p>
    )

}

export default PlacesLived