import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { updateUser } from '../../../../store/user'

function EditPhoneNumber({ currentUser }) {
  const dispatch = useDispatch()

  const [fakePhoneNumber, setFakePhoneNumber] = useState('')

  const [toggle, setToggle] = useState(false)

  const handlePhoneNumber = () => {
    let phone_number = fakePhoneNumber
    let cloneWithoutRedux = { ...currentUser }
    delete cloneWithoutRedux.friends
    delete cloneWithoutRedux.profile_picture
    delete cloneWithoutRedux.cover_photo
    delete cloneWithoutRedux.password
    const user = {
      ...cloneWithoutRedux,
      phone_number,
    }
    dispatch(updateUser(user))
    setToggle(false)
  }

  return (
    <>
      {currentUser.phone_number ? (
        <>
          {' '}
          <p>{currentUser.phone_number}</p>{' '}
          {toggle ? null : (
            <button style={{ margin: '5px' }} onClick={() => setToggle(true)}>
              Edit phone number
            </button>
          )}
        </>
      ) : (
        <button style={{ margin: '5px' }} onClick={() => setToggle(true)}>
          Add Phone
        </button>
      )}
      {toggle && (
        <form onSubmit={handlePhoneNumber}>
          <input
            type="text"
            onChange={(e) => setFakePhoneNumber(e.target.value)}
            default="Phone Number"
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

export default EditPhoneNumber
