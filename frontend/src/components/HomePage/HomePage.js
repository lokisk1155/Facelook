import PostFeed from "./Middle/PostFeed";
import "./HomePage.css";
import StoriesHomeFeed from "./Middle/StoriesHomeFeed";

function HomePage() {
  return (
    <div className="home-page-container">
      <div className="column"></div>

      <div className="middle">
        <StoriesHomeFeed />
        <PostFeed />
      </div>

      <div className="column"></div>
    </div>
  );
}

export default HomePage;
