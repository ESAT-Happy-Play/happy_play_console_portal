import React from 'react';
import { TextField } from "@mui/material";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';

const UserDetails = ({objData, selfieImage, validIdImage}) => {
    const [currentAddressOpen, setcurrentAddressOpen] = React.useState(true);
    const handleCurrentAddressClick = () => {
        setcurrentAddressOpen(!currentAddressOpen);
    };

    const [permanentAddressOpen, setpermanentAddressOpen] = React.useState(false);
    const handlePermanentAddressClick = () => {
        setpermanentAddressOpen(!permanentAddressOpen);
    };

  return (
    <div>
        {
            (objData !== null)
            ? <form noValidate>
                <div>
                    <label>First Name</label>
                    <TextField defaultValue={objData.firstName} size='small' fullWidth />
                </div>

                <div>
                    <label>Middle Name</label>
                    <TextField defaultValue={objData.middleName} size='small' fullWidth />
                </div>

                <div>
                    <label>Last Name</label>
                    <TextField defaultValue={objData.lastName} size='small' fullWidth />
                </div>

                <div>
                    <label>Birthday</label>
                    <TextField defaultValue={objData.birthDate} size='small' fullWidth />
                </div>

                <div>
                    <label>Nationality</label>
                    <TextField defaultValue={objData.nationality} size='small' fullWidth />
                </div>
                <br/>
                <div>
                    <label>Place Of Birth</label>
                    <TextField defaultValue={objData.placeOfBirth} size='small' fullWidth />
                </div>
                <br/>
                
                <List component="nav">
                    <ListItemButton onClick={handleCurrentAddressClick}
                    style={{display:'flex', justifyContent:'space-between', padding:'0px'}}>
                        <ListItemText primary="Current Address" />
                        {currentAddressOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={currentAddressOpen} timeout="auto">
                        <List component="div">
                            <div style={{display:'flex', gap:'5px'}}>
                                <div>
                                    <label>Region</label>
                                    <TextField defaultValue={objData.presentRegion} size='small' fullWidth />
                                </div>

                                <div>
                                    <label>Province</label>
                                    <TextField defaultValue={objData.presentProvince} size='small' fullWidth />
                                </div>
                            </div>
                            <div style={{display:'flex', gap:'5px'}}>
                                <div>
                                    <label>Municipality</label>
                                    <TextField defaultValue={objData.presentMunicipality} size='small' fullWidth />
                                </div>

                                <div>
                                    <label>Barangay</label>
                                    <TextField defaultValue={objData.presentBarangay} size='small' fullWidth />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label>Street/Sitio</label>
                                    <TextField defaultValue={objData.presentStreetOrPurok} size='small' fullWidth />
                                </div>
                            </div>
                        </List>
                    </Collapse>
                </List>

                <List component="nav">
                    <ListItemButton onClick={handlePermanentAddressClick}
                    style={{display:'flex', justifyContent:'space-between', padding:'0px'}}>
                        <ListItemText primary="Permanent Address" />
                        {permanentAddressOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={permanentAddressOpen} timeout="auto">
                        <List component="div">
                            <div style={{display:'flex', gap:'5px'}}>
                                <div>
                                    <label>Region</label>
                                    <TextField defaultValue={objData.permanentRegion} size='small' fullWidth />
                                </div>

                                <div>
                                    <label>Province</label>
                                    <TextField defaultValue={objData.permanentProvince} size='small' fullWidth />
                                </div>
                            </div>
                            <div style={{display:'flex', gap:'5px'}}>
                                <div>
                                    <label>Municipality</label>
                                    <TextField defaultValue={objData.permanentMunicipality} size='small' fullWidth />
                                </div>

                                <div>
                                    <label>Barangay</label>
                                    <TextField defaultValue={objData.permanentBarangay} size='small' fullWidth />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label>Street/Sitio</label>
                                    <TextField defaultValue={objData.permanentStreetOrPurok} size='small' fullWidth />
                                </div>
                            </div>
                        </List>
                    </Collapse>
                </List>

                <br/>
                <div>
                    <label>Game Site</label>
                    <TextField defaultValue={objData.branch} size='small' fullWidth />
                </div>
                <div>
                    <label>Source Of Income</label>
                    <TextField defaultValue={objData.sourceOfIncome} size='small' fullWidth />
                </div>
                <div>
                    <label>Nature of Work</label>
                    <TextField defaultValue={objData.natureOfWork} size='small' fullWidth />
                </div>
                <div>
                    <label>Type of ID</label>
                    <TextField defaultValue={objData.firstName} size='small' fullWidth />
                </div>
                <div className='divInput'>
                    <p>Front ID Picture</p>
                    {
                        (validIdImage !== null && validIdImage !== undefined) ? <img src={validIdImage} style={{width:'100%', borderRadius:'25px'}} alt="frontId" />
                        : <ImageIcon sx={{fontSize:'130px'}} />
                    }
                </div>
                <div className='divInput'>
                    <p>Selfie</p>
                    {
                        (selfieImage !== null && selfieImage !== undefined) ? <img src={selfieImage} style={{width:'100%', borderRadius:'25px'}} alt="selfie" />
                        : <ImageIcon sx={{fontSize:'130px'}} />
                    }
                    
                </div>
            </form>
            :<div>Loading... Please wait.</div>
        }
    </div>
  )
}

export default UserDetails
