import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFriend, addFriend, fetchFriend } from "../../store/friend";
import { fetchUser } from '../../store/user';

function ProfileTop({ sessionUser, currentUser }) {
    const dispatch = useDispatch();
    const friend = useSelector(({friend}) => {
        const output = Object.values(friend).filter((f) => {
            return (f.sender_id == sessionUser.id && f.receiver_id == currentUser.id) ||
            (f.sender_id == currentUser.id && f.receiver_id == sessionUser.id);
        });
        return output;
    });

    const is_friend = currentUser.friends.includes(sessionUser.id);

    useEffect(() => {
        dispatch(fetchFriend(currentUser.id));
    }, [sessionUser.id]);


    const handleAdd = (e) => {
        e.preventDefault()
        const friendRequest = {sender_id: sessionUser.id, receiver_id: currentUser.id }
        return dispatch(addFriend(friendRequest))
    }
    
    const handleDelete = (e) => {
        e.preventDefault()
        if (is_friend) {
            const friendshipId = friend[0].id;
            dispatch(deleteFriend(friendshipId)).then(() => {
                dispatch(fetchUser(currentUser.id));
            });
        };
    }

    return (
        <div>
        { is_friend ? 
            <button onClick={handleDelete}>Delete Friend</button> : 
            <button onClick={handleAdd}>Add Friend</button>
        }
        </div>
    )

}

export default ProfileTop