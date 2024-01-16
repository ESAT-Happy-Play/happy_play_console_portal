import "./../../dialogform.scss";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, Button, MenuItem  } from "@mui/material";

import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';

import SaveAsIcon from '@mui/icons-material/SaveAs';
import MessageDialog from "../../MessageDialog";

import { PATCHFetch } from "../../../../api/ApiFetchBuilder";

import { GetStoreObject } from "../../../../helper/Helpers";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));

const ApproveWithdrawRequest = ({ isOpenAdd, handleCloseAdd, handleCallback, objData }) => {

  let loginObj = GetStoreObject("auth");
  const [pageLoader, setPageLoader] = useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const formApprove = useForm({ defaultValues: {} });
  const { register, handleSubmit, formState, reset } = formApprove;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});

  const [requestId, setrequestId] = React.useState('');
  const [paymode, setpaymode] = React.useState(null);

  // trigger call API endpoint if state change
  useEffect(() => {
    if(objData !== null) {
      console.log(objData);
      setrequestId(objData.requestId);
      if (objData.mode === "0") {
        setpaymode(0)
      } else if (objData.mode === "2") {
        setpaymode(2)
      } else if (objData.mode === "3") {
        setpaymode(3)
      } else {
        setpaymode(null)
      }
    }
  }, [objData]);

  // submit handler
  const submitHandler = async (data) => {
    handleSubmitOpen();
  };

  // Confiration dialog message
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleApproveCreditOkay = async () => {
    setSubmitLoading(true);
    let response = await PATCHFetch(`${process.env.REACT_APP_API_URL}/credits/withdraw/requests/${requestId}?isapprove=1&&requesteecompanyid=${objData.companyId}&requesteebranchcode=${objData.branchCode}`, {});
    setSubmitLoading(false);
    if(response.status) {
      toast.success(response.data.message);
      handleSubmitClose();
      handleCallback();
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm-small"
        open={ isOpenAdd }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="rd">Confirm Withdrawal Request</div>
        </div>
        <DialogContent dividers>
          <div id="step1" className="divStep">
            <form onSubmit={ handleSubmit(submitHandler) } noValidate>
              
              <div style={{fontSize:'20px',marginTop:'10px'}}>
                <p style={{margin:'0'}}>Amount</p>
                <div><b style={{fontSize:'30px',color:'#4845d2'}}>{(objData !== null) ? objData.requestAmount : "..."}</b></div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>Request Name</label>
                </div>
                <div className="right">
                  <TextField variant="outlined" defaultValue={(objData !== null) ? objData.requesteeName : '...'} size="small" fullWidth />
                </div>
              </div>

              <div className="rem-wrapper" style={{margin:'15px 0 15px 0'}}>
                <div className="dv-rem-wrapper">
                    <div className={(paymode !== null) ? (paymode === 0) ? "div-remitance-ico rem-active" : "div-remitance-ico" : "div-remitance-ico"}>
                        <StoreMallDirectoryOutlinedIcon />
                    </div>
                    <span>Over the Counter</span>
                </div>
                <div className="dv-rem-wrapper">
                    <div className={(paymode !== null) ? (paymode === 2) ? "div-remitance-ico rem-active" : "div-remitance-ico" : "div-remitance-ico"}>
                        <AddBusinessOutlinedIcon />
                    </div>
                    <span>Remittance Center</span>
                </div>
                <div className="dv-rem-wrapper">
                    <div className={(paymode !== null) ? (paymode === 3) ? "div-remitance-ico rem-active" : "div-remitance-ico" : "div-remitance-ico"}>
                        <AccountBalanceOutlinedIcon />
                    </div>
                    <span>Bank Transfer</span>
                </div>
              </div>

              <div style={{textAlign:'center',display:'flex',justifyContent:'center'}}>
                <div>
                    <b>Receipt/Proof</b>
                    <div className="div-receipt" style={{width:'185px'}}>
                        <img className="imgFiles" src={`${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                    </div>
                </div>
              </div>
              <br />
              <div style={{display:'flex',justifyContent:'center', gap:'5px'}}>
                <Button onClick={ handleCloseAdd } variant="outlined">Cancel</Button>
                <Button type="submit" className="btnSuccess" variant="contained">
                  Approve Request &nbsp; <SaveAsIcon/>
                </Button>
              </div>
            </form>
          </div>
          
        </DialogContent>
      </BootstrapDialog>
      
      <MessageDialog
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleApproveCreditOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to approve withdrawal request?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default ApproveWithdrawRequest
