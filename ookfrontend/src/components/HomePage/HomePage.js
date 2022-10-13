import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchUser, logout } from "../../store/session";
import { Link } from "react-router-dom";
import './HomePage.css'
import NavBar from "./NavBar/NavBar";
import { useEffect } from "react";

function HomePage() {
    const user = useSelector(state => state.session.user);

    if (!user) {
        return <Redirect to="/login_page" />;
    }

    return (
        <div>
            <div>
            <   NavBar user={user} />
            </div>
            <p>Home Page!</p>
        </div>
    
    )

}

export default HomePage