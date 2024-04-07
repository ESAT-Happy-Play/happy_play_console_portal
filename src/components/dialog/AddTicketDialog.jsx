import './dialog.scss';
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { COLORS } from '../../utils/common_helpers/colors';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import {Button, TextField, IconButton} from '@mui/material';
import { useForm } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { DragDropTicketUpload } from '../mui/DragDropTicketUpload';
import { MuiLoadingButton } from '../mui';

const AddTicketDialog = ({ title, isOpen,  onClose, modalWidth = 400 }) => {
    const [submitLoading, setsubmitLoading] = useState(false);
    const [uploadList, setuploadList] = useState([]);

    const formAddTicket = useForm({
        defaultValues: {
            title: "",
            description: "",
            // owner: {
            //     userId: "", mobileNumber: "", firstName: "", 
            //     lastName: "", middleName: "", email: ""
            // },
            // attachments: {
            //     fileName: "", content: null, fileType: null
            // }
        }
    });

    const { register, handleSubmit, formState } = formAddTicket;
    const { errors } = formState;

    const handleRemoveCallback = (fileName) => {
        let filteredList = uploadList.filter(obj => obj.fileName !== fileName);
        console.log(filteredList);
        setuploadList(filteredList);
    }

    const handleUploadCallback = (objList) => {
        let upList = uploadList;
        for (let i = 0; i < objList.length; i++) {
            upList.push(objList[i]);
        }
        setuploadList(upList);
    }

    const submitHandler = (data) => {
        console.log(data);
        setsubmitLoading(true);
    }

    return (
    <>
      <Dialog disableEscapeKeyDown
            open={isOpen}
            sx={[{ '.MuiPaper-root': { borderRadius: 3 } }]}
        >
            <Box display="flex" justifyContent="space-between" color="#3b38a4" borderBottom='1px solid #787878'>
                <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 18, paddingY: 1 }}>{title}</DialogTitle>
                <IconButton onClick={ onClose }>
                    <CloseIcon />
                </IconButton>
            </Box>
            
            <DialogContent
                sx={{ width: modalWidth }}>
                <form onSubmit={ handleSubmit(submitHandler) } noValidate>
                    <div className='divInput'>
                        <span>Report Title</span>
                        <TextField placeholder="Enter report title" variant="outlined" size='small' fullWidth 
                        { ...register("title", { required: true }) }
                        error={ !!errors.title } helperText={ errors.title?.message } />
                    </div>
                    <div className='divInput'>
                        <span>Report Description</span>
                        <TextField placeholder="Enter report description" 
                        multiline={true} variant="outlined" rows={5} fullWidth 
                        { ...register("description", { required: true }) }
                        error={ !!errors.description } helperText={ errors.description?.message } />
                    </div>
                    <div className='divInput'>
                        <DragDropTicketUpload callBack={handleUploadCallback} removedCallback={handleRemoveCallback} />
                    </div>
                    <div className='divInput'>
                        <span>Date</span>
                        <TextField type='date' variant="outlined" size='small' fullWidth />
                    </div>
                    <br/>
                    <div className='divInput' style={{display:'flex',justifyContent:'center'}}>
                        <MuiLoadingButton text="Create Report" variant="contained" type="submit"
                            loading={ submitLoading } size="medium"
                            sx={[{ background: "#3b38a4", color: 'white' }, { '&:hover': { background: COLORS.skyBlueHighlight } }]}
                            loadingPosition='end'
                            icon={ <AddIcon/> } />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </>
  )
}

const StyledButton = styled(Button)(`
    font-family: 'Inter';
    width: 128px;
    `,
);

export default AddTicketDialog
