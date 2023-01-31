import ProfileTop from "../components/ProfilePage/ProfileTop";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Intro from "../components/ProfilePage/Intro";
import FriendsContainer from "../components/ProfilePage/FriendsContainer";
import { profilePage } from "../store/profilePage";
import PostFeed from "../components/HomePage/Middle/PostFeed";
import SessionUserIntro from "../components/ProfilePage/SessionUserIntro";
import "./ProfileDefault.css";
import ProfileTopLoading from "../components/loading/profileTopLoading";
import ProfileDefaultLoading from "../components/loading/profileDefaultLoading";

function ProfileDefault() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [introContainerHeight, setIntroContainerHeight] = useState(50);

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friends);

  let loading = true

  if (!currentUser  || !sessionUser) {
    loading = false
    dispatch(profilePage(id))
  }

  return (
    <>
      {loading ? <ProfileTop
        sessionUser={sessionUser}
        currentUser={currentUser}
        friends={friends}
      /> : <ProfileTopLoading />}
      {loading ? <div className="content-container-profile-default">
        <div className="flex-or-nah-profile">
          <div className="boxes-container-profile-default">
            <div
              className="intro-container"
              style={{ height: `${introContainerHeight}px` }}
            >
              <div
                style={{ fontSize: "1.5rem", margin: "1px", padding: "2.5px" }}
              >
                {"Intro"}
              </div>
              {id == sessionUser.id ? (
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
      </div> : <ProfileDefaultLoading />}
    </>
  );
}

export default ProfileDefault;
