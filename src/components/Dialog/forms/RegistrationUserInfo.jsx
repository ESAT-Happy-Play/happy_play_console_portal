import React from 'react';
import "../dialogform.scss";

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

import AddressWidget from '../../widget/AddressWidget';
// Models
import { UserModel } from "../../../model/UserModel";
import { IDTypes, BloodTypes } from "../../../helper/Enums";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PermanentAddressWidget from '../../widget/PermanentAddressWidget';

import { UploadFile } from "../../../api/request/UploadApiRequest";

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
  const [isLoadingFront, setIsLoadingFront] = React.useState(false);
  const [isLoadingBack, setIsLoadingBack] = React.useState(false);
  const [isLoadingFinal, setIsLoadingFinal] = React.useState(false);

  const formUpdateUser = useForm({ defaultValues: UserModel.UpdateAccountInfoForm });
  const { register, handleSubmit, formState, reset } = formUpdateUser;
  const { errors } = formState;
  // const [formData, setFormData] = React.useState({});

  const [govId, setGovId] = React.useState(null);
  const [displayFrontID, setDisplayFrontID] = React.useState(null);
  const [displayBackId, setDisplayBackId] = React.useState(null);
  const [displaySignature, setDisplaySignature] = React.useState(null);
  // const [submitFinal, setSubmitFinal] = React.useState(true);

  const [addressState, setAddressState] = React.useState({
    region: null,
    province: null,
    municipality: null,
    barangay: null,
    streetpurok: null
  });
  const [addressObj, setAddressObj] = React.useState(null);
  const [isPermanent, setIsPermanent] = React.useState(false);
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
    setSlideNextFirst(false);
    setSlideNextSecond(true);
    console.log(data);
  };

  const secondStepHandler = async (data) => {
    setSlideNextFirst(false);
    setSlideNextSecond(false);
    setSlideNextThird(true);
    console.log(data);
  }

  const thirdStepHandler = async (data) => {
    if(displayFrontID !== null && displayBackId !== null && displaySignature !== null) {
      setIsLoadingFront(true);
      setIsLoadingBack(true);
      setIsLoading(true);
      setIsLoadingFinal(true);
      
      
      console.log("Submit data");
    } else {
      toast.error("Please upload your valid id / signature.", { autoClose: false });
    }
  }

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

  const handleAddressCallback = (value, addressType) => {
    (addressType === 1) ? setAddressState({...addressState, region: value }) :
    (addressType === 2) ? setAddressState({...addressState, province: value }) :
    (addressType === 3) ? setAddressState({...addressState, municipality: value }) :
    (addressType === 4) ? setAddressState({...addressState, barangay: value }) :
    setAddressState({...addressState, streetpurok: value });
  }

  const handleIsPermanet = (e , value) => {
    setIsPermanent(!value);
    if(!isPermanent) {
      handleResetAddress();
    } else {
      setAddressObj(null);
      reset(formValues => ({
        ...formValues,
        permanentRegion: "",
        permanentProvince: "",
        permanentMunicipality: "",
        permanentBarangay: "",
        permanentStreetOrPurok: ""
      }));
    }
  }

  const handleResetAddress = () => {
    setAddressObj(addressState);

    reset(formValues => ({
      ...formValues,
      permanentRegion: addressState.region,
      permanentProvince: addressState.province,
      permanentMunicipality: addressState.municipality,
      permanentBarangay: addressState.barangay,
      permanentStreetOrPurok: addressState.streetpurok
    }));
  }

  const [presentAddressOpen, setPresentAddressOpen] = React.useState(true);
  const handlePresentAddressClick = () => {
    setPresentAddressOpen(!presentAddressOpen);
  };
  const [permanentAddressOpen, setpermanentAddressOpen] = React.useState(false);
  const handlePermanentAddressClick = () => {
    setpermanentAddressOpen(!permanentAddressOpen);
    // if(!isPermanent) {
    //   handleResetAddress();
    // }
  };

  const [validIdOpen, setValidIdOpenOpen] = React.useState(false);
  const handleValidIdClick = () => {
    setValidIdOpenOpen(!validIdOpen);
  };

  const [signatureOpen, setSignatureOpen] = React.useState(false);
  const handleSignatureClick = () => {
    setSignatureOpen(!signatureOpen);
  };

  const handleUploadFrontID = async (e, image) => {
    if(govId !== null) {
      setIsLoadingFront(true);
      await UploadFile(accountObjectId, 2, image, govId);
      setIsLoadingFront(false);
      setDisplayFrontID(URL.createObjectURL(image));
    }
    else
      toast.error("Please select valid ID.", { autoClose: false });      
  }

  const handleUploadBackID = async (e, image) => {
    if(govId !== null) {
      setIsLoadingBack(true);
      await UploadFile(accountObjectId, 3, image, govId);
      setIsLoadingBack(false);
      setDisplayBackId(URL.createObjectURL(image));
    }
    else
      toast.error("Please select valid ID.", { autoClose: false });
  }

  const handleUploadSignature = async (e, image) => {
    setIsLoading(true);
    await UploadFile(accountObjectId, 4, image, null);
    setIsLoading(false);
    setDisplaySignature(URL.createObjectURL(image))
  }

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
                        <FormControlLabel value="male" control={<Radio 
                        { 
                          ...register("gender", ((slideNextFirst)) ? { required: true } : { required: false } ) 
                        }
                        />} label="Male" />
                        <FormControlLabel value="female" control={<Radio
                        { 
                          ...register("gender", ((slideNextFirst)) ? { required: true } : { required: false } ) 
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
                          ...register("martialStatus", ((slideNextFirst)) ? { required: true } : { required: false } ) 
                        }
                        error={ !!errors.martialStatus }
                        helperText={ errors.martialStatus?.message }
                        label="Select civil status" sx={{ width: "100%" }} defaultValue="" variant="outlined" size="small" select>
                        <MenuItem value=''><em>Select status</em></MenuItem>
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Married">Married</MenuItem>
                      </TextField>
                    </div>
                  </div>
                  <div className="divContent">
                    <div className="left">
                      <label>Birthday</label>
                    </div>
                    <div className="right">
                      <TextField
                        type="date"
                        { 
                          ...register("birthDate", ((slideNextFirst)) ? { required: true } : { required: false } ) 
                        }
                        error={ !!errors.birthDate }
                        helperText={ errors.birthDate?.message }
                        variant="outlined" size="small" fullWidth />
                    </div>
                  </div>
                  <div className="divContent">
                    <div className="left">
                      <label>Blood Type</label>
                    </div>
                    <div className="right">
                      <TextField
                        label="Select blood type"
                        { 
                          ...register("bloodType", ((slideNextFirst)) ? { required: true } : { required: false } ) 
                        }
                        error={ !!errors.bloodType }
                        helperText={ errors.bloodType?.message }
                        variant="outlined" size="small" fullWidth select>
                        <MenuItem value=""><em>Select blood type</em></MenuItem>
                          { 
                              BloodTypes().map((item) => (
                              <MenuItem data-region-code={item} key={item} value={item}>
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
                      <TextField
                        { 
                          ...register("natureOfWork", ((slideNextFirst)) ? { required: true } : { required: false } ) 
                        }
                        error={ !!errors.natureOfWork }
                        helperText={ errors.natureOfWork?.message }
                        variant="outlined" size="small" fullWidth />
                    </div>
                  </div>
                  <div className="divContent">
                    <div className="left">
                      <label>Source of Income</label>
                    </div>
                    <div className="right">
                      <TextField
                        { 
                          ...register("sourceOfIncome", ((slideNextFirst)) ? { required: true } : { required: false } ) 
                        }
                        error={ !!errors.sourceOfIncome }
                        helperText={ errors.sourceOfIncome?.message }
                        variant="outlined" size="small" fullWidth />
                    </div>
                  </div>
                  {/* <AddressWidget register={register} errors={errors} /> */}

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
                      sx={{ width: '100%', maxWidth: '95%', bgcolor: 'background.paper' }}
                      component="nav"
                    >
                      <ListItemButton onClick={handlePresentAddressClick}>
                        <ListItemText primary="Present Address" />
                        {presentAddressOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={presentAddressOpen} timeout="auto" unmountOnExit>
                        <List component="div" style={{ paddingLeft: '15px', textAlign:'left'}}>
                          <AddressWidget 
                            register={register} 
                            errors={errors} 
                            nextrequired={slideNextSecond}
                            callback={handleAddressCallback} />

                          <div className="divContent">
                            <div className="left">
                              <label>Street/Purok</label>
                            </div>
                            <div className="right">
                              <TextField
                                placeholder="Enter street/purok"
                                { 
                                  ...register("streetOrPurok", ((slideNextSecond)) ? { required: true } : { required: false } ) 
                                }
                                error={ !!errors.streetOrPurok }
                                helperText={ errors.streetOrPurok?.message }
                                onChange={e => handleAddressCallback(e.target.value, 5)}
                                label="Enter street/purok" variant="outlined" size="small" fullWidth />
                            </div>
                          </div>
                        </List>
                      </Collapse>
                    </List>
                  </div>
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox defaultValue={isPermanent} onChange={e => handleIsPermanet(e, isPermanent)} />
                      } label={
                        <div style={{fontSize:'14px'}}><span>Permanent Address Same with Present Address</span></div>
                      } />
                  </div>

                  <div className='divCollaps'>
                    <List
                      sx={{ width: '100%', maxWidth: '95%', bgcolor: 'background.paper' }}
                      component="nav"
                    >
                      <ListItemButton onClick={handlePermanentAddressClick}>
                        <ListItemText primary="Permanet Address" />
                        <span style={{color:'red', marginRight:'110px',fontSize:'12px'}}>required*</span>
                        {permanentAddressOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={permanentAddressOpen} timeout="auto" unmountOnExit>
                        <List component="div" style={{ paddingLeft: '15px', textAlign:'left'}}>

                          <PermanentAddressWidget 
                          register={register} 
                          errors={errors} 
                          nextrequired={slideNextSecond}
                          defaultData={addressObj} />

                          <div className="divContent">
                            <div className="left">
                              <label>Street/Purok</label>
                            </div>
                            <div className="right">
                              {
                                (addressObj !== null) ?
                                <TextField disabled
                                placeholder="Enter street/purok"
                                { ...register("permanentStreetOrPurok") }
                                variant="outlined" size="small" fullWidth />

                                :

                                <TextField 
                                placeholder="Enter street/purok"
                                { 
                                  ...register("permanentStreetOrPurok", ((slideNextSecond)) ? { required: true } : { required: false } ) 
                                }
                                error={ !!errors.streetOrPurok }
                                helperText={ errors.streetOrPurok?.message }
                                label="Enter street/purok" variant="outlined" size="small" fullWidth />
                              }
                            </div>
                          </div>
                        </List>
                      </Collapse>
                    </List>
                  </div>

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
                      sx={{ width: '100%', maxWidth: '95%', bgcolor: 'background.paper' }}
                      component="nav"
                    >
                      <ListItemButton onClick={handleValidIdClick}>
                        <ListItemText primary="Valid ID" />
                        <span style={{color:'red', marginRight:'190px',fontSize:'12px'}}>required*</span>
                        {validIdOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={validIdOpen} timeout="auto" unmountOnExit>
                        <List component="div" style={{ paddingLeft: '15px'}}>
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
                                      <MenuItem data-region-code={item} key={item} value={item}>
                                          {item}
                                      </MenuItem>
                                      ))
                                  }
                              </TextField>
                            </div>
                          </div>
                          <div className='row'>
                            <div className="col-6" style={{margin:'1px'}}>
                              <LoadingButton loading={ isLoadingFront }  
                              style={{ width: '195px', marginBottom:'10px'}} component="label" loadingPosition='end' variant="contained" startIcon={<FilterIcon />}>
                                Upload Front ID
                                <VisuallyHiddenInput type="file" name="file" accept="image/*" 
                                onChange={(e) => handleUploadFrontID(e, e.target.files[0])} />
                              </LoadingButton>
                              <div className='divImg'>
                                <img style={{ width: '180px', borderRadius:'10px'}}
                                className="imgFiles" src={(displayFrontID !== null) ? `${displayFrontID}` : `${process.env.PUBLIC_URL}/noimage.png`} alt="" />
                              </div>
                            </div>
                            <div className="col-6" style={{margin:'1px'}}>
                              <LoadingButton loading={ isLoadingBack }  
                              style={{ width: '195px', marginBottom:'10px'}} component="label" loadingPosition='end' variant="contained" startIcon={<FilterIcon />}>
                                Upload Back ID
                                <VisuallyHiddenInput type="file" name="file" accept="image/*" 
                                onChange={(e) => handleUploadBackID(e, e.target.files[0])} />
                              </LoadingButton>
                              <div className='divImg'>
                                <img style={{ width: '180px', borderRadius:'10px'}}
                                className="imgFiles" src={(displayBackId !== null) ? `${displayBackId}` : `${process.env.PUBLIC_URL}/noimage.png`} alt="" />
                              </div>
                            </div> 
                          </div>
                        </List>
                      </Collapse>
                    </List>
                  </div>
              
                  <div className='divCollaps'>
                    <List
                      sx={{ width: '100%', maxWidth: '95%', bgcolor: 'background.paper' }}
                      component="nav"
                    >
                      <ListItemButton onClick={handleSignatureClick}>
                        <ListItemText primary="Signature" />
                        <span style={{color:'red', marginRight:'190px',fontSize:'12px'}}>required*</span>
                        {signatureOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={signatureOpen} timeout="auto" unmountOnExit>
                        <List component="div" style={{ paddingLeft: '15px'}}>
                          <div>
                            <LoadingButton loading={ isLoading } 
                            style={{ width: '205px', marginBottom:'10px'}} 
                            component="label" variant="contained" loadingPosition='end' startIcon={<FilterIcon />}>
                              Upload Signature
                              <VisuallyHiddenInput type="file" name="file" accept="image/*" 
                              onChange={(e) => handleUploadSignature(e, e.target.files[0])}/>
                            </LoadingButton>
                            <div className="divImg" style={{ marginLeft: '25%'}}>
                              <img style={{ width: '180px', borderRadius:'10px'}}
                              className="imgFiles" src={(displaySignature !== null) ? `${displaySignature}` : `${process.env.PUBLIC_URL}/noimage.png`} alt="" />
                            </div>
                          </div>
                        </List>
                      </Collapse>
                    </List>
                  </div>

                  <div className='divfooter'>
                    <LoadingButton loading={ isLoadingFinal } onClick={handleBackToSecond} 
                    style={{ marginRight: '15px'}} variant="outlined" loadingPosition='end'>Back</LoadingButton>
                    <LoadingButton loading={ isLoadingFinal } 
                    type="submit" variant="outlined" color="success" loadingPosition='end'>
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
