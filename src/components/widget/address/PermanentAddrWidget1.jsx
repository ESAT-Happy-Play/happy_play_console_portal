import React, { useEffect } from 'react';
import { TextField, MenuItem  } from "@mui/material";

const PermanentAddrWidget1 = ({register, errors, nextrequired, callback}) => {

  const [regionsData, setRegionData] = React.useState([]);
  const [provincesData, setProvincesData] = React.useState([]);
  const [municipalitiesData, setMunicipalitiesData] = React.useState([]);
  const [barangaysData, setBarangaysData] = React.useState([]);
  
  // Trigger if empty array
  useEffect(() => {
        fetch(process.env.REACT_APP_PSGC_API_URL + "/regions")
            .then((response) => response.json())
            .then((data) => {
                setRegionData(data);
            }).catch(rejected => {
                console.log(rejected);
            });
        }, 
    []);

  const clickRegionEvent = event => {

    if(callback !== undefined) {
        callback(event.target.getAttribute('data-value'), 1);
    }

    let regionCode = event.target.getAttribute('data-region-code');
    fetch(process.env.REACT_APP_PSGC_API_URL + `/regions/${regionCode}/provinces`)
    .then((response) => response.json())
    .then((data) => {
        setProvincesData(data);
    }).catch(rejected => {
        console.log(rejected);
    });
  }

  // Trigger on select province
  const handleProvinceCode = event => {

    if(callback !== undefined) {
        callback(event.target.getAttribute('data-value'), 2);
    }

    let provinceCode = event.target.getAttribute('data-province-code');
    fetch(process.env.REACT_APP_PSGC_API_URL + `/provinces/${provinceCode}/municipalities`)
    .then((response) => response.json())
    .then((data) => {
        setMunicipalitiesData(data);
    }).catch(rejected => {
        console.log(rejected);
    });
  }

  // Trigger on select municipality
  const handleMunicipalityCode = event => {
    
    if(callback !== undefined) {
        callback(event.target.getAttribute('data-value'), 3);
    }

    let municipalityCode = event.target.getAttribute('data-municipality-code');
    fetch(process.env.REACT_APP_PSGC_API_URL + `/municipalities/${municipalityCode}/barangays`)
    .then((response) => response.json())
    .then((data) => {
        setBarangaysData(data);
    }).catch(rejected => {
        console.log(rejected);
    });
  }

  const handleBarangaySelect = event => {
    if(callback !== undefined) {
        callback(event.target.getAttribute('data-value'), 4);
    }
  }

  return (
    <>
        <div style={{display:'flex', gap:'8px', marginBottom:'10px'}}>
            <label style={{width:'150px', marginTop:''}}>Region</label>
            <TextField 
                placeholder="Select region"
                { 
                    ...register("permRegion", ((nextrequired)) ? { required: true } : { required: false } ) 
                }
                error={ !!errors.permRegion }
                helperText={ errors.permRegion?.message }
                onClick={clickRegionEvent}
                label="Select region" sx={{ width: "100%" }} defaultValue="" variant="outlined" size="small" select>
                <MenuItem value=''><em>Select region</em></MenuItem>
                { 
                    (regionsData.length !== 0) ? regionsData.map((item) => (
                    <MenuItem data-region-code={item.code} key={item.code} value={item.name}>
                        {item.name}
                    </MenuItem>
                    )) :
                    <MenuItem value=''>Loading options...</MenuItem>
                }
                </TextField>
        </div>

        <div style={{display:'flex', gap:'8px', marginBottom:'10px'}}>
            <label style={{width:'150px', marginTop:''}}>Province</label>
            <TextField 
                placeholder="Select province"
                { 
                    ...register("permProvince", ((nextrequired)) ? { required: true } : { required: false } ) 
                }
                error={ !!errors.permProvince }
                helperText={ errors.permProvince?.message }
                onClick={handleProvinceCode}
                label="Select province" sx={{ width: "100%" }} defaultValue="" variant="outlined" size="small" select>
                <MenuItem value=''><em>Select province</em></MenuItem>
                { 
                    (provincesData.length !== 0) ? provincesData.map((item) => (
                    <MenuItem data-province-code={item.code} key={item.code} value={item.name}>
                        {item.name}
                    </MenuItem>
                    )) :
                    <MenuItem value=''>Loading options...</MenuItem>
                }
                </TextField>
        </div>

        <div style={{display:'flex', gap:'8px', marginBottom:'10px'}}>
            <label style={{width:'150px', marginTop:''}}>Municipality</label>
            <TextField 
                    placeholder="Select municipality"
                    { 
                    ...register("permMunicipality", ((nextrequired)) ? { required: true } : { required: false }) 
                    }
                    error={ !!errors.permMunicipality }
                    helperText={ errors.permMunicipality?.message }
                    onClick={handleMunicipalityCode}
                    label="Select municipality" sx={{ width: "100%" }} defaultValue="" variant="outlined" size="small" select>
                <MenuItem value=''><em>Select municipality</em></MenuItem>
                { 
                    (municipalitiesData.length !== 0) ? municipalitiesData.map((item) => (
                    <MenuItem data-municipality-code={item.code} key={item.code} value={item.name}>
                        {item.name}
                    </MenuItem>
                    )) :
                    <MenuItem value=''>Loading options...</MenuItem>
                }
                </TextField>
        </div>

        <div style={{display:'flex', gap:'8px', marginBottom:'10px'}}>
            <label style={{width:'150px', marginTop:''}}>Barangay</label>
            <TextField 
                placeholder="Select barangay"
                { 
                    ...register("permBarangay", ((nextrequired)) ? { required: true } : { required: false } ) 
                }
                error={ !!errors.permBarangay }
                helperText={ errors.permBarangay?.message }
                onClick={handleBarangaySelect}
                label="Select barangay" sx={{ width: "100%" }} defaultValue="" variant="outlined" size="small" select>
                <MenuItem value=''><em>Select barangay</em></MenuItem>
                { 
                    (barangaysData.length !== 0) ? barangaysData.map((item) => (
                    <MenuItem data-brangay-code={item.code} key={item.code} value={item.name}>
                        {item.name}
                    </MenuItem>
                    )) :
                    <MenuItem value=''>Loading options...</MenuItem>
                }
                </TextField>
        </div>

        <div style={{display:'flex', gap:'8px', marginBottom:'10px'}}>
            <label style={{width:'150px', marginTop:''}}>Street/Purok</label>
            <TextField 
                placeholder="Street/Purok"
                { 
                    ...register("permStreet", ((nextrequired)) ? { required: true } : { required: false } ) 
                }
                error={ !!errors.permStreet }
                helperText={ errors.permStreet?.message }
                label="Street/Purok" sx={{ width: "100%" }} defaultValue="" variant="outlined" size="small"/>
        </div>
    </>
  )
}

export default PermanentAddrWidget1
