import { useDispatch, useSelector } from "react-redux";
import StoryShow from "../components/Stories/StoryShow";
import { fetchStories } from "../store/story";
import { getSimpleUsers } from "../store/simpleUsers";
import { useEffect } from "react";

export default function GetAllStories() {
  const dispatch = useDispatch();

  const simpleUsers = useSelector((state) => state.simpleUsers);

  useEffect(() => {
    dispatch(fetchStories());

    if (!simpleUsers) {
      dispatch(getSimpleUsers());
    }
  }, [dispatch, simpleUsers]);

  return <StoryShow />;
}
