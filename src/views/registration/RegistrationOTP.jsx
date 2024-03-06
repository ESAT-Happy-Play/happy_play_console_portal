import "./registration.scss"
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { LoadingButton } from '@mui/lab';

import OtpInput from 'react-otp-input';
import { useParams } from "react-router-dom";

import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { ContentLoader } from "../../components/mui";
import { OTPService } from "../../services";
import { setNumberVerified } from '../../redux/reducers/OtpVerifiedStateReducer';

export const RegistrationOTP = () => {
  const { mobilenum, code } = useParams();
  const dispatch = useDispatch();
  
  const _MINUTE = 4;
  const _SECONDS = 59;

  const [otp, setOtp] = useState('');
  const [minutes, setMinutes] = useState(_MINUTE);
  const [seconds, setSeconds] = useState(_SECONDS);
  const [pageLoader, setPageLoader] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleChangeNumber = () => {
    setPageLoader(true);
    window.location.href = `/register`;
  }

  const handleSubmit = () => {
    if(otp.length <= 5) { return false; }
    setPageLoader(true);
    OTPService.verifyOTP({ mobileNumber: mobilenum, otpCode: otp}).then((resp) => {
      if (resp) {
        setSuccess(true);
        dispatch(setNumberVerified(true));
        setTimeout(function() {
          setPageLoader(true);
          window.location.href = `/register/info/${mobilenum}/${(code !== undefined) ? code : ''}`;
        }, 2000);
      }
      setPageLoader(false);
    });
  }

  return (
    <div className="registration">
      <div className='container'>
        <div className="lfContent"></div>
        <div className="content">
          <div className="top">
            <img src={require('../../assets/happy-play-logo.png')} className="logo" title="Esat Logo" />
          </div>
          <hr />
          <h4>Happy Play Registration</h4>
          <br/>
          <div className="body">
              <div>
                <label htmlFor="mobileNumber">Enter Mobile Number</label>
                <TextField type="text"  defaultValue={mobilenum} className="input-center-bg" fullWidth size="small" 
                InputProps={{
                  endAdornment:<InputAdornment position="end">
                    <IconButton onClick={ handleChangeNumber } size="small">
                      <CloseOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                }}
                />
                
                <br/><br/>
                <div className="div-otp">
                    <span className="otpmsg">
                        Enter the 6-digit code that has been sent to your mobile number to continue with the registration
                    </span>
                
                    <div className={(success) ? 'div-otp-input-success' : 'div-otp-input'}>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            shouldAutoFocus={true}
                            renderSeparator={<span>&nbsp;</span>}
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>
                    <div>
                        <Button disabled={seconds > 0 || minutes > 0}
                        onClick={resendOTP}
                        style={{ textTransform:'capitalize' }} variant="text">Resend Code</Button>
                        {seconds > 0 || minutes > 0 ? (
                            <span style={{ fontWeight: 600 }}>
                            {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                            </span>
                        ) : ""}
                    </div>

                    {
                      (success) ? <div> <CheckCircleIcon style={{ fontSize:'60px', color:'green'}} /> </div> : <></>
                    }
                    
                    <br/>  
                    <LoadingButton type="text" 
                        loading={ false } 
                        color="primary"
                        size="medium"
                        variant="contained"
                        loadingPosition='end'
                        style={{marginTop:'10px'}}
                        onClick={handleSubmit }
                        endIcon={ <ArrowRightAltOutlinedIcon/> }>
                        Submit
                      </LoadingButton>
                </div>
              </div>

          </div>
          <br/>
          <p>
            <a href="#">Terms Of Use</a>
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
      <ContentLoader isLoadingPage={ pageLoader } />
    </div>
  );
};