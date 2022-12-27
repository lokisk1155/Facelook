
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/user";
import "./Intro.css"

function Intro({ currentUser, sessionUser, toggle, setToggle }) {
    const dispatch = useDispatch() 

    let bio; 

    const handleBioSubmit = (e) => {
        e.preventDefault();
        const user = {
        ...currentUser,
        bio,
        };
    return dispatch(updateUser(user));
  };

    return (
        <div className="intro-container">
            <h2 className="intro-header">Intro </h2>
            {/* <EditDetails currentUser={currentUser} /> */}
        </div>

    )

}
export default Intro