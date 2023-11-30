import { useEffect, useState } from 'react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import LoadingBar from './LoadingBar'
import profilePic from '../NavBar/imgs/blank.png'
import './ProgressBar.css'

function ProgressBar({ stories, currentStoryId, currentStoryCreatedAt, currentWindow }) {
  const { id } = useParams()

  const [progressBarWidth, setProgressBarWidth] = useState(null)

  const [profilePicture, setProfilePicture] = useState(null)

  const simpleUsers = useSelector((state) => state.simpleUsers)

  useEffect(() => {
    const calc = 100 / Object.keys(stories).length
    setProgressBarWidth(calc)
    if (simpleUsers[id].profile_picture) {
      setProfilePicture(simpleUsers[id].profile_picture)
    } else {
      setProfilePicture(profilePic)
    }
  }, [id, stories, simpleUsers])

  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: '95%',
          height: '10px',
          top: '2%',
          display: 'flex',
          alignItems: 'center',
          right: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '20',
        }}
      >
        {stories.map((story, index) => (
          <React.Fragment key={index}>
            {story.id !== currentStoryId ? (
              <div
                style={{
                  width: `${progressBarWidth}%`,
                  height: '70%',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  margin: '2px',
                  borderRadius: '50px',
                }}
              />
            ) : (
              <LoadingBar
                progressBarWidth={progressBarWidth}
                id={currentStoryId}
                window={currentWindow}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <Link className="link-profile-picture-on-actual-story" to={`/ProfilePage/${id}`}>
        <img className="pic-on-actual-story" alt="947621" src={profilePicture} />

        <p style={{ paddingLeft: '2px' }} className="name-on-actual-story">
          {simpleUsers[id].name}
        </p>
      </Link>
    </>
  )
}

export default ProgressBar
// simpleUsers[currentStoryUserId].picture ||
