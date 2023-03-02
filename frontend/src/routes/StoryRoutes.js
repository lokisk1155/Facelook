import { Route } from "react-router-dom";
import CreateStoryIntro from "../components/Stories/CreateStory";
import GetAllStories from "../hooks/getAllStories";

export function StoryRoutes() {
  return (
    <>
      <Route exact path="/stories/create" render={() => <CreateStoryIntro />} />
      <Route exact path="/stories/:id" render={() => <GetAllStories />} />
    </>
  );
}
