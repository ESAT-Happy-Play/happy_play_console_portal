import React from 'react';
import "../dialogform.scss";
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, MenuItem, Button  } from "@mui/material"

import AddIcon from '@mui/icons-material/Add';

// Models
import { GameSimulatorModel } from "../../../model/GameSimulatorModel";
import MessageDialog from '../MessageDialog';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const AddEditSimulator = ({ isOpenModal, handleCloseModal, DataObj }) => {

  const [submitLoading, setSubmitLoading] = React.useState(false);

  const formWallet = useForm({ defaultValues: GameSimulatorModel.AddEditSimulatorForm });
  const { register, handleSubmit, formState, reset } = formWallet;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});

  const submitHandler = async (data) => {
    setFormData(data);
    handleOpenConfirm();
  };

  // Confiration dialog
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const handleOpenConfirm = () => { setOpenConfirm(true); };
  const handleConfirmClose = () => { setOpenConfirm(false); };
  const handleConfirmOkay = async () => {
    console.log("Submit");
  };

  const resetForm = () => {
    // reset form inputs
    reset(formValues => ({
      ...formValues
    }));

    // close all popup modal
    handleConfirmClose();
    handleCloseModal();

    setSubmitLoading(false);
  }

  return (
    <>
      <BootstrapDialog className="divDialogForm"
        open={ isOpenModal }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd" style={{ textTransform:'uppercase' }}>Add Simulator Schedule</div>
        </div>
        <DialogContent dividers>
          <div className='divStep'>
            <form onSubmit={ handleSubmit(submitHandler) } noValidate> 
              <br/>
              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'190px' }}>
                  <label>BlackOut</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='number'
                    placeholder="Enter Card Per Game"
                    { ...register("bbCardPerGame", { required: true } ) }
                    error={ !!errors.bbCardPerGame }
                    helperText={ errors.bbCardPerGame?.message }
                    variant="outlined" size="small" />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'190px' }}>
                  <label>First 5</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='number'
                    placeholder="Enter Card Per Game"
                    { ...register("f5CardPerGame", { required: true } ) }
                    error={ !!errors.f5CardPerGame }
                    helperText={ errors.f5CardPerGame?.message }
                    variant="outlined" size="small" />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'190px' }}>
                  <label>First 6</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='number'
                    placeholder="Enter Card Per Game"
                    { ...register("f6CardPerGame", { required: true } ) }
                    error={ !!errors.f6CardPerGame }
                    helperText={ errors.f6CardPerGame?.message }
                    variant="outlined" size="small" />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'190px' }}>
                  <label>First 7</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='number'
                    placeholder="Enter Card Per Game"
                    { ...register("f7CardPerGame", { required: true } ) }
                    error={ !!errors.f7CardPerGame }
                    helperText={ errors.f7CardPerGame?.message }
                    variant="outlined" size="small" />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'190px' }}>
                  <label>First 8</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='number'
                    placeholder="Enter Card Per Game"
                    { ...register("f8CardPerGame", { required: true } ) }
                    error={ !!errors.f8CardPerGame }
                    helperText={ errors.f8CardPerGame?.message }
                    variant="outlined" size="small" />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'190px' }}>
                  <label>No Of Players</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='number'
                    placeholder="Enter No. Of Players"
                    { ...register("noOfPlayer", { required: true } ) }
                    error={ !!errors.noOfPlayer }
                    helperText={ errors.noOfPlayer?.message }
                    variant="outlined" size="small" />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'190px' }}>
                  <label>Date</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='date'
                    { ...register("date", { required: true } ) }
                    error={ !!errors.date }
                    helperText={ errors.date?.message }
                    variant="outlined" size="small" />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'190px' }}>
                  <label>Time</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField 
                    placeholder="Select time"
                    { 
                        ...register("time", { required: true } ) 
                    }
                    error={ !!errors.time }
                    helperText={ errors.time?.message }
                    label="Select time" sx={{ width: "130px" }}  
                    defaultValue="" variant="outlined" size="small" select>
                    <MenuItem value=''><em>Select time</em></MenuItem>
                    <MenuItem value='1'>1 AM</MenuItem>
                    <MenuItem value='2'>2 AM</MenuItem>
                    <MenuItem value='3'>3 AM</MenuItem>
                    <MenuItem value='4'>4 AM</MenuItem>
                    <MenuItem value='5'>5 AM</MenuItem>
                    <MenuItem value='6'>6 AM</MenuItem>
                    <MenuItem value='7'>7 AM</MenuItem>
                    <MenuItem value='8'>8 AM</MenuItem>
                    <MenuItem value='9'>9 AM</MenuItem>
                    <MenuItem value='10'>10 AM</MenuItem>
                    <MenuItem value='11'>11 AM</MenuItem>
                    <MenuItem value='12'>12 PM</MenuItem>
                    <MenuItem value='13'>1 PM</MenuItem>
                    <MenuItem value='14'>2 PM</MenuItem>
                    <MenuItem value='15'>3 PM</MenuItem>
                    <MenuItem value='16'>4 PM</MenuItem>
                    <MenuItem value='17'>5 PM</MenuItem>
                    <MenuItem value='18'>6 PM</MenuItem>
                    <MenuItem value='19'>7 PM</MenuItem>
                    <MenuItem value='20'>8 PM</MenuItem>
                    <MenuItem value='21'>9 PM</MenuItem>
                    <MenuItem value='22'>10 PM</MenuItem>
                    <MenuItem value='23'>11 PM</MenuItem>
                    <MenuItem value='24'>12 AM</MenuItem>
                </TextField>
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'190px' }}>
                  <label>Time Interval</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='number'
                    placeholder="Enter Time Interval"
                    { ...register("timeInterval", { required: true } ) }
                    error={ !!errors.timeInterval }
                    helperText={ errors.timeInterval?.message }
                    variant="outlined" size="small" />
                </div>
              </div>

              <br/>

              <div className="divContent">
                <div className="left"></div>
                <div className="right divFoot">
                <Button onClick={ handleCloseModal } variant="outlined">Cancel</Button>
                <Button type="submit" sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                  Add <AddIcon />
                </Button>
                </div>
              </div>
            </form>
          </div>
          
        </DialogContent>
      </BootstrapDialog>

      <MessageDialog
        isOpenMessage={ openConfirm } 
        handleCloseMessage={ handleConfirmClose } 
        handleOkay={ handleConfirmOkay } 
        title={ "Confirm" } 
        content={ (`Are you sure you want to add new simulator schedule?`) }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default AddEditSimulator
