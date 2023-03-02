import { useParams } from "react-router-dom";
import profilePic from "../NavBar/imgs/blank.png";
import { Link } from "react-router-dom";

function StoriesSideBar({ usersWithStories, setCurrentWindow }) {
  const { id } = useParams();
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
                borderRadius: "5px",
                paddingLeft: "2.5px",
                paddingRight: "2.5px",
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
                  border:
                    user.user_id === parseInt(id)
                      ? "5px solid #166fe5"
                      : "none",
                }}
                src={user.profile_picture || profilePic}
              />
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default StoriesSideBar;
