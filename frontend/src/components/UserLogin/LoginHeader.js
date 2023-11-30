function LoginHeader() {
  const isViewportUnderCertainWidth = window.innerWidth < 768 // Adjust the width as per your needs

  if (isViewportUnderCertainWidth) {
    return null // Render nothing if the viewport width is under the specified value
  }

  return (
    <header
      style={{
        marginBottom: '20px',
        width: '450px',
        marginRight: '50px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ color: '#1877f2', fontSize: '65px', fontWeight: 'bolder' }}>Facelook</h1>
      <p style={{ margin: '10px' }}>Give us your data</p>
    </header>
  )
}

export default LoginHeader
