import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

function AddressInfo() {

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
                        <span style={{fontSize:'18px'}}>Current Address</span>
                    </div>

                    <div className='profile-form-input'>
                        <span className='spanFixW'>Region</span>
                        <TextField defaultValue="Region" variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Province</span>
                        <TextField defaultValue="Province" variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Municipality</span>
                        <TextField defaultValue="Municipality" variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Barangay</span>
                        <TextField defaultValue="Barangay" variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Sitio/Street</span>
                        <TextField defaultValue="Sitio/Street" variant="outlined" size='small' fullWidth />
                    </div>
                    <br/>
                    <div>
                        <span style={{fontSize:'18px'}}>Permanent Address</span>
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Region</span>
                        <TextField defaultValue="Region" variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Province</span>
                        <TextField defaultValue="Province" variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Municipality</span>
                        <TextField defaultValue="Municipality" variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Barangay</span>
                        <TextField defaultValue="Barangay" variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Sitio/Street</span>
                        <TextField defaultValue="Sitio/Street" variant="outlined" size='small' fullWidth />
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
                        <span style={{fontSize:'18px'}}>Current Address</span>
                    </div>

                    <div className='profile-form-input'>
                        <span className='spanFixW'>Region</span>
                        <TextField defaultValue="Region" disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Province</span>
                        <TextField defaultValue="Province" disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Municipality</span>
                        <TextField defaultValue="Municipality" disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Barangay</span>
                        <TextField defaultValue="Barangay" disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Sitio/Street</span>
                        <TextField defaultValue="Sitio/Street" disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <br/>
                    <div>
                        <span style={{fontSize:'18px'}}>Permanent Address</span>
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Region</span>
                        <TextField defaultValue="Region" disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Province</span>
                        <TextField defaultValue="Province" disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Municipality</span>
                        <TextField defaultValue="Municipality" disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Barangay</span>
                        <TextField defaultValue="Barangay" disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Sitio/Street</span>
                        <TextField defaultValue="Sitio/Street" disabled variant="outlined" size='small' fullWidth />
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default AddressInfo
