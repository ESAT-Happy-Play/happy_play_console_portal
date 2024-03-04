import React from 'react';
import { useState, useEffect } from 'react';
import "../modal.scss";

import { styled } from '@mui/material/styles';
import { TextField, Button  } from "@mui/material";

import { useForm } from 'react-hook-form';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { DefaultAddress } from "../../index";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));

const theme = createTheme({
  palette: {
    ochre: {
      main: '#e6a931',
      light: '#f3c05a',
      dark: '#dea022',
      contrastText: 'white',
    }
  },
});

export const AddEditCompany = ({ isOpen, handleClose, handleCallback, itemData = null }) => {
    const formCompany = useForm({ defaultValues: {
        companyName: "",
        region: "",
        province: "",
        municipality: "",
        barangay: "",
        streetOrPurok: ""
    } });
    const { register, handleSubmit, formState, reset } = formCompany;
    const { errors } = formState;

    // final step submit handler
    const submitHandler = async (data) => {
        handleCallback(data);
    };

    useEffect(() => {
        if(itemData !== null) {
            reset(formValues => ({
                ...formValues,
                companyName: itemData.companyName
            }));
        }
        console.log(itemData);
    }, [itemData]);
return (
    <>
    <BootstrapDialog className="medium-modal-dialog"
        open={ isOpen }
        disableEscapeKeyDown
      >
        <div className="modal-head">
            <h2>{(itemData !== null) ? "Edit" : "Create"} Company</h2>
            <IconButton onClick={ handleClose } color="primary">
                <CancelIcon />
            </IconButton>
        </div>
        <DialogContent dividers>
            <form onSubmit={handleSubmit(submitHandler)} noValidate>
                <div className="modal-body">
                    <div className='form-div'>
                        <div className="form-input">
                            <div className="form-title">
                                <label>Company Name</label>
                                <span className="required">*</span>
                            </div>
                            <TextField type="text" style={{width:'100%!important'}} placeholder="Company Name" size="small" 
                            {  ...register("companyName", { required: true } ) }
                            error={ !!errors.companyName }
                            fullWidth/>
                        </div>
                    </div>
                    <br/>
                    <div className='groupTitle'>
                        <h4>Location</h4>
                        <hr />
                    </div>
                    <DefaultAddress register={register} errors={errors} />
                </div>
                <div className='modal-footer'>
                    <ThemeProvider theme={theme}>
                    {
                        (itemData !== null) 
                        ? 
                        <Button type='submit' variant='contained' color='ochre' size="medium">
                            Update Company <ModeEditOutlineIcon />
                        </Button>
                        : 
                        <Button type='submit' variant='contained' size="medium">
                            Create Company <AddIcon />
                        </Button>
                    }
                    </ThemeProvider>
                </div>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </>
    )
}