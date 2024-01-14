import "./profileInfo.scss"

import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import FilterIcon from '@mui/icons-material/Filter';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const ProfileInfo = () => {
  const [isSamePoB, setisSamePoB] = React.useState(false);
  const [isSamePresent, setisSamePresent] = React.useState(false);
  const [birthPlaceOpen, setbirthPlaceOpen] = React.useState(false);
  const handleBirthPlaceClick = () => {
    setbirthPlaceOpen(!birthPlaceOpen);
  };

  const [presentAddrOpen, setpresentAddrOpen] = React.useState(false);
  const handlePresentClick = () => {
    setpresentAddrOpen(!presentAddrOpen);
  };
  
  const [permanentAddrOpen, setpermanentAddrOpen] = React.useState(false);
  const handlePermanentClick = () => {
    setpermanentAddrOpen(!permanentAddrOpen);
  };

  const [validIdOpen, setvalidIdOpen] = React.useState(false);
  const handleValidIDClick = () => {
    setvalidIdOpen(!validIdOpen);
  };

  const [signatureOpen, setsignatureOpen] = React.useState(false);
  const handleSignatureClick = () => {
    setsignatureOpen(!signatureOpen);
  };

  const [profileImageOpen, setprofileImageOpen] = React.useState(false);
  const handleProfileImageClick = () => {
    setprofileImageOpen(!profileImageOpen);
  };
  return (
    <div className="divprofile">
      <div className="divleft">
        <br />
        <img src={`${process.env.PUBLIC_URL}/empty.jpg`} alt="img" className='avatar' />
        <div className="leftInfo">
          <h2>Ussop One</h2>
          <p>Refferal Code <b>0992888</b></p>
          <p>User ID <b>00000000000001</b></p>
          <div>
            <Button className="btn-verfied" variant="contained" size="large">
              SEMI-VERIFIED <span>(Click to get verified)</span>
            </Button>
            <span style={{fontSize:'13px',color:'#7b7d7e'}}>Click to request full verification</span>
          </div>
        </div>
        <br />
      </div>
      <div className="divright">
        <div className="div-r-content">
          <div className="div-cont">
            <p>First Name</p>
            <TextField label="Enter first name" defaultValue="" variant="outlined" size="small" fullWidth />
          </div>
          <div className="div-cont">
            <p>Middle Name</p>
            <TextField label="Enter middle name" defaultValue="" variant="outlined" size="small" fullWidth />
          </div>
          <div className="div-cont">
            <p>Last Name</p>
            <TextField label="Enter last name" defaultValue="" variant="outlined" size="small" fullWidth />
          </div>
          <div className="div-cont">
            <p>Mobile Number</p>
            <TextField label="" disabled defaultValue="" variant="outlined" size="small" fullWidth />
          </div>
          <div className="div-cont">
            <p>Gender</p>
            <FormControl style={{marginLeft:'-55px'}}>
              <RadioGroup row style={{width:'185px'}}>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
          </div>

          <br/>
          <br />
          <div className="div-cont">
            <List component="nav">
              <ListItemButton onClick={handleBirthPlaceClick}>
                <ListItemText primary="Place Of Birth" />
                {birthPlaceOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={birthPlaceOpen} timeout="auto" unmountOnExit>
                <List component="div" style={{ paddingLeft: '15px', textAlign:'left'}}>
                  <div className="div-cont" style={{padding:'0 15px 0 0px'}}>
                    <p>Mobile Number</p>
                    <TextField label="" disabled defaultValue="" variant="outlined" size="small" fullWidth />
                  </div>
                </List>
              </Collapse>
            </List>
          </div>
          
          <div className="div-cont">
            <FormControlLabel
            control={
              <Checkbox defaultValue={isSamePoB}/>
            } label={
              <div style={{fontSize:'14px'}}><span>Place Of Birth Same with Present Address</span></div>
            } />
          </div>

          <div className="div-cont">
            <List component="nav">
              <ListItemButton onClick={handlePresentClick}>
                <ListItemText primary="Present Address" />
                {presentAddrOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={presentAddrOpen} timeout="auto" unmountOnExit>
                <List component="div" style={{ paddingLeft: '15px', textAlign:'left'}}>
                  <div className="div-cont" style={{padding:'0 15px 0 0px'}}>
                    <p>Mobile Number</p>
                    <TextField label="" disabled defaultValue="" variant="outlined" size="small" fullWidth />
                  </div>
                </List>
              </Collapse>
            </List>
          </div>

          <div className="div-cont">
            <FormControlLabel
            control={
              <Checkbox defaultValue={isSamePresent}/>
            } label={
              <div style={{fontSize:'14px'}}><span>Present Address Same with Permanent Address</span></div>
            } />
          </div>

          <div className="div-cont">
            <List component="nav">
              <ListItemButton onClick={handlePermanentClick}>
                <ListItemText primary="Permanent Address" />
                {permanentAddrOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={permanentAddrOpen} timeout="auto" unmountOnExit>
                <List component="div" style={{ paddingLeft: '15px', textAlign:'left'}}>
                  <div className="div-cont" style={{padding:'0 15px 0 0px'}}>
                    <p>Mobile Number</p>
                    <TextField label="" disabled defaultValue="" variant="outlined" size="small" fullWidth />
                  </div>
                </List>
              </Collapse>
            </List>
          </div>

        </div>
        <div className="div-r-content">
          <div className="div-cont">
            <p>Civil Status</p>
            <TextField label="Enter first name" defaultValue="" variant="outlined" size="small" fullWidth />
          </div>
          <div className="div-cont">
            <p>Birthdate</p>
            <TextField label="Enter first name" defaultValue="" variant="outlined" size="small" fullWidth />
          </div>
          <div className="div-cont">
            <p>Blood Type</p>
            <TextField label="Enter first name" defaultValue="" variant="outlined" size="small" fullWidth />
          </div>
          <div className="div-cont">
            <p>Nature of Work</p>
            <TextField label="Enter first name" defaultValue="" variant="outlined" size="small" fullWidth />
          </div>
          <div className="div-cont">
            <p>Source of Income</p>
            <TextField label="Enter first name" defaultValue="" variant="outlined" size="small" fullWidth />
          </div>

          <br />
          <div className="div-cont">
            <List component="nav" style={{marginTop:'10px'}}>
              <ListItemButton onClick={handleValidIDClick}>
                <ListItemText primary="Valid ID" />
                {validIdOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={validIdOpen} timeout="auto" unmountOnExit>
                <List component="div" style={{ paddingLeft: '15px', textAlign:'left'}}>
                  <div className="div-cont" style={{padding:'0 15px 0 0px'}}>
                    <p>Mobile Number</p>
                    <TextField label="" disabled defaultValue="" variant="outlined" size="small" fullWidth />
                  </div>
                </List>
              </Collapse>
            </List>
          </div>

          <div className="div-cont">
            <List component="nav" style={{marginTop:'10px'}}>
              <ListItemButton onClick={handleSignatureClick}>
                <ListItemText primary="Signature" />
                {signatureOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={signatureOpen} timeout="auto" unmountOnExit>
                <List component="div" style={{ paddingLeft: '15px', textAlign:'left'}}>
                  <div className="div-cont" style={{padding:'0 15px 0 0px'}}>
                    <p>Mobile Number</p>
                    <TextField label="" disabled defaultValue="" variant="outlined" size="small" fullWidth />
                  </div>
                </List>
              </Collapse>
            </List>
          </div>

          <div className="div-cont">
            <List component="nav" style={{marginTop:'10px'}}>
              <ListItemButton onClick={handleProfileImageClick}>
                <ListItemText primary="Profile Image / Selfie" />
                {profileImageOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={profileImageOpen} timeout="auto" unmountOnExit>
                <List component="div" style={{ paddingLeft: '15px', textAlign:'left'}}>
                  <div className="div-cont" style={{padding:'0 15px 0 0px'}}>
                    <p>Mobile Number</p>
                    <TextField label="" disabled defaultValue="" variant="outlined" size="small" fullWidth />
                  </div>
                </List>
              </Collapse>
            </List>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
