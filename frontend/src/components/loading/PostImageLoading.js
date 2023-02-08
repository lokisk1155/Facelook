import { useState, useEffect } from "react";

function PostImageLoading({ src }) {
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setImageSrc(src);
    }, 1000);
  }, []);

  return (
    <>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "50%",
            paddingTop: "5px",
          }}
        />
      ) : (
        <img
          className="skeleton"
          alt=""
          style={{ height: "100%", width: "100%", paddingTop: "5px" }}
        />
      )}
    </>
  );
}

export default PostImageLoading;
