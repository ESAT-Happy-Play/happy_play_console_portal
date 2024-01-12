import React from 'react';
import { TextField } from "@mui/material";

const PresentAddrWidgetWithData = ({register}) => {

  return (
    <>
        <div className="divContent">
            <div className="left">
                <label>Region</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("presRegion") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>

        <div className="divContent">
            <div className="left">
                <label>Province</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("presProvince") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>

        <div className="divContent">
            <div className="left">
                <label>Municipality</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("presMunicipality") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>

        <div className="divContent">
            <div className="left">
                <label>Barangay</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("presBarangay") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>

        <div className="divContent">
            <div className="left">
                <label>Street/Purok</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("presStreet") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>
    </>
  )
}

export default PresentAddrWidgetWithData
