import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import profilePic from '../NavBar/imgs/blank.png'
import './YourContact.css'

function YourContacts() {
  const friends = useSelector((state) => Object.values(state.friends))

  if (friends.length === 0) {
    return null
  }

  const containerHeight = friends.length > 2 ? `${200 + friends.length * 50}px` : '200px'

  const isViewportUnderCertainWidth = window.innerWidth < 768 // Adjust the width as per your needs

  if (isViewportUnderCertainWidth) {
    return null // Render nothing if the viewport width is under the specified value
  }

  return (
    <section
      style={{
        width: '80%',
        height: containerHeight,
        backgroundColor: 'hsla(0,0%,100%,.4)',
        marginTop: '65px',
        borderRadius: '15px',
        boxShadow: '0px 4px 4px 0px lightgrey',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <h1
        style={{
          paddingTop: '10px',
          paddingLeft: '10px',
          margin: '0',
          color: 'grey',
        }}
      >
        Your Contacts
      </h1>
      <hr color="lightgrey" width="95%"></hr>
      {friends.map((friend) => {
        return (
          <Link
            className="your-contacts-container"
            style={{
              height: '55px',
              width: '90%',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '10px',
              borderRadius: '10px',
            }}
            to={`/ProfilePage/${friend.id}`}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                height: '50px',
                width: '50px',
              }}
            >
              <img
                alt="123128"
                style={{ height: '45px', width: '45px', borderRadius: '50%' }}
                src={friend.profile_picture ? friend.profile_picture : profilePic}
              />
              <div
                style={{
                  backgroundColor: 'rgb(3, 218, 3)',
                  border: '0.3vw solid #ffffff',
                  borderRadius: '50%',
                  height: '12px',
                  width: '12px',
                  zIndex: 2,
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                }}
              ></div>
            </div>
            <p
              style={{ paddingLeft: '10px', color: 'grey' }}
            >{`${friend.first_name} ${friend.last_name}`}</p>
          </Link>
        )
      })}
    </section>
  )
}

export default YourContacts
