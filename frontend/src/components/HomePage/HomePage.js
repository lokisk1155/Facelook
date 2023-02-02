import { useDispatch } from "react-redux";
import { homePage } from "../../store/homePage";
import NavBar from "../NavBar/NavBar";
// import StoriesHomeFeed from "./Middle/StoriesHomeFeed";
import PostFeed from "./Middle/PostFeed";
import "./HomePage.css";
// import StoriesHeader from "./Middle/StoriesHeader";
import { useEffect } from "react";
import { useState } from "react";

function HomePage() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const number = 6;

  useEffect(() => {
    dispatch(homePage()).then((data) => {
      setTimeout(() => {
        setLoading(data);
      }, 500);
    });
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <div className="home-page-container">
        <div className="column"></div>
        <div className="middle">
          {/* {loading ? (
            <StoriesHomeFeed />
          ) : (
            <>
              <StoriesHeader />
              <div
                className="skeleton"
                style={{
                  display: "flex",
                  height: "175px",
                  minHeight: "75px",
                  justifyContent: "space-evenly",
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderEndStartRadius: "10px",
                  borderEndEndRadius: "10px",
                  boxShadow: "0px 6px 6px 0px lightgrey",
                  marginBottom: "10px",
                }}
              />
            </>
          )} */}
          {loading ? (
            <PostFeed />
          ) : (
            [...Array(number)].map((n, idx) => {
              return (
                <div
                  key={idx}
                  className="skeleton"
                  style={{
                    height: "300px",
                    width: "100%",
                    marginBottom: "15px",
                    borderRadius: "5px",
                  }}
                />
              );
            })
          )}
        </div>

        <div className="column"></div>
      </div>
    </>
  );
}

export default HomePage;
