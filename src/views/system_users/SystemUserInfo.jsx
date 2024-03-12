import "./sysusers.scss";
import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { TextField, InputAdornment, IconButton  } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { FirstStep, SecondStep, FinalStep } from "../../components/mui/registration";
import { FormStepper } from "../../components/mui";
import { UserModel } from "../../utils/models";

export const SystemUserInfo = ({companies}) => {
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
        console.log("back");
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
            console.log(data);
        }
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

    const handleChangeNumber = () => {
        window.location.href = `/register`;
    }

    return (
      <div style={{width:'100%'}}>
        <div style={{display:'flex', gap:'10px', padding:'15px', justifyContent:'center'}}>
            <div style={{display:'flex'}}>
                <span style={{margin:'3px 10px 0px 0'}}>Company</span>
                <TextField variant="outlined"  size="small"/>
            </div>
            <div style={{display:'flex'}}>
                <span style={{margin:'3px 10px 0px 0'}}>Branch</span>
                <TextField variant="outlined"  size="small"/>
            </div>
            <div style={{display:'flex'}}>
                <span style={{margin:'3px 10px 0px 0'}}>Role</span>
                <TextField variant="outlined"  size="small"/>
            </div>
        </div>
        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
            <div className="right-content">
                <div style={{textAlign:'center', margin:'15px 0 35px 0'}}>
                    <label htmlFor="mobileNumber">Enter Mobile Number</label>
                    <TextField type="text"  defaultValue="00000000000" className="input-center-bg" fullWidth size="small" 
                    InputProps={{
                    endAdornment:<InputAdornment position="end">
                        <IconButton onClick={ handleChangeNumber } size="small">
                        <CloseOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                    }}
                    />
                </div>

                <div style={{margin:'15px 0 5px 0'}}>
                    <FormStepper stepCount={stepCount} />
                </div>
                <br/>
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
                <br/><br/>
            </div>
        </div>
    </div>
  )
}