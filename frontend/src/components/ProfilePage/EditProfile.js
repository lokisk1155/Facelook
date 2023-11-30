import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../store/user'
import ProfileCrop from '../crop/ProfileCrop'
import CoverCrop from '../crop/CoverCrop'
import './EditProfile.css'

function EditProfile({ closeModal, cover, profile }) {
  const dispatch = useDispatch()

  const id = useSelector((state) => state.session.user.id)

  const [photoFile, setPhotoFile] = useState(null)

  const [photoUrl, setPhotoUrl] = useState(null)

  const [photoFileCover, setPhotoFileCover] = useState(null)

  const [photoUrlCover, setPhotoUrlCover] = useState(null)

  const [toggleCrop, setToggleCrop] = useState(false)

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    if (photoFile) {
      formData.append('user[profile_pic]', photoFile)
    }
    const user = {
      id: id,
    }
    dispatch(updateUser(user, formData))
    return closeModal(false)
  }

  const handleUpdateCoverPhoto = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    if (photoFileCover) {
      formData.append('user[cover_photo]', photoFileCover)
    }
    const user = {
      id: id,
    }
    dispatch(updateUser(user, formData))
    return closeModal(false)
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    setPhotoFileCover(null)
    setPhotoUrlCover(null)
    if (file) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        setPhotoFile(file)
        setPhotoUrl(fileReader.result)
      }
      setToggleCrop(true)
    }
  }

  const handleFileCover = (e) => {
    const file = e.target.files[0]
    setPhotoFile(null)
    setPhotoUrl(null)
    if (file) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        setPhotoFileCover(file)
        setPhotoUrlCover(fileReader.result)
      }
      setToggleCrop(true)
    }
  }

  return (
    <>
      {!toggleCrop ? (
        <div
          className="edit-profile-modal-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <>
            <h3 style={{ textAlign: 'center' }}>Edit Pictures</h3>
            <div
              style={{
                height: '1px',
                width: '100%',
                borderBottom: '1px solid lightgrey',
              }}
            ></div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <h3 style={{ paddingTop: '0', marginTop: '0' }}>Profile Picture</h3>

                {photoUrl ? (
                  <button onClick={handleUpdateProfile}>upload</button>
                ) : !toggleCrop ? (
                  <label
                    style={{
                      height: '100%',
                      width: '10%',
                      color: 'blue',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    edit
                    <input style={{ visibility: 'hidden' }} type="file" onChange={handleFile} />
                  </label>
                ) : null}
              </div>
              <img
                alt=""
                style={{
                  height: '115px',
                  width: '115px',
                  borderRadius: '50%',
                  alignSelf: 'center',
                  marginBottom: '10px',
                }}
                src={photoUrl || profile}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <h3 style={{ paddingTop: '0', marginTop: '0' }}>Cover Photo</h3>
                {photoUrlCover ? (
                  <button onClick={handleUpdateCoverPhoto}>upload</button>
                ) : !toggleCrop ? (
                  <label
                    style={{
                      height: '100%',
                      width: '10%',
                      color: 'blue',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    edit
                    <input
                      style={{ visibility: 'hidden' }}
                      type="file"
                      onChange={handleFileCover}
                    />
                  </label>
                ) : null}
              </div>
              <img
                alt=""
                style={{
                  height: '150px',
                  width: '80%',
                  backgroundColor: 'grey',
                  alignSelf: 'center',
                }}
                src={photoUrlCover || cover}
              />
            </div>
          </>
        </div>
      ) : (
        <div className="edit-profile-modal-container">
          {photoUrlCover ? (
            <CoverCrop
              photoURL={photoUrlCover}
              setOpenCrop={setToggleCrop}
              setPhotoURL={setPhotoUrlCover}
              setFile={setPhotoFileCover}
            />
          ) : null}
          {photoUrl ? (
            <ProfileCrop
              photoURL={photoUrl}
              setOpenCrop={setToggleCrop}
              setPhotoURL={setPhotoUrl}
              setFile={setPhotoFile}
            />
          ) : null}
        </div>
      )}
    </>
  )
}

export default EditProfile
