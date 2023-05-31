import NavBar from "../NavBar/NavBar";
import StoriesHomeFeed from "./Middle/StoriesHomeFeed";
import PostFeed from "./Middle/PostFeed";
import StoriesHeader from "./Middle/StoriesHeader";
import CircleLoading from "../loading/CircleLoading";
import GetHomePage from "../../hooks/getHomePage";
import "./HomePage.css";
import YourShortcuts from "./YourShortcuts";
import YourContacts from "./YourContacts";

function HomePage() {
  const storeHydrated = GetHomePage();
  return (
    <>
      <NavBar />
      <div className="home-page-container">
        <div className="column">
          <YourShortcuts />
        </div>
        <div className="middle">
          {storeHydrated ? (
            <>
              <StoriesHomeFeed />
              <PostFeed />
            </>
          ) : (
            <>
              <StoriesHeader />
              <div className="stories-home-feed-loading">
                <CircleLoading />
              </div>
            </>
          )}
        </div>
        <div className="column">
          <YourContacts />
        </div>
      </div>
    </>
  );
}

export default HomePage;
