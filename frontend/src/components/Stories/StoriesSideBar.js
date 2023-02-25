import { useParams } from "react-router-dom";
import profilePic from "../NavBar/imgs/blank.png";
import { Link } from "react-router-dom";

function StoriesSideBar({ usersWithStories, setCurrentWindow, mostRecentStoryTime }) {
  const { id } = useParams();


  function getTimeElapsed(createdAt) {
    const previous = new Date(createdAt);
    const now = new Date();
    const comparedTime = now.valueOf() - previous.valueOf();
    return formatDateTime(comparedTime);
  }

  function formatDateTime(comparedTime) {
    const sec = Math.floor(comparedTime / 1000);
    if (sec < 60) {
      return `${sec}s`;
    }
    const min = Math.floor(sec / 60);
    if (min < 60) {
      return `${min}m`;
    }
    const hr = Math.floor(min / 60);
    if (hr < 24) {
      return `${hr}h`;
    }
    const day = Math.floor(hr / 24);
    if (day < 7) {
      return `${day}d`;
    }
    return `${Math.floor(day / 7)}w`;
  }

  return (
    <>
      {Object.values(usersWithStories).map((user, index) => {
        return (
          <div onClick={() => setCurrentWindow(0)} key={index}>
            <Link
              className="all-stories-mapped"
              to={`/stories/${user.user_id}`}
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
                borderRadius: "5px",
                padding: "5px",
                backgroundColor:
                  user.user_id === parseInt(id) ? "lightgrey" : "#fff",
                height: "65px",
                width: "100%",
              }}
            >
              <img
                alt=""
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50px",
                }}
                src={user.profile_picture || profilePic}
              />
              <p>{user.name}</p>
              <p>{getTimeElapsed(mostRecentStoryTime)}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default StoriesSideBar;
