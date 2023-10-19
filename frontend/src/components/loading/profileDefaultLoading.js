function ProfileDefaultLoading() {
  let number = 6;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        alignItems: 'center',
        height: '50%',
        marginTop: '15px',
      }}
    >
      {[...Array(number)].map((n, idx) => {
        return (
          <div
            key={idx}
            className="skeleton"
            style={{
              height: '150px',
              width: '50%',
              marginBottom: '15px',
              borderRadius: '5px',
            }}
          />
        );
      })}
    </div>
  );
}

export default ProfileDefaultLoading;
