import "./sysusers.scss";
import React from 'react';
import { TextField, MenuItem  } from "@mui/material";

export const SystemUserFilter = ({companies, hasCompany = false, branches, roles, filterCallback}) => {
    console.log(branches);
    const handleSelectFilter = event => {
        let evntType = event.target.getAttribute('data-type');
        let evntVal = event.target.getAttribute('data-value');
        let evntValObj = event.target.getAttribute('data-obj');

        filterCallback(evntType, evntVal, evntValObj);
    }

    return (
      <>
        <div style={{display:'flex', gap:'15px'}}>
            {
                (!hasCompany) ?
                <TextField type="text" sx={{width:'200px'}} defaultValue=""
                label="Company (All)" size="small" onClick={handleSelectFilter} select>
                <MenuItem value="" data-type="0"><em>Company All</em></MenuItem>
                { 
                    (companies !== null) ?
                    companies.map((item, index) => (
                        <MenuItem key={item.companyId} data-obj={item.companyObjectId} value={item.companyId} data-type="0">
                            {item.companyName}
                        </MenuItem>
                    ))
                    : <MenuItem value=""><em>No data found!</em></MenuItem>
                }
                </TextField>
                : <></>
            }
            {
                <TextField type="text" sx={{width:'200px'}} defaultValue=""
                label="Branch (All)" size="small" onClick={handleSelectFilter} select>
                <MenuItem value="" data-type="1"><em>Branch (All)</em></MenuItem>
                { 
                    (branches !== null) ?
                    branches.map((item, index) => (
                        <MenuItem key={item.branchId} data-name={item.branchName} value={item.branchId} data-type="1">
                            {item.branchName}
                        </MenuItem>
                    ))
                    : <MenuItem value=""><em>No data found!</em></MenuItem>
                }
                </TextField>
            }
            {
                <TextField type="text" sx={{width:'200px'}} defaultValue=""
                label="Role (All)" size="small" onClick={handleSelectFilter} select>
                <MenuItem value="" data-type="2"><em>Role (All)</em></MenuItem>
                { 
                    (roles !== null) ?
                    roles.map((item, index) => (
                        <MenuItem key={item.userTypeId} data-name={item.userTypeName} value={item.userTypeId} data-type="2">
                            {item.userTypeName}
                        </MenuItem>
                    ))
                    : <MenuItem value=""><em>No data found!</em></MenuItem>
                }
                </TextField>
            }
        </div>
    </>
  )
}