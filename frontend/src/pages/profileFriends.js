import ProfileTop from "../components/ProfilePage/ProfileTop";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Friends from "../components/ProfilePage/Friends";
import { profilePage } from "../store/profilePage";
import { useState } from "react";

function ProfileFriends() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friends);

  const noPosts = true;

  useEffect(() => {
    dispatch(profilePage(id));
  }, [id]);

  if (!currentUser || !sessionUser || !id || !friends) {
    return null;
  }

  return (
    <>
      {friends ? (
        <ProfileTop
          sessionUser={sessionUser}
          currentUser={currentUser}
          friends={friends}
        />
      ) : null}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "80vw",
            maxWidth: "1250px",
          }}
        >
          {friends ? (
            <Friends
              sessionUser={sessionUser}
              currentUser={currentUser}
              friends={friends}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ProfileFriends;
