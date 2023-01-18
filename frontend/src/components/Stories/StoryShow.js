import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSimpleUsers } from "../../store/simpleUsers";
import { useEffect } from "react";

function StoryShow()  {
    const dispatch = useDispatch() 
    const { id } = useParams() 
    const simpleUsers = useSelector((state) => state.simpleUsers)
    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        if (!simpleUsers || !sessionUser) {
            getData() 
        }
        const getData = async() => {
            await dispatch(getSimpleUsers())
        }
    }, [id])

    if (!simpleUsers || !sessionUser) {
        return null 
    }
  
  return (
    <>
    <p>yo</p>
    </>
  )
}

export default StoryShow;
