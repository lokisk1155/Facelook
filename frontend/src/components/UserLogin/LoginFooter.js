function LoginFooter() {
  const styles = {
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: 'rgb(145, 145, 145)',
    textDecoration: 'none',
    fontSize: '1rem',
    margin: '5px',
  };

  const isViewportUnderCertainWidth = window.innerWidth < 768; // Adjust the width as per your needs

  if (isViewportUnderCertainWidth) {
    return null; // Render nothing if the viewport width is under the specified value
  }
  return (
    <footer
      className="foooooter"
      style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '15%',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <article
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '50%',
          ...styles,
        }}
      >
        <a style={{ ...styles }} href="https://github.com/lokisk1155">
          GitHub
        </a>
        <a
          style={{ ...styles }}
          href="https://www.linkedin.com/in/shawn-mallon/"
        >
          LinkedIn
        </a>
      </article>
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width: '50%',
        }}
      >
        <div style={{ ...styles }}>
          Technologies: Ruby on Rails - Postgres - React - Redux - AWSs3 -
          Jbuilder - Json
        </div>
        <div style={{ ...styles }}>By Shawn Mallon</div>
      </section>
    </footer>
  );
}

export default LoginFooter;
