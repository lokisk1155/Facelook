import EditRelationship from './UserInformation/EditRelationship'

function Relationship({ currentUser, sessionUser }) {
  const isUser = currentUser.id === sessionUser.id
  return (
    <div style={{ padding: '15px' }}>
      <h3>Relationship</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {isUser ? (
          <EditRelationship currentUser={currentUser} />
        ) : (
          <p>{currentUser.relationship}</p>
        )}
      </div>
      <br></br>
    </div>
  )
}

export default Relationship
