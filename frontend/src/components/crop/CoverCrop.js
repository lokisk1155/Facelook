import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";
import "./index.css";

const CoverCrop = ({ photoURL, setPhotoURL, setFile, closeModal }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async (e) => {
    e.preventDefault();
    try {
      const { file, url } = await getCroppedImg(photoURL, croppedAreaPixels);
      setPhotoURL(url);
      setFile(file);
      closeModal(false);
    } catch (error) {}
  };

  const close = (e) => {
    e.preventDefault();
    setFile(null);
    setPhotoURL(null);
  };

  return (
    <>
      <div className="App">
        <div className="crop-container">
          <Cropper
            image={photoURL}
            crop={crop}
            zoom={zoom}
            aspect={6 / 3.5}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="controls">
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => {
              setZoom(e.target.value);
            }}
            className="zoom-range"
          />
          <div className="action-buttons">
            <button className="save-cancel" role="button" onClick={close}>
              cancel
            </button>
            <button
              className="save-cancel"
              role="button"
              onClick={(e) => cropImage(e)}
            >
              save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoverCrop;
