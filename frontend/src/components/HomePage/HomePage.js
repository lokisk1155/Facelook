import { useDispatch } from "react-redux";
import { homePage } from "../../store/homePage";
import NavBar from "../NavBar/NavBar";
import StoriesHomeFeed from "./Middle/StoriesHomeFeed";
import PostFeed from "./Middle/PostFeed";
import "./HomePage.css";
import StoriesHeader from "./Middle/StoriesHeader";
import { useEffect } from "react";
import { useState } from "react";
import CircleLoading from "../loading/CircleLoading";
import GetHomePage from "../../hooks/getHomePage";

function HomePage() {
  const fetchedData = GetHomePage();

  return (
    <>
      <NavBar />
      <div className="home-page-container">
        <div className="column"></div>
        <div className="middle">
          {fetchedData ? (
            <StoriesHomeFeed />
          ) : (
            <>
              <StoriesHeader />
              <div
                style={{
                  height: "80vh",
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderEndStartRadius: "10px",
                  borderEndEndRadius: "10px",
                  boxShadow: "0px 6px 6px 0px lightgrey",
                  position: "relative",
                }}
              >
                <CircleLoading />
              </div>
            </>
          )}
          {fetchedData ? <PostFeed /> : null}
        </div>

        <div className="column"></div>
      </div>
    </>
  );
}

export default HomePage;
