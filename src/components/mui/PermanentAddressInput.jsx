import React from 'react';
import { TextField  } from "@mui/material";

export const PermanentAddressInput = ({ 
    register, 
    errors }) => {

    return (
    <div>
        <div style={{ display:'flex', justifyContent:'center',gap:'5px'}}>
            <div className="form-input" style={{width:'100%'}}>
                <div className="form-title">
                    <label>Region</label>
                    <span className="required">*</span>
                </div>
                <TextField style={{textAlign:'left',width:'170px'}}
                variant="outlined" size="small"
                {  ...register("permanentRegion", { required: false } ) }
                error={ !!errors.permanentRegion }
                />
            </div>
            <div className="form-input" style={{width:'100%'}}>
                <div className="form-title">
                    <label>Province</label>
                    <span className="required">*</span>
                </div>
                <TextField style={{textAlign:'left',width:'170px'}}
                variant="outlined" size="small"
                {  ...register("permanentProvince", { required: false } ) }
                error={ !!errors.permanentProvince }
                />
            </div>
        </div>
        <div style={{ display:'flex', justifyContent:'center',gap:'5px'}}>
            <div className="form-input" style={{width:'100%'}}>
                <div className="form-title">
                    <label>Municipality</label>
                    <span className="required">*</span>
                </div>
                <TextField style={{textAlign:'left',width:'170px'}}
                variant="outlined" size="small"
                {  ...register("permanentMunicipality", { required: false } ) }
                error={ !!errors.permanentMunicipality }
                />
            </div>

            <div className="form-input" style={{width:'100%'}}>
                <div className="form-title">
                    <label>Barangay</label>
                    <span className="required">*</span>
                </div>
                <TextField style={{textAlign:'left',width:'170px'}}
                variant="outlined" size="small"
                {  ...register("permanentBarangay", { required: false } ) }
                error={ !!errors.permanentBarangay }
                />
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
                fullWidth/>
            </div>
        </div>
    </div>
  )
}
