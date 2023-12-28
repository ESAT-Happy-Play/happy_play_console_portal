import React, { useState, useEffect } from 'react';
import "../dialogform.scss";
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, Button  } from "@mui/material"

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MessageDialog from "../MessageDialog";

// Models
import { SettingModel } from "../../../model/SettingModel";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const EditMechanicSetting = ({ isOpenAddSetting, handleCloseEditSetting, handleCallback, gameObj }) => {

  const formSetting = useForm({ defaultValues: SettingModel.EditSettingForm });
  const { register, handleSubmit, formState, reset } = formSetting;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);

  // trigger if company Data state change
  useEffect(() => {
    if(gameObj.length > 0) {
      reset(formValues => ({
        ...formValues,
        maxBetPerDraw: gameObj[0].maxBetPerDraw
      }));
    }
  }, [gameObj]);

  const resetForm = () => {
      // close all popup modal
      handleSettingSubmitClose();
      handleCloseEditSetting();

      setSubmitLoading(false);
  }

  const handleUpdateSubmit = async (data) => {
    setFormData(data);
    handleSettingSubmitOpen();
  };

  // Confiration dialog message for add Setting
  const [openConfirmSettingSubmit, setConfirmSettingSubmit] = React.useState(false);
  const handleSettingSubmitOpen = () => { setConfirmSettingSubmit(true); };
  const handleSettingSubmitClose = () => { setConfirmSettingSubmit(false); };
  const handleSettingOkay = async () => {
    console.log("Submit Mechanic SEtting");
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm"
        open={ isOpenAddSetting }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd">EDIT MECHANIC SETTING</div>
        </div>
        <DialogContent dividers>
        
          <div className="divStep">
            <form onSubmit={ handleSubmit(handleUpdateSubmit) } noValidate>
              <br/>
              <div className="divContent">
                <div className="left" style={{ width: "150px", flex:'none' }}>
                  <label>Max Bet Per Draw</label>
                </div>
                <div className="right">
                  <div>
                    <TextField
                    type='number'
                    placeholder="Enter Max Bet Per Draw"
                    { 
                        ...register("maxBetPerDraw", { required: "Max Bet Per Draw is required" } ) 
                    }
                    error={ !!errors.maxBetPerDraw }
                    helperText={ errors.maxBetPerDraw?.message }
                    label="Enter Max Bet Per Draw" sx={{ width: "100%" }} defaultValue="" variant="outlined" size="small" />
                  </div>
                </div>
              </div>

              <br/>

              <div className="divContent">
                <div className="left"></div>
                <div className="right divFoot">
                <Button onClick={ handleCloseEditSetting } variant="outlined">Cancel</Button>
                <Button type="submit" sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                  Update <EditOutlinedIcon />
                </Button>
                </div>
              </div>
            </form>
          </div>
          
        </DialogContent>
      </BootstrapDialog>

      <MessageDialog
        isOpenMessage={ openConfirmSettingSubmit } 
        handleCloseMessage={ handleSettingSubmitClose } 
        handleOkay={ handleSettingOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to edit setting?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default EditMechanicSetting
