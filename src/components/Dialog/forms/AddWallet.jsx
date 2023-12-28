import React, { useState, useEffect } from 'react';
import "../dialogform.scss";
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, Button  } from "@mui/material"

import AddIcon from '@mui/icons-material/Add';
import MessageDialog from "../MessageDialog";

// Models
import { WalletModel } from "../../../model/WalletModel";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const AddWallet = ({ isOpenModal, handleCloseModal, acctObjID }) => {

  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [Amount, setAmount] = React.useState('');

  const formWallet = useForm({ defaultValues: WalletModel.TransactionForm });
  const { register, handleSubmit, formState, reset } = formWallet;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});

  useEffect(() => {
    if(acctObjID !== null) {
      reset(formValues => ({
        ...formValues,
        accountId: acctObjID,
        amount: ''
      }));
    }
  }, [acctObjID]);

  // Confiration dialog
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const handleOpenConfirm = () => { setOpenConfirm(true); };
  const handleConfirmClose = () => { setOpenConfirm(false); };
  const handleConfirmOkay = async () => {
    console.log("submit wallet");
  };

  const resetForm = () => {
    // reset form inputs
    reset(formValues => ({
      ...formValues,
      accountId: acctObjID,
      amount: ''
    }));

    // close all popup modal
    handleConfirmClose();
    handleCloseModal();

    setSubmitLoading(false);
  }

  const submitHandler = async (data) => {
    setFormData(data);
    handleOpenConfirm();
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
          <div className="rd" style={{ textTransform:'uppercase' }}>Add Wallet</div>
        </div>
        <DialogContent dividers>
          <div className='divStep'>
            <form onSubmit={ handleSubmit(submitHandler) } noValidate> 
              <br/>
              <div className="divContent">
                <div className="left" style={{ flex:'none', width:'133px' }}>
                  <label>Amount</label>
                </div>
                <div className="right" style={ {flex: 4} }>
                  <TextField type='number'
                    placeholder="Enter Wallet Amount"
                    { 
                      ...register("amount", { required: true } ) 
                    }
                    error={ !!errors.amount }
                    helperText={ errors.amount?.message }
                    onChange={e => setAmount(e.target.value)}
                    variant="outlined" size="small" fullWidth />
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
        title={ "Confirm Add Wallet" } 
        content={ (`You are about to add ₱${Amount} to your wallet acount.`) }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default AddWallet
