import React from 'react';
import { TextField, MenuItem  } from "@mui/material";

export const PermanentAddress = ({ 
    register, 
    errors, 
    regionProvince, 
    regions,
    provinces,
    municipalities,
    barangays }) => {
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
        // handleAddressValue({
        //     region: curRegion,
        //     province: curProvince,
        //     municipality: event.target.getAttribute('data-value')
        // });
    }
    const handleBarangay = event => {
        setcurBarangay(event.target.getAttribute('data-value'));
    }

    const handleStreet = (e, value) => {
        // console.log({
        //     region: curRegion,
        //     province: curProvince,
        //     municipality: curMunicipality,
        //     barangay: curBarangay,
        //     street: value
        // })
    }

    // console.log(regions);

    return (
    <div>
        <div style={{ display:'flex', justifyContent:'center',gap:'5px'}}>
            <div className="form-input" style={{width:'100%'}}>
                <div className="form-title">
                    <label>Region</label>
                    <span className="required">*</span>
                </div>
                <TextField style={{textAlign:'left',width:'170px'}}
                variant="outlined" defaultValue="" size="small"
                {  ...register("permanentRegion", { required: false } ) }
                error={ !!errors.permanentRegion }
                onClick={handleRegion}
                select>
                <MenuItem value=""><em>Select region</em></MenuItem>
                { 
                    (regionProvince !== null) ?
                        regionProvince.map((item, index) => (
                        <MenuItem key={item.regionCode} data-code={item.regionCode} value={item.regionName}>
                            {item.regionName}
                        </MenuItem>
                        ))
                    : 
                    regions.regions.map((item, index) => (
                        <MenuItem key={item.REGION_CODE} data-code={item.REGION_CODE} value={item.REGION_NAME}>
                            {item.REGION_NAME}
                        </MenuItem>
                    ))
                }
                </TextField>
            </div>
            <div className="form-input" style={{width:'100%'}}>
                <div className="form-title">
                    <label>Province</label>
                    <span className="required">*</span>
                </div>
                <TextField style={{textAlign:'left',width:'170px'}}
                variant="outlined" defaultValue="" size="small"
                {  ...register("permanentProvince", { required: false } ) }
                error={ !!errors.permanentProvince }
                onClick={handleProvince}
                select>
                <MenuItem value=""><em>Select province</em></MenuItem>
                { 
                    (regionProvince !== null) ? (curRegionCode !== null) ?
                        regionProvince.filter(m => m.regionCode === curRegionCode)[0].provinces.map((item, index) => (
                        <MenuItem key={item.provinceCode} data-code={item.provinceCode} value={item.provinceName}>
                            {item.provinceName}
                        </MenuItem>
                        ))
                    : <MenuItem value="">Loading...</MenuItem>
                    : 
                    provinces.provinces.filter(m => m.REGION_CODE === curRegionCode).map((item, index) => (
                        <MenuItem key={item.PROVINCE_CODE} data-code={item.PROVINCE_CODE} value={item.PROVINCE_NAME}>
                            {item.PROVINCE_NAME}
                        </MenuItem>
                    ))
                }
                </TextField>
            </div>
        </div>
        <div style={{ display:'flex', justifyContent:'center',gap:'5px'}}>
            <div className="form-input" style={{width:'100%'}}>
                <div className="form-title">
                    <label>Municipality</label>
                    <span className="required">*</span>
                </div>
                <TextField style={{textAlign:'left',width:'170px'}}
                variant="outlined" defaultValue="" size="small"
                {  ...register("permanentMunicipality", { required: false } ) }
                error={ !!errors.permanentMunicipality }
                onClick={handleMunicipality}
                select>
                <MenuItem value=""><em>Select municipality</em></MenuItem>
                { 
                    (regionProvince !== null) ? (curRegionCode !== null) ?
                        regionProvince.filter(m => m.regionCode === curRegionCode)[0].provinces.map((item, index) => (
                        <MenuItem key={item.provinceCode} data-code={item.provinceCode} value={item.provinceName}>
                            {item.provinceName}
                        </MenuItem>
                        ))
                    : <MenuItem value="">Loading...</MenuItem>
                    : 
                    municipalities.municipalities.filter(m => m.PROVINCE_CODE === curProvinceCode).map((item, index) => (
                        <MenuItem key={item.MUNICIPALITY_CODE} data-code={item.MUNICIPALITY_CODE} value={item.MUNICIPALITY_NAME}>
                            {item.MUNICIPALITY_NAME}
                        </MenuItem>
                    ))
                }
                </TextField>
            </div>

            <div className="form-input" style={{width:'100%'}}>
                <div className="form-title">
                    <label>Barangay</label>
                    <span className="required">*</span>
                </div>
                <TextField style={{textAlign:'left',width:'170px'}}
                variant="outlined" defaultValue="" size="small"
                {  ...register("permanentBarangay", { required: false } ) }
                error={ !!errors.permanentBarangay }
                onClick={handleBarangay}
                select>
                <MenuItem value=""><em>Select barangay</em></MenuItem>
                { 
                    (regionProvince !== null) ? (curRegionCode !== null) ?
                        regionProvince.filter(m => m.regionCode === curRegionCode)[0].provinces.map((item, index) => (
                        <MenuItem key={item.provinceCode} data-code={item.provinceCode} value={item.provinceName}>
                            {item.provinceName}
                        </MenuItem>
                        ))
                    : <MenuItem value="">Loading...</MenuItem>
                    : 
                    barangays.barangays.filter(m => m.MUNICIPALITY_CODE === curMunicipalityCode).map((item, index) => (
                        <MenuItem key={item.BRGY_CODE} data-code={item.BRGY_CODE} value={item.BRGY_NAME}>
                            {item.BRGY_NAME}
                        </MenuItem>
                    ))
                }
                </TextField>
            </div>
        </div>
        <div style={{ display:'flex', justifyContent:'center',gap:'5px'}}>
            <div className="form-input" style={{width:'100%'}}>
                <div className="form-title">
                    <label>Street/Sitio</label>
                    <span className="required">*</span>
                </div>
                <TextField type="text" placeholder="Street/Sitio" size="small" 
                {  ...register("permanentStreetOrPurok", { required: false } ) }
                error={ !!errors.permanentStreetOrPurok }
                onChange={e => handleStreet(e, e.target.value)}
                fullWidth/>
            </div>
        </div>
    </div>
  )
}
