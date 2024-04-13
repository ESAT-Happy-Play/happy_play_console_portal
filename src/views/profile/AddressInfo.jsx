import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import AddressPresent from './AddressPresent';
import AddressPermanent from './AddressPermanent';

import { UserProfileDetails } from "../../utils/common/UserProfileDetails";
import { ContentLoader } from "../../components/mui";
import { UserService } from '../../services';

function AddressInfo({ dataObj }) {
    const [pageLoader, setPageLoader] = useState(false);
    const [isEdit, setisEdit] = useState(false);

    const formAddress = useForm({
        defaultValues: {
            presentRegion: "", presentProvince: "", presentMunicipality: "", presentBarangay: "", presentStreetOrPurok: "",
            permanentRegion: "", permanentProvince: "", permanentMunicipality: "", permanentBarangay: "", permanentStreetOrPurok: ""
        }
    });
    const { register, handleSubmit, formState, reset } = formAddress;
    const { errors } = formState;

    const submitHandler = (data) => {
        setPageLoader(true);
        UserService.updateProfileAddress(data).then((res) => {
            if (res) {
                dataObj["presentRegion"] = data.presentRegion;
                dataObj["presentProvince"] = data.presentProvince;
                dataObj["presentMunicipality"] = data.presentMunicipality;
                dataObj["presentBarangay"] = data.presentBarangay;
                dataObj["presentStreetOrPurok"] = data.presentStreetOrPurok;
                dataObj["permanentRegion"] = data.permanentRegion;
                dataObj["permanentProvince"] = data.permanentProvince;
                dataObj["permanentMunicipality"] = data.permanentMunicipality;
                dataObj["permanentBarangay"] = data.permanentBarangay;
                dataObj["permanentStreetOrPurok"] = data.permanentStreetOrPurok;

                UserProfileDetails.getInitAccount(dataObj).then();
            }
            setisEdit(false);
            setPageLoader(false);
        })
    }

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

                        <AddressPresent register={register} errors={errors} />
                        <AddressPermanent register={register} errors={errors} />
                    </form>
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
                        <TextField defaultValue={dataObj.presentRegion} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Province</span>
                        <TextField defaultValue={dataObj.presentProvince} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Municipality</span>
                        <TextField defaultValue={dataObj.presentMunicipality} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Barangay</span>
                        <TextField defaultValue={dataObj.presentBarangay} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Sitio/Street</span>
                        <TextField defaultValue={dataObj.presentStreetOrPurok} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <br/>
                    <div>
                        <span style={{fontSize:'18px'}}>Permanent Address</span>
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Region</span>
                        <TextField defaultValue={dataObj.permanentRegion} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Province</span>
                        <TextField defaultValue={dataObj.permanentProvince} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Municipality</span>
                        <TextField defaultValue={dataObj.permanentMunicipality} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Barangay</span>
                        <TextField defaultValue={dataObj.permanentBarangay} disabled variant="outlined" size='small' fullWidth />
                    </div>
                    <div className='profile-form-input'>
                        <span className='spanFixW'>Sitio/Street</span>
                        <TextField defaultValue={dataObj.permanentStreetOrPurok} disabled variant="outlined" size='small' fullWidth />
                    </div>
                </div>
            </div>
        }

        <ContentLoader isLoadingPage={ pageLoader } />
    </>
  )
}

export default AddressInfo
