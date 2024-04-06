import "./registration.scss"
import React, { useState, useEffect } from "react";

import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";

import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

import { StoreExt } from "../../utils/helpers";
import { MuiInput, MuiLoadingButton, ContentLoader } from "../../components/mui";
import { OTPService } from "../../services";

export const Registration = () => {
  // get url parameter
  const { code } = useParams();
  const [pageLoader, setPageLoader] = useState(false);

  const formRegistration = useForm({
    defaultValues: {
      mobileNumber: "",
    }
  });
  const { register, handleSubmit, formState, reset } = formRegistration;
  const { errors } = formState;

  const registrationHandler = (data) => {
    setPageLoader(true);
    OTPService.generateRegistrationOTP(data).then((resp) => {
      if(resp) {
        let param = StoreExt.getEncrypted({
          mobileNumber: data.mobileNumber,
          referenceId: resp.data,
          code: (code !== undefined) ? code : ''
        });
        window.location.href = `/otp/register/${btoa(param)}`;
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
            <form onSubmit={handleSubmit(registrationHandler)} noValidate>
              <div>
                <label htmlFor="mobileNumber">Enter Mobile Number</label>
                <MuiInput
                  focused={true}
                  className="input-center"
                  name="mobileNumber"
                  type="tel"
                  validation= {{ required: "Mobile number is required.",
                      minLength: { value: 11, message: "min length is 11" }
                  }}
                  onInput= {(e) =>{ e.target.value = e.target.value.toString().slice(0,11) }}
                  size="small"
                  register={register}
                  isError={ !!errors.mobileNumber }
                  errorMsg={ errors.mobileNumber?.message }/>

                  <MuiLoadingButton text="Verify" type="submit" 
                    loading={ false } 
                    color="primary"
                    size="medium"
                    variant="contained"
                    loadingPosition='end'
                    style={{marginTop:'10px'}}
                    icon={ <ArrowRightAltOutlinedIcon/> } />
              </div>
            </form>
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
