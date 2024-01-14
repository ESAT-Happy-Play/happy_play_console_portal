import "./profileInfo.scss"

import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem } from "@mui/material";
import Link from '@mui/material/Link';

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
import { GETFetch } from "../../../api/ApiFetchBuilder";
import PageLoader from "../../../components/widget/PageLoader";
import DefaultAddressWithData from "../../../components/widget/address/DefaultAddressWithData";

import { GetStoreObject } from "../../../helper/Helpers";

const ProfileInfo = () => {
  let loginObj = GetStoreObject("auth");
  const [pageLoader, setPageLoader] = useState(false);

  const [birthPlaceOpen, setbirthPlaceOpen] = React.useState(true);
  const [userdata, setuserdata] = useState(null);

  const handleCurrentUserData = async () => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_API_URL}/users/currentuserdata`;
    let response = await GETFetch(url);
    setPageLoader(false);
    if(response.status) {
      setuserdata(response.data.loggedInUserData);
      console.log(response.data.loggedInUserData)
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    handleCurrentUserData();
  }, []);

  const handleBirthPlaceClick = () => {
    setbirthPlaceOpen(!birthPlaceOpen);
  };

  const [presentAddrOpen, setpresentAddrOpen] = React.useState(true);
  const handlePresentClick = () => {
    setpresentAddrOpen(!presentAddrOpen);
  };
  
  const [permanentAddrOpen, setpermanentAddrOpen] = React.useState(true);
  const handlePermanentClick = () => {
    setpermanentAddrOpen(!permanentAddrOpen);
  };

  const [validIdOpen, setvalidIdOpen] = React.useState(true);
  const handleValidIDClick = () => {
    setvalidIdOpen(!validIdOpen);
  };

  const [signatureOpen, setsignatureOpen] = React.useState(true);
  const handleSignatureClick = () => {
    setsignatureOpen(!signatureOpen);
  };

  const [profileImageOpen, setprofileImageOpen] = React.useState(true);
  const handleProfileImageClick = () => {
    setprofileImageOpen(!profileImageOpen);
  };
  return (
    <div className="divprofile">
      <div className="divleft">
        <br />
        <img src={`${process.env.PUBLIC_URL}/empty.jpg`} alt="img" className='avatar' />
        <div className="leftInfo">
          <h2>{(userdata !== null) ? userdata.fullname: "..."}</h2>
          {
            (loginObj.userCode !== '0101') ?
            <p>Refferal Code <b>{(userdata !== null) ? userdata.referralCode : "..."}</b></p>
            : <></>
          }
          <p>User ID <b>{(userdata !== null) ? userdata.userId : "..."}</b></p>

          {
            (loginObj.userCode === '0101') ? <></>
            : (loginObj.userCode === '0102') ? <></>
            :
            <div>
              <Button style={{marginRight:'65px'}} component={Link} href={`/profile/info/getverified`} className="btn-verfied" variant="contained" size="large">
                  SEMI-VERIFIED <span>(Click to get verified)</span>
              </Button>
              <span style={{fontSize:'13px',color:'#7b7d7e'}}>Click to request full verification</span>
            </div>
          }
          
        </div>
        <br />
      </div>
      <div className="divright">
        <div className="div-r-content">
          <div className="div-cont">
            <p>First Name</p>
            {
              (userdata !== null) ? <TextField disabled defaultValue={userdata.firstname} variant="outlined" size="small" fullWidth /> : "..."
            }
          </div>
          <div className="div-cont">
            <p>Middle Name</p>
            {
              (userdata !== null) ? <TextField disabled defaultValue={userdata.middlename} variant="outlined" size="small" fullWidth /> : "..."
            }
          </div>
          <div className="div-cont">
            <p>Last Name</p>
            {
              (userdata !== null) ? <TextField disabled defaultValue={userdata.lastname} variant="outlined" size="small" fullWidth /> : "..."
            }
          </div>
          <div className="div-cont">
            <p>Mobile Number</p>
            {
              (userdata !== null) ? <TextField disabled defaultValue={userdata.mobileNumber} variant="outlined" size="small" fullWidth /> : "..."
            }
          </div>
          <div className="div-cont">
            <p>Gender</p>
            {
              (userdata !== null) ? 
                <FormControl style={{marginLeft:'-55px'}}>
                  <RadioGroup row style={{width:'185px'}}>
                    <FormControlLabel value="male" checked={(userdata.sex === 0) ? true : false } control={<Radio />} label="Male" />
                    <FormControlLabel value="female" checked={(userdata.sex === 1) ? true : false } control={<Radio />} label="Female" />
                  </RadioGroup>
                </FormControl>
              : "..."
            }
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
                <List component="div" style={{ paddingLeft: '15px', textAlign:'left', marginRight:'10px'}}>
                  
                  <DefaultAddressWithData />

                </List>
              </Collapse>
            </List>
          </div>
          
          {/* <div className="div-cont">
            <FormControlLabel
            control={
              <Checkbox defaultValue={isSamePoB}/>
            } label={
              <div style={{fontSize:'14px'}}><span>Place Of Birth Same with Present Address</span></div>
            } />
          </div> */}

          <div className="div-cont">
            <List component="nav">
              <ListItemButton onClick={handlePresentClick}>
                <ListItemText primary="Present Address" />
                {presentAddrOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={presentAddrOpen} timeout="auto" unmountOnExit>
                <List component="div" style={{ paddingLeft: '15px', textAlign:'left', marginRight:'10px'}}>
                  
                  <DefaultAddressWithData />

                </List>
              </Collapse>
            </List>
          </div>

          {/* <div className="div-cont">
            <FormControlLabel
            control={
              <Checkbox defaultValue={isSamePresent}/>
            } label={
              <div style={{fontSize:'14px'}}><span>Present Address Same with Permanent Address</span></div>
            } />
          </div> */}

          <div className="div-cont">
            <List component="nav">
              <ListItemButton onClick={handlePermanentClick}>
                <ListItemText primary="Permanent Address" />
                {permanentAddrOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={permanentAddrOpen} timeout="auto" unmountOnExit>
                <List component="div" style={{ paddingLeft: '15px', textAlign:'left', marginRight:'10px'}}>
                  
                  <DefaultAddressWithData />

                </List>
              </Collapse>
            </List>
          </div>

        </div>
        <div className="div-r-content">
          <div className="div-cont">
            <p>Civil Status</p>
            <TextField disabled defaultValue="Single" variant="outlined" size="small" fullWidth />
          </div>
          <div className="div-cont">
            <p>Birthdate</p>
            <TextField disabled type="date" defaultValue="1990-02-02" variant="outlined" size="small" fullWidth />
          </div>
          <div className="div-cont">
            <p>Blood Type</p>
            <TextField disabled defaultValue="A+" variant="outlined" size="small" fullWidth />
          </div>
          <div className="div-cont">
            <p>Nature of Work</p>
            <TextField disabled defaultValue="Infomation Technology" variant="outlined" size="small" fullWidth />
          </div>
          <div className="div-cont">
            <p>Source of Income</p>
            <TextField disabled defaultValue="Employee" variant="outlined" size="small" fullWidth />
          </div>

          <br />
          <div className="div-cont">
            <List component="nav" style={{marginTop:'10px'}}>
              <ListItemButton onClick={handleValidIDClick}>
                <ListItemText primary="Valid ID" />
                {validIdOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={validIdOpen} timeout="auto" unmountOnExit>
                <List component="div" style={{ paddingLeft: '15px', textAlign:'left', marginRight:'25px'}}>
                  <div style={{display:'flex',gap:'5px',justifyContent:'center'}}>
                    <div style={{width:'100%'}}>
                      <div className="div-imgUpload">
                          <img className="imgFiles" src={`${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                      </div>
                    </div>
                    <div style={{width:'100%'}}>
                        <div className="div-imgUpload">
                            <img className="imgFiles" src={`${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                        </div>
                    </div>
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
                <List component="div" style={{ paddingLeft: '15px', textAlign:'left', marginRight:'25px'}}>
                  <div style={{display:'flex',gap:'5px',justifyContent:'center'}}>
                    <div style={{width:'250px'}}>
                      <div className="div-imgUpload">
                          <img className="imgFiles" src={`${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                      </div>
                    </div>
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
                <List component="div" style={{ paddingLeft: '15px', textAlign:'left', marginRight:'25px'}}>
                  <div style={{display:'flex',gap:'5px',justifyContent:'center'}}>
                    <div style={{width:'100%'}}>
                      <div className="div-imgUpload">
                          <img className="imgFiles" src={`${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                      </div>
                    </div>
                    <div style={{width:'100%'}}>
                        <div className="div-imgUpload">
                            <img className="imgFiles" src={`${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                        </div>
                    </div>
                  </div>
                </List>
              </Collapse>
            </List>
          </div>

        </div>
      </div>
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default ProfileInfo
