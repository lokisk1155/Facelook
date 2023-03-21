import React, { useEffect, useState } from "react";

const PostLoading = ({ src }) => {
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setImageSrc(src);
    }, 1000);
  }, [src]);

  return (
    <>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          style={{
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            padding: "7px",
            border: "none",
          }}
        />
      ) : (
        <div
          className="skeleton"
          alt=""
          style={{
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            margin: "7px",
            border: "none",
          }}
        />
      )}
    </>
  );
};

export default PostLoading;
