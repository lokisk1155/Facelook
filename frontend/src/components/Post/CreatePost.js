import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { createPost, receivePost } from '../../store/post'
import { useState } from 'react'
import { useEffect } from 'react'
import './CreatePost.css'
import profilePic from '../NavBar/imgs/blank.png'
import { userReceivePost } from '../../store/profilePage'
import CropEasy from '../crop/CropEasy'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'

function CreatePost({ closeModal, location = 'home' }) {
  const dispatch = useDispatch()

  const { id } = useParams()

  const sessionUser = useSelector((state) => state.session.user)

  const [content, setContent] = useState('')

  const [photoFile, setPhotoFile] = useState(null)

  const [photoUrl, setPhotoUrl] = useState(null)

  const [openCrop, setOpenCrop] = useState(false)

  const [containerHeight, setContainerHeight] = useState(null)

  const [textareaHeight, setTextareaHeight] = useState('30%')

  useEffect(() => {
    if (photoFile) {
      setContainerHeight('600px')
      setTextareaHeight('10%')
    } else {
      setContainerHeight('400px')
      setTextareaHeight('40%')
    }
  }, [photoFile])

  function handlePostSubmit() {
    if (content.length < 1) return closeModal(null)
    let formData
    if (photoFile) {
      formData = new FormData()
      formData.append('postAttached[photo]', photoFile)
    }
    const post = {
      content,
      user_id: id ? id : sessionUser.id,
    }

    if (location === 'profile') {
      dispatch(createPost(post, formData)).then((data) => {
        dispatch(userReceivePost(data))
      })
    } else {
      dispatch(createPost(post, formData)).then((data) => {
        dispatch(receivePost(data))
      })
    }
    return closeModal(null)
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        setPhotoFile(file)
        setPhotoUrl(fileReader.result)
      }
    }
    setOpenCrop(true)
  }

  return (
    <div className="omega-create-post-modal" style={{ height: containerHeight }}>
      {openCrop ? (
        <CropEasy
          photoURL={photoUrl}
          setOpenCrop={setOpenCrop}
          setPhotoURL={setPhotoUrl}
          setFile={setPhotoFile}
        />
      ) : (
        <>
          {' '}
          <h3 style={{ textAlign: 'center' }}>Create Post</h3>
          <div style={{ width: '100%', borderBottom: '1px solid lightgrey' }}></div>
          <div
            style={{
              display: 'flex',
              height: '15%',
              maxHeight: '45px',
              padding: '5px',
              alignItems: 'center',
            }}
          >
            <img
              alt=""
              style={{ height: '90%', borderRadius: '50%' }}
              src={sessionUser.profile_picture || profilePic}
            ></img>
            <h3
              style={{ marginLeft: '15px' }}
            >{`${sessionUser.first_name} ${sessionUser.last_name}`}</h3>
          </div>
          <textarea
            autoFocus={true}
            style={{
              width: '100%',
              height: textareaHeight,
              paddingLeft: '7px',
            }}
            type="text"
            placeholder={`What's on your mind ${sessionUser.first_name}?`}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {photoFile ? (
            <img alt="" src={photoUrl} style={{ height: '50%', width: '100%' }} />
          ) : (
            <label className="custom-file-upload">
              <FontAwesomeIcon size="xl" color="green" icon={faFileUpload} />
              <input className="input-file-post" type="file" onChange={handleFile} />
            </label>
          )}
          <button
            style={{
              width: '95.5%',
              height: '50px',
              border: 'none',
              marginTop: '5px',
              backgroundColor: content.length < 1 ? 'lightgrey' : '#166fe5',
              color: content.length < 1 ? 'black' : 'white',
              borderRadius: '3px',
              alignSelf: 'center',
            }}
            onClick={handlePostSubmit}
          >
            Post
          </button>
        </>
      )}
    </div>
  )
}

export default CreatePost
