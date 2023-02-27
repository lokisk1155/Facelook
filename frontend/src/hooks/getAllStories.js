import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StoryShow from "../components/Stories/StoryShow";
import { fetchStories } from "../store/story";
import { getSimpleUsers } from "../store/simpleUsers";

export default function GetAllStories() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const simpleUsers = useSelector((state) => state.simpleUsers);

  useEffect(() => {
    dispatch(fetchStories());

    if (!simpleUsers) {
      dispatch(getSimpleUsers());
    }
  }, []);

  return <StoryShow />;
}
