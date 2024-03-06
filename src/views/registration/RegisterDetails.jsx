import "./registration.scss"
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';

import { FirstStep, SecondStep, FinalStep } from "../../components/mui/registration";
import { ContentLoader, FormStepper } from "../../components/mui";
import { BranchService, UserService } from "../../services";
import { UserModel } from "../../utils/models";
import { StoreExt } from "../../utils/helpers";
import { AgreementModal, AlertModal } from "../../components/mui/modals";

export const RegisterDetails = () => {
  const { code } = useParams();
  try { StoreExt.getDecrypted(atob(code)) } catch (e) { window.location.href = `/register`; }
  const paramObj = StoreExt.getDecrypted(atob(code));

  const [pageLoader, setPageLoader] = useState(false);
  const [submitLoader, setsubmitLoader] = useState(false);
  const formRegistration = useForm({ defaultValues: UserModel.registration() });
  const { register, handleSubmit, formState, reset } = formRegistration;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});

  const [showPresendAddress, setShowPresendAddress] = useState(false);
  const [showPermanentAddress, setShowPermanentAddress] = useState(false);

  const [stepCount, setstepCount] = useState(0);
  const [step1, setstep1] = useState(true);
  const [step2, setstep2] = useState(false);
  const [step3, setstep3] = useState(false);
  const [branchId, setbranchId] = useState(null);

  const step1Back = () => { 
    setPageLoader(true);
    window.location.href = `/register/${paramObj.code}`;
  }
  const step2Back = () => { setstep1(true); setstep2(false); setstep3(false); setstepCount(stepCount - 1); }
  const step3Back = () => { setstep1(false); setstep2(true); setstep3(false); setstepCount(stepCount - 1); }

  const formSubmit = (data) => {
    if (step1) { setstep1(false);setstep2(true);setstep3(false); setstepCount(stepCount + 1); }
    if (step2) {
      if(data.presentRegion === "") { 
        setShowPresendAddress(true); 
      } else if (data.permanentRegion === "") {
        setShowPermanentAddress(true);
      } else {
        setstep1(false);setstep2(false);setstep3(true); setstepCount(stepCount + 1);
      }
    }
    if (step3) { 
      setFormData(data);
      handleAgreementOpen();
    }
  }

  // modal config
  const [openAgreement, setAgreement] = React.useState(false);
  const handleAgreementOpen = () => { setAgreement(true); };
  const handleAgreementClose = () => { setAgreement(false); };

  const handleAgreementOkay = () => {
    setsubmitLoader(true);
    UserService.registerUser(formData).then((resp) => {
      if(resp) { 
        handleAlertOpen();
      }
      setsubmitLoader(false);
    });
  }

  // modal config
  const [openAlert, setAlert] = React.useState(false);
  const handleAlertOpen = () => { setAlert(true); };
  const handleAlertClose = () => { setAlert(false); };

  const handleAlertOkay = () => {
    handleAlertClose();
    window.location.href = `/register/${paramObj.code}`;
  }

  const handleResetPermanentAddr = (data) => {
    if (data !== null) {
      reset(formValues => ({ ...formValues, 
        permanentRegion: data.region, 
        permanentProvince: data.province,
        permanentMunicipality: data.municipality,
        permanentBarangay: data.barangay,
        permanentStreetOrPurok: data.street
      }));
    }
  }

  useEffect(() => {
    // set mobile number
    reset(formValues => ({ ...formValues, 
      mobileNumber: paramObj.mobileNumber, referralCode: paramObj.code }));

    // get branch by referral code
    if (paramObj.code !== "") {
      BranchService.getBranchByReferral(paramObj.code).then((resp) => {
        if(resp) { 
          reset(formValues => ({ ...formValues, branchId: resp.data.branchId }));
          setbranchId(resp.data.branchId);
        }
      })
    } 
  }, []);

  return (
    <div className="registration">
      <div className='container'>
        <div className="lfContent">
          <div><h3>REGISTRATION</h3></div>
          {
            (paramObj.code !== "") 
            ? <div className="div-referral">
                <p> Referral Code <br/> <span>{code}</span> </p>
              </div>
            : <></>
          }
        </div>
        <div className="content">
          <div className="top">
            <img src={require('../../assets/happy-play-logo.png')} className="logo" title="Esat Logo" />
          </div>
          <hr />
          <div style={{margin:'15px 0 5px 0'}}>
              <FormStepper stepCount={stepCount} />
          </div>
          <div className={(step1) ? "elemShow" : "elemHide"}>
            <FirstStep btnBack={step1Back} handleSubmit={handleSubmit} formSubmit={formSubmit} register={register} errors={errors} />
          </div>
          <div className={(step2) ? "elemShow" : "elemHide"}>
            <SecondStep 
              btnBack={step2Back} 
              handleSubmit={handleSubmit} 
              formSubmit={formSubmit} 
              register={register} errors={errors}
              showPresAddr={showPresendAddress}
              showPerAddr={showPermanentAddress}
              branchId={branchId}
              isrequired={step2}
              resetAddr={handleResetPermanentAddr} />
          </div>
          <div className={(step3) ? "elemShow" : "elemHide"}>
            <FinalStep btnBack={step3Back} handleSubmit={handleSubmit} formSubmit={formSubmit} register={register} errors={errors} isrequired={step3} />
          </div>
          <p>
            <a href="#">Terms Of Use</a>
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
      <ContentLoader isLoadingPage={ pageLoader } />
      <AgreementModal isOpen={openAgreement} 
      handleClose={handleAgreementClose} 
      handleOkay={handleAgreementOkay} isLoading={submitLoader} />
      <AlertModal isOpen={openAlert} handleOkay={handleAlertOkay} isSuccess={true} />
    </div>
  );
};