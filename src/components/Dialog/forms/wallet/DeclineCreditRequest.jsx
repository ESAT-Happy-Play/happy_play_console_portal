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

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MessageDialog from "../../MessageDialog";

import { PATCHFetch } from "../../../../api/ApiFetchBuilder";

import { GetStoreObject } from "../../../../helper/Helpers";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));

const DeclineCreditRequest = ({ isOpenAdd, handleCloseAdd, handleCallback, objData, objUser }) => {

  let loginObj = GetStoreObject("auth");
  const [pageLoader, setPageLoader] = useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const formDecline = useForm({ defaultValues: { declinereason: "" } });
  const { register, handleSubmit, formState, reset } = formDecline;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});

  const [requestId, setrequestId] = React.useState('');
  const [paymode, setpaymode] = React.useState(null);

  // trigger call API endpoint if state change
  useEffect(() => {
    if(objData !== null) {
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
    setFormData(data);
    handleSubmitOpen();
  };

  // Confiration dialog message
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleDeclineCreditOkay = async () => {
    setSubmitLoading(true);
    let response = await PATCHFetch(`${process.env.REACT_APP_API_URL}/credits/requests/${requestId}?isapprove=0&declinereason=${formData.declinereason}`, {});
    setSubmitLoading(false);
    if(response.status) {
      handleSubmitClose();
      handleCallback();
      toast.success(response.data.message);
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
          <div className="rd">Confirm Credit Request</div>
        </div>
        <DialogContent dividers>
          <div id="step1" className="divStep">
            <form onSubmit={ handleSubmit(submitHandler) } noValidate>
              {
                (loginObj.userCode !== '0101') ?
                  <div style={{fontSize:'20px'}}>
                    <p style={{margin:'0'}}>Your balance <b>{(objUser !== null) ? objUser.creditBalance : "..."}</b></p>
                  </div>
                : <></>
              }

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

              <div className="divContent">
                <div className="left">
                  <label>Reason</label>
                </div>
                <div className="right">
                  <TextField variant="outlined" 
                  placeholder="Type reason for decline."
                    { 
                      ...register("declinereason", { required: true } ) 
                    }
                    error={ !!errors.declinereason }
                    helperText={ errors.declinereason?.message }
                    multiline maxRows={4} size="small" fullWidth />
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
                <Button type="submit" className="btnEdit" variant="contained">
                  Confirm to Decline &nbsp; <DeleteOutlinedIcon/>
                </Button>
              </div>
            </form>
          </div>
          
        </DialogContent>
      </BootstrapDialog>
      
      <MessageDialog
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleDeclineCreditOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to decline request credit?" }
        color={ "error" }
        isLoading={ submitLoading } />
    </>
  )
}

export default DeclineCreditRequest
