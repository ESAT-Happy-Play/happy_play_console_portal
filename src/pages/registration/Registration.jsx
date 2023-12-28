import "./registration.scss"
import * as React from "react";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Link, useParams } from "react-router-dom";

import { TextField, Button } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { toast } from 'react-toastify';

import { UserModel } from "../../model/UserModel";
import OtpVerification from "../../components/Dialog/forms/OtpVerification";
import PageLoader from "../../components/widget/PageLoader";
import ProceedRegistration from "../../components/Dialog/forms/ProceedRegistration";
import RegistrationUserInfo from "../../components/Dialog/forms/RegistrationUserInfo";

const Registration = () => {
  // get url parameter
  const { code } = useParams();

  // declarations
  const [pageLoader, setPageLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openOTP, setOpenOTP] = React.useState(false);
  const [openProceedModal, setOpenProceedModal] = React.useState(false);
  const [openUserInfoModal, setOpenUserInfoModal] = React.useState(false);
  const [mobileNumber, setMobileNumber] = React.useState(null);
  const [accountObjectId, setAccountObjectId] = React.useState(null);

  // Registration form
  const formRegistration = useForm({ defaultValues: UserModel.RegistrationForm });
  const { register, handleSubmit, formState, reset } = formRegistration;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [checkAge, setCheckAge] = useState(false);
  const [checkNationality, setCheckNationality] = useState(false);
  const [checkTerm, setCheckTerm] = useState(false);

  useEffect(() => {
    if(code !== undefined) {
      reset(formValues => ({
        ...formValues,
        referralCode: code
      }));
    }
  }, [code, reset]);

  const registrationHandler = async (data) => {
    
    setMobileNumber(data.mobileNumber);
    setFormData(data);
    setPageLoader(true);
    
    console.log("Request OTP");
  }

  // OTP modal
  const handleOTPOpen = () => { setOpenOTP(true); }
  const handleOTPClose = () => { setOpenOTP(false); }
  const handleOkayOTP = async (otpNumber) => {
    console.log("Verify OTP");
  };

  // OTP modal
  const handleProceedOpen = () => { setOpenProceedModal(true); }
  const handleProceedClose = () => { setOpenProceedModal(false); }
  const handleOkayProceed = () => {
    console.log("Submit");
  }
  const handleOkayVerify = () => { handleUserInfoOpen(); }

  // fo verification modal info
  const handleUserInfoOpen = () => { setOpenUserInfoModal(true); }
  const handleUserInfoClose = () => { setOpenUserInfoModal(false); }

  return (
    <div className="registration">
      <div className="divhead">
        <h2>BINGO BLACKOUT REGISTRATION</h2>
      </div>
      <div className='container'>
        <div className="lfContent"></div>
        <div className="content">
            <div id="firstStep" className="show">
              <form onSubmit={ handleSubmit(registrationHandler) } noValidate>
                <div className="divContent">
                  <div className="left">
                    <label>Referral Code</label>
                  </div>
                  <div className="right">
                    <span className="referralCode">{ code }</span>
                  </div>
                </div>

                <div className="divContent">
                  <div className="left">
                    <label>First Name</label>
                  </div>
                  <div className="right">
                    <TextField 
                      // placeholder="Enter First name"
                      autoFocus
                      { 
                        ...register("firstName", { required: true } ) 
                      }
                      error={ !!errors.firstName }
                      helperText={ errors.firstName?.message }
                      // label="Enter first name" 
                      variant="outlined" size="small" fullWidth />
                  </div>
                </div>

                <div className="divContent">
                  <div className="left">
                    <label>Middle Name</label>
                  </div>
                  <div className="right">
                    <TextField 
                      // placeholder="Enter Middle Name"
                      { 
                        ...register("middleName", { required: true } ) 
                      }
                      error={ !!errors.middleName }
                      helperText={ errors.middleName?.message }
                      // label="Enter Middle name" 
                      variant="outlined" size="small" fullWidth />
                  </div>
                </div>

                <div className="divContent">
                  <div className="left">
                    <label>Last Name</label>
                  </div>
                  <div className="right">
                    <TextField 
                      // placeholder="Enter Last Name"
                      { 
                        ...register("lastName", { required: true } ) 
                      }
                      error={ !!errors.lastName }
                      helperText={ errors.lastName?.message }
                      // label="Enter last name" 
                      variant="outlined" size="small" fullWidth />
                  </div>
                </div>

                <div className="divContent">
                  <div className="left">
                    <label>Mobile Number</label>
                  </div>
                  <div className="right">
                    <TextField
                    // placeholder="Enter Mobile Number"
                      type="number"
                      { 
                        ...register("mobileNumber", { 
                          required: true,
                          minLength: {
                            value: 10,
                            message: "Phone number must at least 10 digits"
                          }
                        }) 
                      }
                      error={ !!errors.mobileNumber }
                      helperText={ errors.mobileNumber?.message }
                      // label="Enter Mobile Number" 
                      variant="outlined" size="small" fullWidth />
                  </div>
                </div>

                <div className="divIam">
                  <FormGroup style={{ marginBottom: '10px'}}>
                    <FormControlLabel className={(!checkAge) ? 'hasError' : ''} 
                    { 
                      ...register("checkAge", { required: true } ) 
                    }
                    control={<Checkbox defaultValue={checkAge} onChange={e => setCheckAge(!checkAge)} />} 
                    label={
                      <div>
                          <span>I am at least 21 years old </span>
                          {
                            (!checkAge) ? <span className="checkRequired">(required *)</span> : ''
                          }
                          
                      </div>
                    } />

                    <FormControlLabel className={(!checkNationality) ? 'hasError' : ''} 
                    { 
                      ...register("checkNationality", { required: true } ) 
                    }
                    control={<Checkbox defaultValue={checkNationality} onChange={e => setCheckNationality(!checkNationality)} />} 
                    label={
                      <div>
                          <span>I am a Filipino Citizen </span>
                          {
                            (!checkNationality) ? <span className="checkRequired">(required *)</span> : ''
                          }
                          
                      </div>
                    } />
                  </FormGroup>
                </div>

                <div className="divTerms">
                  <FormControlLabel className={(!checkTerm) ? 'hasError' : ''}
                    control={
                      <Checkbox { 
                        ...register("checkTerm", { required: true } ) 
                      } defaultValue={checkTerm} onChange={e => setCheckTerm(!checkTerm)} />
                    } label={
                      <div>
                          <span>I agree to Bingo Blackout </span>
                          {
                            (!checkTerm) ? <span className="checkRequired">(required *)</span> : ''
                          }
                      </div>
                    } />
                    <div style={{ fontSize: '14px'}}>
                      <Link to={'/privacy'}>Privacy Policy</Link>
                      <span> and </span>
                      <Link to={'/terms'}>Terms of Use</Link>
                    </div>
                </div>

                <div className="divContent">
                  <div className="left"></div>
                  <div className="right">
                  <Button type="submit" variant="outlined" color="success">
                    Register
                  </Button>
                  </div>
                </div>
              </form>
            </div>
      
          </div>
      </div>

      <OtpVerification
        isOpenOTP={openOTP}
        handleCloseOTP={handleOTPClose}
        handleOkay={handleOkayOTP}
        number={mobileNumber}
        isLoading={ isLoading }
      />

      <ProceedRegistration
      isOpenProceed={ openProceedModal }
      handleRegister={ handleOkayProceed }
      handleVerify={ handleOkayVerify } />

      <RegistrationUserInfo 
      isOpen={openUserInfoModal}
      handleClose={handleUserInfoClose}
      accountObjectId={accountObjectId}
      accountObject={formData} />

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  );
};

export default Registration;
