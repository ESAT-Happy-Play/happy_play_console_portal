import "./../../dialogform.scss";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, Button, MenuItem  } from "@mui/material";

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MessageDialog from "../../MessageDialog";

import { PATCHFetch } from "../../../../api/ApiFetchBuilder";

// import { GetStoreObject } from "../../../../helper/Helpers";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));

const ProcessCase = ({ isOpenAdd, handleCloseAdd, handleCallback, objData }) => {

//   let loginObj = GetStoreObject("auth");
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const formProcess = useForm({ defaultValues: { desctiption: "", tagUserId: "" } });
  const { register, handleSubmit, formState, reset } = formProcess;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});

  // submit handler
  const submitHandler = async (data) => {
    setFormData(data);
    handleSubmitOpen();
  };

  // Confiration dialog message
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleProcessOkay = async () => {
    console.log("Sbmit");
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm-small"
        open={ isOpenAdd }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="rd">Confirm Process Case</div>
        </div>
        <DialogContent dividers>
          <div id="step1" className="divStep">
            <form onSubmit={ handleSubmit(submitHandler) } noValidate>
              <div className="divContent">
                <div className="left">
                  <label>Category</label>
                </div>
                <div className="right">
                  <TextField disabled variant="outlined" defaultValue={(objData !== null) ? objData.category : '...'} size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>User / Title</label>
                </div>
                <div className="right">
                  <TextField disabled variant="outlined" defaultValue={(objData !== null) ? objData.title : '...'} size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>Reason</label>
                </div>
                <div className="right">
                  <TextField variant="outlined" 
                  placeholder="Explain the problem"
                    { 
                      ...register("desctiption", { required: true } ) 
                    }
                    error={ !!errors.desctiption }
                    helperText={ errors.desctiption?.message }
                    multiline maxRows={4} size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>Tagged User</label>
                </div>
                <div className="right">
                  <TextField { 
                      ...register("tagUserId", { required: true } ) 
                    } variant="outlined" defaultValue="" size="small" fullWidth />
                </div>
              </div>

              <br />
              <div style={{display:'flex',justifyContent:'center', gap:'5px'}}>
                <Button onClick={ handleCloseAdd } variant="outlined">Cancel</Button>
                <Button type="submit" className="btnSuccess" variant="contained">
                  Submit
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
        content={ "Are you sure you want to process case?" }
        color={ "error" }
        isLoading={ submitLoading } />
    </>
  )
}

export default ProcessCase
