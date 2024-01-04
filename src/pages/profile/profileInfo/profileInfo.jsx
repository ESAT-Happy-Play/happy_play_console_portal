import "./profileInfo.scss"

import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem } from "@mui/material";
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import FilterIcon from '@mui/icons-material/Filter';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Switch from '@mui/material/Switch';
import { useForm } from 'react-hook-form';

import PageLoader from "../../../components/widget/PageLoader";
import { GetStoreObject, FormatDate } from "../../../helper/Helpers";
import { IDTypes, BloodTypes } from "../../../helper/Enums";
import { UserModel } from "../../../model/UserModel";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddressWidget from "../../../components/widget/AddressWidget";
import PermanentAddressWidget from "../../../components/widget/PermanentAddressWidget";

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
  let authdata = GetStoreObject("auth");

  // From database
  const [displayProfImg, setDisplayProfImg] = useState(null);
  const [displayFrontID, setDisplayFrontID] = useState(null);
  const [displayBackId, setDisplayBackId] = useState(null);
  const [displaySignature, setDisplaySignature] = useState(null);

  // newly upload
  const [displayNewProfImg, setDisplayNewProfImg] = useState(null);
  const [displayNewFrontID, setDisplayNewFrontID] = useState(null);
  const [displayNewBackId, setDisplayNewBackId] = useState(null);
  const [displayNewSignature, setDisplayNewSignature] = useState(null);

  const [govId, setGovId] = useState(null);

  const formAccountInfo = useForm({ defaultValues: UserModel.UpdateAccountInfoForm });
  const { register, handleSubmit, formState, reset } = formAccountInfo;
  const { errors } = formState;

  const [isEdit, setIsEdit] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [userInfo, setUserInfo] = React.useState(null);

  const [userData, setUserData] = React.useState(undefined);

  const handleFormSubmit = async (data) => {
    console.log("Submitted");
  }

  const handleUploadProfile = async (e, image) => {
    console.log(image);
  }

  const handleUploadFrontID = async (e, image) => {
    console.log(image);
  }

  const handleUploadBackID = async (e, image) => {
    console.log(image);
  }

  const handleUploadSignature = async (e, image) => {
    console.log(image);
  }

  const handleSelectId = (e, value) => {
    setGovId(value);
  }

  const [presentAddressOpen, setPresentAddressOpen] = React.useState(false);
  const handlePresentAddressClick = () => {
    setPresentAddressOpen(!presentAddressOpen);
  };
  const [permanentAddressOpen, setpermanentAddressOpen] = React.useState(false);
  const handlePermanentAddressClick = () => {
    setpermanentAddressOpen(!permanentAddressOpen);
  };

  return (
    <div className='content'>
      <div className="container">
        <div className="top" style={{borderBottom:'2px solid rgb(239, 239, 239)'}}>
          <h2 className="title">PROFILE INFORMATION</h2>
          <div>
            <b>Edit</b>
            <Switch onClick={e => setIsEdit(!isEdit) } />
          </div>
        </div>

        <form onSubmit={ handleSubmit(handleFormSubmit) } noValidate>
          <div className='divProfileInfo'>
            <div className="row">
              <div className="col-4">
                <div className="form-block">
                  <label>First Name</label>
                  <TextField disabled={!isEdit} variant="outlined" placeholder="Enter Firstname"
                    { 
                        ...register("firstName",  { required: "FirstName is required" } ) 
                    }
                    error={ !!errors.firstName }
                    helperText={ errors.firstName?.message } size="small" fullWidth />
                </div>
              </div>
              <div className="col-4">
                <div className="form-block">
                  <label>Middle Name</label>
                  <TextField disabled={!isEdit} placeholder="Enter Middlename"
                    { 
                        ...register("middleName",  { required: "Middlename is required" } ) 
                    }
                    error={ !!errors.middleName }
                    helperText={ errors.middleName?.message } variant="outlined" size="small" fullWidth />
                </div>
              </div>
              <div className="col-4">
                <label>Last Name</label>
                <TextField disabled={!isEdit} placeholder="Enter Lastname"
                    { 
                        ...register("lastName",  { required: "Lastname is required" } ) 
                    }
                    error={ !!errors.lastName }
                    helperText={ errors.lastName?.message } variant="outlined" size="small" fullWidth />
              </div>
              {/* <div className="col-3">
                <div className="form-block">
                  <label>Suffix</label>
                  <TextField disabled={!isEdit} variant="outlined" size="small" />
                </div>
              </div> */}
            </div>

            <div className="row">
              <div className="col-3">
                <div className="form-block">
                  <label>Birthdate (mm/dd/yyyy)</label>
                  <TextField disabled={!isEdit} type="date" placeholder="Enter Birthdate"
                    { 
                        ...register("birthDate",  { required: "Birthdate is required" } ) 
                    }
                    error={ !!errors.birthDate }
                    helperText={ errors.birthDate?.message } variant="outlined" size="small" fullWidth />
                </div>
              </div>
              <div className="col-3">
                <div className="form-block">
                  <label>Email</label>
                  <TextField disabled={!isEdit} placeholder="Enter Email"
                    { 
                        ...register("email",  { 
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Entered value does not match email format"
                        } 
                      } ) 
                    }
                    error={ !!errors.email }
                    helperText={ errors.email?.message } variant="outlined" size="small" fullWidth />
                </div>
              </div>
              <div className="col-6">
                <div className="row" style={{ marginBottom: "0px"}}>
                    <div className="col-6" style={{ paddingTop: "0px"}}>
                      <div className="form-block">
                        <label>Sex</label>
                        {
                          (userData !== undefined) ? 
                          <TextField disabled={!isEdit} placeholder="Select Gender"
                            { 
                                ...register("gender",  { required: "Gender is required" } ) 
                            }
                            error={ !!errors.gender }
                            helperText={ errors.gender?.message } defaultValue={(userData !== undefined) ? userData.gender : ''} variant="outlined" size="small" select fullWidth>
                            <MenuItem value=''><em>Select gender</em></MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                          </TextField>
                          : <TextField defaultValue="" variant="outlined" size="small" fullWidth />
                        }
                        
                      </div>
                    </div>
                    <div className="col-6" style={{ paddingTop: "0px"}}>
                      <div className="form-block">
                        <label>Age</label>
                        <TextField disabled placeholder="Enter Age"
                          { 
                              ...register("age",  { required: "Age is required" } ) 
                          }
                          error={ !!errors.age }
                          helperText={ errors.age?.message } value={(userData !== undefined) ? userData.age : ''} variant="outlined" size="small" fullWidth />
                      </div>
                    </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-3">
                <div className="form-block">
                  <label>Nature of Work</label>
                  <TextField disabled={!isEdit} placeholder="Select Nature of Work"
                    { 
                        ...register("natureOfWork",  { required: "Nature of Work is required" } ) 
                    }
                    error={ !!errors.natureOfWork }
                    helperText={ errors.natureOfWork?.message } variant="outlined" size="small" fullWidth />
                </div>
              </div>
              <div className="col-3">
                <div className="form-block">
                  <label>Source of Income</label>
                  <TextField disabled={!isEdit} placeholder="Select Source of Income"
                    { 
                        ...register("sourceOfIncome",  { required: "Source of Income is required" } ) 
                    }
                    error={ !!errors.sourceOfIncome }
                    helperText={ errors.sourceOfIncome?.message } variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="col-6">
                <div className="row" style={{ marginBottom: "0px"}}>
                    <div className="col-6" style={{ paddingTop: "0px"}}>
                      <div className="form-block">
                        <label>Marital Status</label>
                        {
                          (userData !== undefined) ? 
                          <TextField disabled={!isEdit} placeholder="Select marital status"
                            { 
                                ...register("martialStatus",  { required: "Marital status is required" } ) 
                            }
                            error={ !!errors.martialStatus }
                            helperText={ errors.martialStatus?.message } defaultValue={(userData !== undefined) ? userData.martialStatus : ''} variant="outlined" size="small" select fullWidth>
                            <MenuItem value=''><em>Select status</em></MenuItem>
                            <MenuItem value="Single">Single</MenuItem>
                            <MenuItem value="Married">Married</MenuItem>
                          </TextField>
                          : <TextField defaultValue="" variant="outlined" size="small" fullWidth />
                        }
                        
                      </div>
                    </div>
                    <div className="col-6" style={{ paddingTop: "0px"}}>
                      <div className="form-block">
                        <label>Blood Type</label>
                        {
                          (userData !== undefined) ? 
                          <TextField disabled={!isEdit} placeholder="Select Blood Type"
                            { 
                                ...register("bloodType",  { required: "Blood Type is required" } ) 
                            }
                            error={ !!errors.bloodType }
                            helperText={ errors.bloodType?.message } 
                            defaultValue={(userData !== undefined) ? (userData.bloodType !== null) ? userData.bloodType : ''  : ''} variant="outlined" size="small" select fullWidth>
                            <MenuItem value=""><em>Select Blood Type</em></MenuItem>
                              { 
                                  BloodTypes().map((item) => (
                                  <MenuItem data-region-code={item} key={item} value={item}>
                                      {item}
                                  </MenuItem>
                                  ))
                              }
                          </TextField>
                          : <TextField defaultValue="" variant="outlined" size="small" fullWidth />
                        }
                      </div>
                    </div>
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-3">
                <div className="form-block">
                  <label>Mobile Number</label>
                  <TextField disabled={!isEdit} placeholder="Enter MobileNumber"
                    { 
                        ...register("mobileNumber", 
                        { 
                        required: "Contact is required",
                        minLength: {
                          value: 10,
                          message: "Phone number must at least 10 digits"
                        }
                      })
                    }
                    error={ !!errors.mobileNumber }
                    helperText={ errors.mobileNumber?.message } variant="outlined" size="small" fullWidth />
                </div>
              </div>
              <div className="col-3">
                <div className="form-block">
                  <label>Nationality</label>
                  <TextField disabled={!isEdit} 
                    { 
                        ...register("nationality",  { required: "Nationality is required" } ) 
                    }
                    error={ !!errors.nationality }
                    helperText={ errors.nationality?.message } variant="outlined" size="small" fullWidth />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="form-block">
                  <label>Present Address</label>
                  <List
                      sx={{ width: '100%', maxWidth: '100%', padding:'0 !important', bgcolor: 'background.paper', border:'1px solid #bdbdbd', borderRadius:'5px' }}
                      component="nav"
                    >
                      <ListItemButton onClick={handlePresentAddressClick}>
                        <ListItemText primary={
                          (userData !== undefined) 
                          ? `${userData.streetOrPurok}, ${userData.barangay}, ${userData.municipality}, ${userData.region}` 
                          : ""
                        } />
                        {presentAddressOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={presentAddressOpen} timeout="auto" unmountOnExit>
                        <List component="div" style={{ paddingLeft: '15px', paddingRight:'15px', textAlign:'left'}}>
                          <AddressWidget 
                            register={register} 
                            errors={errors}
                            nextrequired={isEdit}
                            defaultData={(!isEdit) ? userInfo : undefined } />

                          <div className="divContent">
                            <div className="left">
                              <label>Street/Purok</label>
                            </div>
                            <div className="right">
                              <TextField
                                disabled={(isEdit) ? false : true}
                                { 
                                  ...register("streetOrPurok", { required: true } ) 
                                }
                                error={ !!errors.streetOrPurok }
                                helperText={ errors.streetOrPurok?.message }
                                variant="outlined" size="small" fullWidth />
                            </div>
                          </div>
                        </List>
                      </Collapse>
                    </List>
                </div>
              </div>
              <div className="col-6">
                <div className="form-block">
                  <label>Permanent Address</label>
                  <List
                      sx={{ width: '100%', maxWidth: '100%', padding:'0 !important',  bgcolor: 'background.paper', border:'1px solid #bdbdbd', borderRadius:'5px' }}
                      component="nav"
                    >
                      <ListItemButton onClick={handlePermanentAddressClick}>
                        <ListItemText primary={
                          (userData !== undefined) 
                          ? `${userData.permanentStreetOrPurok??'Street/Purok'}, ${userData.permanentBarangay??'Barangay'}, ${userData.permanentMunicipality??'Municipality'}, ${userData.permanentRegion??'Region'}` 
                          : ""
                        } />
                        {permanentAddressOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={permanentAddressOpen} timeout="auto" unmountOnExit>
                        <List component="div" style={{ paddingLeft: '15px', paddingRight:'15px', textAlign:'left'}}>

                          <PermanentAddressWidget 
                          register={register} 
                          errors={errors}
                          nextrequired={isEdit}
                          defaultData={(!isEdit) ? userInfo : null } />

                          <div className="divContent">
                            <div className="left">
                              <label>Street/Purok</label>
                            </div>
                            <div className="right">
                                <TextField 
                                disabled={(isEdit) ? false : true}
                                { 
                                  ...register("permanentStreetOrPurok", { required: true } ) 
                                }
                                error={ !!errors.streetOrPurok }
                                helperText={ errors.streetOrPurok?.message }
                                variant="outlined" size="small" fullWidth />
                            </div>
                          </div>
                        </List>
                      </Collapse>
                    </List>
                </div>
              </div>
            </div>

            <div className="row">
              {
                (isEdit) ?
                  <div className="col-12" style={{ textAlign:'right', paddingTop:'30px'}}>
                    <Button type="submit" sx={{ backgroundColor: "#38a169" }} size="medium" variant="contained" color="success">
                      Update User <EditOutlinedIcon />
                    </Button>
                  </div>
                : <></>
              }
            </div>
          </div>

          <div className="top">
            <h2 className="title">ACCOUNT INFORMATION</h2>
          </div>
          <div className="divProfileInfo">
            <div className="row">
              <div className="col-4">
                <div className="form-block">
                  <label>Username</label>
                  <TextField disabled placeholder="Enter Username"
                    { 
                        ...register("mobileNumber",  { required: "Username is required" } ) 
                    }
                    error={ !!errors.mobileNumber }
                    helperText={ errors.mobileNumber?.message } variant="outlined" size="small" fullWidth />
                </div>
              </div>
              <div className="col-4">
                <div className="form-block">
                  <label>Email Address</label>
                  <TextField disabled variant="outlined" size="small" fullWidth />
                </div>
              </div>
            </div>
          </div>

          <div className="top">
            <h2 className="title">IDENTIFICATION</h2>
          </div>

          <div className="divProfileInfo">
            <div className="row">
              <div className="col-3">
                <div className="form-block">
                  <b>Profile Image</b>
                  <div className="uploadbtn">
                    <Button disabled={!isEdit} component="label" variant="contained" startIcon={<FilterIcon />}>
                      Upload Profile Image
                      <VisuallyHiddenInput type="file" name="file" accept="image/*"
                      onChange={(e) => handleUploadProfile(e, e.target.files[0])} />
                    </Button>
                  </div>
                  <img src={(displayNewProfImg !== null) ? `${displayNewProfImg}` : (displayProfImg !== null) ? `data:image/png;base64, ${displayProfImg}` : `${process.env.PUBLIC_URL}/noimage.png`} alt="img" className='avatar' />
                </div>
              </div>
              <div className="col-4">
                <div className="form-block">
                  <label>Select one (1) valid ID:</label>
                  
                  {
                      (userData !== undefined) ? 
                        <TextField disabled={!isEdit}
                        label="Select Valid ID" style={{ marginTop: '15px', width:'85%' }}
                        onChange={e => handleSelectId(e, e.target.value)}
                        defaultValue={(userData !== undefined) ? (userData.validId !== null) ? userData.validId : '' : ''}
                        variant="outlined" size="small" select>
                          <MenuItem value=""><em>Select valid ID</em></MenuItem>
                            { 
                                IDTypes().map((item) => (
                                <MenuItem data-region-code={item} key={item} value={item}>
                                    {item}
                                </MenuItem>
                                ))
                            }
                        </TextField>
                      : <TextField disabled={!isEdit} style={{ marginTop: '15px', width:'85%' }} defaultValue="" variant="outlined" size="small" fullWidth />
                  }                
                    <div className="uploadbtn">
                      <Button disabled={!isEdit} component="label" variant="contained" startIcon={<FilterIcon />}>
                        Upload Front ID
                        <VisuallyHiddenInput type="file" name="file" accept="image/*"
                        onChange={(e) => handleUploadFrontID(e, e.target.files[0])} />
                      </Button>
                      <br/>
                      <Button disabled={!isEdit}  component="label" variant="contained" startIcon={<FilterIcon />}>
                        Upload Back ID
                        <VisuallyHiddenInput type="file" name="file" accept="image/*"
                        onChange={(e) => handleUploadBackID(e, e.target.files[0])} />
                      </Button>
                      <br/>
                      <Button disabled={!isEdit}  component="label" variant="contained" startIcon={<FilterIcon />}>
                        Upload Signature
                        <VisuallyHiddenInput type="file" name="file" accept="image/*"
                        onChange={(e) => handleUploadSignature(e, e.target.files[0])}  />
                      </Button>
                    </div>
                  
                </div>
              </div>
              <div className="col-5">
                <div >
                  <label style={{ marginBottom:'15px'}}>Attached Files:</label>
                </div>
                <div className="row form-block">
                  <div className="col-6">
                    <div className="div-attachemet">
                      <span>Front Image</span>
                      <img className="imgFiles" src={(displayNewFrontID !== null) ? `${displayNewFrontID}` : (displayFrontID !== null) ? `data:image/png;base64, ${displayFrontID}` : `${process.env.PUBLIC_URL}/noimage.png`} alt="" />
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="div-attachemet">
                      <span>Back Image</span> 
                      <img className="imgFiles" src={(displayNewBackId !== null) ? `${displayNewBackId}` : (displayBackId !== null) ? `data:image/png;base64, ${displayBackId}` : `${process.env.PUBLIC_URL}/noimage.png`} alt="" />
                    </div>
                  </div>
                </div>
                <div className="row form-block">
                  <div className="col-6">
                    <div className="div-attachemet">
                      <span>Signature</span>
                      <img className="imgFiles" src={(displayNewSignature !== null) ? `${displayNewSignature}` : (displaySignature !== null) ? `data:image/png;base64, ${displaySignature}` : `${process.env.PUBLIC_URL}/noimage.png`} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
       
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default ProfileInfo
