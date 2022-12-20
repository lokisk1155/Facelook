import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchFriends } from "../../store/friend";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchUsers } from "../../store/user";
import profilePic from "../NavBar/imgs/blank.png";
import { Link } from "react-router-dom";
import "./Friends.css" 

function Friends() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [friendsArray, setFriendsArray] = useState(null);

  const [divHeight, setDivHeight] = useState(null)

  const friends = useSelector((state) => {
    return Object.values(state.user[id].friends);
  });

  console.log(divHeight, 'divheight')


  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFriends(id));
      if (friends) {
        const users = await dispatch(fetchUsers(friends));
        setFriendsArray(users);
        if (Object.values(users).length > 2) {
          let dividedLength = Math.floor(Object.values(users).length / 2)
          let divCalc = (dividedLength * 125) + 225
          setDivHeight(`${divCalc}px`)
        } else {
          setDivHeight(`250px`)
        }
      }
    };
    fetchData();
  }, []);

  return (
      <div className="column-container">
      <div className="right-col"></div>
      <div className="middle-col" style={{ height: divHeight }}>
      <div className="friends-headers">
        <h2>Friends</h2>
        <div className="friends-search-bar-container">
          <input className="friends-search-input"/>
        </div>

      </div>
      {friendsArray
        ? 
        <div className="please-work-oh-my" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {Object.values(friendsArray).map((friend) => {
            return (
              <div key={friend.id} className="actual-friend-container">
                <Link to={`/ProfilePage/${friend.id}`}>
                  <img className="friend-profile-pic" src={profilePic}></img>
                </Link>
                <p className="friend-profile-name">{`${friend.first_name} ${friend.last_name}`}</p>
              </div>
            );
          })}</div>
          
        : null}
      </div>
        <div className="left-col" ></div>
      </div>
  );
}

export default Friends;
