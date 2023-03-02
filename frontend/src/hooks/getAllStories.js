import { useDispatch, useSelector } from "react-redux";
import StoryShow from "../components/Stories/StoryShow";
import { addAll, fetchStories } from "../store/story";
import { getSimpleUsers, setSimpleUsers } from "../store/simpleUsers";
import { useEffect } from "react";
import { useRef } from "react";

export default function GetAllStories() {
  const dispatch = useDispatch();

  const simpleUsers = useSelector((state) => state.simpleUsers);
  const stories = useSelector((state) => state.stories);

  const simpleUsersCachedRef = useRef(simpleUsers);
  const storiesCachedRef = useRef(stories);

  useEffect(() => {
    if (!Object.keys(simpleUsersCachedRef.current).length) {
      dispatch(getSimpleUsers()).then((data) => {
        simpleUsersCachedRef.current = data;
      });
    } else {
      dispatch(setSimpleUsers(simpleUsersCachedRef.current));
    }

    if (
      !Object.keys(storiesCachedRef.current).length ||
      Object.keys(storiesCachedRef.current).length < 4
    ) {
      dispatch(fetchStories()).then((data) => {
        storiesCachedRef.current = data;
      });
    } else {
      dispatch(addAll(storiesCachedRef.current));
    }
  }, [dispatch]);

  return Object.keys(simpleUsersCachedRef.current).length ? (
    <StoryShow />
  ) : null;
}
