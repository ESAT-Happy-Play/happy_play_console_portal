import React, { useState, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import SelfieDialog from '../Dialog/SelfieDialog';

import { ContentLoader } from "../../components/mui";
import { ImageService } from '../../services'

export const DragDropSelfieUpload = ({ uploadType = 0, onView, callBack }) => {
    const [pageLoader, setPageLoader] = useState(false);
    const [startSelfie, setstartSelfie] = React.useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            onView(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )[0].preview
            );

            // upload to image Api
            acceptedFiles.map((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPageLoader(true);
                    ImageService.uploadBase64Image(reader.result).then((res) => {
                        callBack(res.data, uploadType);
                        setPageLoader(false);
                    });
                };
                reader.readAsDataURL(file);
            });
        }
    });

    const handleSelfieCallback = (data, image) => {
        onView(image);
        callBack(data, uploadType);
    }
    
    return (
    <section >
        <div style={{textAlign:'center', borderRadius:'10px'}}>
            <p style={{margin:'0px', color:'black', fontSize:'18px'}}>
                Attach Selfie
            </p>
            <br/>
            <br/>
            <div>

                <div onClick={() => setstartSelfie(true)}>
                    <div style={{cursor:'pointer'}}>
                        <CameraFrontIcon style={{fontSize:'30px'}} />
                        <p style={{margin:'0px'}}>Take a Picture</p>
                    </div>
                </div>

                <br/><br/>

                <div style={{cursor:'pointer'}} {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <div>
                        <UploadFileIcon style={{fontSize:'30px'}} />
                        <p style={{margin:'0px'}}>Upload Picture</p>
                    </div>
                </div>
            </div>
        </div>

        <SelfieDialog isOpen={startSelfie} callBack={handleSelfieCallback} onClose={() => setstartSelfie(false)} />
        <ContentLoader isLoadingPage={ pageLoader } />
    </section>
  )
}
