import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

function ProfessionalInfo() {
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

                    <div>
                        <span style={{fontSize:'18px'}}>Work</span>
                    </div>

                    <div className='profile-form-input'>
                        <span className='spanFixW'>Source Of Income</span>
                        <TextField defaultValue="" variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Nature Of Work</span>
                        <TextField defaultValue="" variant="outlined" size='small' fullWidth />
                    </div>
                    <br/>
                    <div>
                        <span style={{fontSize:'18px'}}>Proof Of Identity</span>
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>ID Type</span>
                        <TextField defaultValue="" variant="outlined" size='small' fullWidth />
                    </div>
                    
                </div>
            </div>
            :
            <div className='div-profile-conainer'>
                <div className='div-profilecontent'>
                    <div className='profile-form-button'>
                        <Button onClick={e => setisEdit(true)} variant="text">Edit</Button>
                    </div>

                    <div>
                        <span style={{fontSize:'18px'}}>Work</span>
                    </div>

                    <div className='profile-form-input'>
                        <span className='spanFixW'>Source Of Income</span>
                        <TextField defaultValue="" disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Nature Of Work</span>
                        <TextField defaultValue="" disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <br/>
                    <div>
                        <span style={{fontSize:'18px'}}>Proof Of Identity</span>
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>ID Type</span>
                        <TextField defaultValue="" disabled variant="outlined" size='small' fullWidth />
                    </div>

                </div>
            </div>
        }
    </>
    )
}

export default ProfessionalInfo
