import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';
import "./index.css"

const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false)

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async (e) => {
    e.preventDefault() 
    try {
   
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
      );
      setPhotoURL(url);
      setFile(file);
      setOpenCrop(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <div className="App">
    <div className="crop-container">
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
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
            setZoom(e.target.value)
          }}
          className="zoom-range"
        />
        </div>
          <div className="controls">
                <button onClick={((e) => cropImage(e))}>save</button>
                <button onClick={(() => setOpenCrop(false))}>cancel</button>
        </div>
        </div>
    </>
  );
};

export default CropEasy;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};