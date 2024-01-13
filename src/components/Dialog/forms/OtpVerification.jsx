import React from 'react';
import "../dialogform.scss";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
import { Button } from "@mui/material";
import OtpInput from 'react-otp-input';
import { useState, useEffect } from 'react';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const OtpVerification = ({ isOpenOTP, handleCloseOTP, handleOkay, number, isLoading }) => {
  const _MINUTE = 4;
  const _SECONDS = 59;

  const [otp, setOtp] = useState('');
  const [minutes, setMinutes] = useState(_MINUTE);
  const [seconds, setSeconds] = useState(_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(_SECONDS);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  const resendOTP = () => {
    setMinutes(_MINUTE);
    setSeconds(_SECONDS);
  };

  const handleOkayButton = () => {
    handleOkay(otp);
  }

  const clickCancel = () => {
    setMinutes(_MINUTE);
    setSeconds(_SECONDS);
    handleCloseOTP();
  }

  return (
    <>
    <Dialog open={ isOpenOTP } disableEscapeKeyDown>
        <DialogTitle className='otpTitle'>
          Verify it's you
        </DialogTitle>
        <DialogContent>
            <br/>
            <div className='inputfield'>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                shouldAutoFocus={true}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <div style={{ fontSize: '14px'}} className='center'>
                <span>
                    We have sent a One-Time Password to number ending with 
                    <b style={{ color: '#242269'}}> {(number !== null) ? number.substr(-4) : ''}</b>
                </span>
                <br/>
                <span>Please enter the code above</span>
                <br/><br/>
                <Button disabled={seconds > 0 || minutes > 0}
                onClick={resendOTP}
                style={{ textTransform:'capitalize' }} variant="text">Resend Code</Button>
                  {seconds > 0 || minutes > 0 ? (
                    <span style={{ fontWeight: 600 }}>
                      {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </span>
                  ) : (
                    <span>Didn't receive code?</span>
                  )}
            </div>
        </DialogContent>
        <DialogActions>
          <div className='footer'>
            <LoadingButton loading={ isLoading } onClick={ clickCancel } variant="outlined">Cancel</LoadingButton>
            <LoadingButton
              loading={ isLoading }
              onClick={ handleOkayButton }
              color='success'
              autoFocus
              variant='contained'
              loadingPosition='end'
              endIcon={ <CheckOutlinedIcon/> }>Confirm</LoadingButton>
          </div>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default OtpVerification
