import { useEffect } from 'react'

function Intro({ currentUser, changeHeight }) {
  let count = 40

  const bio = currentUser.bio ? currentUser.bio : null

  if (bio) {
    count += 65
  }

  const work = currentUser.work ? currentUser.work : null

  if (work) {
    count += 55
  }

  const education = currentUser.education ? currentUser.education : null

  if (education) {
    count += 55
  }

  const location = currentUser.location ? currentUser.location : null

  if (location) {
    count += 55
  }

  const relationship = currentUser.relationship ? currentUser.relationship : null

  if (relationship) {
    count += 55
  }
  useEffect(() => {
    changeHeight(count)
  }, [changeHeight, count])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '90%',
      }}
    >
      {bio ? (
        <p style={{ textAlign: 'center' }} className="user-info">
          {bio}
        </p>
      ) : null}
      {work ? <p className="user-info">Works at {work}</p> : null}
      {education ? <p className="user-info">Graduated from {education}</p> : null}
      {location ? <p className="user-info">lives in {location}</p> : null}
      {relationship ? <p className="user-info">{relationship}</p> : null}
    </div>
  )
}
export default Intro
