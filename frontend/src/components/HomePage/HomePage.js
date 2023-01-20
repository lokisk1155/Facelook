import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "../../store/story";
import { fetchPosts } from "../../store/post";
import NavBar from "../NavBar/NavBar";
import StoriesHomeFeed from "./Middle/StoriesHomeFeed";
import PostFeed from "./Middle/PostFeed";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();

  const stories = useSelector((state) => state.stories);

  let limit = 3;

  useEffect(() => {
    dispatch(fetchStories(limit));
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
