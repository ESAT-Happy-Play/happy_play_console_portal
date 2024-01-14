import "./profileInfo.scss"

import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { useForm } from 'react-hook-form';

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
import FilterIcon from '@mui/icons-material/Filter';

import SaveAsIcon from '@mui/icons-material/SaveAs';
import { LoadingButton } from '@mui/lab'; 

import { toast } from 'react-toastify';
import { GETFetch } from "../../../api/ApiFetchBuilder";
import PageLoader from "../../../components/widget/PageLoader";
import DefaultAddressWithData from "../../../components/widget/address/DefaultAddressWithData";
import { IDTypes, BloodTypes, NatureOfWorkList, SourceOfIncomeList, NationalityList } from "../../../helper/Enums";


import { UserModel } from "../../../model/UserModel";
import { GetStoreObject } from "../../../helper/Helpers";
import BirthAddrWidget1 from "../../../components/widget/address/BirthAddrWidget1";
import PresentAddrWidget1 from "../../../components/widget/address/PresentAddrWidget1";
import PresentAddrWidgetWithData from "../../../components/widget/address/PresentAddrWidgetWithData";
import PermanentAddrWidget1 from "../../../components/widget/address/PermanentAddrWidget1";
import PermanentAddrWidgetWithData from "../../../components/widget/address/PermanentAddrWidgetWithData";

import { FetchFormData } from "../../../api/ApiFetchBuilder";

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

const EditProfileInfo = () => {
  let loginObj = GetStoreObject("auth");
  const [pageLoader, setPageLoader] = useState(false);

  const formUpdateUser = useForm({ defaultValues: UserModel.UpdateRegistrationAccountForm });
  const { register, handleSubmit, formState, reset } = formUpdateUser;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});

  const [isSameBirthPlace, setIsSameBirthPlace] = React.useState(false);
  const [isSamePresent, setIsSamePresent] = React.useState(false);

  const [displayFrontID, setDisplayFrontID] = React.useState(null);
  const [displayBackId, setDisplayBackId] = React.useState(null);
  const [displaySignature, setDisplaySignature] = React.useState(null);
  const [displaySelfie, setdisplaySelfie] = React.useState(null);

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

  const [presentAddrOpen, setpresentAddrOpen] = React.useState(false);
  const handlePresentClick = () => {
    setpresentAddrOpen(!presentAddrOpen);
  };
  
  const [permanentAddrOpen, setpermanentAddrOpen] = React.useState(false);
  const handlePermanentClick = () => {
    setpermanentAddrOpen(!permanentAddrOpen);
  };

  const [validIdOpen, setvalidIdOpen] = React.useState(true);
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

  const handleFrontId = async (e, image) => {
    setDisplayFrontID(URL.createObjectURL(image));
  }

  const handleBackId = async (e, image) => {
    setDisplayBackId(URL.createObjectURL(image));
  }

  const handleSignature = async (e, image) => {
    setDisplaySignature(URL.createObjectURL(image));
  }

  const handleSelfie = async (e, image) => {
    setdisplaySelfie(URL.createObjectURL(image));
  }

  /**
   * Start Address 
   */
  const [addressStatePOB, setAddressStatePOB] = React.useState({
    region: null,
    province: null,
    municipality: null,
    barangay: null,
    streetpurok: null
  });
  
  const handleAddressPOBCallback = (value, addressType) => {
    (addressType === 1) ? setAddressStatePOB({...addressStatePOB, region: value }) :
    (addressType === 2) ? setAddressStatePOB({...addressStatePOB, province: value }) :
    (addressType === 3) ? setAddressStatePOB({...addressStatePOB, municipality: value }) :
    (addressType === 4) ? setAddressStatePOB({...addressStatePOB, barangay: value }) :
    setAddressStatePOB({...addressStatePOB, streetpurok: value });
  }

  const [addressStatePresent, setAddressStatePresent] = React.useState({
    region: null,
    province: null,
    municipality: null,
    barangay: null,
    streetpurok: null
  });
  
  const handleAddressPresentCallback = (value, addressType) => {
    (addressType === 1) ? setAddressStatePresent({...addressStatePresent, region: value }) :
    (addressType === 2) ? setAddressStatePresent({...addressStatePresent, province: value }) :
    (addressType === 3) ? setAddressStatePresent({...addressStatePresent, municipality: value }) :
    (addressType === 4) ? setAddressStatePresent({...addressStatePresent, barangay: value }) :
    setAddressStatePresent({...addressStatePOB, streetpurok: value });
  }

  const [addressStatePermanent, setAddressStatePermanent] = React.useState({
    region: null,
    province: null,
    municipality: null,
    barangay: null,
    streetpurok: null
  });
  
  const handleAddressPermanentCallback = (value, addressType) => {
    (addressType === 1) ? setAddressStatePermanent({...addressStatePermanent, region: value }) :
    (addressType === 2) ? setAddressStatePermanent({...addressStatePermanent, province: value }) :
    (addressType === 3) ? setAddressStatePermanent({...addressStatePermanent, municipality: value }) :
    (addressType === 4) ? setAddressStatePermanent({...addressStatePermanent, barangay: value }) :
    setAddressStatePermanent({...addressStatePOB, streetpurok: value });
  }
  // END Address

  const isNullPOB = Object.values(addressStatePOB).every(value => {
    if (value === null) { return true; }
    return false;
  });

  const handleIsSameBirthPlace = (e , value) => {
    if (!isNullPOB) {
      setIsSameBirthPlace(!value);
      if(!value) {
        setAddressStatePresent({
          ...addressStatePresent, 
          region: addressStatePOB.region,
          province: addressStatePOB.province,
          municipality: addressStatePOB.municipality,
          barangay: addressStatePOB.barangay,
          streetpurok: addressStatePOB.streetpurok
        });

        reset(formValues => ({
          ...formValues,
          presRegion: addressStatePOB.region,
          presProvince: addressStatePOB.province,
          presMunicipality: addressStatePOB.municipality,
          presBarangay: addressStatePOB.barangay,
          presStreet: addressStatePOB.streetpurok
        }));
      }
    } else {
      toast.error("Please fillup place of birth."); 
      return false;
    }
  }

  const handleIsSamePresent = (e , value) => {
    setIsSamePresent(!value);
    if(!value) {
      setAddressStatePermanent({
        ...addressStatePermanent, 
        region: addressStatePresent.region,
        province: addressStatePresent.province,
        municipality: addressStatePresent.municipality,
        barangay: addressStatePresent.barangay,
        streetpurok: addressStatePresent.streetpurok
      });

      reset(formValues => ({
        ...formValues,
        permRegion: addressStatePresent.region,
        permProvince: addressStatePresent.province,
        permMunicipality: addressStatePresent.municipality,
        permBarangay: addressStatePresent.barangay,
        permStreet: addressStatePresent.streetpurok
      }));
    }
  }

  const submitHandler = async (data) => {
    console.log(data);
    var frmData = new FormData();
    frmData.append('firstname', formData.firstname);
    frmData.append('lastname', formData.lastname);
    frmData.append('middlename', formData.middlename);
    frmData.append('sex', (formData.sex === "Male") ? 0 : 1);
    frmData.append('birthday', formData.amount);
    frmData.append('nationality', "PH");
    frmData.append('civilStatus', (formData.civilStatus === "Single") ? 0 : 1);
    frmData.append('bloodType', "1");
    frmData.append('birthRegion', "11");
    frmData.append('birthProvince', "25");
    frmData.append('birthMunicipality', "1129");
    frmData.append('birthBarangay', "072231001");
    frmData.append('birthStreet', "Purok Talisay");
    frmData.append('presRegion', "11");
    frmData.append('presProvince', "25");
    frmData.append('presMunicipality', "1129");
    frmData.append('presBarangay', "072231001");
    frmData.append('presStreet', "Purok Talisay");
    frmData.append('permRegion', "11");
    frmData.append('permProvince', "25");
    frmData.append('permMunicipality', "1129");
    frmData.append('permBarangay', "072231001");
    frmData.append('permStreet', "Purok Talisay");
    frmData.append('natureOfWork', "3");
    frmData.append('sourceOfIncome', "3");
    frmData.append('displayName', `${formData.firstname} ${formData.lastname} ${formData.middlename}`);
    if (formData.validIdImage.length > 0) {
      frmData.append('validIdImage', formData.validIdImage[0]);
    }
    if (formData.signatureImage.length > 0) {
      frmData.append('signatureImage', formData.signatureImage[0]);
    }
    // if (formData.validIdImageFront.length > 0) {
    //   frmData.append('validIdImageFront', formData.validIdImageFront[0]);
    // }

    // if (formData.validIdImageBack.length > 0) {
    //   frmData.append('validIdImageBack', formData.validIdImageBack[0]);
    // }

    // if (formData.signatureImage.length > 0) {
    //   frmData.append('signatureImage', formData.signatureImage[0]);
    // }
    // if (formData.selfieImage.length > 0) {
    //   frmData.append('selfieImage', formData.selfieImage[0]);
    // }

    setPageLoader(true);
    let response = await FetchFormData(`${process.env.REACT_APP_API_URL}/users/requestfullverification`, 'POST', frmData);
    setPageLoader(false);
    if(response.status) {
      toast.success(response.data.message);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  } 

  return (
    <div className="divprofile" style={{maxWidth:'1024px'}}>
      <form onSubmit={ handleSubmit(submitHandler) } noValidate>
        <div className="divright" style={{margin:'15px 15px 0px 15px'}}>
          <div className="div-r-content">
            <div className="div-cont">
              <p>First Name</p>
              {
                (userdata !== null) ? <TextField defaultValue={userdata.firstname} variant="outlined" size="small" fullWidth /> : "..."
              }
            </div>
            <div className="div-cont">
              <p>Middle Name</p>
              {
                (userdata !== null) ? <TextField defaultValue={userdata.middlename} variant="outlined" size="small" fullWidth /> : "..."
              }
            </div>
            <div className="div-cont">
              <p>Last Name</p>
              {
                (userdata !== null) ? <TextField defaultValue={userdata.lastname} variant="outlined" size="small" fullWidth /> : "..."
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
          

              <RadioGroup style={{ display: 'table', marginLeft:'-55px'}}>
                <FormControlLabel value="Male" control={<Radio 
                { 
                  ...register("sex", { required: false } ) 
                }
                />} label="Male" />
                <FormControlLabel value="Female" control={<Radio
                { 
                  ...register("sex", { required: false } ) 
                }
                />} label="Female" />
              </RadioGroup>
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
                    
                    <BirthAddrWidget1 register={register} errors={errors} nextrequired={false} callback={handleAddressPOBCallback} />

                  </List>
                </Collapse>
              </List>
            </div>
            
            <div className="div-cont">
              <FormControlLabel
              control={
                <Checkbox onChange={e => handleIsSameBirthPlace(e, isSameBirthPlace)} defaultValue={isSameBirthPlace} checked={isSameBirthPlace} />
              } label={
                <div style={{fontSize:'14px'}}><span>Present Address same with Place of Birth.</span></div>
              } />
            </div>

            <div className="div-cont">
              <List component="nav">
                <ListItemButton onClick={handlePresentClick}>
                  <ListItemText primary="Present Address" />
                  {presentAddrOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={presentAddrOpen} timeout="auto" unmountOnExit>
                  <List component="div" style={{ paddingLeft: '15px', textAlign:'left', marginRight:'10px'}}>
                    {
                      (isSameBirthPlace) ? <PresentAddrWidgetWithData register={register} />
                      : <PresentAddrWidget1 register={register} errors={errors} nextrequired={false} callback={handleAddressPresentCallback} />
                    }
                  </List>
                </Collapse>
              </List>
            </div>

            <div className="div-cont">
              <FormControlLabel
              control={
                <Checkbox defaultValue={isSamePresent} onChange={e => handleIsSamePresent(e, isSamePresent)} checked={isSamePresent} />
              } label={
                <div style={{fontSize:'14px'}}><span>Permanent Address same with Present Address.</span></div>
              } />
            </div>

            <div className="div-cont">
              <List component="nav">
                <ListItemButton onClick={handlePermanentClick}>
                  <ListItemText primary="Permanent Address" />
                  {permanentAddrOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={permanentAddrOpen} timeout="auto" unmountOnExit>
                  <List component="div" style={{ paddingLeft: '15px', textAlign:'left', marginRight:'10px'}}>
                    {
                      (isSamePresent) ? <PermanentAddrWidgetWithData register={register} />
                      : <PermanentAddrWidget1 register={register} errors={errors} nextrequired={false} callback={handleAddressPermanentCallback} />
                    }
                  </List>
                </Collapse>
              </List>
            </div>

          </div>
          <div className="div-r-content">
            <div className="div-cont">
              <p>Civil Status</p>
              <TextField 
                style={{ textAlign: 'left'}}
                placeholder="Enter civil status"
                { 
                  ...register("civilStatus", { required: false } ) 
                }
                error={ !!errors.civilStatus }
                helperText={ errors.civilStatus?.message }
                label="Select civil status" sx={{ width: "100%" }} defaultValue="" variant="outlined" size="small" select>
                <MenuItem value=''><em>Select status</em></MenuItem>
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
              </TextField>
            </div>
            <div className="div-cont">
              <p>Birthdate</p>
              <TextField disabled type="date" defaultValue="1990-02-02" variant="outlined" size="small" fullWidth />
            </div>
            <div className="div-cont">
              <p>Blood Type</p>
              <TextField style={{textAlign:'left'}}
                label="Select blood type"
                { 
                  ...register("bloodType", { required: false } ) 
                }
                error={ !!errors.bloodType }
                helperText={ errors.bloodType?.message }
                variant="outlined" defaultValue="" size="small" fullWidth select>
                <MenuItem value=""><em>Select blood type</em></MenuItem>
                  { 
                      BloodTypes().map((item, index) => (
                      <MenuItem key={item} value={item}>
                          {item}
                      </MenuItem>
                      ))
                  }
              </TextField>
            </div>
            <div className="div-cont">
              <p>Nature of Work</p>
              <TextField style={{textAlign:'left'}}
                label="Select nature of work"
                { 
                  ...register("natureOfWork", { required: false } ) 
                }
                error={ !!errors.natureOfWork }
                helperText={ errors.natureOfWork?.message }
                variant="outlined" defaultValue="" size="small" fullWidth select>
                <MenuItem value=""><em>Select nature of work</em></MenuItem>
                  { 
                      NatureOfWorkList().map((item, index) => (
                      <MenuItem key={item} value={item}>
                          {item}
                      </MenuItem>
                      ))
                  }
              </TextField>
            </div>
            <div className="div-cont">
              <p>Source of Income</p>
              <TextField style={{textAlign:'left'}}
                label="Select source of income"
                { 
                  ...register("sourceOfIncome", { required: false } ) 
                }
                error={ !!errors.sourceOfIncome }
                helperText={ errors.sourceOfIncome?.message }
                variant="outlined" defaultValue="" size="small" fullWidth select>
                <MenuItem value=""><em>Select source of income</em></MenuItem>
                  { 
                      SourceOfIncomeList().map((item, index) => (
                      <MenuItem key={item} value={item}>
                          {item}
                      </MenuItem>
                      ))
                  }
              </TextField>
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
                        <LoadingButton loading={ false } 
                        style={{ width: '185px', padding:'6px'}} 
                        component="label" variant="outlined" color="success" loadingPosition='end' endIcon={<FilterIcon />}>
                            Upload Front ID
                            <VisuallyHiddenInput type="file" { ...register("validIdImage", { required: false }) } name="validIdImage" accept="image/*" onChange={(e) => handleFrontId(e, e.target.files[0])} />
                        </LoadingButton>
                        <div className="div-imgUpload">
                            <img className="imgFiles" src={(displayFrontID !== null) ? `${displayFrontID}` : `${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                        </div>
                      </div>
                      <div style={{width:'100%'}}>
                          <LoadingButton loading={ false } 
                          style={{ width: '185px',}} 
                          component="label" variant="outlined" color="success" loadingPosition='end' endIcon={<FilterIcon />}>
                              Upload Back ID
                              <VisuallyHiddenInput type="file" { ...register("validIdImageBack", { required: false }) } name="validIdImageBack" accept="image/*" onChange={(e) => handleBackId(e, e.target.files[0])} />
                          </LoadingButton>
                          <div className="div-imgUpload">
                              <img className="imgFiles" src={(displayBackId !== null) ? `${displayBackId}` : `${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
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
                        <LoadingButton loading={ false } 
                          component="label" variant="outlined" color="success" loadingPosition='end' endIcon={<FilterIcon />}>
                              Upload Signature
                              <VisuallyHiddenInput type="file" { ...register("signatureImage", { required: false }) } name="signatureImage" accept="image/*" onChange={(e) => handleSignature(e, e.target.files[0])} />
                          </LoadingButton>
                        <div className="div-imgUpload">
                            <img className="imgFiles" src={(displaySignature !== null) ? `${displaySignature}` :  `${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
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
                        <LoadingButton loading={ false } 
                        component="label" variant="outlined" color="success" loadingPosition='end' endIcon={<FilterIcon />}>
                            Upload Selfie
                            <VisuallyHiddenInput type="file" { ...register("selfieImage", { required: false }) } name="selfieImage" accept="image/*" onChange={(e) => handleSelfie(e, e.target.files[0])} />
                        </LoadingButton>
                        <div className="div-imgUpload">
                            <img className="imgFiles" src={(displaySelfie !== null) ? `${displaySelfie}` : `${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                        </div>
                      </div>
                      <div style={{width:'100%'}}>
                          <LoadingButton loading={ false } 
                          component="label" variant="outlined" color="success" loadingPosition='end' endIcon={<FilterIcon />}>
                              Upload Profile
                              <VisuallyHiddenInput type="file" { ...register("selfieImage", { required: false }) } name="selfieImage" accept="image/*" onChange={(e) => handleSelfie(e, e.target.files[0])} />
                          </LoadingButton>
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

        <div style={{margin:'0px 15px 15px 15px',background:'white', padding:'10px',width:'100%'}}>
          <div style={{display:'flex', justifyContent:'end', padding:'10px'}}>
              <LoadingButton loading={ false } type="submit" variant="contained" color="success">
                Update and Request Verified <SaveAsIcon/>
              </LoadingButton>
          </div>
        </div>
      </form>
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default EditProfileInfo
