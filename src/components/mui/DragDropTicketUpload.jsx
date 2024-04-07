import React, { useState, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import UploadFileIcon from '@mui/icons-material/UploadFile';

import {Button, TextField, IconButton} from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

import { ContentLoader } from "../../components/mui";
import { ImageService } from '../../services'

export const DragDropTicketUpload = ({ callBack, removedCallback }) => {
    const [pageLoader, setPageLoader] = useState(false);

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: async (acceptedFiles) => {
            for (let i = 0; i < acceptedFiles.length; i++) {
                files.push(Object.assign(acceptedFiles[i], {
                    preview: URL.createObjectURL(acceptedFiles[i])
                }));
            }

            const uploadImage = (file) => {
                return new Promise((resolve, reject)=>{
                    let fileReader = new FileReader();
                    fileReader.onloadend = () => {
                        // {data:fileReader.result, name:file.name, size: file.size, type: file.type}
                        ImageService.uploadBase64Image(fileReader.result).then((res) => {
                            return resolve({
                                apiresponse: res.data,
                                fileName: file.name
                            });
                        });
                    };
                    fileReader.readAsDataURL(file);
                })
            }

            let imagesResponse = await Promise.all(acceptedFiles.map( obj => { return uploadImage(obj) } ));
            callBack(imagesResponse);
            console.log(imagesResponse);
        }
    });

    const removeItem = (fileName) => {
        let filteredList = files.filter(obj => obj.name !== fileName);
        setFiles(filteredList);
        removedCallback(fileName);
    }

    const thumbs = files.map((file, index) => (
        <div key={file.name} style={{float:'left', width:'50%', height:'150px', padding:'10px', marginBottom:'15px'}}>
            <div style={{display:'flex', justifyContent:'center', marginTop:'15px', marginBottom:'15px', padding:'3px', border:'1px solid #4845d2', borderRadius:'5px'}}>
                <img style={{objectFit:'contain', width:'150px', height:'150px'}} src={file.preview } alt="" />
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
        <span>Attachements</span>
        {
            files.map((item, index) => (
                <div key={index} className='divAttachments'>
                    <div className='attachIcondata'>
                        <AttachmentIcon style={{fontSize:'18px'}} /> {item.name}
                    </div>
                    <IconButton onClick={() => removeItem(item.name)}>
                        <CloseIcon style={{fontSize:'15px'}} />
                    </IconButton>
                </div>
            ))
        }
        
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
            <div style={{display:'table', width:'450px', clear:'both', content:"", paddingBottom:'15px'}}>
                {thumbs}
            </div>
        </div>

        <ContentLoader isLoadingPage={ pageLoader } />
    </section>
  )
}
