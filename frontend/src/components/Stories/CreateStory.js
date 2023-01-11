import "./CreateStory.css";
import { useState } from "react";
import PreviewStory from "./PreviewStory";
import TextStory from "./TextStory";

function CreateStory() {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [textStory, setTextStory] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPhotoFile(file);
        setPhotoUrl(fileReader.result);
      };
    }
  };

  return (
    <>
      {!photoFile && !textStory ? (
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
          <label
            className="text-story-button"
            style={{
              backgroundImage: `url(https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/eDvxJuy2gCL.png)`,
              backgroundPosition: "0px -331px",
              backgroundSize: "221px 687px",
              width: "220px",
              height: "330px",
              backgroundRepeat: "no-repeat",
              display: "inline-block",
              margin: "5px",
              borderRadius: "15px",
            }}
          >
            {" "}
            <input
              type="file"
              onChange={handleFile}
              style={{ display: "none" }}
            />
            <p
              style={{
                justifyContent: "center",
                color: "#fff",
                marginTop: "150px",
                fontSize: "18px",
              }}
            >
              Create a photo story
            </p>
          </label>
          <label
            className="picture-story-button"
            onClick={() => setTextStory(true)}
            style={{
              backgroundImage: `url(https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/eDvxJuy2gCL.png)`,
              backgroundPosition: "0px 0px",
              backgroundSize: "221px 687px",
              width: "220px",
              height: "330px",
              backgroundRepeat: "no-repeat",
              display: "inline-block",
              borderRadius: "15px",
              margin: "5px",
            }}
          >
            <p
              style={{
                justifyContent: "center",
                color: "#fff",
                marginTop: "150px",
                fontSize: "18px",
              }}
            >
              Create a text story
            </p>
          </label>
        </div>
      ) : null }
      {photoFile && photoUrl ? (
        <PreviewStory
          file={photoFile}
          setFile={setPhotoFile}
          url={photoUrl}
          setUrl={setPhotoUrl}
        />
      ) : null }
      {textStory ? <TextStory /> : null}
    </>
  );
}

export default CreateStory;
