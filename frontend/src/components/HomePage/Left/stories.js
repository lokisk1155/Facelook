import { useSelector } from "react-redux"
import csrfFetch from "../../../store/csrf"
import { useDispatch } from "react-redux"
import { createStory } from "../../../store/story"


function Stories() {
    const dispatch = useDispatch()

    const id = useSelector((state) => state.session.user.id)

    const handleAddStory = (e) => {
        e.preventDefault()
        return dispatch(createStory(id))
    }

    return (
        <> 
        <button onClick={handleAddStory} style={{ marginTop: "150px"}}>
            Add Story!
        </button>
        </>
    )

}


export default Stories 