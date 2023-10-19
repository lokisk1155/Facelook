import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Friends from '../components/ProfilePage/Friends';
import ProfileTop from '../components/ProfilePage/ProfileTop';
import './profileFriends.css';

function ProfileFriends() {
  const { id } = useParams();

  const sessionUser = useSelector((state) => state.session.user);

  const currentUser = useSelector((state) => state.user[id]);

  const friends = useSelector((state) => state.friends);

  const currentUserFriends = useSelector((state) => state.user[id]?.friends);

  return (
    <>
      <ProfileTop
        sessionUser={sessionUser}
        currentUser={currentUser}
        friends={friends}
      />
      <div className="friends-profile-page-page-container">
        <div className="friends-tab-content-container">
          <Friends
            sessionUser={sessionUser}
            currentUser={currentUser}
            friends={friends}
            currentUserFriends={currentUserFriends}
          />
        </div>
      </div>
    </>
  );
}

export default ProfileFriends;
