import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSessionUser } from "../../store/session";
import { deleteFriend } from "../../store/friend";

function AreFriends({ userId, sessionUser }) {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteFriend(userId, sessionUser.id, null)).then(() => {
      dispatch(UpdateSessionUser(sessionUser, false));
    });
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        width: "60%",
        height: "60%",
        display: "flex",
        flexDirection: "row",
        color: "white",
        backgroundColor: "#ff0000",
        border: "none",
        borderRadius: "10px",
        alignItems: "center",
        justifyContent: "space-evenly",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "1.2rem",
      }}
    >
      <p>- Remove friend</p>
      <FontAwesomeIcon color="#fff" icon={faUser} />
    </button>
  );
}

export default AreFriends;
