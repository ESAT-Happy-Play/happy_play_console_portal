import React from 'react';
import { TextField } from "@mui/material";

const DefaultAddressWithData = () => {

  return (
    <>
        <div style={{display:'flex', gap:'8px', marginBottom:'10px'}}>
            <label style={{width:'150px', marginTop:''}}>Region</label>
            <TextField disabled defaultValue="Bicol Region" sx={{ width: "100%" }} variant="outlined" size="small" />
        </div>

        <div style={{display:'flex', gap:'8px', marginBottom:'10px'}}>
            <label style={{width:'150px', marginTop:''}}>Province</label>
            <TextField disabled defaultValue="Masbate" sx={{ width: "100%" }} variant="outlined" size="small" />
        </div>

        <div style={{display:'flex', gap:'8px', marginBottom:'10px'}}>
            <label style={{width:'150px', marginTop:''}}>Municipality</label>
            <TextField disabled defaultValue="Cawayan" sx={{ width: "100%" }} variant="outlined" size="small" />
        </div>

        <div style={{display:'flex', gap:'8px', marginBottom:'10px'}}>
            <label style={{width:'150px', marginTop:''}}>Barangay</label>
            <TextField disabled defaultValue="Mahayahay" sx={{ width: "100%" }} variant="outlined" size="small" />
        </div>

        <div style={{display:'flex', gap:'8px', marginBottom:'10px'}}>
            <label style={{width:'150px', marginTop:''}}>Street/Purok</label>
            <TextField disabled defaultValue="123, Libog St." sx={{ width: "100%" }} variant="outlined" size="small" />
        </div>
    </>
  )
}

export default DefaultAddressWithData
