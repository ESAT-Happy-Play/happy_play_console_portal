import React, { useState, useEffect } from 'react';
import "../dialogform.scss";
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, MenuItem, Button  } from "@mui/material";
import IconButton from '@mui/material/IconButton';

// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CancelIcon from '@mui/icons-material/Cancel';

// Models
import { UserModel } from "../../../model/UserModel";
import { GetStoreObject, GetJWTStoreObject } from "../../../helper/Helpers";
import PageLoader from '../../widget/PageLoader';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const ApproveOrDecline = ({ isOpenApproveOrDecline, handleCloseApproveOrDecline, userObj }) => {

  let authObj = GetStoreObject("auth");
  let tokenObj = GetJWTStoreObject(authObj.token);

  const [pageLoader, setPageLoader] = useState(false);
  const [roleId, setRoleId] = useState(tokenObj.RoleId);
  const formSetting = useForm({ defaultValues: UserModel.ApproveForm });
  const { register, handleSubmit, formState, reset } = formSetting;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);

  // trigger if company Data state change
  useEffect(() => {
    if(userObj !== undefined) {
      if(roleId === "3") {
        reset(formValues => ({
          ...formValues,
          accountInfoId: userObj.accountInfoId,
          userTypeId: 4 // 4 is agent
        }));
      } else {
        reset(formValues => ({
          ...formValues,
          accountInfoId: userObj.accountInfoId
        }));
      }
    }
  }, [userObj]);

  const resetForm = () => {
      // close all popup modal
      setSubmitLoading(false);
  }

  const handleApproveSubmit = async (data) => {
    console.log("Submit Aprove");
  };

  const handleDecline = async () => {
    console.log("Submit Decline");
  }

  return (
    <>
      <BootstrapDialog className="divDialogForm"
        open={ isOpenApproveOrDecline }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd">
            <span>APPROVE / DECLINE</span>
            <IconButton onClick={ handleCloseApproveOrDecline } color="primary">
              <CancelIcon />
            </IconButton>
          </div>
        </div>
        <DialogContent dividers>
        
          <div className="divStep">
            <div className='inputContent'>
              <div className="divContent">
                <div className="left" style={{ width: "110px", flex:'none' }}>
                  <label>Full Name</label>
                </div>
                <div className="right">
                  <div>
                    <TextField sx={{ width: "100%" }} defaultValue={ userObj.name } variant="outlined" size="small" />
                  </div>
                </div>
              </div>
              <div className="divContent">
                <div className="left"  style={{ width: "110px", flex:'none' }}>
                  <label>Username</label>
                </div>
                <div className="right">
                  <div>
                    <TextField sx={{ width: "100%" }} defaultValue={ userObj.mobileNumber } variant="outlined" size="small" />
                  </div>
                </div>
              </div>
              <div className="divContent">
                <div className="left"  style={{ width: "110px", flex:'none' }}>
                  <label>Email Address</label>
                </div>
                <div className="right">
                  <div>
                    <TextField  sx={{ width: "100%" }} defaultValue={ userObj.email } variant="outlined" size="small" />
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={ handleSubmit(handleApproveSubmit) } noValidate>
              <div className="inputContent">
                <div className='elemHide'>
                  <TextField
                      { 
                        ...register("accountInfoId", { required: "accountInfoId is required" } ) 
                      }
                      error={ !!errors.accountInfoId }
                      helperText={ errors.accountInfoId?.message }
                      variant="outlined" size="small" fullWidth />
                </div>
                <div className="row">
                    <div className="col-6" style={{ textAlign: 'left'}}>
                      {
                        (roleId === "3") ?
                          <div className='elemHide'>
                            <TextField 
                            placeholder="User Type"
                            { 
                              ...register("userTypeId", { required: "User type is required" } ) 
                            }
                            error={ !!errors.userTypeId }
                            helperText={ errors.userTypeId?.message }
                            label="User Type" sx={{ width: "100%" }}
                            defaultValue="" variant="outlined" size="small" />
                          </div>
                        :
                        <TextField 
                          placeholder="Select user type"
                          { 
                            ...register("userTypeId", { required: "User type is required" } ) 
                          }
                          error={ !!errors.userTypeId }
                          helperText={ errors.userTypeId?.message }
                          label="Select user type" sx={{ width: "100%" }} 
                          // disabled={ (tokenObj.RoleId === 3) ? true : false }  
                          // value={ (tokenObj.RoleId === 3) ? "4" : "" } 
                          defaultValue="" variant="outlined" size="small" select>
                          <MenuItem value=''><em>Select user type</em></MenuItem>
                          <MenuItem value="4">Agent</MenuItem>
                          <MenuItem value="5">Player</MenuItem>
                        </TextField>
                      }
                    </div>
                    <div className="col-6">
                      <TextField
                      type="number"
                      placeholder="Enter commission"
                      { 
                        ...register("commission", { required: "Commission is required" } ) 
                      }
                      error={ !!errors.commission }
                      helperText={ errors.commission?.message }
                      variant="outlined" size="small" fullWidth />
                    </div>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <Button onClick={ handleDecline } variant="contained" size='large' color="error">
                    Decline
                  </Button>
                </div>
                <div className="col-6">
                  <Button type="submit" sx={{ backgroundColor: "#38a169" }} size='large' variant="contained" color="success">
                    Approve
                  </Button>
                </div>
              </div>
            </form>
          </div>
          
        </DialogContent>
      </BootstrapDialog>

      <PageLoader isLoadingPage={ pageLoader } />
    </>
  )
}

export default ApproveOrDecline
