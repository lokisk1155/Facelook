import "./StoriesHomeFeed.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import profilePic from "../../NavBar/imgs/blank.png";

function StoriesHomeFeed({ stories = ["test1", "test2", "test3"] }) {
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const sessionUserPicture = useSelector(
    (state) => state.simpleUsers[sessionUser.id]?.profile_picture
  );

  const sessionUserName = `${sessionUser.first_name} ${sessionUser.last_name}`;
  return (
    <>
      <div className="stories-header-container">
        <div className="stories-header">
          <svg
            className="story-icon"
            fill="rgb(27, 116, 228)"
            viewBox="0 0 20 20"
          >
            <g fillRule="evenodd" transform="translate(-446 -350)">
              <path d="M457 368.832a.5.5 0 0 0 .883.323l1.12-1.332a.876.876 0 0 1 .679-.323h3.522a2.793 2.793 0 0 0 2.796-2.784v-10.931a2.793 2.793 0 0 0-2.796-2.785h-3.454a2.75 2.75 0 0 0-2.75 2.75v15.082zm-1.5 0a.5.5 0 0 1-.883.323l-1.12-1.332a.876.876 0 0 0-.679-.323h-3.522a2.793 2.793 0 0 1-2.796-2.784v-10.931a2.793 2.793 0 0 1 2.796-2.785h3.454a2.75 2.75 0 0 1 2.75 2.75v15.082z"></path>
            </g>
          </svg>
          <h5 style={{ color: "rgb(27, 116, 228)" }}>Stories</h5>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          height: "175px",
          minHeight: "75px",
          justifyContent: "space-evenly",
          backgroundColor: "#fff",
          padding: "10px",
          marginLeft: "10px",
          marginRight: "10px",
          borderEndStartRadius: "10px",
          borderEndEndRadius: "10px",
          boxShadow: "0px 6px 6px 0px lightgrey",
        }}
      >
        <div
          className="story-img"
          onClick={() => history.push("/stories/create")}
          style={{
            width: "20%",
            margin: "2.5px",
            padding: "0",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <img
            style={{
              height: "70%",
              width: "100%",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              margin: "0",
              padding: "0",
              borderTop: "0.3px solid lightgrey",
              borderLeft: "0.3px solid lightgrey",
              borderRight: "0.3px solid lightgrey",
              objectFit: "cover",
            }}
            src={sessionUserPicture || profilePic}
          ></img>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            style={{
              height: "30px",
              borderRadius: "100px",
              backgroundColor: "rgb(27, 116, 228)",
              color: "#fff",
              border: "5px solid #fff",
              position: "absolute",
              top: "70%",
              transform: "translateY(-50%)",
              bottom: 0,
              left: 0,
              right: 0,
              margin: "auto",
            }}
          >
            <g fillRule="evenodd" transform="translate(-446 -350)">
              <g fillRule="nonzero">
                <path
                  d="M95 201.5h13a1 1 0 1 0 0-2H95a1 1 0 1 0 0 2z"
                  transform="translate(354.5 159.5)"
                ></path>
                <path
                  d="M102.5 207v-13a1 1 0 1 0-2 0v13a1 1 0 1 0 2 0z"
                  transform="translate(354.5 159.5)"
                ></path>
              </g>
            </g>
          </svg>
          <p
            style={{
              padding: "0",
              margin: "0",
              width: "100%",
              height: "20%",
              justifyContent: "center",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              borderBottom: "0.3px solid lightgrey",
              borderLeft: "0.3px solid lightgrey",
              borderRight: "0.3px solid lightgrey",
            }}
          ></p>
        </div>

        {stories.map((story, index) => {
          return (
            <div
              key={index}
              className="story-img"
              style={{
                width: "20%",
                margin: "2.5px",
                borderRadius: "5px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              {story}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default StoriesHomeFeed;
