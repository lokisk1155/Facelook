import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { updateUser } from '../../../../store/user'

function EditEducation({ currentUser }) {
  const dispatch = useDispatch()

  const [fakeEducation, setFakeEducation] = useState('')

  const [toggle, setToggle] = useState(false)

  const handleEducation = () => {
    let education = fakeEducation
    let cloneWithoutRedux = { ...currentUser }
    delete cloneWithoutRedux.friends
    delete cloneWithoutRedux.profile_picture
    delete cloneWithoutRedux.cover_photo
    delete cloneWithoutRedux.password
    const user = {
      ...cloneWithoutRedux,
      education,
    }
    dispatch(updateUser(user))
    setToggle(false)
  }

  return (
    <>
      {currentUser.education ? (
        <>
          {' '}
          <p>{currentUser.education}</p>{' '}
          {toggle ? null : (
            <button style={{ margin: '5px' }} onClick={() => setToggle(true)}>
              Edit College
            </button>
          )}
        </>
      ) : (
        <button style={{ margin: '5px' }} onClick={() => setToggle(true)}>
          Add Education
        </button>
      )}
      {toggle && (
        <form onSubmit={handleEducation}>
          <input
            type="text"
            onChange={(e) => setFakeEducation(e.target.value)}
            default="Education"
          ></input>
          <button style={{ margin: '5px' }} onClick={() => setToggle(false)}>
            Cancel
          </button>
          <button style={{ margin: '5px' }} type="submit">
            Submit
          </button>
        </form>
      )}
    </>
  )
}

export default EditEducation
