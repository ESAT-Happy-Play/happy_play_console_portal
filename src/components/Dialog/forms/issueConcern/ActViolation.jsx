import "./../../dialogform.scss";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

import { TextField, Button, MenuItem  } from "@mui/material";

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MessageDialog from "../../MessageDialog";

import { POSTFetch } from "../../../../api/ApiFetchBuilder";

// import { GetStoreObject } from "../../../../helper/Helpers";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));

const ActViolation = ({ isOpenAdd, handleCloseAdd, handleCallback, objData }) => {

//   let loginObj = GetStoreObject("auth");
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const formAct = useForm({ defaultValues: {startDate:"", endDate: ""} });
  const { register, handleSubmit, formState, reset } = formAct;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});

  // submit handler
  const submitHandler = async (data) => {
    setFormData(data);
    handleSubmitOpen();
  };

  const [actStatus, setactStatus] = React.useState(0);
  const handleOnSuspend = () => {
    setactStatus(0);
  };

  const handleOnTerminate = () => {
    setactStatus(1);
  };

  // Confiration dialog message
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleProcessOkay = async () => {
    setSubmitLoading(true);
    let formSubmitData = {
        violationId : objData.ViolationId,
        actionType : (actStatus ===0) ? "Suspended" : "Cancellation",
        startDate: formData.startDate,
        endDate: formData.endDate,
        parmuserid: objData.UserId
    }

    let response = await POSTFetch(`${process.env.REACT_APP_API_URL}/violations/action`, formSubmitData);
    setSubmitLoading(false);
    if(response.status) {
      handleSubmitClose();
      handleCallback();
      toast.success(response.data.message);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm-small"
        open={ isOpenAdd }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="rd">Confirm Act Violation
            <IconButton style={{background:'white'}} onClick={ handleCloseAdd } color="primary">
              <CancelIcon />
            </IconButton>
          </div>
        </div>
        <DialogContent dividers>
          <div id="step1" className="divStep">
            <form onSubmit={ handleSubmit(submitHandler) } noValidate>
              <div className="divContent">
                <div className="left">
                  <label>Start Date</label>
                </div>
                <div className="right">
                  <TextField type="date" { 
                      ...register("startDate", { required: true } ) 
                    } variant="outlined" defaultValue="" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>End Date</label>
                </div>
                <div className="right">
                  <TextField type="date" { 
                      ...register("endDate", { required: true } ) 
                    } variant="outlined" defaultValue="" size="small" fullWidth />
                </div>
              </div>

              <br />
              <div style={{display:'flex',justifyContent:'center', gap:'5px'}}>
                <Button type="submit" onClick={handleOnSuspend} className="btnEdit" variant="outlined">Suspend Account</Button>
                <Button type="submit" onClick={handleOnTerminate} className="btnShow" variant="contained">
                  Terminate Account
                </Button>
              </div>
            </form>
          </div>
          
        </DialogContent>
      </BootstrapDialog>
      
      <MessageDialog
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleProcessOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to proceed?" }
        color={ "error" }
        isLoading={ submitLoading } />
    </>
  )
}

export default ActViolation
