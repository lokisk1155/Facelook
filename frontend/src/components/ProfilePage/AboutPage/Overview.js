import EditWork from './UserInformation/EditWork'
import EditRelationship from './UserInformation/EditRelationship'
import EditEducation from './UserInformation/EditCollege'
import EditHighschool from './UserInformation/EditHighschool'
import Editlocation from './UserInformation/EditLocation'

function Overview({ currentUser, sessionUser }) {
  const isUser = currentUser.id === sessionUser.id
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justiftyContent: 'space-evenly',
        padding: '10px',
        height: '30%',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {isUser ? <EditWork currentUser={currentUser} /> : <p>{currentUser.work}</p>}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {isUser ? <EditEducation currentUser={currentUser} /> : <p>{currentUser.education}</p>}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {isUser ? <EditHighschool currentUser={currentUser} /> : <p>{currentUser.highschool}</p>}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {isUser ? <Editlocation currentUser={currentUser} /> : <p>{currentUser.location}</p>}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {isUser ? (
          <EditRelationship currentUser={currentUser} sessionUser={sessionUser} />
        ) : (
          <p>{currentUser.relationship}</p>
        )}
      </div>
    </div>
  )
}

export default Overview
