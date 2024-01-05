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
  
const AddProfile = ({ isOpenAdd, handleCloseAdd, handleCallback }) => {

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
      handleCloseAdd();

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
    let objformdata = {
      profilename: formData.profilename,
      g1_superadmin: formData.g1_superadmin ? 1 : 0,
      g1_company: formData.g1_company ? 1 : 0,
      g1_branch: formData.g1_branch ? 1 : 0,
      g1_profiles: formData.g1_profiles ? 1 : 0,
      g1_game: formData.g1_game ? 1 : 0,
      g2_systemusers: formData.g2_systemusers ? 1 : 0,
      g2_operators: formData.g2_operators ? 1 : 0,
      g2_userverification: formData.g2_userverification ? 1 : 0,
      g2_masteragents: formData.g2_masteragents ? 1 : 0,
      g2_agents: formData.g2_agents ? 1 : 0,
      g2_players: formData.g2_players ? 1 : 0,
      g3_gameschedulesettings: formData.g3_gameschedulesettings ? 1 : 0,
      g3_gamemechanicssettings: formData.g3_gamemechanicssettings ? 1 : 0,
      g3_gamewinningsettings: formData.g3_gamewinningsettings ? 1 : 0,
      g3_gamebets: formData.g3_gamebets ? 1 : 0,
      g3_gameresults: formData.g3_gameresults ? 1 : 0,
      g4_txtblast: formData.g4_txtblast ? 1 : 0,
      g4_announcements: formData.g4_announcements ? 1 : 0,
      g4_livestream: formData.g4_livestream ? 1 : 0,
      g5_sales: formData.g5_sales ? 1 : 0,
      g5_transactions: formData.g5_transactions ? 1 : 0,
      g5_useractivity: formData.g5_useractivity ? 1 : 0,
      g5_usergrowth: formData.g5_usergrowth ? 1 : 0
    }

    setSubmitLoading(true);
    let response = await POSTFetch(`${process.env.REACT_APP_API_URL}/users/accessprofile`, objformdata);
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
        open={ isOpenAdd }
        disableEscapeKeyDown
      >
        <div className="dialogHeader"> 
          <div className="rd">ADD NEW PROFILE</div>
        </div>
        <DialogContent dividers>
        
          <div id="step1" className="divStep">
            <form onSubmit={ handleSubmit(finalStepHandler) } noValidate>
              <div className="div-bottom">
                <span style={{marginTop:'8px'}}>Profile Name</span>
                <TextField 
                    placeholder="Enter profile name"
                    { 
                      ...register("profilename", { required: true } ) 
                    }
                    error={ !!errors.profilename }
                    helperText={ errors.profilename?.message }
                    label="Enter profile name" variant="outlined" size="small" />
              </div>

              <div className="div-content-wrapper">
                <div className="div-content">
                  <h4>CATEGORY</h4>
                  <div style={{marginTop:'15px'}}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox {...register('g1_superadmin', {})} />} label="Super Admin" />
                      <FormControlLabel control={<Checkbox {...register('g1_company', {})} />} label="Company" />
                      <FormControlLabel control={<Checkbox {...register('g1_branch', {})} />} label="Branch" />
                      <FormControlLabel control={<Checkbox {...register('g1_profiles', {})} />} label="Profiles" />
                      <FormControlLabel control={<Checkbox {...register('g1_game', {})} />} label="Games" />
                    </FormGroup>
                  </div>
                </div>
                <div className="div-content">
                  <h4>USER ACCOUNT</h4>
                  <div style={{marginTop:'15px'}}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox {...register('g2_systemusers', {})} />} label="System Users" />
                      <FormControlLabel control={<Checkbox {...register('g2_operators', {})} />} label="Operators" />
                      <FormControlLabel control={<Checkbox {...register('g2_userverification', {})} />} label="User Verification" />
                      <FormControlLabel control={<Checkbox {...register('g2_masteragents', {})} />} label="Master Agents" />
                      <FormControlLabel control={<Checkbox {...register('g2_agents', {})} />} label="Agents" />
                      <FormControlLabel control={<Checkbox {...register('g2_players', {})} />} label="Players" />
                    </FormGroup>
                  </div>
                </div>
                <div className="div-content">
                  <h4>GAME</h4>
                  <div style={{marginTop:'15px'}}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox {...register('g3_gameschedulesettings', {})} />} label="Game Schedule Settings" />
                      <FormControlLabel control={<Checkbox {...register('g3_gamemechanicssettings', {})} />} label="Game Mechanics Settings" />
                      <FormControlLabel control={<Checkbox {...register('g3_gamewinningsettings', {})} />} label="Price & Prizes" />
                      <FormControlLabel control={<Checkbox {...register('g3_gamebets', {})} />} label="Bets" />
                      <FormControlLabel control={<Checkbox {...register('g3_gameresults', {})} />} label="Game Result" />
                    </FormGroup>
                  </div>
                </div>
                <div className="div-content">
                  <h4>POSTINGS</h4>
                  <div style={{marginTop:'15px'}}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox {...register('g4_txtblast', {})} />} label="Text Blast" />
                      <FormControlLabel control={<Checkbox {...register('g4_announcements', {})} />} label="Announcements" />
                      <FormControlLabel control={<Checkbox {...register('g4_livestream', {})} />} label="Livestreaming" />
                    </FormGroup>
                  </div>
                </div>
                <div className="div-content">
                  <h4>REPORTS</h4>
                  <div style={{marginTop:'15px'}}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox {...register('g5_sales', {})} />} label="Sales" />
                      <FormControlLabel control={<Checkbox {...register('g5_transactions', {})} />} label="Transactions" />
                      <FormControlLabel control={<Checkbox {...register('g5_useractivity', {})} />} label="User Activity" />
                      <FormControlLabel control={<Checkbox {...register('g5_usergrowth', {})} />} label="User Growth" />
                    </FormGroup>
                  </div>
                </div>
              </div>

              <div className="div-bottom">
                <Button onClick={ handleCloseAdd } variant="outlined">Cancel</Button>
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
        content={ "Are you sure you want to add new profile?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default AddProfile
