import "./sysusers.scss";
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem  } from "@mui/material";
import { useForm } from 'react-hook-form';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import VerifiedIcon from '@mui/icons-material/Verified';
import { MuiInput, MuiLoadingButton } from '../../components/mui';

export const VerifyUserMobile = ({roles, branches, companies, hasCompany = false, isAvailable, selectCompanyCallback, submitCallback}) => {
    const formRole = useForm({ defaultValues: { 
            mobileNumber: "", role: "", company: "", branch: ""
        } 
    });
    const { register, handleSubmit, formState, reset } = formRole;
    const { errors } = formState;
    const [companyName, setcompanyName] = useState(null);
    const [branchName, setbranchName] = useState(null);
    const [roleName, setroleName] = useState(null);

    const handleSelectComapny = event => {
        setcompanyName(event.target.getAttribute('data-name'));
        selectCompanyCallback(event.target.getAttribute('data-value'), event.target.getAttribute('data-obj'));
    }

    const handleSelectBranch = event => {
        setbranchName(event.target.getAttribute('data-name'));
    }

    const handleSelectRole = event => {
        setroleName(event.target.getAttribute('data-name'));
    }
    
    const submitHandler = (data) => {
      submitCallback(data, companyName, branchName, roleName);
    }

    // useEffect(() => {
    // }, []);

    return (
      <>
        <div className="right-content">
            <form onSubmit={handleSubmit(submitHandler)} noValidate>
                <div className="right-content" style={{display:'flex', justifyContent:'center'}}>
                    <div>
                        <h4>Create New System User</h4>
                        <br/>
                        {
                            (!hasCompany) ?
                            <div style={{display:'flex', marginBottom:'15px'}}>
                                <label style={{margin:'5px 15px 0px 0',width:'70px'}}>Company</label>
                                {
                                    <TextField type="text" sx={{width:'200px'}} defaultValue=""
                                    label="Select Company" size="small" 
                                    { ...register("company", { required: true }) }
                                    error={ !!errors.company }
                                    helperText={ errors.company?.message }
                                    onClick={handleSelectComapny}
                                    select>
                                    <MenuItem value=""><em>Select Company</em></MenuItem>
                                    { 
                                        (companies !== null) ?
                                        companies.map((item, index) => (
                                            <MenuItem key={item.companyId} data-name={item.companyName} data-obj={item.companyObjectId} value={item.companyId}>
                                                {item.companyName}
                                            </MenuItem>
                                        ))
                                        : <MenuItem value=""><em>No data found!</em></MenuItem>
                                    }
                                    </TextField>
                                }
                            </div>
                            : <></>
                        }

                        <div style={{display:'flex', marginBottom:'15px'}}>
                            <label style={{margin:'5px 15px 0px 0',width:'70px'}}>Branch</label>
                            {
                                <TextField type="text" sx={{width:'200px'}} defaultValue=""
                                label="Select Branch" size="small" 
                                { ...register("branch", { required: true }) }
                                error={ !!errors.branch }
                                helperText={ errors.branch?.message }
                                onClick={handleSelectBranch}
                                select>
                                <MenuItem value=""><em>Select Branch</em></MenuItem>
                                { 
                                    (branches !== null) ?
                                    branches.map((item, index) => (
                                        <MenuItem key={item.branchId} data-name={item.branchName} value={item.branchId}>
                                            {item.branchName}
                                        </MenuItem>
                                    ))
                                    : <MenuItem value=""><em>No data found!</em></MenuItem>
                                }
                                </TextField>
                            }
                        </div>
                        <div style={{display:'flex', marginBottom:'15px'}}>
                            <label style={{margin:'5px 15px 0px 0', width:'70px'}}>Role</label>
                            {
                                <TextField type="text" sx={{width:'200px'}} defaultValue=""
                                label="Select Role" size="small"
                                { ...register("role", { required: true }) }
                                error={ !!errors.role }
                                helperText={ errors.role?.message }
                                onClick={handleSelectRole}
                                select>
                                <MenuItem value=""><em>Select Role</em></MenuItem>
                                { 
                                    (roles !== null) ?
                                    roles.map((item, index) => (
                                        <MenuItem key={item.userTypeId} data-name={item.userTypeName} value={item.userTypeId}>
                                            {item.userTypeName}
                                        </MenuItem>
                                    ))
                                    : <MenuItem value=""><em>No data found!</em></MenuItem>
                                }
                                </TextField>
                            }
                        </div>
                        <br/>
                        <div style={{textAlign:'center', width:'290px'}}>
                        <span>Enter Mobile Number</span>
                        <TextField className="input-center" name="mobileNumber" type="text" size="small"
                        onInput= {(e) =>{ e.target.value = e.target.value.toString().slice(0,11) }}
                        { ...register("mobileNumber", { required: "Mobile number is required.",
                            minLength: { value: 11, message: "min length is 11" }
                        }) }
                        error={ !!errors.mobileNumber }
                        helperText={ errors.mobileNumber?.message } fullWidth/>

                        <br/><br/>
                        {
                            (isAvailable === null)
                            ? <>
                                <MuiLoadingButton text="Verify" variant="contained" type="submit" 
                                loading={ false } size="medium" color="primary"
                                loadingPosition='end'
                                icon={ <VerifiedIcon/> } />
                            </>
                            : (isAvailable === 'True')
                            ? <div style={{color:'green'}}>
                                <p style={{margin:'0px'}}>Mobile number is available</p>
                                <CheckCircleIcon style={{fontSize:'35px'}} />
                            </div>
                            : <div style={{color:'red'}}>
                                <p style={{margin:'0px'}}>Mobile number is not available</p>
                                <CancelRoundedIcon style={{fontSize:'35px'}} />
                            </div>
                        }
                        
                        </div>
                        
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}