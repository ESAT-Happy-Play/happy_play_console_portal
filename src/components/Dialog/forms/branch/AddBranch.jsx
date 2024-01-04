import "./../../dialogform.scss";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, Button, MenuItem  } from "@mui/material"

import SaveAsIcon from '@mui/icons-material/SaveAs';
import MessageDialog from "../../MessageDialog";

// Models
import { BranchModel } from "../../../../model/BranchModel";
import DefaultAddressWidget from '../../../widget/address/DefaultAddressWidget';

import { POSTFetch, GETFetch } from "../../../../api/ApiFetchBuilder";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const AddBranch = ({ isOpenAdd, handleCloseAdd, handleCallback }) => {

  const [pageLoader, setPageLoader] = useState(false);
  const formBranch = useForm({ defaultValues: BranchModel.BranchForm });
  const { register, handleSubmit, formState, reset } = formBranch;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [companies, setCompanies] = useState([]);

  const handleComapanyData = async () => {
    setPageLoader(true);
    let response = await GETFetch(`${process.env.REACT_APP_API_URL}/companies/all`);
    setPageLoader(false);

    if(response.status) {
      setCompanies(response.data.companies);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    handleComapanyData();
  }, []);

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
      reset(BranchModel.BranchForm);
      setSubmitLoading(false);

      handleCallback();
  }

  // Confiration dialog message for add company
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleBranchOkay = async () => {
    setSubmitLoading(true);
    let response = await POSTFetch(`${process.env.REACT_APP_API_URL}/branches`, formData);
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
        open={ isOpenAdd }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd">REGISTER BRANCH</div>
        </div>
        <DialogContent dividers>
        
          <div id="step1" className="divStep">
            <form onSubmit={ handleSubmit(finalStepHandler) } noValidate>
              <h3>BRANCH IDENTITY</h3>
              <br />
              <div className="divContent">
                <div className="left">
                  <label>COMPANY NAME</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Select Company"
                    { 
                        ...register("companyid", { required: true }) 
                    }
                    error={ !!errors.companyid }
                    helperText={ errors.companyid?.message }
                    label="Select Company" sx={{ width: "100%" }} defaultValue="" variant="outlined" size="small" select>
                    <MenuItem value=''><em>Select Company</em></MenuItem>
                    { 
                        (companies.length !== 0) ? companies.map((item) => (
                        <MenuItem data-province-code={item.companyId} key={item.companyId} value={item.companyId}>
                            {item.companyName}
                        </MenuItem>
                        )) 
                        : (pageLoader) ? <MenuItem value=''>Loading options...</MenuItem>
                        : <MenuItem value=''>No records found!</MenuItem>
                    }
                  </TextField>
                </div>
              </div>

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
                <Button onClick={ handleCloseAdd } variant="outlined">Cancel</Button>
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
        content={ "Are you sure you want to add new branch?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default AddBranch
