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
                { ...register("permRegion") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>

        <div className="divContent">
            <div className="left">
                <label>Province</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("permProvince") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>

        <div className="divContent">
            <div className="left">
                <label>Municipality</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("permMunicipality") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>

        <div className="divContent">
            <div className="left">
                <label>Barangay</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("permBarangay") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>

        <div className="divContent">
            <div className="left">
                <label>Street/Purok</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("permStreet") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>
    </>
  )
}

export default PresentAddrWidgetWithData
