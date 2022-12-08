import PostFeed from "./Middle/PostFeed";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page-container">
      <div className="column"></div>
      <div className="middle">
        <PostFeed />
      </div>

      <div className="column"></div>
    </div>
  );
}

export default HomePage;
