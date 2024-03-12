import "./sysusers.scss";
import React from 'react';
import { TextField, MenuItem  } from "@mui/material";

export const SystemUserFilter = ({companies}) => {
    return (
      <>
        <div style={{display:'flex', gap:'15px'}}>
            {
            (companies !== null) ?
                <TextField type="text" sx={{width:'200px'}} defaultValue=""
                label="Company (All)" size="small" select>
                <MenuItem value=""><em>Company All</em></MenuItem>
                { 
                    (companies.length > 0) ?
                    companies.map((item, index) => (
                        <MenuItem key={item.companyId} data-obj={item.companyObjectId} value={item.companyId}>
                            {item.companyName}
                        </MenuItem>
                    ))
                    : <MenuItem value=""><em>No data found!</em></MenuItem>
                }
                </TextField>
                : <></>
            }
            {
            (companies !== null) ?
                <TextField type="text" sx={{width:'200px'}} defaultValue=""
                label="Branch (All)" size="small" select>
                <MenuItem value=""><em>Branch (All)</em></MenuItem>
                { 
                    (companies.length > 0) ?
                    companies.map((item, index) => (
                        <MenuItem key={item.companyId} data-obj={item.companyObjectId} value={item.companyId}>
                            {item.companyName}
                        </MenuItem>
                    ))
                    : <MenuItem value=""><em>No data found!</em></MenuItem>
                }
                </TextField>
                : <></>
            }
            {
            (companies !== null) ?
                <TextField type="text" sx={{width:'200px'}} defaultValue=""
                label="Role (All)" size="small" select>
                <MenuItem value=""><em>Role (All)</em></MenuItem>
                { 
                    (companies.length > 0) ?
                    companies.map((item, index) => (
                        <MenuItem key={item.companyId} data-obj={item.companyObjectId} value={item.companyId}>
                            {item.companyName}
                        </MenuItem>
                    ))
                    : <MenuItem value=""><em>No data found!</em></MenuItem>
                }
                </TextField>
                : <></>
            }
        </div>
    </>
  )
}