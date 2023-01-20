import PostFeed from "./Middle/PostFeed";
import "./HomePage.css";
import StoriesHomeFeed from "./Middle/StoriesHomeFeed";
import { useEffect } from "react";
import { fetchPosts } from "../../store/post";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchStories } from "../../store/story";
import NavBar from "../NavBar/NavBar";

function HomePage() {
  const dispatch = useDispatch();

  const stories = useSelector((state) => state.stories);

  useEffect(() => {
    dispatch(fetchStories());
    dispatch(fetchPosts());
  }, []);

  if (!stories) {
    return null;
  }

  return (
    <>
      <NavBar />
      <div className="home-page-container">
        <div className="column"></div>

        <div className="middle">
          <StoriesHomeFeed stories={stories} />
          <PostFeed />
        </div>

        <div className="column"></div>
      </div>
    </>
  );
}

export default HomePage;
