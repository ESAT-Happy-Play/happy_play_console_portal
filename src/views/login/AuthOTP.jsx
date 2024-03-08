import "./login.scss";
import { useState, useEffect } from 'react';

import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import OtpInput from 'react-otp-input';
import { useParams } from "react-router-dom";

import { StoreExt } from "../../utils/helpers";

import { ContentLoader } from "../../components/mui";
import { OTPService } from "../../services";

export const AuthOTP = () => {
  const { code } = useParams();
  try { StoreExt.getDecrypted(atob(code)) } catch (e) { window.location.href = `/login/new`; }
  const paramObj = StoreExt.getDecrypted(atob(code));

  const [submitLoader, setsubmitLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [checkTerm, setCheckTerm] = useState(false);
  const [termError, settermError] = useState(false);
  const [otpError, setotpError] = useState(false);
  const [otpErrorMsg, setotpErrorMsg] = useState(null);
  const [newOtpRef, setnewOtpRef] = useState(null);

  const _MINUTE = 4;
  const _SECONDS = 59;

  const [otp, setOtp] = useState('');
  const [minutes, setMinutes] = useState(_MINUTE);
  const [seconds, setSeconds] = useState(_SECONDS);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) { setSeconds(seconds - 1);}
      if (seconds === 0) {
        if (minutes === 0) { clearInterval(interval); } 
        else { setSeconds(_SECONDS); setMinutes(minutes - 1); }
      }
    }, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  const resendOTP = () => {
    setMinutes(_MINUTE);
    setSeconds(_SECONDS);

    OTPService.generateRegistrationOTP({mobileNumber: paramObj.mobileNumber}).then((resp) => {
      if(resp) { setnewOtpRef(resp.data); setsubmitLoader(false); }
    });
  };

  const handleChangeNumber = () => {
    setPageLoader(true);
    window.location.href = `/login/new`;
  }

  const handleSubmit = () => {
    if(!checkTerm) { settermError(true); return false; }
    if(otp.length <= 5) { return false; }
    setotpError(false);

    setPageLoader(true);
    OTPService.verifyOTP({ 
      referenceId: (newOtpRef !== null) ? newOtpRef : paramObj.referenceId,
      mobileNumber: paramObj.mobileNumber, 
      otpCode: otp}).then((resp) => {
        console.log(resp);
        if (!resp.status) {
          if (resp.data.response.status === 400) {
            setotpErrorMsg(resp.data.response.data.errorMessage);
            setotpError(true); setSuccess(false);
          }
        } else {
          setSuccess(true);
          setsubmitLoader(true);
          setTimeout(function() {
            setPageLoader(true);

            let param = StoreExt.getEncrypted({
              mobileNumber: paramObj.mobileNumber,
              isVerified: resp.data.data,
              referenceId: paramObj.referenceId,
              userId: paramObj.userId,
              code: paramObj.code,
              new: paramObj.new
            });
            window.location.href = `/update/password/${btoa(param)}`;
          }, 2000);
        }
      setPageLoader(false);
    });
  }

  return (
    <>
      <div className="login">
        <div className='container'>
          <div className="content">
            <div className="top">
              <img src={require('../../assets/happy-play-logo.png')} className="logo" title="Esat Logo" />
            </div>
            <div className="div-login-new-title">
                <Button onClick={handleChangeNumber} variant="text" size="small">
                    <KeyboardBackspaceIcon />
                </Button>
              <h3>New User Login</h3>
            </div>
            
              <div className="body">
                  
                  <div>
                    <label htmlFor="mobileNumber">Enter Mobile Number</label>
                    <TextField type="text"  defaultValue={paramObj.mobileNumber} className="input-center-bg" fullWidth size="small" 
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

                        { 
                          (otpError) 
                          ? <div> 
                              <CancelRoundedIcon style={{ fontSize:'60px', color:'red'}} />
                              <br/>
                              <span style={{color:'red',fontSize:'13px'}}>{otpErrorMsg}</span> 
                            </div> 
                          : <></> 
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
                            disabled={submitLoader}
                            endIcon={ <ArrowRightAltOutlinedIcon/> }>
                            Submit
                        </LoadingButton>
                    </div>
                </div>
                  
              </div>
              <hr />
              <div className="div-privacy">
                <div className="checkRequired">
                  { (termError) ? <span>Required *</span> : '' }
                </div>
                
                <FormControlLabel className={(!checkTerm) ? 'hasError' : ''}
                  control={
                    <Checkbox onChange={e => (setCheckTerm(!checkTerm), settermError(!termError))} />
                  } label={
                    <div className="div-agree">
                        <div className="div1">
                          <span>I agree to Happy Play's</span>
                          <a href={'/privacy'}>Privacy Policy</a>
                          <span> and </span>
                        </div>
                        <div className="div2">
                          <a href={'/terms'}>Terms of Use</a>
                        </div>
                    </div>
                  } />
              </div>

          </div>
        </div>
        <ContentLoader isLoadingPage={ pageLoader } />
      </div>
    </>
  );
};