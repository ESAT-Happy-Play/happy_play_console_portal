import "./../../dialogform.scss";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TextField, Button, MenuItem  } from "@mui/material"

import SaveAsIcon from '@mui/icons-material/SaveAs';
import MessageDialog from "../../MessageDialog";

// Models
import { ProfileModel } from "../../../../model/ProfileModel";

import { POSTFetch } from "../../../../api/ApiFetchBuilder";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const EditProfile = ({ isOpenEdit, handleCloseEdit, handleCallback }) => {

  const [pageLoader, setPageLoader] = useState(false);
  const formProfile = useForm({ defaultValues: ProfileModel.AddProfileForm });
  const { register, handleSubmit, formState, reset } = formProfile;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);

  // final step submit handler
  const finalStepHandler = async (data) => {
    setFormData(data);
    handleSubmitOpen();
  };

  const resetForm = () => {
      // close all popup modal
      handleSubmitClose();
      handleCloseEdit();

      // reset form inputs
      reset(ProfileModel.AddProfileForm);
      setSubmitLoading(false);

      handleCallback();
  }

  // Confiration dialog message for add company
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleProfileOkay = async () => {
    setSubmitLoading(true);
    let response = await POSTFetch(`${process.env.REACT_APP_API_URL}/branches`, formData);
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
      <BootstrapDialog className="largeDivDialogForm"
        open={ isOpenEdit }
        disableEscapeKeyDown
      >
        <div className="dialogHeader"> 
          <div className="rd">EDIT PROFILE</div>
        </div>
        <DialogContent dividers>
        
          <div id="step1" className="divStep">
            <form onSubmit={ handleSubmit(finalStepHandler) } noValidate>
              <div className="div-bottom">
                <span style={{marginTop:'8px'}}>Profile Name</span>
                <TextField 
                    placeholder="Enter profile name"
                    { 
                      ...register("profileName", { required: true } ) 
                    }
                    error={ !!errors.profileName }
                    helperText={ errors.profileName?.message }
                    label="Enter profile name" variant="outlined" size="small" />
              </div>

              <div className="div-content-wrapper">
                <div className="div-content">
                  <h4>CATEGORY</h4>
                  <div style={{marginTop:'15px'}}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox {...register('superAdmin', {})} />} label="Super Admin" />
                      <FormControlLabel control={<Checkbox />} label="Company" />
                      <FormControlLabel control={<Checkbox />} label="Branch" />
                      <FormControlLabel control={<Checkbox />} label="Profiles" />
                      <FormControlLabel control={<Checkbox />} label="Games" />
                    </FormGroup>
                  </div>
                </div>
                <div className="div-content">
                  <h4>USER ACCOUNT</h4>
                  <div style={{marginTop:'15px'}}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label="System Users" />
                      <FormControlLabel control={<Checkbox />} label="Operators" />
                      <FormControlLabel control={<Checkbox />} label="User Verification" />
                      <FormControlLabel control={<Checkbox />} label="Master Agents" />
                      <FormControlLabel control={<Checkbox />} label="Agents" />
                      <FormControlLabel control={<Checkbox />} label="Players" />
                    </FormGroup>
                  </div>
                </div>
                <div className="div-content">
                  <h4>GAME</h4>
                  <div style={{marginTop:'15px'}}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label="Game Schedule Settings" />
                      <FormControlLabel control={<Checkbox />} label="Game Mechanics Settings" />
                      <FormControlLabel control={<Checkbox />} label="Price & Prizes" />
                      <FormControlLabel control={<Checkbox />} label="Bets" />
                      <FormControlLabel control={<Checkbox />} label="Game Result" />
                    </FormGroup>
                  </div>
                </div>
                <div className="div-content">
                  <h4>POSTINGS</h4>
                  <div style={{marginTop:'15px'}}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label="Text Blast" />
                      <FormControlLabel control={<Checkbox />} label="Announcements" />
                      <FormControlLabel control={<Checkbox />} label="Livestreaming" />
                    </FormGroup>
                  </div>
                </div>
                <div className="div-content">
                  <h4>REPORTS</h4>
                  <div style={{marginTop:'15px'}}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label="Sales" />
                      <FormControlLabel control={<Checkbox />} label="Transactions" />
                      <FormControlLabel control={<Checkbox />} label="User Activity" />
                      <FormControlLabel control={<Checkbox />} label="User Growth" />
                    </FormGroup>
                  </div>
                </div>
              </div>

              <div className="div-bottom">
                <Button onClick={ handleCloseEdit } variant="outlined">Cancel</Button>
                <Button type="submit" sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                  Submit &nbsp; <SaveAsIcon/>
                </Button>
              </div>
            </form>
          </div>
          
        </DialogContent>
      </BootstrapDialog>

      <MessageDialog
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleProfileOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to edit profile?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default EditProfile
