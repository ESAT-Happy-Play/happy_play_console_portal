import React, { useState, useEffect } from 'react';
import "./../../dialogform.scss";
import { toast } from 'react-toastify';

import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

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

  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [isAccept, setisAccept] = React.useState(false);
  const [userdata, setuserdata] = React.useState(null);
  
  // useEffect(() => {
    // userObj.userId
  // }, []);

  const submitAccept = () => {
    setisAccept(true);
    handleSubmitOpen();
  };

  const submitDecline = () => {
    setisAccept(false);
    handleSubmitOpen();
  };

  // Confiration dialog message for add company
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleOkay = async () => {
    setSubmitLoading(true);
    let paramval = (isAccept) ? 1 : 0;
    let response = await POSTFetch(`${process.env.REACT_APP_API_URL}/users/forverification/${userObj.userId}?isapproved=${paramval}`, {});
    setSubmitLoading(false);
    if(response.status) {
      toast.success(response.data.message);
      handleSubmitClose();
      handleCallback();
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm"
        open={ isOpenAdd }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="rd">Verification Request
            <IconButton style={{background:'white'}} onClick={ handleCloseAdd } color="primary">
              <CancelIcon />
            </IconButton>
          </div>
        </div>
        <DialogContent dividers>
          <div className="divStep">
            {
              (userObj !== null) ?
                <form noValidate> 
                  <div className='div-verify'>
                    <div className='div-img'>
                      <div style={{width:'100%',display:'flex',justifyContent:'end'}}>
                        <div className="div-imgUpload" style={{width:'190px'}}>
                            <img className="imgFiles" src={(userObj.idFront !== null) ? `${userObj.idFront}` : `${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                        </div>
                      </div>
                      <div style={{width:'100%'}}>
                          <div className="div-imgUpload" style={{width:'190px'}}>
                              <img className="imgFiles" src={(userObj.idBack !== null) ? `${userObj.idBack}` : `${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                          </div>
                      </div>
                    </div>
                    <hr />
                    <div className='div-img'>
                      <div style={{width:'100%',display:'flex',justifyContent:'end'}}>
                        <div className="div-imgUpload" style={{width:'190px'}}>
                            <img className="imgFiles" src={(userObj.idPic !== null) ? `${userObj.idPic}` : `${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                        </div>
                      </div>
                      <div style={{width:'100%'}}>
                          <div className="div-imgUpload" style={{width:'190px'}}>
                              <img className="imgFiles" src={(userObj.signaturePic !== null) ? `${userObj.signaturePic}` : `${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                          </div>
                      </div>
                    </div>
                    <hr />
                    
                    <div className='div-v-details'>
                      <div>
                        <div className='div-text'>
                          <span>First Name</span>
                          <TextField disabled defaultValue={userObj.firstname} variant="outlined" size="small" fullWidth /> 
                        </div>
                        <div className='div-text'>
                          <span>Middle Name</span>
                          <TextField disabled defaultValue={userObj.middlename} variant="outlined" size="small" fullWidth /> 
                        </div>
                        <div className='div-text'>
                          <span>Last Name</span>
                          <TextField disabled defaultValue={userObj.lastname} variant="outlined" size="small" fullWidth />
                        </div>
                        <div className='div-text'>
                          <span>Gender</span>
                          <TextField disabled defaultValue={(userObj.sex === "1") ? "Male" : "Female"} variant="outlined" size="small" fullWidth />
                        </div>
                        <div className='div-text'>
                          <span>Birthdate</span>
                          <TextField disabled defaultValue={userObj.birthday} variant="outlined" size="small" fullWidth />
                        </div>
                        <div className='div-text'>
                          <span>Civil Status</span>
                          <TextField disabled defaultValue={"Single"} variant="outlined" size="small" fullWidth />
                        </div>
                        <div className='div-text'>
                          <span>Blood Type</span>
                          <TextField disabled defaultValue={"A+"} variant="outlined" size="small" fullWidth />
                        </div>
                      </div>
                      <div>
                        <div className='div-text'>
                          <span>Place Of Birth</span>
                          <TextField disabled defaultValue={"145 Tres De Abril, Pahina San Nicolas, Cebu"} variant="outlined" size="small" fullWidth /> 
                        </div>
                        <div className='div-text'>
                          <span>Present Address</span>
                          <TextField disabled defaultValue={"145 Tres De Abril, Pahina San Nicolas, Cebu"} variant="outlined" size="small" fullWidth /> 
                        </div>
                        <div className='div-text'>
                          <span>Permanent Address</span>
                          <TextField disabled defaultValue={"145 Tres De Abril, Pahina San Nicolas, Cebu"} variant="outlined" size="small" fullWidth />
                        </div>
                        <div className='div-text'>
                          <span>Nationality</span>
                          <TextField disabled defaultValue={"Filipino"} variant="outlined" size="small" fullWidth />
                        </div>
                        <div className='div-text'>
                          <span>Nature Of Work</span>
                          <TextField disabled defaultValue={"Managers"} variant="outlined" size="small" fullWidth />
                        </div>
                        <div className='div-text'>
                          <span>Source Of Income</span>
                          <TextField disabled defaultValue={"Salary"} variant="outlined" size="small" fullWidth />
                        </div>
                      </div>
                    </div>

                    <div className='div-v-footer'>
                      <Button onClick={submitDecline} color='error' variant="contained">Decline</Button>
                      <Button onClick={submitAccept} variant="contained" color="success">
                        Accept &nbsp; <SaveAsIcon/>
                      </Button>
                    </div>
                  </div>
                </form>
              : <></>
            }
          </div>
          
        </DialogContent>
      </BootstrapDialog>

      <MessageDialog
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleOkay } 
        title={ "Confirmation" } 
        content={ `Are you sure you want ${(isAccept) ? "accept" : "decline"} request?` }
        color={ (isAccept) ? "success" : "error" }
        isLoading={ submitLoading } />
    </>
  )
}

export default UserVerificationRequest
