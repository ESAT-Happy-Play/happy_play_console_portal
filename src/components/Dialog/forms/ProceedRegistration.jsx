import React from 'react';
import "../dialogform.scss";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ProceedRegistration = ({ isOpenProceed, handleRegister, handleVerify }) => {
  return (
    <>
    <Dialog open={ isOpenProceed } disableEscapeKeyDown>
        <DialogTitle className='otpTitle'>
          Proceed
        </DialogTitle>
        <DialogContent>
            <div className='proceedContainer'>
              <div className="divcontent" onClick={ handleRegister }>
                <div className="green">
                  <div className="circleGreen"></div>
                  <label>Register Now!</label>
                  <span>(I'll do the verification later)</span>
                </div>
              </div>
              <div className="divcontent" onClick={ handleVerify }>
                <div className="blue">
                  <div className="circleBlue"></div>
                  <label>Get Verified Now!</label>
                  <span>(Complete the most of the registration form)</span>
                </div>
              </div>
            </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProceedRegistration
