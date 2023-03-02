import { useDispatch, useSelector } from "react-redux";
import StoryShow from "../components/Stories/StoryShow";
import { addAll, fetchStories } from "../store/story";
import { getSimpleUsers } from "../store/simpleUsers";
import { useEffect, useState } from "react";
import { setSimpleUsers } from "../store/simpleUsers";

export default function GetAllStories() {
  const dispatch = useDispatch();

  const simpleUsers = useSelector((state) => state.simpleUsers);
  const stories = useSelector((state) => state.stories);

  const [simpleUsersCached, setSimpleUsersCached] = useState(simpleUsers);
  const [storiesCached, setStoriesCached] = useState(stories);

  useEffect(() => {
    if (!Object.keys(simpleUsersCached).length) {
      dispatch(getSimpleUsers()).then((data) => setSimpleUsersCached(data));
    } else {
      setSimpleUsers(simpleUsersCached);
    }

    if (
      !Object.keys(storiesCached).length ||
      Object.keys(storiesCached).length < 4
    ) {
      dispatch(fetchStories()).then((data) => setStoriesCached(data));
    } else {
      addAll(storiesCached);
    }
  }, [dispatch]);

  return <StoryShow />;
}
