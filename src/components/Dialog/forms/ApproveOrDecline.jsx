import React, { useState, useEffect } from 'react';
import "../dialogform.scss";
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, MenuItem, Button  } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

import { UserModel } from "../../../model/UserModel";
import MessageDialog from '../MessageDialog';

import { POSTFetch } from "../../../api/ApiFetchBuilder";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const ApproveOrDecline = ({ isOpenAdd, handleCloseAdd, handleCallback, userObj }) => {

  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [hasCommission, sethasCommission] = React.useState(true);
  const formApprove = useForm({ defaultValues: UserModel.ApproveRejectForm });
  const { register, handleSubmit, formState, reset } = formApprove;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});

  const submitHandler = async (data) => {
    setFormData(data);
    handleOpenConfirm();
  };

  const handleDecline = () => {
    reset(formValues => ({
      ...formValues,
      approved: 0
    }));
  }

  const handleAprove = () => {
    reset(formValues => ({
      ...formValues,
      approved: 1
    }));
  }

  // Confiration dialog
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const handleOpenConfirm = () => { setOpenConfirm(true); };
  const handleConfirmClose = () => { setOpenConfirm(false); };
  const handleConfirmOkay = async () => {
    setSubmitLoading(true);
    let response = await POSTFetch(`${process.env.REACT_APP_API_URL}/users/approvals/${userObj.userId}`, formData);
    setSubmitLoading(false);
    if(response.status) {
      toast.success(response.data.message);
      handleConfirmClose();
      handleCallback();
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  };

  const clickSelectUserEvent = event => {
    let userType = event.target.getAttribute('data-value');
    if (userType === "02") {
        sethasCommission(true);
    } else {
        sethasCommission(false);
    }
  }

  return (
    <>
      <BootstrapDialog className="divDialogForm-small"
        open={ isOpenAdd }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="rd">
            <span>APPROVE / DECLINE</span>
            <IconButton style={{background:'white'}} onClick={ handleCloseAdd } color="primary">
              <CancelIcon />
            </IconButton>
          </div>
        </div>
        <DialogContent dividers>
        
          <div className="divStep">
            <div className='inputContent'>
              <div className="divContent">
                <div className="left" style={{ width: "110px", flex:'none' }}>
                  <label>Full Name</label>
                </div>
                <div className="right">
                  <div>
                    <TextField sx={{ width: "100%" }} disabled defaultValue={(userObj !== null) ? userObj.fullName : "..."} variant="outlined" size="small" />
                  </div>
                </div>
              </div>
              <div className="divContent">
                <div className="left"  style={{ width: "110px", flex:'none' }}>
                  <label>Username</label>
                </div>
                <div className="right">
                  <div>
                    <TextField sx={{ width: "100%" }} disabled defaultValue={(userObj !== null) ? userObj.mobileNumber : "..."} variant="outlined" size="small" />
                  </div>
                </div>
              </div>
              <div className="divContent">
                <div className="left"  style={{ width: "110px", flex:'none' }}>
                  <label>Email Address</label>
                </div>
                <div className="right">
                  <div>
                    <TextField  sx={{ width: "100%" }} disabled defaultValue={(userObj !== null) ? userObj.email : "..."} variant="outlined" size="small" />
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={ handleSubmit(submitHandler) } noValidate>
              <div style={{display:'flex'}}>
                <div className='elemHide'>
                  <TextField variant="outlined" size="small" fullWidth />
                </div>
                <div style={{marginBottom:'0px', display:'flex', width:'100%', gap:'5px'}}>
                    <TextField 
                      placeholder="Select user type"
                      label="Select user type" sx={{ width: "100%", textAlign:'left' }}
                      { 
                        ...register("userType", { required: true } ) 
                      }
                      error={ !!errors.userType }
                      helperText={ errors.userType?.message }
                      onClick={clickSelectUserEvent}
                      defaultValue="" variant="outlined" size="small" select>
                      <MenuItem value='' data-value=""><em>Select user type</em></MenuItem>
                      <MenuItem value="02" data-value="02">Agent</MenuItem>
                      <MenuItem value="01" data-value="01">Player</MenuItem>
                    </TextField>

                    <TextField
                      type="number"
                      placeholder="Enter commission"
                      { 
                        ...register("commissionPercentage", { required: hasCommission } ) 
                      }
                      error={ !!errors.commissionPercentage }
                      helperText={ errors.commissionPercentage?.message }
                      disabled={!hasCommission}
                      label="Enter commission"
                      variant="outlined" size="small" fullWidth />
                </div>
              </div>
              <br />
              <div style={{display:'flex',justifyContent:'end', gap:'10px', margin:'20px 0 10px 0px'}}>
                <Button type="submit" onClick={handleDecline} variant="contained" size='large' color="error">
                  Decline
                </Button>
                <Button type="submit" onClick={handleAprove} sx={{ backgroundColor: "#38a169" }} size='large' variant="contained" color="success">
                  Approve
                </Button>
              </div>
            </form>
          </div>
          
        </DialogContent>
      </BootstrapDialog>

      <MessageDialog
        isOpenMessage={ openConfirm } 
        handleCloseMessage={ handleConfirmClose } 
        handleOkay={ handleConfirmOkay } 
        title={ "Confirmation" } 
        content={ (`Are you sure you want Approve/Decline user?`) }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default ApproveOrDecline
