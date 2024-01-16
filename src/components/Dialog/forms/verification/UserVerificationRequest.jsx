import React, { useState, useEffect } from 'react';
import "./../../dialogform.scss";
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, MenuItem, Button  } from "@mui/material"

import SaveAsIcon from '@mui/icons-material/SaveAs';
import MessageDialog from "../../MessageDialog";
import { POSTFetch } from "../../../../api/ApiFetchBuilder";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const UserVerificationRequest = ({ isOpenAdd, handleCloseAdd, userObj, handleCallback }) => {

  useEffect(() => {

  }, []);

  // final step submit handler
  const submitHandler = async (data) => {
    // setFormData(data);
    handleSubmitOpen();
  };

  // Confiration dialog message for add company
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleOkay = async () => {
    console.log("okay");
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm"
        open={ isOpenAdd }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="rd">Verification Request</div>
        </div>
        <DialogContent dividers>
          <div className="divStep">
            <form noValidate> 
              <div className="divContent">
                <div className="left"></div>
                <div className="right divFoot">
                <Button onClick={ handleCloseAdd } variant="outlined">Close</Button>
                <Button sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                  Submit &nbsp; <SaveAsIcon/>
                </Button>
                </div>
              </div>
            </form>
          </div>
          
        </DialogContent>
      </BootstrapDialog>

      <MessageDialog
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want accept request?" }
        color={ "success" }
        isLoading={ false } />
    </>
  )
}

export default UserVerificationRequest
