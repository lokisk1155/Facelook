import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "../../store/story";
import { fetchPosts } from "../../store/post";
import NavBar from "../NavBar/NavBar";
import StoriesHomeFeed from "./Middle/StoriesHomeFeed";
import PostFeed from "./Middle/PostFeed";
import "./HomePage.css";
import StoriesHeader from "./Middle/StoriesHeader";

function HomePage() {
  const dispatch = useDispatch();

  const stories = useSelector((state) => state.stories);

  const posts = useSelector((state) => state.posts);

  const limit = 3;

  const number = 6;

  let loading = true;

  if (Object.keys(stories).length < 1 || Object.keys(posts).length < 1) {
    loading = false;
    Promise.all([dispatch(fetchStories(limit)), dispatch(fetchPosts())]);
  }

  return (
    <>
      <NavBar />
      <div className="home-page-container">
        <div className="column"></div>
        <div className="middle">
          {loading ? (
            <StoriesHomeFeed stories={stories} />
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
          )}
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
