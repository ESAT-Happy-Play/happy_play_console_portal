import React, { useState, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { ContentLoader } from ".";
import { ImageService } from '../../services'

export const DragDropProfileUpload = ({ uploadType = 0, onView, callBack }) => {
    const [pageLoader, setPageLoader] = useState(false);

    // const [files, setFiles] = useState([]);
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
    
    return (
    <section >
        <div style={{textAlign:'center', borderRadius:'10px', padding:'15px', marginBottom:'10px'}}>   
            <p style={{margin:'0px', color:'black', fontSize:'18px'}}>
                {
                    (uploadType === 0) ? "Attach ID"
                    : (uploadType === 1) ? "Attach Selfie"
                    : ""
                }
            </p>
            <div style={{ display:'flex', justifyContent:'space-evenly'}}>
                <div style={{cursor:'pointer'}} {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <div>
                        <UploadFileIcon style={{fontSize:'30px'}} />
                        <p style={{margin:'0px'}}>Upload Picture</p>
                    </div>
                </div>
            </div>
        </div>

        <ContentLoader isLoadingPage={ pageLoader } />
    </section>
  )
}
