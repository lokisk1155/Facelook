import PostFeed from "./Middle/PostFeed";
import "./HomePage.css";
import Stories from "./Left/stories";

function HomePage() {
  return (
    <div className="home-page-container">
      <div className="column">
        <Stories />
      </div>

      <div className="middle">
        <PostFeed />
      </div>

      <div className="column"></div>
    </div>
  );
}

export default HomePage;
