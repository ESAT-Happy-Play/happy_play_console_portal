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
import ProceedRegistration from "../../components/Dialog/forms/registration/ProceedRegistration";
import RegistrationUserInfo from "../../components/Dialog/forms/registration/RegistrationUserInfo";

import { POSTFetch, FetchFormData } from "../../api/ApiFetchBuilder";

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

  // Registration form
  const formRegistration = useForm({ defaultValues: UserModel.RegistrationForm });
  const { register, handleSubmit, formState, reset } = formRegistration;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [checkAge, setCheckAge] = useState(false);
  // const [checkNationality, setCheckNationality] = useState(false);
  const [checkTerm, setCheckTerm] = useState(false);

  useEffect(() => {
    if (code !== undefined) {
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
    setIsLoading(true);
    let response = await POSTFetch(`${process.env.REACT_APP_API_URL}/auth/requestotp?mobilenumber=${data.mobileNumber}&purpose=reg`, {});
    setPageLoader(false);
    setIsLoading(false);

    if (response.status) {
      handleOTPOpen();
    }

    if (!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  //
  const handleOTPOpen = () => { setOpenOTP(true); }
  const handleOTPClose = () => { setOpenOTP(false); }
  const handleOkayOTP = async (otpNumber) => {
    setIsLoading(true);
    let response = await POSTFetch(`${process.env.REACT_APP_API_URL}/auth/validateotp?mobilenumber=${mobileNumber}&otp=${otpNumber}`, {});
    setIsLoading(false);

    if (response.status) {
      var regfrmData = new FormData();
      regfrmData.append('referralCode', formData.referralCode);
      regfrmData.append('isFullRegistration', 0);
      regfrmData.append('firstname', formData.firstname);
      regfrmData.append('lastname', formData.lastname);
      regfrmData.append('birthday', formData.birthday);
      regfrmData.append('mobileNumber', formData.mobileNumber);

      let response = await FetchFormData(`${process.env.REACT_APP_API_URL}/users`, 'POST', regfrmData);
      handleOTPClose();
      if (response.status) {
        handleProceedOpen();
      }

      if (!response.status) {
        toast.error(response.data.errorMessage);
      }
    }

    if (!response.status) {
      toast.error(response.data.errorMessage);
    }
  };

  //
  const handleProceedOpen = () => { setOpenProceedModal(true); }
  const handleProceedClose = () => { setOpenProceedModal(false); }
  const handleOkayProceed = () => {
    handleProceedClose();
    window.location.reload(false);
  }
  const handleOkayVerify = () => { handleUserInfoOpen(); }

  // fo verification modal info
  const handleUserInfoOpen = () => { setOpenUserInfoModal(true); }
  const handleUserInfoClose = () => { setOpenUserInfoModal(false); }
  const handleUserInfoCallback = () => {
    handleUserInfoClose();
    handleProceedClose();
    window.location.reload(false);
  }

  const [isValidDOB, setisValidDOB] = React.useState(true);
  const validateDate = (value) => {
    const selected = new Date(value).getFullYear();
    const now = new Date().getFullYear();
    setisValidDOB((now - selected) >= 18);
  };

  return (
    <div className="registration">
      <div className="divhead">
        <h2>HAPPY PLAY REGISTRATION</h2>
      </div>
      <div className='container'>
        <div className="lfContent"></div>
        <div className="content">
          <div id="firstStep" className="show">
            <form onSubmit={handleSubmit(registrationHandler)} noValidate>

              {
                (code !== undefined) ?
                  <div className="divContent">
                    <div className="left">
                      <label>Referral Code</label>
                    </div>
                    <div className="right">
                      <span className="referralCode">{code}</span>
                    </div>
                  </div>
                  :
                  <div className="divContent">
                    <div className="left">
                      <label>Referral Code</label>
                    </div>
                    <div className="right">
                      <TextField
                        {
                        ...register("referralCode", { required: true })
                        }
                        error={!!errors.referralCode}
                        helperText={errors.referralCode?.message}
                        variant="outlined" size="small" fullWidth />
                    </div>
                  </div>
              }

              <div className="divContent">
                <div className="left">
                  <label>First Name</label>
                </div>
                <div className="right">
                  <TextField
                    autoFocus
                    {
                    ...register("firstname", { required: true })
                    }
                    error={!!errors.firstname}
                    helperText={errors.firstname?.message}
                    variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>Last Name</label>
                </div>
                <div className="right">
                  <TextField
                    {
                    ...register("lastname", { required: true })
                    }
                    error={!!errors.lastname}
                    helperText={errors.lastname?.message}
                    variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>Birthday</label>
                </div>
                <div className="right">
                  <TextField
                    type="date"
                    {
                    ...register("birthday", { required: true })
                    }
                    onChange={e => validateDate(e.target.value)}
                    error={!!errors.birthday}
                    helperText={errors.birthday?.message}
                    variant="outlined" size="small" fullWidth />
                </div>
              </div>

              {
                (!isValidDOB) ? <div className="divContent">
                  <div className="left">
                    <label></label>
                  </div>
                  <div className="right">
                    <span style={{ color: 'red', fontSize: '12px' }}>Agent/Player must at least 21 years old.</span>
                  </div>
                </div>
                  : <></>
              }

              <div className="divContent">
                <div className="left">
                  <label>Mobile Number</label>
                </div>
                <div className="right">
                  <TextField
                    type="number"
                    {
                    ...register("mobileNumber", {
                      required: true,
                      minLength: {
                        value: 11,
                        message: "Phone number must at least 11 digits"
                      }
                    })
                    }
                    error={!!errors.mobileNumber}
                    helperText={errors.mobileNumber?.message}
                    variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divIam">
                <FormGroup style={{ marginBottom: '10px' }}>
                  <FormControlLabel className={(!checkAge) ? 'hasError' : ''}
                    {
                    ...register("checkAge", { required: true })
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
                    ...register("checkNationality", { required: true })
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
                      ...register("checkTerm", { required: true })
                    } defaultValue={checkTerm} onChange={e => setCheckTerm(!checkTerm)} />
                  } label={
                    <div>
                      <span>I agree to Happy Play </span>
                      {
                        (!checkTerm) ? <span className="checkRequired">(required *)</span> : ''
                      }
                    </div>
                  } />
                <div style={{ fontSize: '14px' }}>
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
        isLoading={isLoading}
      />

      <ProceedRegistration
        isOpenProceed={openProceedModal}
        handleRegister={handleOkayProceed}
        handleVerify={handleOkayVerify} />

      <RegistrationUserInfo
        isOpen={openUserInfoModal}
        handleClose={handleUserInfoClose}
        accountObject={formData}
        handleCallback={handleUserInfoCallback} />

      <PageLoader isLoadingPage={pageLoader} />
    </div>
  );
};

export default Registration;
