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
import { OperatorModel } from "../../../../model/OperatorModel";

import { POSTFetch, GETFetch } from "../../../../api/ApiFetchBuilder";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const AddOperator = ({ isOpenAdd, handleCloseAdd, handleCallback }) => {

  const [pageLoader, setPageLoader] = useState(false);
  const formOperator = useForm({ defaultValues: OperatorModel.OperatorForm });
  const { register, handleSubmit, formState, reset } = formOperator;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [companies, setCompanies] = useState([]);
  const [branches, setbranches] = useState([]);

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

  const handleBranchByCompany = async (code) => {
    let response = await GETFetch(`${process.env.REACT_APP_API_URL}/branches?rowsperpage=100&pagenumber=1&companyid=${code}`);
    if(response.status) {
      setbranches(response.data.branches);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    handleComapanyData();
  }, []);

  const handleSelect = async (e, value) => {
    await handleBranchByCompany(value);
  }

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
      reset(OperatorModel.OperatorForm);
      setSubmitLoading(false);

      handleCallback();
  }

  // Confiration dialog message
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleOperatorOkay = async () => {
    setSubmitLoading(true);
    let response = await POSTFetch(`${process.env.REACT_APP_API_URL}/operators`, formData);
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
          <div className="rd">CREATE OPERATOR</div>
        </div>
        <DialogContent dividers>
        
          <div id="step1" className="divStep">
            <form onSubmit={ handleSubmit(finalStepHandler) } noValidate>
              <div className="divContent">
                <div className="left">
                  <label>COMPANY</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Select Company"
                    { 
                        ...register("companyid", { required: true }) 
                    }
                    error={ !!errors.companyid }
                    helperText={ errors.companyid?.message }
                    onChange={e => handleSelect(e, e.target.value) }
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
                  <label>BRANCH</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Select Branch"
                    { 
                        ...register("branchcode", { required: true }) 
                    }
                    error={ !!errors.branchcode }
                    helperText={ errors.branchcode?.message }
                    label="Select Branch" sx={{ width: "100%" }} defaultValue="" variant="outlined" size="small" select>
                    <MenuItem value=''><em>Select Branch</em></MenuItem>
                      { 
                          (branches.length !== 0) ? branches.map((item) => (
                          <MenuItem data-province-code={item.branchCode} key={item.branchCode} value={item.branchCode}>
                              {item.branchName}
                          </MenuItem>
                          )) 
                          : (pageLoader) ? <MenuItem value=''>Loading options...</MenuItem>
                          : <MenuItem value=''>No records found!</MenuItem>
                      }
                    </TextField>
                </div>
              </div>
              <br />

              <div className="divContent">
                <div className="left">
                  <label>FIRST NAME</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter firstname"
                    { 
                      ...register("operatorFirstname", { required: true } ) 
                    }
                    error={ !!errors.operatorFirstname }
                    helperText={ errors.operatorFirstname?.message }
                    label="Enter firstname" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>LAST NAME</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter lastname"
                    { 
                      ...register("operatorLastname", { required: true } ) 
                    }
                    error={ !!errors.operatorLastname }
                    helperText={ errors.operatorLastname?.message }
                    label="Enter lastname" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>MIDDLE NAME</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter middlename"
                    { 
                      ...register("operatorMiddlename", { required: false } ) 
                    }
                    error={ !!errors.operatorMiddlename }
                    helperText={ errors.operatorMiddlename?.message }
                    label="Enter middlename" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>SEX</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter gender"
                    { 
                      ...register("operatorSex", { required: true } ) 
                    }
                    error={ !!errors.operatorSex }
                    helperText={ errors.operatorSex?.message }
                    label="Select gender" sx={{ width: "70%" }} defaultValue="" variant="outlined" size="small" select>
                    <MenuItem value=''><em>Select gender</em></MenuItem>
                    <MenuItem value="0">Male</MenuItem>
                    <MenuItem value="1">Female</MenuItem>
                  </TextField>
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>MARITAL STATUS</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Enter marital status"
                    { 
                      ...register("operatorCivilStatus", { required: true } ) 
                    }
                    error={ !!errors.operatorCivilStatus }
                    helperText={ errors.operatorCivilStatus?.message }
                    label="Select marital status" sx={{ width: "70%" }} defaultValue="" variant="outlined" size="small" select>
                    <MenuItem value=''><em>Select status</em></MenuItem>
                    <MenuItem value="0">Single</MenuItem>
                    <MenuItem value="1">Married</MenuItem>
                  </TextField>
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>BIRTHDAY</label>
                </div>
                <div className="right">
                  <TextField
                    type="date"
                    { 
                      ...register("operatorBirthday", { required: true } ) 
                    }
                    error={ !!errors.operatorBirthday }
                    helperText={ errors.operatorBirthday?.message }
                    variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>CONTACT NUMBER</label>
                </div>
                <div className="right">
                  <TextField 
                    type='number'
                    placeholder="Enter contact number"
                    { 
                      ...register("operatorMobileNumber", 
                      { 
                        required: true,
                        minLength: {
                          value: 11,
                          message: "Phone number must at least 11 digits"
                        },
                        // pattern:{
                        //   value: /^(0|[1-9]\d*)(\.\d+)?$/
                        // },
                      } ) 
                    }
                    error={ !!errors.operatorMobileNumber }
                    helperText={ errors.operatorMobileNumber?.message }
                    label="Enter contact number" variant="outlined" size="small" fullWidth />
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
        handleOkay={ handleOperatorOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to add new operator?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default AddOperator
