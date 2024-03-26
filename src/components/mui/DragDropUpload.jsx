import React, { useState, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import SelfieDialog from '../Dialog/SelfieDialog';

import { ContentLoader } from "../../components/mui";
import { ImageService } from '../../services'

export const DragDropUpload = ({ uploadType = 0, callBack }) => {
    const [pageLoader, setPageLoader] = useState(false);
    const [startSelfie, setstartSelfie] = React.useState(false);
    const [selfieImage, setselfieImage] = React.useState(null);

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
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
        setselfieImage(image);
        callBack(data, uploadType);
    }

    const thumbs = files.map((file, index) => (
        <div key={file.name}>
            <div style={{display:'flex', justifyContent:'center', marginTop:'15px', marginBottom:'15px'}}>
                <img style={{objectFit:'cover', width:'250px', borderRadius:'15px'}} src={(selfieImage !== null) ? selfieImage : file.preview } alt="" />
            </div>
        </div>
    ));

    useEffect(
        () => () => {
            setselfieImage(null);
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
    [files]);
    
    return (
    <section >
        <div style={{textAlign:'center', border:'2px solid #4845d2', borderStyle:'dashed', borderRadius:'10px'}}>
            <p style={{margin:'0px', color:'black', fontSize:'18px'}}>
                {
                    (uploadType === 0) ? "Attach ID"
                    : (uploadType === 1) ? "Attach Selfie"
                    : ""
                }
            </p>
            <div style={{ display:'flex', justifyContent:'space-evenly'}}>
                {
                    (uploadType === 1) ?
                    <div onClick={() => setstartSelfie(true)}>
                        <div style={{cursor:'pointer'}}>
                            <CameraFrontIcon style={{fontSize:'30px'}} />
                            <p style={{margin:'0px'}}>Take a Picture</p>
                        </div>
                    </div>
                    : <></>
                }
                
                <div style={{cursor:'pointer'}} {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <div>
                        <UploadFileIcon style={{fontSize:'30px'}} />
                        <p style={{margin:'0px'}}>Upload Picture</p>
                    </div>
                </div>
            </div>
            {
                (selfieImage !== null) ?
                <aside>
                    <div>
                        <div style={{display:'flex', justifyContent:'center', marginTop:'15px', marginBottom:'15px'}}>
                            <img style={{objectFit:'cover', width:'250px', borderRadius:'15px'}} src={ selfieImage } alt="" />
                        </div>
                    </div>
                </aside>
                : <aside>{thumbs}</aside>
            }
        </div>

        <SelfieDialog isOpen={startSelfie} callBack={handleSelfieCallback} onClose={() => setstartSelfie(false)} />
        <ContentLoader isLoadingPage={ pageLoader } />
    </section>
  )
}
