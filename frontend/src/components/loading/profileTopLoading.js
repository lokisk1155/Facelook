function ProfileTopLoading() {
  return (
    <div
      style={{
        height: "50vh",
        width: "100vw",
        marginTop: "45px",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          height: "70%",
          width: "100vw",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <div
          className="skeleton"
          style={{ height: "100%", width: "85%", objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          height: "29%",
          display: "flex",
          width: "100vw",
          backgroundColor: "#fff",
          justifyContent: "space-around",
        }}
      >
        <div
          className="skeleton"
          style={{
            height: "22.5vh",
            width: "22.5vh",
            borderRadius: "50%",
            cursor: "pointer",
            border: "5px solid #fff",
            transform: "translateY(-100px)",
          }}
        />
        <div style={{ width: "65px", height: "100%" }}></div>
      </div>
    </div>
  );
}

export default ProfileTopLoading;
