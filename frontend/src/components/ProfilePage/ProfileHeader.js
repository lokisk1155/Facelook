import "./ProfileHeaders.css";
import { useState } from "react";
import Posts from "./Posts";
import AboutPage from "./AboutPage/AboutPage";
import Overview from "./AboutPage/Overview";
import PlacesLived from "./AboutPage/PlacesLived";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../../store/user";
import { fetchUser } from "../../store/user";
import { fetchtPosts } from "../../store/post";
import ProfileTop from "./ProfileTop";
import Friends from "./Friends";
import { fetchFriend } from "../../store/friend";

function ProfileHeader({ load }) {
  const dispatch = useDispatch();

  const [showPosts, setShowPosts] = useState(true);
  const [customPosts, setCustomPosts] = useState(false);

  const [showAbout, setShowAbout] = useState(false);
  const [customAbout, setCustomAbout] = useState(false);

  const [showFriends, setShowFriends] = useState(false);

  const [renderString, setRenderString] = useState("");

  const { id } = useParams();

  const currentUser = useSelector(getCurrent(id));

  const sessionUser = useSelector((state) => {
    return state.session.user;
  });

  const friends = useSelector((state) => {
    return state.friend;
  });

  if (load) {
    setRenderString(load)
  }

  useEffect(() => {
    // fireEmergency()
    dispatch(fetchUser(id)).then(() => dispatch(fetchFriend(currentUser.id)));
  }, [id]);

  function redirect(header, component) {
    if (!header) {
      setShowAbout(true);
      setShowPosts(false);
      setCustomPosts(false);
      setShowFriends(false);
      // fireEmergency()
    } else {
      setShowAbout(false);
      setShowPosts(true);
      setCustomPosts(false);
      setShowFriends(false);
      // fireEmergency()
    }

    setRenderString(component);

    return;
  }
  if (!currentUser) {
    return null;
  }
  return (
    <div>
      <div className="profile-top-container">
        <ProfileTop currentUser={currentUser} sessionUser={sessionUser} />
      </div>
      <div className="profile-selectors">
        <button
          className="posts-selector-button"
          onClick={() => {
            setCustomPosts(!customPosts);
            setShowPosts(true);
            setShowAbout(false);
            setCustomAbout(false);
            setShowFriends(false);
            // fireEmergency()
          }}
        >
          Posts
        </button>

        <button
          className="about-selector-button"
          onClick={() => {
            setCustomAbout(!customAbout);
            setShowAbout(true);
            setShowPosts(false);
            setCustomPosts(false);
            setShowFriends(false);
            // fireEmergency()
          }}
        >
          About
        </button>

        <button
          className="about-selector-button"
          onClick={() => {
            setShowFriends(!showFriends);
            setShowFriends(true);
            setShowAbout(false);
            setShowPosts(false);
            setCustomPosts(false);
            // fireEmergency()
          }}
        >
          Friends
        </button>
      </div>

      {showPosts && (
        <Posts
          currentUser={currentUser}
          sessionUser={sessionUser}
          redirect={redirect}
        />
      )}
      {showAbout && (
        <AboutPage
          currentUser={currentUser}
          sessionUser={sessionUser}
          renderString={renderString}
        />
      )}
      {showFriends && (
        <Friends currentUser={currentUser} sessionUser={sessionUser} />
      )}
    </div>
  );
}

export default ProfileHeader;
