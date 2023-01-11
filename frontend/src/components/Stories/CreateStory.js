function CreateStory() {
  return (
    <div
      className="story-creation-container"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="text-story-button"
        style={{
          backgroundImage: `url(https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/eDvxJuy2gCL.png)`,
          backgroundPosition: "0px -331px",
          backgroundSize: "221px 687px",
          width: "220px",
          height: "330px",
          backgroundRepeat: "no-repeat",
          display: "inline-block",
          marginRight: "10px",
        }}
      >
        <p style={{ justifyContent: "center", color: "#fff", marginTop: "150px", fontSize: "18px" }}>
          Create a photo story
        </p>
      </div>
      <div
        className="picture-story-button"
        style={{
          backgroundImage: `url(https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/eDvxJuy2gCL.png)`,
          backgroundPosition: "0px 0px",
          backgroundSize: "221px 687px",
          width: "220px",
          height: "330px",
          backgroundRepeat: "no-repeat",
          display: "inline-block",
          marginLeft: "10px",
          position: "relative"
        }}
      >
        <p style={{ justifyContent: "center", color: "#fff", marginTop: "150px", fontSize: "18px"}}>
          Create a text story
        </p>
      </div>
    </div>
  );
}

export default CreateStory;
