import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StoryShow from "../components/Stories/StoryShow";
import { fetchStories } from "../store/story";
import { useState } from "react";
import { getSimpleUsers } from "../store/simpleUsers";

export default function GetAllStories() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const simpleUsers = useSelector((state) => state.simpleUsers)

  const [cashe, setCashe] = useState(null);

  useEffect(() => {
    if (!cashe) {
      dispatch(fetchStories()).then((data) => {
        setCashe(data);
      });
    }

    if (!simpleUsers) {
        dispatch(getSimpleUsers())
    }
  }, [id]);

  return <StoryShow />;
}
