import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { addFriend } from "../../store/friend";
import { useDispatch } from "react-redux";

function NotFriends({ sessionUser, currentUserId }) {
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    const friendRequest = {
      sender_id: sessionUser.id,
      receiver_id: currentUserId,
    };
    dispatch(addFriend(friendRequest, sessionUser, true));
  };

  return (
    <div
      onClick={handleAdd}
      style={{
        height: "60%",
        width: "60%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        fontFamily: "Arial, Helvetica, sans-serif",
        borderRadius: "10px",
        backgroundColor: "#33a41f",
      }}
    >
      <p style={{ color: "#fff" }}>+ Add friend</p>
      <FontAwesomeIcon color="#fff" icon={faUser} />
    </div>
  );
}

export default NotFriends;
