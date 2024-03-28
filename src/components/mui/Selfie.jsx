import React, { useState } from 'react';
import Webcam from 'react-webcam';

import CameraFrontIcon from '@mui/icons-material/CameraFront';
import { Button } from "@mui/material";

const WebcamComponent = () => <Webcam />

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
const Selfie = ({ imageCalback }) => {
  const [picture, setPicture] = useState(null)
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc)
    imageCalback(pictureSrc);
  });

  return (
    <div style={{display:'flex', justifyContent:'center', border:'2px dashed rgb(72, 69, 210);',borderRadius:'10px', padding:'5px 0 0 0'}}>
      <div>
        <div style={{position:'absolute',bottom:'8px',right:'25px',zIndex:'999'}}>
            {picture !== null ? (
                <Button sx={{textTransform:'capitalize',}} onClick={(e) => { 
                    e.preventDefault()
                    setPicture(null) 
                    imageCalback(null)
                    }} color='primary' variant='contained' >
                    Retake <CameraFrontIcon />
                </Button>
                ) : (
                <Button sx={{textTransform:'capitalize',}} onClick={(e) => { 
                    e.preventDefault()
                    capture() 
                    }} color='primary' variant='contained' >
                    Capture <CameraFrontIcon />
                </Button>
            )}
        </div>
        {picture === null ? (
          <Webcam
            audio={false}
            height={250}
            ref={webcamRef}
            width={250}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} />
        )}
      </div>
    </div>
  )
}

export default Selfie