import React, { useState, useEffect } from 'react';
import "../dialogform.scss";
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, MenuItem, Button  } from "@mui/material"

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import MessageDialog from "../MessageDialog";
import AddressWidget from '../../widget/AddressWidget';

// Models
import { BranchModel } from "../../../model/BranchModel";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const AddBranch = ({ isOpenAddBranch, handleCloseAddBranch, handleCallback, companyId }) => {

  const formBranch = useForm({ defaultValues: BranchModel.BranchForm });
  const { register, handleSubmit, formState, reset } = formBranch;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [companies, setCompanies] = useState([]);

  // trigger if company Data state change
  useEffect(() => {
    reset(formValues => ({
      ...formValues,
      companyId: companyId
    }));
  }, [companyId, reset]);

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
    handleBranchSubmitOpen();
  };

  const resetForm = () => {
    // set to first step state
      setSlideNext(false);
      setSlidePrev(true);

      // close all popup modal
      handleBranchSubmitClose();
      handleCloseAddBranch();

      // reset form inputs
      reset(formValues => ({
        ...formValues,
        companyId: companyId
      }));

      setSubmitLoading(false);
  }

  // Confiration dialog message for add Branch
  const [openConfirmBranchSubmit, setConfirmBranchSubmit] = React.useState(false);
  const handleBranchSubmitOpen = () => { setConfirmBranchSubmit(true); };
  const handleBranchSubmitClose = () => { setConfirmBranchSubmit(false); };
  const handleBranchOkay = async () => {
    console.log("Submit branch object");
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm"
        open={ isOpenAddBranch }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd">NEW BRANCH</div>
        </div>
        <DialogContent dividers>
        
          <div id="step1" className={ (!slidePrev) ? "divStep hide" : "divStep" }>
            <form onSubmit={ handleSubmit(firstStepHandler) } noValidate>
              <div className={ (companyId !== undefined) ? 'hide divContent' : 'divContent' }>
                <div className="left">
                  <label>COMPANY NAME</label>
                </div>
                <div className="right">
                  <div>
                    <TextField
                    placeholder="Select Company"
                    { 
                        ...register("companyId",  ((companyId !== undefined)) ? { required: false } : { required: true } ) 
                    }
                    error={ !!errors.companyId }
                    helperText={ errors.companyId?.message }
                    label="Select Company" sx={{ width: "100%" }} defaultValue="" variant="outlined" size="small" select>
                    <MenuItem value=''><em>Select Company</em></MenuItem>
                    { 
                        (companies.length !== 0) ? companies.map((item) => (
                        <MenuItem key={item.companyId} value={item.companyId}>
                            {item.companyName}
                        </MenuItem>
                        )) :
                        <MenuItem value=''>Loading options...</MenuItem>
                    }
                    </TextField>
                  </div>
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
                <Button onClick={ handleCloseAddBranch } variant="outlined">Cancel</Button>
                <Button type="submit" sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                  Proceed <ArrowForwardOutlinedIcon/>
                </Button>
                </div>
              </div>
            </form>
          </div>

          <div id="step2" className={ (!slideNext) ? "divStep hide" : "divStep" }>
            <form onSubmit={ handleSubmit(finalStepHandler) } noValidate> 
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
        isOpenMessage={ openConfirmBranchSubmit } 
        handleCloseMessage={ handleBranchSubmitClose } 
        handleOkay={ handleBranchOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to add new Branch?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default AddBranch
