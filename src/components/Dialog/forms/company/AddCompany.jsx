import React from 'react';
import "./../../dialogform.scss";
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, MenuItem, Button  } from "@mui/material"

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import MessageDialog from "../../MessageDialog";

// Models
import { CompanyModel } from "../../../../model/CompanyModel";
import DefaultAddressWidget from '../../../widget/address/DefaultAddressWidget';

import { POSTFetch } from "../../../../api/ApiFetchBuilder";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const AddCompany = ({ isOpenAdd, handleCloseAdd, handleCallback }) => {

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
    handleSubmitOpen();
  };

  const resetForm = () => {
    // set to first step state
      setSlideNext(false);
      setSlidePrev(true);

      // close all popup modal
      handleSubmitClose();
      handleCloseAdd();

      // reset form inputs
      reset(CompanyModel.CompanyForm);
      setSubmitLoading(false);

      handleCallback();
  }

  // Confiration dialog message for add company
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleCompanyOkay = async () => {
    setSubmitLoading(true);
    let response = await POSTFetch(`${process.env.REACT_APP_API_URL}/companies`, formData);
    if(response.status) {
      toast.success(response.data.message);
      resetForm();
    }

    if(!response.status) {
      setSubmitLoading(false);
      toast.error(response.data.errorMessage);
    }
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm"
        open={ isOpenAdd }
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

              <DefaultAddressWidget register={register} errors={errors} />

              <div className="divContent">
                <div className="left">
                  <label>STREET/PUROK</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter street/purok"
                    { 
                      ...register("branchSitio", { required: true } ) 
                    }
                    error={ !!errors.branchSitio }
                    helperText={ errors.branchSitio?.message }
                    label="Enter street/purok" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <br/>

              <div className="divContent">
                <div className="left"></div>
                <div className="right divFoot">
                <Button onClick={ handleCloseAdd } variant="outlined">Cancel</Button>
                <Button type="submit" sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                  Proceed &nbsp; <ArrowForwardOutlinedIcon/>
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
                      ...register("operatorFirstname", ((!slidePrev)) ? { required: true } : { required: false } ) 
                    }
                    error={ !!errors.operatorFirstname }
                    helperText={ errors.operatorFirstname?.message }
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
                      ...register("operatorLastname", ((!slidePrev)) ? { required: true } : { required: false } ) 
                    }
                    error={ !!errors.operatorLastname }
                    helperText={ errors.operatorLastname?.message }
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
                      ...register("operatorMiddlename", { required: false } ) 
                    }
                    error={ !!errors.operatorMiddlename }
                    helperText={ errors.operatorMiddlename?.message }
                    label="Enter middlename" variant="outlined" size="small" fullWidth />
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
                      ...register("operatorSex", ((!slidePrev)) ? { required: true } : { required: false } ) 
                    }
                    error={ !!errors.operatorSex }
                    helperText={ errors.operatorSex?.message }
                    label="Select gender" sx={{ width: "70%" }} defaultValue="" variant="outlined" size="small" select>
                    <MenuItem value=''><em>Select gender</em></MenuItem>
                    <MenuItem value="0">Male</MenuItem>
                    <MenuItem value="1">Female</MenuItem>
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
                      ...register("operatorCivilStatus", ((!slidePrev)) ? { required: true } : { required: false } ) 
                    }
                    error={ !!errors.operatorCivilStatus }
                    helperText={ errors.operatorCivilStatus?.message }
                    label="Select marital status" sx={{ width: "70%" }} defaultValue="" variant="outlined" size="small" select>
                    <MenuItem value=''><em>Select status</em></MenuItem>
                    <MenuItem value="0">Single</MenuItem>
                    <MenuItem value="1">Married</MenuItem>
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
                      ...register("operatorBirthday", ((!slidePrev)) ? { required: true } : { required: false } ) 
                    }
                    error={ !!errors.operatorBirthday }
                    helperText={ errors.operatorBirthday?.message }
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
                      ...register("operatorMobileNumber", ((!slidePrev)) ? 
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
                    error={ !!errors.operatorMobileNumber }
                    helperText={ errors.operatorMobileNumber?.message }
                    label="Enter contact number" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <br/>

              <div className="divContent">
                <div className="left"></div>
                <div className="right divFoot">
                <Button onClick={ handleSlideBack } variant="outlined">Back</Button>
                <Button type="submit" sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                  Submit &nbsp; <SaveAsIcon/>
                </Button>
                </div>
              </div>
            </form>
          </div>
          
        </DialogContent>
      </BootstrapDialog>

      <MessageDialog
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleCompanyOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to add new company?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default AddCompany
