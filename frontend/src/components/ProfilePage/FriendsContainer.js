import "./FriendsContainer.css";

function FriendsContainer({ friends }) {
  const firstSixFriends = Object.values(friends).slice(0, 6);

  return (
    <div className="friends-container-container">
      <h2 className="intro-header">Friends </h2>
      {firstSixFriends
        ? firstSixFriends.map((friend) => {
            return (
              <div className="indi-friend">
                <p>
                  {friend.first_name} {friend.last_name}
                </p>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default FriendsContainer;
