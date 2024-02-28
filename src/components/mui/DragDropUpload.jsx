import React, { useState, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

export const DragDropUpload = ({ callBack }) => {
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
                console.log(file);
            });
        }
    });

    const thumbs = files.map((file, index) => (
        <div key={file.name}>
            <div style={{display:'flex', justifyContent:'center', height:'250px', marginTop:'15px', marginBottom:'15px'}}>
                <img style={{objectFit:'cover', width:'200px', borderRadius:'15px'}} src={file.preview} alt="" />
            </div>
        </div>
    ));

    useEffect(
        () => () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
    [files]);
    
    return (
    <section>
        <div {...getRootProps({ className: "dropzone" })} 
        style={{textAlign:'center', border:'2px solid #4845d2', borderStyle:'dashed', borderRadius:'10px'}}>
            <input {...getInputProps()} />
            <div>
                <CloudUploadOutlinedIcon style={{fontSize:'45px'}} />
                <p style={{margin:'0px'}}>Upload Picture</p>
            </div>
            <aside>{thumbs}</aside>
        </div>
    </section>
  )
}
