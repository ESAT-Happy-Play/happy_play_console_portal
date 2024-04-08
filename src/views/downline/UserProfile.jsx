import React, { useEffect, useState } from 'react';
import { TextField, Button } from "@mui/material";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ReportIcon from '@mui/icons-material/Report';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ImageIcon from '@mui/icons-material/Image';
import { UserService, ImageService } from "../../services";

const UserProfile = ({objData, agentCount = null, playerCount = null, callBack, hasDownline = false}) => {
    
    const [downlineCounts, setdownlineCounts] = React.useState(null);
    const [validIdImage, setvalidIdImage] = React.useState(null);
    const [selfieImage, setselfieImage] = React.useState(null);
    const [profileImage, setprofileImage] = React.useState(null);
    const [currentAddressOpen, setcurrentAddressOpen] = React.useState(true);
    const handleCurrentAddressClick = () => {
        setcurrentAddressOpen(!currentAddressOpen);
    };

    const [permanentAddressOpen, setpermanentAddressOpen] = React.useState(false);
    const handlePermanentAddressClick = () => {
        setpermanentAddressOpen(!permanentAddressOpen);
    };

    const initDownlineCounts = (accountObjId) => {
        UserService.getDownlineCounts(accountObjId).then((res) => {
            if (res) { setdownlineCounts(res.data); }
        });
    }

    const initImages = (fileName, requestType = 0) => {
        ImageService.getImage(fileName).then((res) => {
            if(res) {
                if (requestType === 0) { setvalidIdImage(res.data) }
                if (requestType === 1) { setselfieImage(res.data) }
                if (requestType === 2) { setprofileImage(res.data) }
            }
        })
    }

    useEffect(() => {
        if(objData !== null) {
            // if(hasDownline) {
            //     initDownlineCounts(objData.accountObjectId);
            // }
            
            if(objData.profilePath !== null) {
                initImages(objData.profilePath, 2);
            }

            if(objData.frontIdPath !== null) {
                initImages(objData.frontIdPath);
            }

            if(objData.selfiePath !== null) {
                initImages(objData.selfiePath, 1);
            }
        }
    }, [objData, hasDownline]);


    return (
    <>
        {
            (objData !== null) ?
            <>
                <div>
                    <Button variant="text" onClick={callBack}><KeyboardBackspaceIcon /> Back</Button>
                </div>
                <div style={{display:'flex', justifyContent:'end', paddingRight:'15px', cursor:'pointer'}}>
                    <p style={{display:'flex', gap:'10px'}}>
                        <b>Report</b> <ReportIcon style={{fontSize:'15px', marginTop:'3px'}} />
                    </p>
                </div>
                <div className='divinfoProfile' style={{marginTop:'-55px'}}>
                    <div className='divImgInfo'>
                        {
                            (profileImage !== null) ? <img src={profileImage} alt="img" />
                            : <ImageIcon sx={{fontSize:'130px'}} />
                        }
                        <div>
                            <p>
                                <b style={{fontSize:'18px'}}>{ objData.fullname }</b>
                            </p>
                            <p>
                                <span>{ objData.mobileNumber }</span>
                            </p>
                            <p>
                                <b>Status</b> &nbsp;&nbsp;
                                <span style={{color:'green'}}>Active</span>
                            </p>
                            <p>
                                <span>Last Activit</span> &nbsp;&nbsp;
                                <span style={{fontStyle:'italic'}}>2 hr ago</span>
                            </p>
                        </div>
                    </div>

                    {
                        (hasDownline) ?
                            <div className='divAgentInfo'>
                                <div className='divCounts'>
                                    <p style={{fontSize:'25px', color:'#4845d2'}}>
                                        {(agentCount !== null) ? agentCount : 0 }
                                    </p>
                                    <p>No. of Agents</p>
                                </div>
                                <div className='divCounts'>
                                    <p style={{fontSize:'25px', color:'#4845d2'}}>
                                        {(playerCount !== null) ? playerCount : 0 }
                                    </p>
                                    <p>No. of Players</p>
                                </div>
                            </div>
                        : <></>
                    }
                </div>
            
                <div className='divuserprofile'>
                    <div className='infoContent'>
                        <div className='infoHead'>
                            <h4>Personal Info</h4>
                        </div>
                        <div className='divDetails'>
                            <div className='divInput'>
                                <label>First Name</label>
                                <TextField disabled size='small' defaultValue={ objData.firstName } fullWidth />
                            </div>

                            <div className='divInput'>
                                <label>Middle Name</label>
                                <TextField disabled size='small' defaultValue={ objData.middleName } fullWidth />
                            </div>

                            <div className='divInput'>
                                <label>Last Name</label>
                                <TextField disabled size='small' defaultValue={ objData.lastName } fullWidth />
                            </div>

                            <div className='divInput'>
                                <label>Birthday</label>
                                <TextField disabled size='small' defaultValue={ objData.birthDate } fullWidth />
                            </div>

                            <div className='divInput'>
                                <label>Nationality</label>
                                <TextField disabled size='small' defaultValue={ objData.nationality } fullWidth />
                            </div>
                        </div>
                    </div>
                    <div className='infoContent'>
                        <div className='infoHead'>
                            <h4>Address</h4>
                        </div>
                        <div className='divDetails'>
                            <div className='divInput'>
                                <label>Place Of Birth</label>
                                <TextField disabled size='small' defaultValue={ objData.placeOfBirth } fullWidth />
                            </div>

                            <List component="nav">
                                <ListItemButton onClick={handleCurrentAddressClick}
                                style={{display:'flex', justifyContent:'space-between', padding:'0px'}}>
                                    <ListItemText primary="Current Address" />
                                    {currentAddressOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={currentAddressOpen} timeout="auto">
                                    <List component="div">
                                        <div className='divInputDrp' style={{marginTop:'15px'}}>
                                            <div>
                                                <label>Region</label>
                                                <TextField disabled size='small' defaultValue={ objData.presentRegion } fullWidth />
                                            </div>

                                            <div>
                                                <label>Province</label>
                                                <TextField disabled size='small' defaultValue={ objData.presentProvince } fullWidth />
                                            </div>
                                        </div>
                                        <div className='divInputDrp'>
                                            <div>
                                                <label>Municipality</label>
                                                <TextField disabled size='small' defaultValue={ objData.presentMunicipality } fullWidth />
                                            </div>

                                            <div>
                                                <label>Barangay</label>
                                                <TextField disabled size='small' defaultValue={ objData.presentBarangay } fullWidth />
                                            </div>
                                        </div>
                                        <div className='divInputDrp'>
                                            <div>
                                                <label>Street/Sitio</label>
                                                <TextField disabled size='small' defaultValue={ objData.presentStreetOrPurok } fullWidth />
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
                                        <div className='divInputDrp' style={{marginTop:'15px'}}>
                                            <div>
                                                <label>Region</label>
                                                <TextField disabled size='small' defaultValue={objData.permanentRegion} fullWidth />
                                            </div>

                                            <div>
                                                <label>Province</label>
                                                <TextField disabled size='small' defaultValue={objData.permanentProvince} fullWidth />
                                            </div>
                                        </div>
                                        <div className='divInputDrp'>
                                            <div>
                                                <label>Municipality</label>
                                                <TextField disabled size='small' defaultValue={objData.permanentMunicipality} fullWidth />
                                            </div>

                                            <div>
                                                <label>Barangay</label>
                                                <TextField disabled size='small' defaultValue={objData.permanentBarangay} fullWidth />
                                            </div>
                                        </div>
                                        <div className='divInputDrp'>
                                            <div>
                                                <label>Street/Sitio</label>
                                                <TextField disabled size='small' defaultValue={objData.permanentStreetOrPurok} fullWidth />
                                            </div>
                                        </div>
                                    </List>
                                </Collapse>
                            </List>
                            <div className='divInput'>
                                <label>Game Site</label>
                                <TextField disabled size='small' defaultValue={objData.branch} fullWidth />
                            </div>
                        </div>
                    </div>
                    <div className='infoContent'>
                        <div className='infoHead'>
                            <h4>Proof</h4>
                        </div>
                        <div className='divDetails'>
                            <div className='divInput'>
                                <label>Source Of Income</label>
                                <TextField disabled size='small' defaultValue={objData.sourceOfIncome} fullWidth />
                            </div>
                            <div className='divInput'>
                                <label>Nature of Work</label>
                                <TextField disabled size='small' defaultValue={objData.natureOfWork} fullWidth />
                            </div>
                            <div className='divInput'>
                                <label>Type of ID</label>
                                <TextField disabled size='small' defaultValue={objData.validId} fullWidth />
                            </div>
                            <div className='divInput'>
                                <p>Front ID Picture</p>
                                {
                                    (validIdImage !== null) ? <img src={validIdImage} style={{width:'100%', borderRadius:'25px'}} alt="frontId" />
                                    : <ImageIcon sx={{fontSize:'130px'}} />
                                }
                            </div>
                            <div className='divInput'>
                                <p>Selfie</p>
                                {
                                    (selfieImage !== null) ? <img src={selfieImage} style={{width:'100%', borderRadius:'25px'}} alt="selfie" />
                                    : <ImageIcon sx={{fontSize:'130px'}} />
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
            : <></>
        }
    </>
  )
}

export default UserProfile
