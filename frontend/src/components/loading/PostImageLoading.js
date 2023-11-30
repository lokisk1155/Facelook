import { useState, useEffect } from 'react'

function PostImageLoading({ src }) {
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setImageSrc(src)
    }, 2000)
  }, [src])

  return (
    <>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          style={{
            width: '100%',
            height: '500px',
          }}
        />
      ) : (
        <div
          className="skeleton"
          alt=""
          style={{
            width: '100%',
            height: '500px',
            objectFit: 'cover',
          }}
        />
      )}
    </>
  )
}

export default PostImageLoading
