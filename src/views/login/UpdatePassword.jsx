import "./login.scss";
import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Button } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { StoreExt } from "../../utils/helpers";

import { ValidateNewPassword, ValidatePasswordConfirm } from "../../utils/validations/ValidateLogin";
import { MuiInput, MuiLoadingButton, ContentLoader } from "../../components/mui";
import { AccountService } from "../../services";
import { AlertModal } from "../../components/mui/modals";

export const UpdatePassword = () => {

  const { code } = useParams();
  try { StoreExt.getDecrypted(atob(code)) } catch (e) { window.location.href = `/login/new`; }
  const paramObj = StoreExt.getDecrypted(atob(code));

  const [pageLoader, setPageLoader] = useState(false);
  const [checkTerm, setCheckTerm] = useState(false);
  const [termError, settermError] = useState(false);

  const formUpdatePassword = useForm({ defaultValues: { password: "", confirmPassword: "" } });
  const { register, handleSubmit, formState, watch } = formUpdatePassword;
  const { errors } = formState;

  const [msgType, setmsgType] = useState(0);
  const [eye, setEye] = useState(false);
  const validate_password = ValidateNewPassword(eye);

  const [eyeConfirm, setEyeConfirm] = useState(false);
  const validate_passwordConfirm = ValidatePasswordConfirm(eyeConfirm);

  // Handle for password show/hide
  const handleEye = () => { setEye(!eye); }

  // Handle for password show/hide
  const handleEyeConfirm = () => { setEyeConfirm(!eyeConfirm); }
  
  // modal config
  const [openAlert, setAlert] = React.useState(false);
  const handleAlertOpen = () => { setAlert(true); };
  const handleAlertClose = () => { setAlert(false); };

  // handle update password
  const handleSetUpdatePassword = async (data) => {
    if(!checkTerm) { settermError(true); }

    if (checkTerm) {
      setPageLoader(true);

      console.log({
        userId: paramObj.userId,
        mobileNumber: paramObj.mobileNumber,
        otpReferenceId: paramObj.referenceId,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      });

      AccountService.updatePassword({
        userId: paramObj.userId,
        mobileNumber: paramObj.mobileNumber,
        otpReferenceId: paramObj.referenceId,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      }).then((resp) => {
        if(resp) { handleAlertOpen(); }
        setPageLoader(false);
      });
    }
  }

  useEffect(() => {
    // TODO
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
                <Button variant="text" size="small">
                    <KeyboardBackspaceIcon />
                </Button>
                {
                  (paramObj.new) 
                  ? <h3>Set Password</h3>
                  : <h3>Set New Password</h3> 
                }
            </div>
            <form onSubmit={ handleSubmit(handleSetUpdatePassword) } noValidate>
              <div className="body">
                  
                  <div style={{textAlign:'left'}}>
                    <label>New Password</label>
                    <MuiInput
                      {...validate_password}
                      register={register}
                      isError={ !!errors.newPassword }
                      errorMsg={ errors.newPassword?.message }
                      inputProps={{
                        endAdornment:<InputAdornment position="end">
                          <IconButton onClick={ handleEye } size="small">
                            {!eye ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                          </IconButton>
                        </InputAdornment>
                      }}/>
                  </div>

                  <div style={{textAlign:'left', marginTop:'5px'}}>
                    <label>Confirm Password</label>
                    <MuiInput
                      {...validate_passwordConfirm}
                      register={register}
                      validation={{
                        required: true,
                        validate: (value) => {
                          if (watch('newPassword') !== value) {
                            return "Your passwords do no match";
                          }
                        },
                      }}
                      isError={ !!errors.confirmPassword }
                      errorMsg={ errors.confirmPassword?.message }
                      inputProps={{
                        endAdornment:<InputAdornment position="end">
                          <IconButton onClick={ handleEyeConfirm } size="small">
                            {!eyeConfirm ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                          </IconButton>
                        </InputAdornment>
                      }}/>
                  </div>
                  
                  <div className="form-button" style={{justifyContent:'center'}}>
                    <MuiLoadingButton text={(paramObj.new) ? "Set Password" : "Change Password"} variant="contained" type="submit" 
                        loading={ pageLoader } size="medium" color="primary"
                        loadingPosition='end'
                        icon={ <SaveIcon/> } />
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
        <AlertModal isOpen={openAlert} alertType={1} isSuccess={true} msgType={msgType} />
      </div>
    </>
  );
};