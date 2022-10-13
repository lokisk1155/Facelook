import './RecentLogins.css'
import Zucky from './MarkZuckerberg.webp'
import { useDispatch } from 'react-redux'
import { login } from '../../store/session'
import { useHistory } from 'react-router-dom'

function RecentLogins() {
    const dispatch = useDispatch()
    const history = useHistory()


    const demoEmail = 'ooo@aol.com'
    const demoPassword = '12345678'

    const handleClick = (e) => {
        const user = {credential: demoEmail, password: demoPassword}
        dispatch(login(user)).then(() => {
            history.push('/')
        })
    }

    return (
        <div className="recent-login-container">
            <h1 className="faceOok-logo">FaceOok</h1>
            <h1 className="recent-logins-word">Recent Logins</h1>
            <p className="text-below-recent">Click your picture or add an account.</p>

            <div className="demo" onClick={handleClick}>
                <img src={Zucky} alt="Zucky" className="demo-login-pic" />
                <div className="demo-user-text">Demo User</div>
            </div>
        </div>
    )
}

export default RecentLogins