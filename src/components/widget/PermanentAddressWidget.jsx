import React, { useEffect } from 'react';
import { TextField, MenuItem  } from "@mui/material";

const PermanentAddressWidget = ({register, errors, nextrequired, defaultData}) => {

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
    let municipalityCode = event.target.getAttribute('data-municipality-code');
    fetch(process.env.REACT_APP_PSGC_API_URL + `/municipalities/${municipalityCode}/barangays`)
    .then((response) => response.json())
    .then((data) => {
        setBarangaysData(data);
    }).catch(rejected => {
        console.log(rejected);
    });
  }

  return (
    (defaultData !== null) ? <>
        <div className="divContent">
            <div className="left">
                <label>Region</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("permanentRegion") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>

        <div className="divContent">
            <div className="left">
                <label>Province</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("permanentProvince") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>

        <div className="divContent">
            <div className="left">
                <label>Municipality</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("permanentMunicipality") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>

        <div className="divContent">
            <div className="left">
                <label>Barangay</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("permanentBarangay") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>
    </>
    :
    (nextrequired !== undefined) ?
    <>
        <div className="divContent">
            <div className="left">
                <label>Region</label>
            </div>
            <div className="right">
                <TextField 
                placeholder="Select region"
                { 
                    ...register("permanentRegion", ((nextrequired)) ? { required: true } : { required: false } ) 
                }
                error={ !!errors.region }
                helperText={ errors.region?.message }
                onClick={clickRegionEvent}
                // onChange={ e => handleRegionCode(e, e.target.value) }
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
            </div>

            <div className="divContent">
            <div className="left">
                <label>Province</label>
            </div>
            <div className="right">
                <TextField 
                placeholder="Select province"
                { 
                    ...register("permanentProvince", ((nextrequired)) ? { required: true } : { required: false } ) 
                }
                error={ !!errors.province }
                helperText={ errors.province?.message }
                onClick={handleProvinceCode}
                // onChange={e => handleProvinceCode(e, e.target.value) }
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
            </div>

            <div className="divContent">
            <div className="left">
                <label>Municipality</label>
            </div>
            <div className="right">
                <TextField 
                    placeholder="Select municipality"
                    { 
                    ...register("permanentMunicipality", ((nextrequired)) ? { required: true } : { required: false }) 
                    }
                    error={ !!errors.municipality }
                    helperText={ errors.municipality?.message }
                    onClick={handleMunicipalityCode}
                    // onChange={ e => handleMunicipalityCode(e, e.target.value) }
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
            </div>

            <div className="divContent">
            <div className="left">
                <label>Barangay</label>
            </div>
            <div className="right">
                <TextField 
                placeholder="Select barangay"
                { 
                    ...register("permanentBarangay", ((nextrequired)) ? { required: true } : { required: false } ) 
                }
                error={ !!errors.barangay }
                helperText={ errors.barangay?.message }
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
        </div>
    </>
    :
    <>
        <div className="divContent">
            <div className="left">
                <label>REGION</label>
            </div>
            <div className="right">
                <TextField 
                placeholder="Select region"
                { 
                    ...register("permanentRegion", { required: true } ) 
                }
                error={ !!errors.region }
                helperText={ errors.region?.message }
                onClick={clickRegionEvent}
                // onChange={ e => handleRegionCode(e, e.target.value) }
                label="Select region" sx={{ width: "70%" }} defaultValue="" variant="outlined" size="small" select>
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
            </div>

            <div className="divContent">
            <div className="left">
                <label>PROVINCE</label>
            </div>
            <div className="right">
                <TextField 
                placeholder="Select province"
                { 
                    ...register("permanentProvince", { required: true } ) 
                }
                error={ !!errors.province }
                helperText={ errors.province?.message }
                onClick={handleProvinceCode}
                // onChange={e => handleProvinceCode(e, e.target.value) }
                label="Select province" sx={{ width: "70%" }} defaultValue="" variant="outlined" size="small" select>
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
            </div>

            <div className="divContent">
            <div className="left">
                <label>MUNICIPALITY</label>
            </div>
            <div className="right">
                <TextField 
                    placeholder="Select municipality"
                    { 
                    ...register("permanentMunicipality", { required: true } ) 
                    }
                    error={ !!errors.municipality }
                    helperText={ errors.municipality?.message }
                    onClick={handleMunicipalityCode}
                    // onChange={ e => handleMunicipalityCode(e, e.target.value) }
                    label="Select municipality" sx={{ width: "70%" }} defaultValue="" variant="outlined" size="small" select>
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
            </div>

            <div className="divContent">
            <div className="left">
                <label>BARANGAY</label>
            </div>
            <div className="right">
                <TextField 
                placeholder="Select barangay"
                { 
                    ...register("permanentBarangay", { required: true } ) 
                }
                error={ !!errors.barangay }
                helperText={ errors.barangay?.message }
                label="Select barangay" sx={{ width: "70%" }} defaultValue="" variant="outlined" size="small" select>
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
        </div>
    </>
  )
}

export default PermanentAddressWidget
