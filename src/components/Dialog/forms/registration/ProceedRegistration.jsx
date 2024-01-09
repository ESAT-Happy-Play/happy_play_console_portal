import React from 'react';
import "./../../dialogform.scss";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Button } from "@mui/material";

const ProceedRegistration = ({ isOpenProceed, handleRegister, handleVerify }) => {
  return (
    <>
    <Dialog open={ isOpenProceed } disableEscapeKeyDown>
        <DialogTitle className='otpTitle' style={{color:'green'}}>Success</DialogTitle>
        <DialogContent>
            <div style={{textAlign:'center'}}>
              <p>You have successfully registered to Happy Play!</p>
              <p>Wait for a confirmation SMS</p>
              <p style={{color:'#1976d2'}}>Do you want to get verified?</p>

              <div style={{display:'flex',gap:'5px',justifyContent:'center',margin:'25px 0 0 0'}}>
                <Button onClick={handleRegister} variant="outlined" size="small">Not Now</Button>
                <Button onClick={handleVerify} variant="contained" size="small">
                  Get Fully Verified
                </Button>
              </div>
            </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProceedRegistration
