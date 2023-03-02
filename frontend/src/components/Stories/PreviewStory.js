import { useState } from "react";
import StoryCrop from "../crop/StoryCrop";
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
