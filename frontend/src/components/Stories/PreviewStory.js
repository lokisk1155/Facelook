import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createStory } from "../../store/story";
import StoryCrop from "../crop/StoryCrop";
import PreviewCurrentStory from "./PreviewCurrentStory";
import TextStory from "./TextStory";

function PreviewStory({ file, setFile, url, setUrl }) {
  const [fileSaved, setFileSaved] = useState(null);

  return (
    <>
      {!fileSaved ? (
        <StoryCrop
          photoURL={url}
          setPhotoURL={setUrl}
          setFile={setFile}
          fileSaved={setFileSaved}
        />
      ) : (
        <>
          <TextStory photoUrl={url} file={file} />
        </>
      )}
    </>
  );
}

export default PreviewStory;
