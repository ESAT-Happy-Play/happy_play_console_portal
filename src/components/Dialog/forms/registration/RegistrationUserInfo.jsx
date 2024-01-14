import React from 'react';
import "./../../dialogform.scss";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { toast } from 'react-toastify';

import { TextField, MenuItem, Button  } from "@mui/material";
import { LoadingButton } from '@mui/lab';

import FilterIcon from '@mui/icons-material/Filter';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

// Models
import { UserModel } from "../../../../model/UserModel";
import { IDTypes, BloodTypes, NatureOfWorkList, SourceOfIncomeList, NationalityList } from "../../../../helper/Enums";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import BirthAddrWidget from '../../../widget/address/BirthAddrWidget';
import PermanentAddrWidget from '../../../widget/address/PermanentAddrWidget';
import PresentAddrWidget from '../../../widget/address/PresentAddrWidget';

import PresentAddrWidgetWithData from '../../../widget/address/PresentAddrWidgetWithData';
import PermanentAddrWidgetWithData from '../../../widget/address/PermanentAddrWidgetWithData';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));

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

const RegistrationUserInfo = ({ isOpen, handleClose, accountObjectId, accountObject }) => {
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingFinal, setIsLoadingFinal] = React.useState(false);

  const formUpdateUser = useForm({ defaultValues: UserModel.UpdateAccountInfoForm });
  const { register, handleSubmit, formState, reset } = formUpdateUser;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});

  const [govId, setGovId] = React.useState(null);
  const [displayFrontID, setDisplayFrontID] = React.useState(null);
  const [displayBackId, setDisplayBackId] = React.useState(null);
  const [displaySignature, setDisplaySignature] = React.useState(null);

  const [isValidDOB, setisValidDOB] = React.useState(false);
  const [isSameBirthPlace, setIsSameBirthPlace] = React.useState(false);
  const [isSamePresent, setIsSamePresent] = React.useState(false);
  
  const [slideNextFirst, setSlideNextFirst] = React.useState(true);
  const [slideNextSecond, setSlideNextSecond] = React.useState(false);
  const [slideNextThird, setSlideNextThird] = React.useState(false);

  useEffect(() => {
    if(accountObjectId !== null) {
      reset(formValues => ({
        ...formValues,
        accountObjectId: accountObjectId,
        firstName: accountObject.firstName,
        lastName: accountObject.lastName,
        middleName: accountObject.middleName,
        mobileNumber: accountObject.mobileNumber
      }));
    }
  }, [accountObjectId, accountObject, reset]);

  // on form submit 1st step
  const firstStepHandler = async (data) => {
    // if(isValidDOB) {
    setSlideNextFirst(false);
    setSlideNextSecond(true);
    // }
  };

  const secondStepHandler = async (data) => {
    setSlideNextFirst(false);
    setSlideNextSecond(false);
    setSlideNextThird(true);
    console.log(data);
  }

  const thirdStepHandler = async (data) => {
    if(displayFrontID !== null && displayBackId !== null && displaySignature !== null) {
      setIsLoading(true);
      setIsLoadingFinal(true);   
      
      console.log("Submit data");
    } else {
      toast.error("Please upload your valid id / signature.", { autoClose: false });
    }
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

  const handleBackToFirst = async () => {
    setSlideNextFirst(true);
    setSlideNextSecond(false);
    setSlideNextThird(false);
  }

  const handleBackToSecond = async () => {
    setSlideNextFirst(false);
    setSlideNextSecond(true);
    setSlideNextThird(false);
  }

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
      setpresentAddressOpen(true);
      setplaceOfBirthOpen(false);
      setpermanentAddressOpen(false);
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

    setpresentAddressOpen(false);
    setplaceOfBirthOpen(false);
    setpermanentAddressOpen(true);
  }

  // const validateDate = (value) => {
  //   const selected = new Date(value).getFullYear();
  //   const now = new Date().getFullYear();
  //   setisValidDOB((now - selected) >= 18);
  // };

  const [placeOfBirthOpen, setplaceOfBirthOpen] = React.useState(true);
  const handlePlaceOfBirthClick = () => {
    setplaceOfBirthOpen(!placeOfBirthOpen);
  };
  const [presentAddressOpen, setpresentAddressOpen] = React.useState(false);
  const handlePresentAddressClick = () => {
    setpresentAddressOpen(!presentAddressOpen);
  };
  const [permanentAddressOpen, setpermanentAddressOpen] = React.useState(false);
  const handlePermanentAddressClick = () => {
    setpermanentAddressOpen(!permanentAddressOpen);
  };

  const [validIdOpen, setValidIdOpenOpen] = React.useState(true);
  const handleValidIdClick = () => {
    setValidIdOpenOpen(!validIdOpen);
  };

  const [selfieOpen, setSelfieOpen] = React.useState(false);
  const handleSelfieClick = () => {
    setSelfieOpen(!selfieOpen);
  };

  const [signatureOpen, setSignatureOpen] = React.useState(false);
  const handleSignatureClick = () => {
    setSignatureOpen(!signatureOpen);
  };

  const handleSelectId = (e, value) => {
    setGovId(value);
  }

  return (
    <>
      <BootstrapDialog className="registrationInfo"
        open={ isOpen }
        disableEscapeKeyDown
      >
        <DialogContent dividers>
          <div className='container'>
            <div className="lfContent"></div>
            <div className="content">

              <div className={(slideNextFirst) ? 'elemShow' : 'elemHide'}>
                <form onSubmit={ handleSubmit(firstStepHandler) } noValidate>
                  <div className="divContent">
                    <div className="left">
                      <label>Gender</label>
                    </div>
                    <div className="right">
                      <RadioGroup style={{ display: 'table'}}>
                        <FormControlLabel value="Male" control={<Radio 
                        { 
                          ...register("sex", ((slideNextFirst)) ? { required: true } : { required: false } ) 
                        }
                        />} label="Male" />
                        <FormControlLabel value="Female" control={<Radio
                        { 
                          ...register("sex", ((slideNextFirst)) ? { required: true } : { required: false } ) 
                        }
                        />} label="Female" />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="divContent">
                    <div className="left">
                      <label>Civil Status</label>
                    </div>
                    <div className="right">
                      <TextField 
                        style={{ textAlign: 'left'}}
                        placeholder="Enter civil status"
                        { 
                          ...register("civilStatus", ((slideNextFirst)) ? { required: true } : { required: false } ) 
                        }
                        error={ !!errors.civilStatus }
                        helperText={ errors.civilStatus?.message }
                        label="Select civil status" sx={{ width: "100%" }} defaultValue="" variant="outlined" size="small" select>
                        <MenuItem value=''><em>Select status</em></MenuItem>
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Married">Married</MenuItem>
                      </TextField>
                    </div>
                  </div>
                  {/* <div className="divContent">
                    <div className="left">
                      <label>Birthday</label>
                    </div>
                    <div className="right">
                      <TextField
                        type="date"
                        { 
                          ...register("birthday", ((slideNextFirst)) ? { required: true } : { required: false } ) 
                        }
                        onChange={e => validateDate(e.target.value)}
                        error={ !!errors.birthday }
                        helperText={ errors.birthday?.message }
                        variant="outlined" size="small" fullWidth />
                    </div>
                  </div>
                  {
                    (!isValidDOB) ? <div className="divContent">
                        <div className="left"></div>
                        <div className="right" style={{textAlign:'left'}}>
                          <span style={{color:'red', fontSize:'12px'}}>Agent/Player must at least 21 years old.</span>
                        </div>
                      </div>
                    : <></>
                  } */}
                  
                  <div className="divContent">
                    <div className="left">
                      <label>Blood Type</label>
                    </div>
                    <div className="right">
                      <TextField style={{textAlign:'left'}}
                        label="Select blood type"
                        { 
                          ...register("bloodType", ((slideNextFirst)) ? { required: true } : { required: false } ) 
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
                  </div>

                  <div className="divContent">
                    <div className="left">
                      <label>Nature of Work</label>
                    </div>
                    <div className="right">
                      <TextField style={{textAlign:'left'}}
                        label="Select nature of work"
                        { 
                          ...register("natureOfWork", ((slideNextFirst)) ? { required: true } : { required: false } ) 
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
                  </div>

                  <div className="divContent">
                    <div className="left">
                      <label>Source of Income</label>
                    </div>
                    <div className="right">
                      <TextField style={{textAlign:'left'}}
                        label="Select source of income"
                        { 
                          ...register("sourceOfIncome", ((slideNextFirst)) ? { required: true } : { required: false } ) 
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
                  </div>

                  <div className="divContent">
                    <div className="left">
                      <label>Nationality</label>
                    </div>
                    <div className="right">
                      <TextField style={{textAlign:'left'}}
                        label="Select nationality"
                        { 
                          ...register("nationality", ((slideNextFirst)) ? { required: true } : { required: false } ) 
                        }
                        error={ !!errors.nationality }
                        helperText={ errors.nationality?.message }
                        variant="outlined" defaultValue="" size="small" fullWidth select>
                        <MenuItem value=""><em>Select nationality</em></MenuItem>
                          { 
                              NationalityList().map((item, index) => (
                              <MenuItem key={item} value={item}>
                                  {item}
                              </MenuItem>
                              ))
                          }
                      </TextField>
                    </div>
                  </div>

                  <div className='divfooter'>
                    <Button onClick={handleClose} style={{ marginRight: '15px'}} variant="outlined">Back</Button>
                    <Button type="submit" variant="outlined" color="success">
                      Next <ArrowForwardOutlinedIcon/>
                    </Button>
                  </div>
                </form>
              </div>

              <div className={(slideNextSecond) ? 'elemShow' : 'elemHide'}>
                <form onSubmit={ handleSubmit(secondStepHandler) } noValidate>

                  <div className='divCollaps'>
                    <List
                      sx={{ width: '100%', maxWidth: '100%', paddingTop:'0px',paddingBottom:'0px', bgcolor: 'background.paper' }}
                      component="nav"
                    >
                      <ListItemButton onClick={handlePlaceOfBirthClick}>
                        <ListItemText primary="Place of Birth" />
                        {placeOfBirthOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={placeOfBirthOpen} timeout="auto" unmountOnExit>
                        <List component="div" style={{ paddingLeft: '15px', marginRight:'10px', textAlign:'left'}}>
                          
                          <BirthAddrWidget register={register} errors={errors} nextrequired={slideNextSecond} callback={handleAddressPOBCallback} />

                        </List>
                      </Collapse>
                    </List>
                  </div>

                  <div>
                    <FormControlLabel style={{marginLeft:'-105px'}}
                      control={
                        <Checkbox onChange={e => handleIsSameBirthPlace(e, isSameBirthPlace)} defaultValue={isSameBirthPlace} checked={isSameBirthPlace} />
                      } label={
                        <div style={{fontSize:'14px'}}><span>Present Address same with Place of Birth.</span></div>
                      } />
                  </div>

                  <div className='divCollaps'>
                    <List
                      sx={{ width: '100%', maxWidth: '100%', paddingTop:'0px',paddingBottom:'0px', bgcolor: 'background.paper' }}
                      component="nav"
                    >
                      <ListItemButton onClick={handlePresentAddressClick}>
                        <ListItemText primary="Present Address" />
                        <span style={{color:'red', marginRight:'110px',fontSize:'12px'}}>required*</span>
                        {presentAddressOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={presentAddressOpen} timeout="auto" unmountOnExit>
                        <List component="div" style={{ paddingLeft: '15px', marginRight:'10px', textAlign:'left'}}>
                          {
                            (isSameBirthPlace) ? <PresentAddrWidgetWithData register={register} />
                            : <PresentAddrWidget register={register} errors={errors} nextrequired={slideNextSecond} callback={handleAddressPresentCallback} />
                          }

                        </List>
                      </Collapse>
                    </List>
                  </div>

                  <div>
                    <FormControlLabel style={{marginLeft:'-65px'}}
                      control={
                        <Checkbox defaultValue={isSamePresent} onChange={e => handleIsSamePresent(e, isSamePresent)} checked={isSamePresent} />
                      } label={
                        <div style={{fontSize:'14px'}}><span>Permanent Address same with Present Address.</span></div>
                      } />
                  </div>

                  <div className='divCollaps'>
                    <List
                      sx={{ width: '100%', maxWidth: '100%', paddingTop:'0px',paddingBottom:'0px', bgcolor: 'background.paper' }}
                      component="nav"
                    >
                      <ListItemButton onClick={handlePermanentAddressClick}>
                        <ListItemText primary="Permanent Address" />
                        <span style={{color:'red', marginRight:'110px',fontSize:'12px'}}>required*</span>
                        {permanentAddressOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={permanentAddressOpen} timeout="auto" unmountOnExit>
                        <List component="div" style={{ paddingLeft: '15px', marginRight:'10px', textAlign:'left'}}>
                          {
                            (isSamePresent) ? <PermanentAddrWidgetWithData register={register} />
                            : <PermanentAddrWidget register={register} errors={errors} nextrequired={slideNextSecond} callback={handleAddressPermanentCallback} />
                          }
                        </List>
                      </Collapse>
                    </List>
                  </div>
                  <br />
                  <div className='divfooter'>
                    <Button onClick={handleBackToFirst} style={{ marginRight: '15px'}} variant="outlined">Back</Button>
                    <Button type="submit" variant="outlined" color="success">
                      Next <ArrowForwardOutlinedIcon/>
                    </Button>
                  </div>
                </form>
              </div>

              <div className={(slideNextThird) ? 'elemShow' : 'elemHide'}>
                <form onSubmit={ handleSubmit(thirdStepHandler) } noValidate>

                  <div className='divCollaps' style={{ marginBottom: '15px'}}>
                    <List
                      sx={{ width: '100%', maxWidth: '100%', paddingTop:'0px',paddingBottom:'0px', bgcolor: 'background.paper' }}
                      component="nav"
                    >
                      <ListItemButton onClick={handleValidIdClick}>
                        <ListItemText primary="Valid ID" />
                        <span style={{color:'red', marginRight:'190px',fontSize:'12px'}}>required*</span>
                        {validIdOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={validIdOpen} timeout="auto" unmountOnExit>
                        <List component="div" style={{ paddingLeft: '15px', marginRight:'10px'}}>
                          <div className="divContent">
                            <div className="left" style={{ width:'80px', paddingTop:'20px'}}>
                              <label>ID Type</label>
                            </div>
                            <div className="right" style={{ textAlign:'left', width:'150px'}}>
                              <TextField
                                onChange={e => handleSelectId(e, e.target.value)}
                                label="Select Valid ID" style={{ marginTop: '15px', width:'100%' }}
                                defaultValue="" variant="outlined" size="small" select>
                                  <MenuItem value=""><em>Select valid ID</em></MenuItem>
                                  { 
                                      IDTypes().map((item) => (
                                      <MenuItem key={item} value={item}>
                                          {item}
                                      </MenuItem>
                                      ))
                                  }
                              </TextField>
                            </div>
                          </div>

                          <div style={{display:'flex'}}>
                            <div className="div-imgUpload">
                                <img className="imgFiles" src={`${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                            </div>
                            <div>
                                <LoadingButton loading={ false } 
                                style={{ width: '185px', marginTop:'65px'}} 
                                component="label" variant="contained" color="success" loadingPosition='end' endIcon={<FilterIcon />}>
                                    Upload Valid ID
                                    <VisuallyHiddenInput type="file" { ...register("proofImage", { required: false }) } name="proofImage" accept="image/*" />
                                </LoadingButton>
                            </div>
                          </div>
                        </List>
                      </Collapse>
                    </List>
                  </div>

                  <div className='divCollaps' style={{ marginBottom: '15px'}}>
                    <List
                      sx={{ width: '100%', maxWidth: '100%', paddingTop:'0px',paddingBottom:'0px', bgcolor: 'background.paper' }}
                      component="nav"
                    >
                      <ListItemButton onClick={handleSelfieClick}>
                        <ListItemText primary="Selfie" />
                        <span style={{color:'red', marginRight:'190px',fontSize:'12px'}}>required*</span>
                        {selfieOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={selfieOpen} timeout="auto" unmountOnExit>
                        <List component="div" style={{ paddingLeft: '15px', marginRight:'10px'}}>
                          <div style={{display:'flex'}}>
                            <div className="div-imgUpload">
                                <img className="imgFiles" src={`${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                            </div>
                            <div>
                                <LoadingButton loading={ false } 
                                style={{ width: '185px', marginTop:'65px'}} 
                                component="label" variant="contained" color="success" loadingPosition='end' endIcon={<FilterIcon />}>
                                    Upload Selfie
                                    <VisuallyHiddenInput type="file" { ...register("proofImage", { required: false }) } name="proofImage" accept="image/*" />
                                </LoadingButton>
                            </div>
                          </div>
                        </List>
                      </Collapse>
                    </List>
                  </div>
              
                  <div className='divCollaps'>
                    <List
                      sx={{ width: '100%', maxWidth: '100%', paddingTop:'0px',paddingBottom:'0px', bgcolor: 'background.paper' }}
                      component="nav"
                    >
                      <ListItemButton onClick={handleSignatureClick}>
                        <ListItemText primary="Signature" />
                        <span style={{color:'red', marginRight:'190px',fontSize:'12px'}}>required*</span>
                        {signatureOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={signatureOpen} timeout="auto" unmountOnExit>
                        <List component="div" style={{ paddingLeft: '15px', marginRight:'10px'}}>
                          <div style={{display:'flex'}}>
                            <div className="div-imgUpload">
                                <img className="imgFiles" src={`${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                            </div>
                            <div>
                                <LoadingButton loading={ false } 
                                style={{ width: '185px', marginTop:'65px'}} 
                                component="label" variant="contained" color="success" loadingPosition='end' endIcon={<FilterIcon />}>
                                    Upload Signature
                                    <VisuallyHiddenInput type="file" { ...register("proofImage", { required: false }) } name="proofImage" accept="image/*" />
                                </LoadingButton>
                            </div>
                          </div>
                        </List>
                      </Collapse>
                    </List>
                  </div>
                  <br />
                  <div className='divfooter'>
                    <LoadingButton loading={ isLoadingFinal } onClick={handleBackToSecond} 
                    style={{ marginRight: '15px'}} variant="outlined">Back</LoadingButton>
                    <LoadingButton loading={ isLoadingFinal } 
                    type="submit" variant="outlined" color="success">
                      Submit <ArrowForwardOutlinedIcon/>
                    </LoadingButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  )
}

export default RegistrationUserInfo
