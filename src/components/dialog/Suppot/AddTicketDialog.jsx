import '../dialog.scss';
import React, { useState } from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import { DragDropTicketUpload } from '../../mui/DragDropTicketUpload';
import { MuiLoadingButton } from '../../mui';
import { StoreExt, DateExt } from "../../../utils/helpers";

import { SupportService } from '../../../services'

export const AddTicketDialog = ({ title, isOpen,  onClose, modalWidth = 400 }) => {
    let authdata = StoreExt.getStore("auth");
    let tokenObj = StoreExt.getDecodeJWT(authdata.token);

    const [submitLoading, setsubmitLoading] = useState(false);
    const [isSubmitSuccess, setisSubmitSuccess] = useState(false);
    const [uploadList, setuploadList] = useState([]);
    const [openAddConfirmation, setopenAddConfirmation] = useState(false);

    const formAddTicket = useForm({
        defaultValues: { title: "", description: "", ticketDate: "" }
    });

    const { register, handleSubmit, formState } = formAddTicket;
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
            title: data.title, description: data.description,
            owner: {
                userId: authdata.id, mobileNumber: "", firstName: authdata.fullname.split(" ")[0], 
                lastName: authdata.fullname.split(" ")[1], middleName: "", email: ""
            }, attachments: attachmentList,
            assignTo: null,
            categoryId: null,
            organizationId: null,
            ticketStatus: 1,
            companyId: tokenObj.companyId,
            branchId: authdata.branchId,
            priorityLevel: 0,
            ticketDate: data.ticketDate,
            comment: null
        }

        setFormData(payload);
        setopenAddConfirmation(true);
    }

    const handleConfirm = () => {
        setsubmitLoading(true);
        SupportService.createTicket(formData).then((resp) => {
            if (resp) { setisSubmitSuccess(true); }
            setsubmitLoading(false);
        });
    }

    const handleSuccessClose = () => {
        setopenAddConfirmation(false);
        onClose(false);
        window.location.reload(false);
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
                            <DragDropTicketUpload callBack={handleUploadCallback} removedCallback={handleRemoveCallback} />
                        </div>
                        <div className='divInput'>
                            <span>Date</span>
                            <TextField { ...register("ticketDate", { required: true }) }
                            error={ !!errors.ticketDate } helperText={ errors.ticketDate?.message }
                            defaultValue={DateExt.formatDate(new Date())} type='date' variant="outlined" size='small' fullWidth />
                        </div>
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
                            <span>Are you sure you want to submit a new report?</span>
                        </div>
                        : <div style={{display:'grid',textAlign:'center'}}>
                            <span>New report for [{formData.title}] successfully added!</span>
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