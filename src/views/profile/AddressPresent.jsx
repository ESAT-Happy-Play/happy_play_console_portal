import React from 'react';
import { TextField, MenuItem  } from "@mui/material";

function AddressPresent({ 
    register, 
    errors }) {
    
    let regions = require('../../assets/data/region.json');
    let provinces = require('../../assets/data/province.json');
    let municipalities = require('../../assets/data/municipality.json');
    let barangays = require('../../assets/data/barangay.json');

    const [curRegion, setcurRegion] = React.useState(null);
    const [curRegionCode, setcurRegionCode] = React.useState(null);

    const [curProvince, setcurProvince] = React.useState(null);
    const [curProvinceCode, setcurProvinceCode] = React.useState(null);

    const [curMunicipality, setcurMunicipality] = React.useState(null);
    const [curMunicipalityCode, setcurMunicipalityCode] = React.useState(null);

    const [curBarangay, setcurBarangay] = React.useState(null);

    const handleRegion = event => {
        setcurRegion(event.target.getAttribute('data-value'));
        setcurRegionCode(event.target.getAttribute('data-code'));
    }
    const handleProvince = event => {
        setcurProvince(event.target.getAttribute('data-value'));
        setcurProvinceCode(event.target.getAttribute('data-code'));
    }
    const handleMunicipality = event => {
        setcurMunicipality(event.target.getAttribute('data-value'));
        setcurMunicipalityCode(event.target.getAttribute('data-code'));
    }
    const handleBarangay = event => {
        setcurBarangay(event.target.getAttribute('data-value'));
    }

    const handleStreet = (e, value) => {
    }

    return (
    <>
        <div>
            <span style={{fontSize:'18px'}}>Current Address</span>
        </div>

        <div className='profile-form-input'>
            <span className='spanFixW'>Region</span>
            <TextField defaultValue="" variant="outlined" size='small' fullWidth
            {  ...register("presentRegion", { required: true } ) }
            error={ !!errors.presentRegion }
            onClick={handleRegion}
            select>
            <MenuItem value=""><em>Select region</em></MenuItem>
            { 
                regions.regions.map((item, index) => (
                    <MenuItem key={item.REGION_CODE} data-code={item.REGION_CODE} value={item.REGION_NAME}>
                        {item.REGION_NAME}
                    </MenuItem>
                ))
            }
            </TextField>
        </div>
        <div className='profile-form-input'>
            <span className='spanFixW'>Province</span>
            <TextField defaultValue="" variant="outlined" size='small' fullWidth 
            {  ...register("presentProvince", { required: true } ) }
            error={ !!errors.presentProvince }
            onClick={handleProvince}
            select>
            <MenuItem value=""><em>Select province</em></MenuItem>
                { 
                    provinces.provinces.filter(m => m.REGION_CODE === curRegionCode).map((item, index) => (
                        <MenuItem key={item.PROVINCE_CODE} data-code={item.PROVINCE_CODE} value={item.PROVINCE_NAME}>
                            {item.PROVINCE_NAME}
                        </MenuItem>
                    ))
                }
            </TextField>
        </div>
        <div className='profile-form-input'>
            <span className='spanFixW'>Municipality</span>
            <TextField defaultValue="" variant="outlined" size='small' fullWidth
            {  ...register("presentMunicipality", { required: true } ) }
            error={ !!errors.presentMunicipality }
            onClick={handleMunicipality}
            select>
            <MenuItem value=""><em>Select municipality</em></MenuItem>
            { 
                municipalities.municipalities.filter(m => m.PROVINCE_CODE === curProvinceCode).map((item, index) => (
                    <MenuItem key={item.MUNICIPALITY_CODE} data-code={item.MUNICIPALITY_CODE} value={item.MUNICIPALITY_NAME}>
                        {item.MUNICIPALITY_NAME}
                    </MenuItem>
                ))
            }
            </TextField>
        </div>
        <div className='profile-form-input'>
            <span className='spanFixW'>Barangay</span>
            <TextField defaultValue="Barangay" variant="outlined" size='small' fullWidth
            {  ...register("presentBarangay", { required: true } ) }
            error={ !!errors.presentBarangay }
            onClick={handleBarangay}
            select>
            <MenuItem value=""><em>Select barangay</em></MenuItem>
            { 
                barangays.barangays.filter(m => m.MUNICIPALITY_CODE === curMunicipalityCode).map((item, index) => (
                    <MenuItem key={item.BRGY_CODE} data-code={item.BRGY_CODE} value={item.BRGY_NAME}>
                        {item.BRGY_NAME}
                    </MenuItem>
                ))
            }
            </TextField>
        </div>
        <div className='profile-form-input'>
            <span className='spanFixW'>Sitio/Street</span>
            <TextField defaultValue="" variant="outlined" size='small' fullWidth 
            {  ...register("presentStreetOrPurok", { required: true } ) }
            error={ !!errors.presentStreetOrPurok }
            />
        </div>
        <br/>
    </>
  )
}

export default AddressPresent
