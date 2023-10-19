import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { addAll, fetchStories } from '../store/story';
import StoryShow from '../components/Stories/StoryShow';

export default function GetAllStories() {
  const dispatch = useDispatch();

  const [storeHydrated, setStoreHydrated] = useState(null);

  const stories = useSelector((state) => state.stories);
  const simpleUsers = useSelector((state) => {
    const isHydrated = Object.keys(state.simpleUsers).length > 0;
    return isHydrated;
  });

  const storiesCachedRef = useRef(stories);

  useEffect(() => {
    if (!Object.keys(storiesCachedRef.current).length) {
      dispatch(fetchStories()).then((data) => {
        storiesCachedRef.current = data;
        setStoreHydrated(true);
      });
    } else {
      dispatch(addAll(storiesCachedRef.current));
      setStoreHydrated(true);
    }
  }, [dispatch]);

  if (!simpleUsers || !storeHydrated) {
    return null;
  }

  return <StoryShow />;
}
