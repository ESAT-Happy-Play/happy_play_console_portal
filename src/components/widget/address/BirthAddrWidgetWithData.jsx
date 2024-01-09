import React, { useEffect } from 'react';
import { TextField, MenuItem  } from "@mui/material";

const BranchAddressWidget = ({register}) => {

  return (
    <>
        <div className="divContent">
            <div className="left">
                <label>Region</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("branchRegion") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>

        <div className="divContent">
            <div className="left">
                <label>Province</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("branchProvince") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>

        <div className="divContent">
            <div className="left">
                <label>Municipality</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("branchMunicipality") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>

        <div className="divContent">
            <div className="left">
                <label>Barangay</label>
            </div>
            <div className="right">
                <TextField disabled
                { ...register("branchBarangay") }
                sx={{ width: "100%" }} variant="outlined" size="small" />
            </div>
        </div>
    </>
  )
}

export default BranchAddressWidget
