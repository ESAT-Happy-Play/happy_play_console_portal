import React from 'react';
import "../dialogform.scss";
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, MenuItem, Button  } from "@mui/material"

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import MessageDialog from "../MessageDialog";
import AddressWidget from '../../widget/AddressWidget';
// Models
import { CompanyModel } from "../../../model/CompanyModel";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const AddCompany = ({ isOpenAddCompany, handleCloseAddCompany, handleCallback }) => {

  const formCompany = useForm({ defaultValues: CompanyModel.CompanyForm });
  const { register, handleSubmit, formState, reset } = formCompany;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const [slideNext, setSlideNext] = React.useState(false);
  const [slidePrev, setSlidePrev] = React.useState(true);

  const handleSlideBack = () => {
    setSlideNext(false);
    setSlidePrev(true);
  };

  // on form submit 1st step
  const firstStepHandler = async () => {
    setSlideNext(true);
    setSlidePrev(false);
  };

  // final step submit handler
  const finalStepHandler = async (data) => {
    setFormData(data);
    handleCompanySubmitOpen();
  };

  const resetForm = () => {
    // set to first step state
      setSlideNext(false);
      setSlidePrev(true);

      // close all popup modal
      handleCompanySubmitClose();
      handleCloseAddCompany();

      // reset form inputs
      reset(CompanyModel.CompanyForm);
      setSubmitLoading(false);
  }

  // Confiration dialog message for add company
  const [openConfirmCompanySubmit, setConfirmCompanySubmit] = React.useState(false);
  const handleCompanySubmitOpen = () => { setConfirmCompanySubmit(true); };
  const handleCompanySubmitClose = () => { setConfirmCompanySubmit(false); };
  const handleCompanyOkay = async () => {
    console.log("Submit Company Object");
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm"
        open={ isOpenAddCompany }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd">REGISTER COMPANY</div>
        </div>
        <DialogContent dividers>
        
          <div id="step1" className={ (!slidePrev) ? "divStep hide" : "divStep" }>
            <form onSubmit={ handleSubmit(firstStepHandler) } noValidate>
              <h3>COMPANY IDENTITY</h3>
              <br />
              <div className="divContent">
                <div className="left">
                  <label>COMPANY NAME</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter company name"
                    { 
                      ...register("companyName", { required: true } ) 
                    }
                    error={ !!errors.companyName }
                    helperText={ errors.companyName?.message }
                    label="Enter company name" variant="outlined" size="small" fullWidth />
                </div>
              </div>
              <div className="divContent">
                <div className="left">
                  <label>BRANCH NAME</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter branch name"
                    { 
                      ...register("branchName", { required: true } ) 
                    }
                    error={ !!errors.branchName }
                    helperText={ errors.branchName?.message }
                    label="Enter branch name" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <br />

              <AddressWidget register={register} errors={errors} />

              <div className="divContent">
                <div className="left">
                  <label>STREET/PUROK</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter street/purok"
                    { 
                      ...register("streetOrPurok", { required: true } ) 
                    }
                    error={ !!errors.streetOrPurok }
                    helperText={ errors.streetOrPurok?.message }
                    label="Enter street/purok" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <br/>

              <div className="divContent">
                <div className="left"></div>
                <div className="right divFoot">
                <Button onClick={ handleCloseAddCompany } variant="outlined">Cancel</Button>
                <Button type="submit" sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                  Proceed <ArrowForwardOutlinedIcon/>
                </Button>
                </div>
              </div>
            </form>
          </div>

          <div id="step2" className={ (!slideNext) ? "divStep hide" : "divStep" }>
            <form onSubmit={ handleSubmit(finalStepHandler) } noValidate> 
              <h3>OPERATOR</h3>
              <br />
              <div className="divContent">
                <div className="left">
                  <label>FIRST NAME</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter firstname"
                    { 
                      ...register("firstName", ((!slidePrev)) ? { required: true } : { required: false } ) 
                    }
                    error={ !!errors.firstName }
                    helperText={ errors.firstName?.message }
                    label="Enter firstname" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>LAST NAME</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter lastname"
                    { 
                      ...register("lastName", ((!slidePrev)) ? { required: true } : { required: false } ) 
                    }
                    error={ !!errors.lastName }
                    helperText={ errors.lastName?.message }
                    label="Enter lastname" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>MIDDLE NAME</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter middlename"
                    { 
                      ...register("middleName", { required: false } ) 
                    }
                    error={ !!errors.middleName }
                    helperText={ errors.middleName?.message }
                    label="Enter middlename" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>EMAIL</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter email"
                    { 
                      ...register("email", ((!slidePrev)) ? 
                      { 
                        required: false,
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Entered value does not match email format"
                        } 
                      } : { required: false } ) 
                    }
                    error={ !!errors.email }
                    helperText={ errors.email?.message }
                    label="Enter email" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>SEX</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter gender"
                    { 
                      ...register("gender", ((!slidePrev)) ? { required: true } : { required: false } ) 
                    }
                    error={ !!errors.gender }
                    helperText={ errors.gender?.message }
                    label="Select gender" sx={{ width: "70%" }} defaultValue="" variant="outlined" size="small" select>
                    <MenuItem value=''><em>Select gender</em></MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </TextField>
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>MARITAL STATUS</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter marital status"
                    { 
                      ...register("martialStatus", ((!slidePrev)) ? { required: true } : { required: false } ) 
                    }
                    error={ !!errors.martialStatus }
                    helperText={ errors.martialStatus?.message }
                    label="Select marital status" sx={{ width: "70%" }} defaultValue="" variant="outlined" size="small" select>
                    <MenuItem value=''><em>Select status</em></MenuItem>
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                  </TextField>
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>BIRTHDAY</label>
                </div>
                <div className="right">
                  <TextField
                    type="date"
                    { 
                      ...register("birthDate", ((!slidePrev)) ? { required: true } : { required: false } ) 
                    }
                    error={ !!errors.birthDate }
                    helperText={ errors.birthDate?.message }
                    variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>CONTACT NUMBER</label>
                </div>
                <div className="right">
                  <TextField 
                    type='number'
                    placeholder="Enter contact number"
                    { 
                      ...register("contactNumber", ((!slidePrev)) ? 
                      { 
                        required: true,
                        minLength: {
                          value: 10,
                          message: "Phone number must at least 10 digits"
                        },
                        // pattern:{
                        //   value: /^(0|[1-9]\d*)(\.\d+)?$/
                        // },
                      } : { required: false } ) 
                    }
                    error={ !!errors.contactNumber }
                    helperText={ errors.contactNumber?.message }
                    label="Enter contact number" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <br/>

              <div className="divContent">
                <div className="left"></div>
                <div className="right divFoot">
                <Button onClick={ handleSlideBack } variant="outlined">Back</Button>
                <Button type="submit" sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                  Proceed <ArrowForwardOutlinedIcon/>
                </Button>
                </div>
              </div>
            </form>
          </div>
          
        </DialogContent>
      </BootstrapDialog>

      <MessageDialog
        isOpenMessage={ openConfirmCompanySubmit } 
        handleCloseMessage={ handleCompanySubmitClose } 
        handleOkay={ handleCompanyOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to add new company?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default AddCompany
