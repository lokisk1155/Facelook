import ProfileTop from "../components/ProfilePage/ProfileTop";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Intro from "../components/ProfilePage/Intro";
import FriendsContainer from "../components/ProfilePage/FriendsContainer";
import PostFeed from "../components/HomePage/Middle/PostFeed";
import SessionUserIntro from "../components/ProfilePage/SessionUserIntro";
import "./ProfileDefault.css";

function ProfileDefault() {
  const { id } = useParams();

  const [introContainerHeight, setIntroContainerHeight] = useState(50);

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friends);

  return (
    <>
      <ProfileTop
        sessionUser={sessionUser}
        currentUser={currentUser}
        friends={friends}
      />
      <div className="content-container-profile-default">
        <div className="flex-or-nah-profile">
          <div className="boxes-container-profile-default">
            <div
              className="intro-container"
              style={{ height: `${introContainerHeight}px` }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  margin: "1px",
                  padding: "2.5px",
                }}
              >
                {"Intro"}
              </div>
              {parseInt(id) === sessionUser.id ? (
                <SessionUserIntro
                  currentUser={currentUser}
                  changeHeight={setIntroContainerHeight}
                />
              ) : (
                <Intro
                  currentUser={currentUser}
                  changeHeight={setIntroContainerHeight}
                />
              )}
            </div>

            <div
              className="friends-box-profile-default"
              style={{
                backgroundColor: "#fff",
                boxShadow: "0px 6px 6px 0px lightgrey",
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  padding: "2.5px",
                  paddingTop: "10px",
                }}
              >
                {"Friends"}
              </div>
              <FriendsContainer
                currentUser={currentUser}
                sessionUser={sessionUser}
              />
            </div>
          </div>
          <div
            className="post-feed-profile-default"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            <PostFeed profilePage={true} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDefault;
