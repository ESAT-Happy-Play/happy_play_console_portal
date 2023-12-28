// import React, { useState, useEffect } from 'react';
import "../dialogform.scss";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { TextField, MenuItem, Button  } from "@mui/material";

import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const ShowUserDetails = ({ isOpen, handleClose, user, isAgent }) => {
  return (
    <>
      <BootstrapDialog className="showUserDetails"
        open={ isOpen }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd">
            <span>USER DETAILS</span>
            <IconButton onClick={ handleClose } color="primary">
              <CancelIcon />
            </IconButton>
          </div>
        </div>
        <DialogContent dividers>
          <div className='divProfileInfo'>
            <div className="row">
              <div className="col-4">
                <div className="form-block">
                  <label>First Name</label>
                  <TextField value={(user !== null) ? user.firstName : 'Loading...'} size="small" fullWidth />
                </div>
              </div>
              <div className="col-4">
                <div className="form-block">
                  <label>Middle Name</label>
                  <TextField value={(user !== null) ? user.middleName : 'Loading...'} variant="outlined" size="small" />
                </div>
              </div>
              <div className="col-4">
                <label>Last Name</label>
                <TextField value={(user !== null) ? user.lastName : 'Loading...'} variant="outlined" size="small" fullWidth />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <div className="form-block">
                  <label>Birthdate (mm/dd/yyyy)</label>
                  <TextField value={(user !== null) ? (user.birthDate) : 'Loading...'} variant="outlined" size="small" fullWidth />
                </div>
              </div>
              <div className="col-4">
                <div className="form-block">
                  <label>Email</label>
                  <TextField value={(user !== null) ? (user.email) : 'Loading...'} variant="outlined" size="small" fullWidth />
                </div>
              </div>
              <div className="col-4">
                <div className="form-block">
                  <label>Sex</label>
                  <TextField value={(user !== null) ? (user.gender) : 'Loading...'} variant="outlined" size="small" fullWidth />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="form-block">
                  <label>Nature of Work</label>
                  <TextField value={(user !== null) ? (user.natureOfWork) : 'Loading...'} variant="outlined" size="small" fullWidth />
                </div>
              </div>
              <div className="col-4">
                <div className="form-block">
                  <label>Source of Income</label>
                  <TextField value={(user !== null) ? (user.sourceOfIncome) : 'Loading...'} variant="outlined" size="small" fullWidth />
                </div>
              </div>
              <div className="col-4">
                <div className="form-block">
                  <label>Mobile Number</label>
                  <TextField value={(user !== null) ? (user.mobileNumber) : 'Loading...'} variant="outlined" size="small" fullWidth />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="form-block">
                  <label>Place of Birth</label>
                  <TextField value={(user !== null) ? "" : 'Loading...'} variant="outlined" size="small" fullWidth />
                </div>
              </div>
              {
                (isAgent) 
                ?
                <div className="col-4">
                  <div className="form-block">
                    <label>Commission</label>
                    <TextField value={(user !== null) ? user.commission : 'Loading...'} variant="outlined" size="small" fullWidth />
                  </div>
                </div>
                :
                ""
              }
              
              <div className="col-4">
                <div className="form-block" style={{ textAlign:"center"}}>
                  <label>Verification Status</label>
                  {
                    (user !== null) 
                    ?
                      (user.IsVerified) 
                      ?
                        <b style={{ color:"green" }}>
                          <VerifiedOutlinedIcon/> <span>Verified</span>
                        </b>
                      :
                        <b style={{ color:"red" }}>
                          <span>Not Verified</span>
                        </b>
                    :
                    ""
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  )
}

export default ShowUserDetails
