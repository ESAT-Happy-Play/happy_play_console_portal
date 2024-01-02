import "./../../dialogform.scss";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, Button  } from "@mui/material"

// import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
// import SaveIcon from '@mui/icons-material/Save';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import MessageDialog from "../../MessageDialog";

import { PATCHFetch } from "../../../../api/ApiFetchBuilder";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const EditCompany = ({ isOpenEdit, handleCloseEdit, handleEditCallback, objData }) => {

  const formCompany = useForm({
    defaultValues: {
      companyName: "",
    }
  });

  const [companyId, setcompanyId] = React.useState(null);
  const { register, handleSubmit, formState, reset } = formCompany;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);

  useEffect(() => {
    if(objData !== null) {
      setcompanyId(objData.companyId);
      reset(formValues => ({
        ...formValues,
        companyName: objData.companyName
      }));
    }
  }, [objData]);

  // on form submit 1st step
  const submitHandler = async (data) => {
    setFormData(data);
    handleSubmitOpen();
  };

  // Confiration dialog message for add company
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleCompanyOkay = async () => {
    setSubmitLoading(true);
    let response = await PATCHFetch(`${process.env.REACT_APP_API_URL}/companies/${companyId}`, formData);
    setSubmitLoading(false);
    if(response.status) {
      handleSubmitClose();
      handleEditCallback();
      toast.success(response.data.message);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm"
        open={ isOpenEdit }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd">EDIT COMPANY</div>
        </div>
        <DialogContent dividers>
        
          <div className="divStep">
            <form onSubmit={ handleSubmit(submitHandler) } noValidate>
              <h3>COMPANY IDENTITY</h3>
              <br />
              <div className="divContent">
                <div className="left">
                  <label>COMPANY NAME</label>
                </div>
                <div className="right" style={{flex:'3 1'}}>
                  <TextField 
                    placeholder="Enter company name"
                    { 
                      ...register("companyName", { required: true } ) 
                    }
                    error={ !!errors.companyName }
                    helperText={ errors.companyName?.message }
                    label="Enter company name" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <br/>

              <div className="divContent">
                <div className="left"></div>
                <div className="right divFoot">
                <Button onClick={ handleCloseEdit } variant="outlined">Cancel</Button>
                <Button type="submit" sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                  Update &nbsp; <SaveAsIcon/>
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
        handleOkay={ handleCompanyOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to update company?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default EditCompany
