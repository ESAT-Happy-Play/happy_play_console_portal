import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function PersonalDetails() {

    const [isEdit, setisEdit] = useState(false);

    return (
    <>
        {
            (isEdit) ?
            <div className='div-profile-conainer'>
                <div className='div-profilecontent'>
                    <div className='profile-form-button'>
                        <Button onClick={e => setisEdit(false)} variant="text">Cancel</Button>
                        <Button type='submit' variant="text" color='success'>Done</Button>
                    </div>

                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>First Name</span>
                        <TextField defaultValue="John" variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Middle Name</span>
                        <TextField defaultValue="U" variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Last Name</span>
                        <TextField defaultValue="Due" variant="outlined" size='small' fullWidth />
                    </div>
                    <br/>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Birthday</span>
                        <TextField type='date' variant="outlined" size='small' fullWidth />
                    </div>
                    <br/>
                    <br/>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Gender</span>
                        <RadioGroup row>
                            <FormControlLabel checked value="female" control={<Radio />} label="Female" />
                            <FormControlLabel checked={false} value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </div>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Civil Status</span>
                        <TextField defaultValue="Single" variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Blood Type</span>
                        <TextField defaultValue="A+" variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Nationality</span>
                        <TextField defaultValue="Filipino" variant="outlined" size='small' fullWidth />
                    </div>
                </div>
            </div>
            :
            <div className='div-profile-conainer'>
                <div className='div-profilecontent'>
                    <div className='profile-form-button'>
                        <Button onClick={e => setisEdit(true)} variant="text">Edit</Button>
                    </div>

                    <div className='profile-form-input'>
                        <span className='spanFixW'>First Name</span>
                        <b>00000000000</b>
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Middle Name</span>
                        <b>00000000000</b>
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Last Name</span>
                        <b>00000000000</b>
                    </div>
                    <br/>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Birthday</span>
                        <TextField defaultValue="Feb 04, 2024" disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <br/>
                    <br/>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Gender</span>
                        <RadioGroup row>
                            <FormControlLabel disabled checked value="female" control={<Radio />} label="Female" />
                            <FormControlLabel disabled checked={false} value="male" control={<Radio />} label="Male" />
                            {/* <FormControlLabel value="disabled" disabled control={<Radio />} /> */}
                        </RadioGroup>
                    </div>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Civil Status</span>
                        <TextField defaultValue="Single" disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Blood Type</span>
                        <TextField defaultValue="A+" disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span style={{marginTop:'5px'}} className='spanFixW'>Nationality</span>
                        <TextField defaultValue="Filipino" disabled variant="outlined" size='small' fullWidth />
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default PersonalDetails
