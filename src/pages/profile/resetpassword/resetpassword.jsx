import "./reset.scss";
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { TextField, Button  } from "@mui/material";

import OtpVerification from "../../../components/Dialog/forms/OtpVerification";

import { GetStoreObject } from "../../../helper/Helpers";
import PageLoader from "../../../components/widget/PageLoader";
import { useForm } from 'react-hook-form';

import { UserModel } from "../../../model/UserModel";

const Resetpassword = () => {
  let loginObj = GetStoreObject("auth");

  const formResetPassword = useForm({ defaultValues: UserModel.ResetPasswordForm });
  const { register, handleSubmit, formState, reset, watch } = formResetPassword;
  const { errors } = formState;

  const password = useRef({});
  password.current = watch("newPassword", "");

  const [pageLoader, setPageLoader] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openOTP, setOpenOTP] = React.useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = React.useState(false);

  useEffect(() => {
    reset(formValues => ({
      ...formValues,
      userId: loginObj.id
    }));
  }, [reset]);


  // OTP modal
  const handleOTPOpen = async () => { 
    console.log("Open OTP");
  }
  const handleOTPClose = () => { setOpenOTP(false); }
  const handleOkayOTP = async (otpNumber) => {
    console.log("Verify OTP");
  };

  const handleReset = async (data) => {
    console.log(JSON.stringify(data));
  }

  return (
    <div className="content">
      <div className="container">
        <div className="divreset">
          <div className="divtop">
            <b>Password last set</b>
            <span>03/20/3023</span>
            <span>04:54:25 PM</span>
          </div>
          {
            (showUpdatePassword) ?
              <div className="divcontent">
                <h2>NEW PASSWORD</h2>
                <form onSubmit={ handleSubmit(handleReset) } noValidate>
                  <div className="divTextField">
                    <div>
                      <TextField label="Enter current password *"
                      { 
                        ...register("currentPassword", { required: true } ) 
                      }
                      error={ !!errors.currentPassword }
                      helperText={ errors.currentPassword?.message }
                      type="password" style={{ width: '270px'}}
                      variant="outlined" size="small" />
                    </div>
                    <div>
                      <TextField label="Enter new password *"
                      { 
                        ...register("newPassword", { 
                          required: true,
                          minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                          }
                        } ) 
                      }
                      error={ !!errors.newPassword }
                      helperText={ errors.newPassword?.message }
                      type="password" style={{ width: '270px'}}
                      variant="outlined" size="small" />
                    </div>
                    <div>
                      <TextField label="Confirm Password *"
                      { 
                        ...register("confirmNewPassword", 
                        { 
                          validate: value => value === password.current || "The passwords do not match"
                        }) 
                      }
                      error={ !!errors.confirmNewPassword }
                      helperText={ errors.confirmNewPassword?.message }
                      type="password" style={{ width: '270px'}}
                      variant="outlined" size="small" />
                    </div>
                  </div>
                  <div className="resetbtn">
                    <Button type="submit" variant="contained" style={{ width: '270px'}} color="success" size="large">
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>
            :
            <div className="divcontent">
              <h2>RESET PASSWORD</h2>
              <p style={{marginBottom: '50px'}}>
                We can help you to reset your password using your HappyPlay username or your 
                <br/>
                mobile number linked to your account to send OTP (One Time Password).
              </p>
              <div className="resetbtn" style={{marginBottom: '50px'}}>
                <Button variant="contained" size="large" onClick={handleOTPOpen}>
                  Reset Password
                </Button>
              </div>
            </div>
          }
        </div>
      </div>

      <OtpVerification
        isOpenOTP={openOTP}
        handleCloseOTP={handleOTPClose}
        handleOkay={handleOkayOTP}
        number={loginObj.mobileNumber}
        isLoading={ isLoading }
      />

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default Resetpassword
