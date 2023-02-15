import { useState, useEffect } from "react";

function PostImageLoading({ src }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setImageSrc(src);
    }, 2000);
  }, [src]);

  return (
    <>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          style={{
            width: "100%",
            height: "500px",
            paddingTop: "5px",
            border: "none",
          }}
        />
      ) : (
        <img
          className="skeleton"
          alt=""
          style={{
            width: "100%",
            height: "500px",
            paddingTop: "5px",
            border: "none",
          }}
        />
      )}
    </>
  );
}

export default PostImageLoading;
