import '../dialog.scss';
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { COLORS } from '../../../utils/common_helpers/colors';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import {Button, TextField, IconButton} from '@mui/material';
import { useForm } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { DragDropTicketUpload } from '../../mui/DragDropTicketUpload';
import { MuiLoadingButton } from '../../mui';
import { DateExt } from "../../../utils/helpers";

import { SupportService } from '../../../services'

export const UpdateTicketDialog = ({ title, isOpen,  onClose, modalWidth = 400, objData }) => {

    const [submitLoading, setsubmitLoading] = useState(false);
    const [isSubmitSuccess, setisSubmitSuccess] = useState(false);
    const [uploadList, setuploadList] = useState([]);
    const [openAddConfirmation, setopenAddConfirmation] = useState(false);

    const formUpdateTicket = useForm({
        defaultValues: { caseId: "", title: "", description: "", ticketDate: "" }
    });

    const { register, handleSubmit, formState, reset } = formUpdateTicket;
    const { errors } = formState;
    const [formData, setFormData] = React.useState({});

    const handleRemoveCallback = (fileName) => {
        let filteredList = uploadList.filter(obj => obj.fileName !== fileName);
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
        let attachmentList = [];
        for (let i = 0; i < uploadList.length; i++) {
            attachmentList.push({
                fileName: `${uploadList[i].fileName}|${uploadList[i].apiresponse}`, 
                content: null, fileType: null
            });
        }

        let payload = {
            caseId: data.caseId, title: data.title, description: data.description,
            attachments: attachmentList
        }

        setFormData(payload);
        setopenAddConfirmation(true);
    }

    const handleConfirm = () => {
        setsubmitLoading(true);
        SupportService.updateTicketOwner(formData).then((resp) => {
            if (resp) { setisSubmitSuccess(true); }
            // window.location.reload(false);
            setsubmitLoading(false);
        });
    }

    const handleSuccessClose = () => {
        setopenAddConfirmation(false);
        onClose(false);
        window.location.reload(false);
    }

    useEffect(() => {
        if(objData !== null) {
            reset(formValues => ({
                ...formValues, caseId: objData.caseId,
                title: objData.title, description: objData.description,
                ticketDate: DateExt.formatDate(objData.createdOn),
            }));
        }
    }, [objData]);

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
                    <div style={{opacity:(submitLoading) ? '0.40' : '1'}}>
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

                            <DragDropTicketUpload oldAttachments={(objData !== null) ? objData.attachments : null } 
                            callBack={handleUploadCallback} removedCallback={handleRemoveCallback} />
                        </div>
                        <div className='divInput'>
                            <span>Date</span>
                            <TextField { ...register("ticketDate", { required: true }) }
                            error={ !!errors.ticketDate } helperText={ errors.ticketDate?.message }
                            type='date' variant="outlined" size='small' fullWidth />
                        </div>
                    </div>
                    <br/>
                    <div className='divInput' style={{display:'flex',justifyContent:'center'}}>
                        <MuiLoadingButton text="Update Report" variant="outlined" type="submit"
                            loading={ submitLoading } size="medium"
                            sx={[{ border: '1px solid #ffb700', color: '#ffb700' }, { '&:hover': { background: '#ffb700', color: 'white' } }]}
                            loadingPosition='end'
                            icon={ <EditIcon/> } />
                    </div>
                </form>
            </DialogContent>
        </Dialog>


        {/* confirm new downline */}
        <Dialog disableEscapeKeyDown
            open={openAddConfirmation}
            sx={[{ '.MuiPaper-root': { borderRadius: 3 } }]}
        >
            <Box display="flex" justifyContent="space-between" color="#3b38a4" borderBottom='1px solid #787878'>
                {
                    (!isSubmitSuccess) ? <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, paddingY: 1 }}>Please Confirm</DialogTitle>
                    : <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, paddingY: 1, color:'green' }}>Success!</DialogTitle>
                }
                
                {
                    (!isSubmitSuccess) ? 
                        <IconButton disabled={submitLoading} onClick={e => setopenAddConfirmation(false)}>
                            <CloseIcon />
                        </IconButton>
                    : <></>
                }
                
            </Box>
            
            <DialogContent
                sx={{ width: 300 }}>
                    {
                        (!isSubmitSuccess) ? <div style={{display:'grid',textAlign:'center'}}>
                            <span>Are you sure you want to update [{formData.title}]?</span>
                        </div>
                        : <div style={{display:'grid',textAlign:'center'}}>
                            <span>[{formData.title}] updated successfully!</span>
                        </div>
                    }
                
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
                
                {
                    (!isSubmitSuccess) ?
                    <>
                        <StyledButton disabled={submitLoading} onClick={e => setopenAddConfirmation(false)}>Close</StyledButton>
                
                        <MuiLoadingButton text="Confirm" variant="contained" onClick={handleConfirm} 
                        loading={ submitLoading } size="medium"
                        sx={[{ background: COLORS.green, color: 'white' }, { '&:hover': { background: 'green' } }]}
                        loadingPosition='end'
                        icon={ <CheckIcon/> } />
                    </> 
                    : <>
                        <StyledButton sx={{width:'100%'}} onClick={handleSuccessClose}>Close</StyledButton>
                    </>
                }
                
            </DialogActions>
        </Dialog>
    </>
  )
}

const StyledButton = styled(Button)(`
    font-family: 'Inter';
    width: 128px;
    `,
);