import "./../../dialogform.scss";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, Button, MenuItem  } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import FilterIcon from '@mui/icons-material/Filter';

import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';

import SaveAsIcon from '@mui/icons-material/SaveAs';
import MessageDialog from "../../MessageDialog";

// Models
import { WalletModel } from "../../../../model/WalletModel";

import { FetchFormData, GETFetch } from "../../../../api/ApiFetchBuilder";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
  
const AdminSendCredit = ({ isOpenAdd, handleCloseAdd, handleCallback, balance }) => {
  const [pageLoader, setPageLoader] = useState(false);
  
  const formSendCredit = useForm({ defaultValues: WalletModel.SendCreditForm });
  const { register, handleSubmit, formState, reset } = formSendCredit;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const [donwline, setdonwline] = React.useState([]);

  const handleDownlineData = async () => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_API_URL}/operators/all`;

    let response = await GETFetch(url);
    setPageLoader(false);

    if(response.status) {
      setdonwline(response.data.operators);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    reset(formValues => ({
      ...formValues,
      modeofpayment: 0
    }));

    handleDownlineData();
  }, []);

  // final step submit handler
  const finalStepHandler = async (data) => {
    setFormData(data);
    handleSubmitOpen();
  };

  const handleClick = async (elem, request) => {
    let listClass = document.getElementsByClassName('rem-active')
    // remove all class active to the list
    for (let i = 0; i < listClass.length; i++) {
      listClass[i].classList.remove("rem-active");
    }

    // now add active to curren selected 
    elem.target.classList.add("rem-active");

    reset(formValues => ({
      ...formValues,
      modeofpayment: request
    }));
  }

  // Confiration dialog message
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleSendCreditOkay = async () => {

    var frmData = new FormData();
    frmData.append('amount', formData.amount);
    frmData.append('modeofpayment', formData.modeofpayment);
    frmData.append('receiver', formData.receiver);
    if (formData.proofImage.length > 0) {
      frmData.append('proofImage', formData.proofImage[0]);
    }

    setSubmitLoading(true);
    let response = await FetchFormData(`${process.env.REACT_APP_API_URL}/credits/send`, 'PATCH', frmData);
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

  const [displayReceipt, setdisplayReceipt] = useState(null);
  const handleUploadReceipt = async (e, image) => {
    console.log(image);
    setdisplayReceipt(URL.createObjectURL(image));
  }

  return (
    <>
      <BootstrapDialog className="divDialogForm-small"
        open={ isOpenAdd }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="rd">SEND CREDIT</div>
        </div>
        <DialogContent dividers>
          <div style={{textAlign:'center',fontSize:'20px'}}>
            <p style={{margin:'0 0 15px 0px'}}>Your balance <b>{balance}</b></p>
          </div>
          <div id="step1" className="divStep">
            <form onSubmit={ handleSubmit(finalStepHandler) } noValidate>
              <div className="divContent">
                <div className="left">
                  <label>Operator Name</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Select Operator"
                    { 
                        ...register("receiver", { required: true }) 
                    }
                    error={ !!errors.receiver }
                    helperText={ errors.receiver?.message }
                    label="Select Operator" sx={{ width: "100%" }} defaultValue="" variant="outlined" size="small" select>
                    <MenuItem value=''><em>Select Operator</em></MenuItem>
                    { 
                        (donwline.length !== 0) ? donwline.map((item) => (
                        <MenuItem key={item.userid} value={item.userid}>
                            {item.nameDisplay}
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
                  <label>Credit Amount</label>
                </div>
                <div className="right">
                  <TextField 
                    placeholder="Amount"
                    { 
                      ...register("amount", { required: true } ) 
                    }
                    error={ !!errors.amount }
                    helperText={ errors.amount?.message }
                    label="Amount" variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="rem-wrapper">
                <div className="dv-rem-wrapper">
                    <div onClick={(e) => handleClick(e, 0)} className="div-remitance-ico rem-active">
                        <StoreMallDirectoryOutlinedIcon />
                    </div>
                    <span>Over the Counter</span>
                </div>
                <div className="dv-rem-wrapper">
                    <div onClick={(e) => handleClick(e, 2)} className="div-remitance-ico">
                        <AddBusinessOutlinedIcon />
                    </div>
                    <span>Remittance Center</span>
                </div>
                <div className="dv-rem-wrapper">
                    <div onClick={(e) => handleClick(e, 3)} className="div-remitance-ico">
                        <AccountBalanceOutlinedIcon />
                    </div>
                    <span>Bank Transfer</span>
                </div>
              </div>

              <div style={{display:'flex'}}>
                <div className="div-receipt">
                    <img className="imgFiles" src={(displayReceipt !== null) ? `${displayReceipt}` : `${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                </div>
                <div>
                    <LoadingButton loading={ false } 
                    style={{ width: '185px', marginTop:'65px'}} 
                    component="label" variant="contained" color="success" loadingPosition='end' endIcon={<FilterIcon />}>
                        Upload Receipt
                        <VisuallyHiddenInput type="file" { ...register("proofImage", { required: false }) } name="proofImage" accept="image/*" onChange={(e) => handleUploadReceipt(e, e.target.files[0])} />
                    </LoadingButton>
                </div>
              </div>
              <br />
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
        handleOkay={ handleSendCreditOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to send credit?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default AdminSendCredit
