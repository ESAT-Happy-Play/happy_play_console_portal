import React, { useState, useEffect } from 'react';
import "../dialogform.scss";
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, Button  } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

// Models
import { GameDrawTypeModel } from "../../../model/GameDrawTypeModel";
import MessageDialog from '../MessageDialog';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const AddEditGameDrawType = ({ isOpenModal, handleCloseModal, gameId, Obj, CallBackFunc }) => {

  const [submitLoading, setSubmitLoading] = React.useState(false);
  const formDrawType = useForm({ defaultValues: GameDrawTypeModel.DrawTypeForm });
  const { register, handleSubmit, formState, reset } = formDrawType;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  
  useEffect(() => {

    if(Obj !== null) {
        reset(formValues => ({
        ...formValues,
        gameTypeId: gameId,
        gameDrawTypeId: Obj.gameDrawTypeId,
        drawTypeName: Obj.drawTypeName,
        drawSchedule: Obj.drawSchedule,
        startCutOff: Obj.startCutOff,
        endCutOff: Obj.endCutOff
      }));
    } else {
      reset(formValues => ({
        ...formValues,
        gameTypeId: gameId,
        gameDrawTypeId: 0,
        drawTypeName: '',
        drawSchedule: '',
        startCutOff: '',
        endCutOff: ''
      }));
    }

  }, [gameId, Obj]);

  const submitHandler = async (data) => {
    setFormData(data);
    handleSubmitOpen();
  };

  const handleClose = () => {
    handleCloseModal();
  }

  // Confiration dialog message
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleOkay = async () => {
    console.log("submit add/update game draw type");
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm"
        open={ isOpenModal }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd" style={{ textTransform:'uppercase' }}>
            {(Obj !== null) ? 'Edit' : 'Add'} Game Draw Type</div>
        </div>
        <DialogContent dividers>
          <div className='divStep'>
            <form onSubmit={ handleSubmit(submitHandler) } noValidate> 
              <br/>
              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'133px' }}>
                  <label>Draw Type Name</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='text'
                    placeholder="Enter Draw Type Name"
                    { 
                      ...register("drawTypeName", { required: true } ) 
                    }
                    error={ !!errors.drawTypeName }
                    helperText={ errors.drawTypeName?.message }
                    variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'133px' }}>
                  <label>Draw Schedule</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='time'
                    placeholder="Enter Draw Schedule"
                    { 
                      ...register("drawSchedule", { required: true } ) 
                    }
                    error={ !!errors.drawSchedule }
                    helperText={ errors.drawSchedule?.message }
                    variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'133px' }}>
                  <label>Start CutOff</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='time'
                    placeholder="Enter Start CutOff"
                    { 
                      ...register("startCutOff", { required: true } ) 
                    }
                    error={ !!errors.startCutOff }
                    helperText={ errors.startCutOff?.message }
                    variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'133px' }}>
                  <label>End CutOff</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='time'
                    placeholder="Enter End CutOff"
                    { 
                      ...register("endCutOff", { required: true } ) 
                    }
                    error={ !!errors.endCutOff }
                    helperText={ errors.endCutOff?.message }
                    variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <br/>

              <div className="divContent">
                <div className="left"></div>
                <div className="right divFoot">
                <Button onClick={ handleClose } variant="outlined">Cancel</Button>
                <Button type="submit" sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                  Submit <AddIcon />
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
        handleOkay={ handleOkay } 
        title={ "Confirmation" } 
        content={ `Are you sure you want to ${(Obj !== null) ? 'edit' : 'add'} draw type?` }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default AddEditGameDrawType
