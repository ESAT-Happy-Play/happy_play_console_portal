import React, { useState, useEffect } from 'react';
import "../dialogform.scss";
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, Button  } from "@mui/material"

// import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MessageDialog from "../MessageDialog";

// Models
import { GameTypeModel } from "../../../model/GameTypeModel";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const EditPrice = ({ isOpenEditPrice, handleCloseEditPrice, handleCallback, gameType }) => {

  const formEditPrice = useForm({ defaultValues: GameTypeModel.EditGameTypeForm });
  const { register, handleSubmit, formState, reset } = formEditPrice;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);

  useEffect(() => {
      reset(formValues => ({
        ...formValues,
        gameTypeId: gameType.gameTypeObjectId,
        jacpotIncrement: gameType.prizePoolPercentage,
        floorValue: gameType.floorValue,
        ceilingValue: gameType.ceilingValue,
        cardPrice: gameType.cardPrice,
        maxNthBall: gameType.maxNthBall,
      }));
  }, [gameType]);

    // final step submit handler
  const handleEditPrice = async (data) => {
    setFormData(data);
    handleEditPriceOpen();
  };

  const resetForm = () => {
      // close all popup modal
      handleEditPriceClose();
      handleCloseEditPrice();

      // reset form inputs
      reset(formValues => ({
        ...formValues,
        gameTypeId: gameType.gameTypeObjectId,
        jacpotIncrement: gameType.prizePoolPercentage,
        floorValue: gameType.floorValue,
        ceilingValue: gameType.ceilingValue,
        cardPrice: gameType.cardPrice,
        maxNthBall: gameType.maxNthBall,
      }));

      setSubmitLoading(false);
  }

  // Confiration dialog message for add Schedule
  const [openConfirmEditPrice, setConfirmEditPrice] = React.useState(false);
  const handleEditPriceOpen = () => { setConfirmEditPrice(true); };
  const handleEditPriceClose = () => { setConfirmEditPrice(false); };
  const handleScheduleOkay = async () => {
    console.log("Submit Price");
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm"
        open={ isOpenEditPrice }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd" style={{ textTransform:'uppercase' }}>UPDATE {gameType.gameTypeName} SETTINGS</div>
        </div>
        <DialogContent dividers>
          <div className='divStep'>
            <form onSubmit={ handleSubmit(handleEditPrice) } noValidate> 
              <br/>
              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'133px' }}>
                  <label>Jackpot Increment</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='number' placeholder="Enter Jackpot Increment"
                    { 
                      ...register("jacpotIncrement", { required: "Jackpot Increment is required" } ) 
                    }
                    error={ !!errors.jacpotIncrement }
                    helperText={ errors.jacpotIncrement?.message }
                    label="Enter Jackpot Increment" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'133px' }}>
                  <label>Floor Value</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='number' placeholder="Enter Floor Value"
                    { 
                      ...register("floorValue", { required: "Floor Value is required" } ) 
                    }
                    error={ !!errors.floorValue }
                    helperText={ errors.floorValue?.message }
                    label="Enter Floor Value" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'133px' }}>
                  <label>Ceiling Value</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='number' placeholder="Enter Ceiling Value"
                    { 
                      ...register("ceilingValue", { required: "Ceiling Value is required" } ) 
                    }
                    error={ !!errors.ceilingValue }
                    helperText={ errors.ceilingValue?.message }
                    label="Enter Ceiling Value" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'133px' }}>
                  <label>Card Price</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='number' placeholder="Enter Card Price"
                    { 
                      ...register("cardPrice", { required: "Card Price is required" } ) 
                    }
                    error={ !!errors.cardPrice }
                    helperText={ errors.cardPrice?.message }
                    label="Enter Card Price" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'133px' }}>
                  <label>Max Nth Ball</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='number' placeholder="Enter Max Nth Ball"
                    { 
                      ...register("maxNthBall", { required: "Max Nth Ball is required" } ) 
                    }
                    error={ !!errors.maxNthBall }
                    helperText={ errors.maxNthBall?.message }
                    label="Enter Max Nth Ball" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <br/>

              <div className="divContent">
                <div className="left"></div>
                <div className="right divFoot">
                <Button onClick={ handleCloseEditPrice } variant="outlined">Cancel</Button>
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
        isOpenMessage={ openConfirmEditPrice } 
        handleCloseMessage={ handleEditPriceClose } 
        handleOkay={ handleScheduleOkay } 
        title={ "Confirm Update" } 
        content={ ("You are about to update ") + gameType.gameTypeName + " settings" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default EditPrice
