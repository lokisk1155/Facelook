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
          }}
        />
      ) : (
        <img
          className="skeleton"
          alt=""
          style={{
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            margin: "7px",
          }}
        />
      )}
    </>
  );
};

export default PostLoading;
