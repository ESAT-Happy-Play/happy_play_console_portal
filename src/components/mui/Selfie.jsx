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
const Selfie = () => {
  const [picture, setPicture] = useState(null)
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc)
  });

  return (
    <div style={{display:'flex', justifyContent:'center', border:'2px dashed rgb(72, 69, 210);',borderRadius:'10px', padding:'5px 0 0 0'}}>
      <div>
        <div style={{position:'absolute',bottom:'10px',right:'55px',zIndex:'999'}}>
            {picture !== null ? (
                <Button onClick={(e) => { 
                    e.preventDefault()
                    setPicture(null) 
                    }} color='primary' variant='contained' >
                    Retake <CameraFrontIcon />
                </Button>
                ) : (
                <Button onClick={(e) => { 
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