import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateUser } from '../../store/user';

function EditBio({ closeModal }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const [bio, setBio] = useState('');

  const handleBioSubmit = (e) => {
    e.preventDefault();
    let cloneWithoutRedux = { ...currentUser };
    delete cloneWithoutRedux.friends;
    delete cloneWithoutRedux.profile_picture;
    delete cloneWithoutRedux.cover_photo;
    delete cloneWithoutRedux.password;
    const user = {
      ...cloneWithoutRedux,
      bio,
    };
    closeModal(false);
    return dispatch(updateUser(user));
  };

  return (
    <div style={{ width: '100%', height: '100px', marginBottom: '20px' }}>
      <textarea
        placeholder="Describe who you are"
        autoFocus={true}
        onChange={(e) => setBio(e.target.value)}
        style={{
          width: '95%',
          height: '80%',
          fontSize: '1rem',
          padding: '5px',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          style={{ border: 'none', width: '20%' }}
          onClick={() => closeModal(null)}
        >
          cancel
        </button>
        {bio.length > 1 ? (
          <button
            onClick={handleBioSubmit}
            style={{ border: 'none', width: '20%' }}
          >
            save
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default EditBio;
