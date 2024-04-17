import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ContentLoader } from "../../components/mui";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ConstArrayExt, DateExt } from "../../utils/helpers";
import { UserProfileDetails } from "../../utils/common/UserProfileDetails";
import { UserService } from '../../services';

function PersonalDetails({ dataObj }) {
    const [pageLoader, setPageLoader] = useState(false);
    const [isEdit, setisEdit] = useState(false);
    const formPersonalDetails = useForm({
        defaultValues: {
            firstName: "", lastName: "", middleName: "", gender: "",
            martialStatus: "", bloodType: "", nationality: "", birthDate: ""
        }
    });
    const { register, handleSubmit, formState, reset } = formPersonalDetails;
    const { errors } = formState;

    const handleRadioChange = (value) => {
        reset(formValues => ({
            ...formValues, gender: value
        }));
    }
    const submitHandler = (data) => {
        setPageLoader(true);
        UserService.updatePersonalDetails(data).then((res) => {
            if (res) {
                dataObj["firstName"] = data.firstName;
                dataObj["lastName"] = data.lastName;
                dataObj["middleName"] = data.middleName;
                dataObj["gender"] = data.gender;
                dataObj["martialStatus"] = data.martialStatus;
                dataObj["bloodType"] = data.bloodType;
                dataObj["nationality"] = data.nationality;
                dataObj["birthDate"] = data.birthDate;

                UserProfileDetails.getInitAccount(dataObj).then();
            }
            setisEdit(false);
            setPageLoader(false);
        })
    }

    useEffect(() => {
        reset(formValues => ({
            ...formValues,
            firstName: dataObj.firstName, lastName: dataObj.lastName, middleName: dataObj.middleName, 
            gender: dataObj.gender, martialStatus: dataObj.martialStatus, bloodType: dataObj.bloodType, 
            nationality: dataObj.nationality, birthDate: DateExt.formatDate(dataObj.birthDate)
        }));
    }, []);

    return (
    <>
        {
            (isEdit) ?
            <div className='div-profile-conainer'>
                <div className='div-profilecontent'>
                    <form onSubmit={ handleSubmit(submitHandler) } noValidate>
                        <div className='profile-form-button'>
                            <Button onClick={e => setisEdit(false)} variant="text">Cancel</Button>
                            <Button type='submit' variant="text" color='success'>Done</Button>
                        </div>

                        <div className='profile-form-input'>
                            <span style={{marginTop:'5px'}} className='spanFixW'>First Name</span>
                            <TextField { ...register("firstName", { required: true }) }
                            error={ !!errors.firstName } helperText={ errors.firstName?.message }
                            variant="outlined" size='small' fullWidth />
                        </div>
                        <div className='profile-form-input'>
                            <span style={{marginTop:'5px'}} className='spanFixW'>Middle Name</span>
                            <TextField { ...register("middleName", { required: true }) }
                            error={ !!errors.middleName } helperText={ errors.middleName?.message }
                            variant="outlined" size='small' fullWidth />
                        </div>
                        <div className='profile-form-input'>
                            <span style={{marginTop:'5px'}} className='spanFixW'>Last Name</span>
                            <TextField { ...register("lastName", { required: true }) }
                            error={ !!errors.lastName } helperText={ errors.lastName?.message }
                            variant="outlined" size='small' fullWidth />
                        </div>
                        <br/>
                        <div className='profile-form-input'>
                            <span style={{marginTop:'5px'}} className='spanFixW'>Birthday</span>
                            <TextField type='date'
                            { ...register("birthDate", { required: true }) }
                            error={ !!errors.birthDate } helperText={ errors.birthDate?.message }
                            variant="outlined" size='small' fullWidth />
                        </div>
                        <br/>
                        <br/>
                        <div className='profile-form-input'>
                            <span style={{marginTop:'5px', width:'135px'}} className='spanFixW'>Gender</span>
                            {
                                (dataObj !== undefined) ?
                                <RadioGroup defaultValue={dataObj.gender} onChange={e => handleRadioChange(e.target.value)} row>
                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                </RadioGroup>
                                : <></>
                            }
                            
                        </div>
                        <div className='profile-form-input'>
                            <span style={{marginTop:'5px'}} className='spanFixW'>Civil Status</span>
                            <TextField style={{ textAlign: 'left' }}
                                variant="outlined" defaultValue={dataObj.martialStatus} size="small"
                                {...register("martialStatus", { required: true })}
                                error={!!errors.martialStatus}
                                fullWidth select>
                                <MenuItem value=""><em>Select Civil Status</em></MenuItem>
                                {
                                    ConstArrayExt.getCivilStatuses().map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </div>
                        <div className='profile-form-input'>
                            <span style={{marginTop:'5px'}} className='spanFixW'>Blood Type</span>
                            <TextField style={{ textAlign: 'left' }}
                                variant="outlined" defaultValue={dataObj.bloodType} size="small"
                                {...register("bloodType", { required: true })}
                                error={!!errors.bloodType} fullWidth select>
                                <MenuItem value=""><em>Select Civil Status</em></MenuItem>
                                {
                                    ConstArrayExt.getBloodTypes().map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </div>
                        <div className='profile-form-input'>
                            <span style={{marginTop:'5px'}} className='spanFixW'>Nationality</span>
                            <TextField style={{ textAlign: 'left' }}
                                variant="outlined" defaultValue={dataObj.nationality} size="small"
                                {...register("nationality", { required: true })}
                                error={!!errors.nationality} fullWidth select>
                                <MenuItem value=""><em>Select Nationality</em></MenuItem>
                                {
                                    ConstArrayExt.getNationalityList().map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </div>
                    </form>
                </div>
            </div>
            :
            <div className='div-profile-conainer'>
                <div className='div-profilecontent'>
                    <div className='profile-form-button'>
                        <Button onClick={e => setisEdit(true)} variant="text">Edit</Button>
                    </div>

                    <div className='profile-form-input'>
                        <span className='spanFixW' style={{width:'135px'}}>First Name</span>
                        <b>{dataObj.firstName}</b>
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW' style={{width:'135px'}}>Middle Name</span>
                        <b>{dataObj.middleName}</b>
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW' style={{width:'135px'}}>Last Name</span>
                        <b>{dataObj.lastName}</b>
                    </div>  
                    <br/>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Birthday</span>
                        <TextField defaultValue={DateExt.readableDate(dataObj.birthDate)} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <br/>
                    <br/>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px', width:'135px'}} className='spanFixW'>Gender</span>
                        <RadioGroup defaultValue={dataObj.gender} row>
                            <FormControlLabel disabled value="Female" control={<Radio />} label="Female" />
                            <FormControlLabel disabled value="Male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </div>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Civil Status</span>
                        <TextField defaultValue={dataObj.martialStatus} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Blood Type</span>
                        <TextField defaultValue={dataObj.bloodType} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Nationality</span>
                        <TextField defaultValue={dataObj.nationality} disabled variant="outlined" size='small' fullWidth />
                    </div>
                </div>
            </div>
        }

        <ContentLoader isLoadingPage={ pageLoader } />
    </>
  )
}

export default PersonalDetails
