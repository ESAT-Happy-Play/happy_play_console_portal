import React, { useState, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { ContentLoader } from "../../components/mui";
import { ImageService } from '../../services'

export const DragDropTicketUpload = ({ callBack }) => {
    const [pageLoader, setPageLoader] = useState(false);

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            console.log(files);
            files.push(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )[0]
            );

            // upload to image Api
            acceptedFiles.map((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPageLoader(true);
                    // ImageService.uploadBase64Image(reader.result).then((res) => {
                    //     callBack(res.data);
                    //     setPageLoader(false);
                    // });
                };
                reader.readAsDataURL(file);
            });
        }
    });

    const thumbs = files.map((file, index) => (
        <div key={file.name}>
            <div style={{display:'flex', justifyContent:'center', marginTop:'15px', marginBottom:'15px'}}>
                <img style={{objectFit:'cover', width:'150px', borderRadius:'15px'}} src={file.preview } alt="" />
            </div>
        </div>
    ));

    useEffect(
        () => () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
    [files]);
    
    return (
    <section >
        <div style={{textAlign:'center', border:'2px solid #4845d2', borderStyle:'dashed', borderRadius:'10px', padding:'15px', marginBottom:'10px'}}>   
            <div style={{ display:'flex', justifyContent:'space-evenly'}}>
                <div style={{cursor:'pointer'}} {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <div>
                        <UploadFileIcon style={{fontSize:'30px'}} />
                        <p style={{margin:'0px', color:'black', fontSize:'15px'}}>
                            Drop here to attached or <a href="#">upload</a> <br/>
                            <span>Max size: 25MB</span>
                        </p>
                    </div>
                </div>
            </div>
            <div style={{display:'flex', gap:'10px'}}>
                {thumbs}
            </div>
        </div>

        <ContentLoader isLoadingPage={ pageLoader } />
    </section>
  )
}
