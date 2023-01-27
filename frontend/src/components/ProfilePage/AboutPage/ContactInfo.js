import EditPhoneNumber from "./UserInformation/EditPhoneNumber";
import EditEmail from "./UserInformation/EditEmail";
import EditWebsite from "./UserInformation/EditWebsite";
import EditSocial from "./UserInformation/EditSocial";

function ContactInfo({ currentUser, sessionUser }) {
  const isUser = currentUser.id === sessionUser.id;
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
          <EditPhoneNumber
            currentUser={currentUser}
            sessionUser={sessionUser}
          />
        ) : (
          <p>{currentUser.phone_number}</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isUser ? (
          <EditEmail currentUser={currentUser} sessionUser={sessionUser} />
        ) : (
          <p>{currentUser.email}</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isUser ? (
          <EditWebsite currentUser={currentUser} sessionUser={sessionUser} />
        ) : (
          <p>{currentUser.website}</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isUser ? (
          <EditSocial currentUser={currentUser} sessionUser={sessionUser} />
        ) : (
          <p>{currentUser.EditSocial}</p>
        )}
      </div>
      <p>birth date: {`${currentUser.month} ${currentUser.day}`}</p>
      <p>birth year: {currentUser.year}</p>
    </div>
  );
}

export default ContactInfo;
