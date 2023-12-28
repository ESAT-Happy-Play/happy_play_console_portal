import React, { useState, useEffect } from 'react';
import "../dialogform.scss";
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, MenuItem, Button  } from "@mui/material"

import AddIcon from '@mui/icons-material/Add';
import MessageDialog from "../MessageDialog";

// Models
import { ScheduleModel } from "../../../model/ScheduleModel";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const AddSchedule = ({ isOpenAddSchedule, handleCloseAddSchedule, handleCallback, currentDate, gameType, listDrawTypes }) => {

  const formSchedule = useForm({ defaultValues: ScheduleModel.AddScheduleForm });
  const { register, handleSubmit, formState, reset } = formSchedule;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);

  useEffect(() => {
    if (gameType.length > 0) {
      reset(formValues => ({
        ...formValues,
        gameTypeId: gameType[0].gameTypeId,
        date: formatDate(currentDate)
      }));
    }
  }, [gameType, currentDate]);

  const formatDate = (curdate) => {
    let dt = (new Date(curdate));
    var mm = ('0' + (dt.getMonth()+1)).slice(-2);
    var dd = ('0' + (dt.getDate())).slice(-2);
    var yy = dt.getFullYear();

    return (yy + '-' + mm + '-' + dd)
  }

    // final step submit handler
  const handleAddSchedule = async (data) => {
    setFormData(data);
    handleScheduleSubmitOpen();
  };

  const resetForm = () => {
      // close all popup modal
      handleScheduleSubmitClose();
      handleCloseAddSchedule();

      // reset form inputs
      reset(ScheduleModel.AddScheduleForm);

      setSubmitLoading(false);
  }

  // Confiration dialog message for add Schedule
  const [openConfirmScheduleSubmit, setConfirmScheduleSubmit] = React.useState(false);
  const handleScheduleSubmitOpen = () => { setConfirmScheduleSubmit(true); };
  const handleScheduleSubmitClose = () => { setConfirmScheduleSubmit(false); };
  const handleScheduleOkay = async () => {
    console.log("submit schedule");
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm"
        open={ isOpenAddSchedule }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd">ADD SCHEDULE</div>
        </div>
        <DialogContent dividers>
          <div className='divStep'>
            <form onSubmit={ handleSubmit(handleAddSchedule) } noValidate> 
              <br/>
              <div className="divContent">
                <div className="left">
                  <label>GAME TYPE</label>
                </div>
                <div className="right" style={ {flex: 4, paddingTop: "5px" } }>
                  <b>{ (gameType.length > 0) ? gameType[0].gameTypeName : "Please select game type" }</b>
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>DRAW TYPE</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField 
                    placeholder="Select draw type"
                    { 
                        ...register("gameDrawTypeId", { required: "Draw type is required" } ) 
                    }
                    error={ !!errors.gameDrawTypeId }
                    helperText={ errors.gameDrawTypeId?.message }
                    label="Select draw type" defaultValue="" variant="outlined" size="small" fullWidth select>
                    <MenuItem value=''><em>Select draw type</em></MenuItem>
                    { 
                      (listDrawTypes !== undefined) ?
                        (listDrawTypes.length !== 0) ? listDrawTypes.map((item) => (
                        <MenuItem key={item.gameDrawTypeId} value={item.gameDrawTypeId}>
                            {item.drawTypeName}
                        </MenuItem>
                        )) :
                        <MenuItem value=''>No records found!</MenuItem>
                      :
                      <MenuItem value=''>No records found!</MenuItem>
                    }
                    </TextField>
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>DATE</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField
                    type="date"
                    { 
                      ...register("date", { required: "Date is required" } ) 
                    }
                    error={ !!errors.date }
                    helperText={ errors.date?.message }
                    variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <br/>

              <div className="divContent">
                <div className="left"></div>
                <div className="right divFoot">
                <Button onClick={ handleCloseAddSchedule } variant="outlined">Cancel</Button>
                <Button type="submit" sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                  Add <AddIcon/>
                </Button>
                </div>
              </div>
            </form>
          </div>
          
        </DialogContent>
      </BootstrapDialog>

      <MessageDialog
        isOpenMessage={ openConfirmScheduleSubmit } 
        handleCloseMessage={ handleScheduleSubmitClose } 
        handleOkay={ handleScheduleOkay } 
        title={ "Confirm Schedule" } 
        content={ ("You are about to close the game on " + formData.date) }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default AddSchedule
