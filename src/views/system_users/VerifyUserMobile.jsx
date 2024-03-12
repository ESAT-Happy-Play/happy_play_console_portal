import "./sysusers.scss";
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem  } from "@mui/material";
import { useForm } from 'react-hook-form';

import VerifiedIcon from '@mui/icons-material/Verified';
import { MuiInput, MuiLoadingButton } from '../../components/mui';

export const VerifyUserMobile = ({companies, submitCallback}) => {
    const formRole = useForm({ defaultValues: { mobileNumber: "" } });
    const { register, handleSubmit, formState, reset } = formRole;
    const { errors } = formState;

    const allowOnlyNumber=(value)=>{
        return value.replace(/[^0-9]/g, '')
    }

    const submitHandler = (data) => {
      submitCallback(data);
    }

    useEffect(() => {
    }, []);

    return (
      <>
        <div className="right-content">
            <form onSubmit={handleSubmit(submitHandler)} noValidate>
                <div className="right-content" style={{display:'flex', justifyContent:'center'}}>
                    <div>
                        <h4>Create New System User</h4>
                        <div style={{display:'flex', marginBottom:'15px'}}>
                        <label style={{margin:'5px 15px 0px 0', width:'70px'}}>Role</label>
                        {
                            (companies !== null) ?
                            <TextField type="text" sx={{width:'200px'}} defaultValue=""
                                label="Role (All)" size="small" select>
                                <MenuItem value=""><em>Role (All)</em></MenuItem>
                                { 
                                    (companies.length > 0) ?
                                    companies.map((item, index) => (
                                        <MenuItem key={item.companyId} data-obj={item.companyObjectId} value={item.companyId}>
                                            {item.companyName}
                                        </MenuItem>
                                    ))
                                    : <MenuItem value=""><em>No data found!</em></MenuItem>
                                }
                                </TextField>
                            : <></>
                        }
                        </div>
                        <div style={{display:'flex', marginBottom:'15px'}}>
                        <label style={{margin:'5px 15px 0px 0',width:'70px'}}>Company</label>
                        {
                            (companies !== null) ?
                            <TextField type="text" sx={{width:'200px'}} defaultValue=""
                                label="Role (All)" size="small" select>
                                <MenuItem value=""><em>Role (All)</em></MenuItem>
                                { 
                                    (companies.length > 0) ?
                                    companies.map((item, index) => (
                                        <MenuItem key={item.companyId} data-obj={item.companyObjectId} value={item.companyId}>
                                            {item.companyName}
                                        </MenuItem>
                                    ))
                                    : <MenuItem value=""><em>No data found!</em></MenuItem>
                                }
                                </TextField>
                            : <></>
                        }
                        </div>
                        <div style={{display:'flex', marginBottom:'15px'}}>
                        <label style={{margin:'5px 15px 0px 0',width:'70px'}}>Branch</label>
                        {
                            (companies !== null) ?
                            <TextField type="text" sx={{width:'200px'}} defaultValue=""
                                label="Role (All)" size="small" select>
                                <MenuItem value=""><em>Role (All)</em></MenuItem>
                                { 
                                    (companies.length > 0) ?
                                    companies.map((item, index) => (
                                        <MenuItem key={item.companyId} data-obj={item.companyObjectId} value={item.companyId}>
                                            {item.companyName}
                                        </MenuItem>
                                    ))
                                    : <MenuItem value=""><em>No data found!</em></MenuItem>
                                }
                                </TextField>
                            : <></>
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
                        <MuiLoadingButton text="Verify" variant="contained" type="submit" 
                        loading={ false } size="medium" color="primary"
                        loadingPosition='end'
                        icon={ <VerifiedIcon/> } />
                        </div>
                        
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}