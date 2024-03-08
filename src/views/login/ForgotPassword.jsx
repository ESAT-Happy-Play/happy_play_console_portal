import "./login.scss";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import SendIcon from '@mui/icons-material/Send';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { Button } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { StoreExt } from "../../utils/helpers";

import { MuiInput, MuiLoadingButton, ContentLoader } from "../../components/mui";
import { AuthService } from "../../services";

export const ForgotPassword = () => {
  let loginObj = StoreExt.getStore("auth");

  const [pageLoader, setPageLoader] = useState(false);
  const [checkTerm, setCheckTerm] = useState(false);
  const [termError, settermError] = useState(false);

  const formVerify = useForm({ defaultValues: { mobileNumber: "" } });
  const { register, handleSubmit, formState } = formVerify;
  const { errors } = formState;
  
  // Handle for login submit
  const handleSendOTP = async (data) => {
    if(!checkTerm) { settermError(true); }

    if (checkTerm) {
      setPageLoader(true);
    }
  }

  const handleBack = () => {
    setPageLoader(true);
    window.location.href = `/login`;
  }

  useEffect(() => {
    
  }, []);

  return (
    <>
      <div className="login">
        <div className='container'>
          <div className="content">
            <div className="top">
              <img src={require('../../assets/happy-play-logo.png')} className="logo" title="Esat Logo" />
            </div>
            <div className="div-login-new-title">
                <Button variant="text" size="small" onClick={handleBack}>
                    <KeyboardBackspaceIcon />
                </Button>
              <h3>Forgot Password</h3>
            </div>
            <form onSubmit={ handleSubmit(handleSendOTP) } noValidate>
              <div className="body">
                  
                  <div>
                    <label>Enter Mobile Number</label>
                    <MuiInput
                    focused={true}
                    className="input-center"
                    name="mobileNumber"
                    type="number"
                    validation= {{ required: "Mobile number is required.",
                        minLength: { value: 11, message: "min length is 11" }
                    }}
                    onInput= {(e) =>{ e.target.value = e.target.value.toString().slice(0,11) }}
                    size="small"
                    register={register}
                    isError={ !!errors.mobileNumber }
                    errorMsg={ errors.mobileNumber?.message }/>
                  </div>
                  
                  <div className="form-button" style={{justifyContent:'center'}}>
                    <MuiLoadingButton text="Send OTP" variant="contained" type="submit" 
                      loading={ pageLoader } size="medium" color="primary"
                      loadingPosition='end'
                      icon={ <SendIcon/> } />
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
            </form>
          </div>
        </div>
        <ContentLoader isLoadingPage={ pageLoader } />
      </div>
    </>
  );
};