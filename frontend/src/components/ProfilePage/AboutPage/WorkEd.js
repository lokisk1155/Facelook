import EditWork from "./UserInformation/EditWork";
import EditEducation from "./UserInformation/EditCollege";
import EditHighschool from "./UserInformation/EditHighschool";

function WorkEd({ currentUser, sessionUser }) {
  const isUser = sessionUser.id === currentUser.id;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justiftyContent: "space-between",
        padding: "10px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isUser ? (
          <EditWork currentUser={currentUser} sessionUser={sessionUser} />
        ) : (
          <p>{currentUser.phone_number}</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isUser ? (
          <EditEducation currentUser={currentUser} sessionUser={sessionUser} />
        ) : (
          <p>{currentUser.email}</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isUser ? (
          <EditHighschool currentUser={currentUser} sessionUser={sessionUser} />
        ) : (
          <p>{currentUser.website}</p>
        )}
      </div>
      <p>birth date: {`${currentUser.month} ${currentUser.day}`}</p>
      <p>birth year: {currentUser.year}</p>
    </div>
  );
}

export default WorkEd;
