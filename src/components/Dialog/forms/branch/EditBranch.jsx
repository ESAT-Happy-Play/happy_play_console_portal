import "./../../dialogform.scss";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, Button  } from "@mui/material"

import SaveAsIcon from '@mui/icons-material/SaveAs';
import MessageDialog from "../../MessageDialog";

// Models
import { BranchModel } from "../../../../model/BranchModel";
import DefaultAddressWidget from '../../../widget/address/DefaultAddressWidget';

import { PATCHFetch } from "../../../../api/ApiFetchBuilder";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const EditBranch = ({ isOpenEdit, handleCloseEdit, handleEditCallback, objData }) => {

  const formBranch = useForm({ defaultValues: BranchModel.UpdateBranchForm });
  const { register, handleSubmit, formState, reset } = formBranch;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const [branchId, setbranchId] = useState(null);
  const [companyId, setcompanyId] = useState(null);

  // trigger call API endpoint if state change
  useEffect(() => {
    if(objData !== null) {
      setcompanyId(objData.companyId);
      setbranchId(objData.branchCode)
      reset(formValues => ({
        ...formValues,
        branchName: objData.branchName
      }));
    }
  }, [objData]);

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
      reset(BranchModel.BranchForm);
      setSubmitLoading(false);

      handleEditCallback();
  }

  // Confiration dialog message for add company
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleBranchOkay = async () => {
    setSubmitLoading(true);
    let response = await PATCHFetch(`${process.env.REACT_APP_API_URL}/branches/${branchId}?companyid=${companyId}`, formData);
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
      <BootstrapDialog className="divDialogForm"
        open={ isOpenEdit }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd">EDIT BRANCH</div>
        </div>
        <DialogContent dividers>
        
          <div id="step1" className="divStep">
            <form onSubmit={ handleSubmit(finalStepHandler) } noValidate>
              <h3>BRANCH IDENTITY</h3>
              <br />

              <div className="divContent">
                <div className="left">
                  <label>BRANCH NAME</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter branch name"
                    { 
                      ...register("branchName", { required: true } ) 
                    }
                    error={ !!errors.branchName }
                    helperText={ errors.branchName?.message }
                    label="Enter branch name" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <br />

              <DefaultAddressWidget register={register} errors={errors} />

              <div className="divContent">
                <div className="left">
                  <label>STREET/PUROK</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter street/purok"
                    { 
                      ...register("branchSitio", { required: true } ) 
                    }
                    error={ !!errors.branchSitio }
                    helperText={ errors.branchSitio?.message }
                    label="Enter street/purok" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <br/>

              <div className="divContent">
                <div className="left"></div>
                <div className="right divFoot">
                <Button onClick={ handleCloseEdit } variant="outlined">Cancel</Button>
                <Button type="submit" sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                  Submit &nbsp; <SaveAsIcon/>
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
        handleOkay={ handleBranchOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to Edit branch?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default EditBranch
