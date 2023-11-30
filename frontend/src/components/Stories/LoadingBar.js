import { useEffect, useState, useCallback } from 'react'
import './LoadingBar.css'

function LoadingBar({ progressBarWidth, id, window }) {
  const [animationOn, setAnimationOn] = useState(false)

  const toggleAnimation = useCallback(() => {
    setAnimationOn((prevAnimationOn) => !prevAnimationOn)
  }, [])

  useEffect(() => {
    toggleAnimation()
  }, [toggleAnimation, id])

  return (
    <div
      style={{
        width: `${progressBarWidth}%`,
        height: '70%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        margin: '2px',
        borderRadius: '50px',
      }}
    >
      <div
        className={animationOn ? `stories-loading-bar` : `stories-loading-bar-2`}
        style={{ borderRadius: '50px' }}
      />
    </div>
  )
}

export default LoadingBar
