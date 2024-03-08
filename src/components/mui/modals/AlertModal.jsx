import React from 'react';
import "./modal.scss";

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { LoadingButton } from '@mui/lab';

import { Button  } from "@mui/material";
import { Link } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));

export const AlertModal = ({ isOpen, handleOkay, isSuccess = true, alertType = 0, msgType = 0 }) => {

  return (
    <>
    <BootstrapDialog className="tiny-modal-dialog" open={ isOpen } disableEscapeKeyDown>
        <div className="modal-head">
            {
                (alertType === 0)
                ? <>
                    {
                        (isSuccess) 
                        ? <h3 style={{marginLeft:'15px', color:'green'}}>Success!</h3>
                        : <h3 style={{marginLeft:'15px', color:'#ff8f01'}}>Warning!</h3>
                    }
                </>
                : (alertType === 1) ? <>
                    {
                        (isSuccess) 
                        ? <h3 style={{marginLeft:'15px', color:'green'}}>Success!</h3>
                        : <h3 style={{marginLeft:'15px', color:'#ff8f01'}}>Warning!</h3>
                    }
                </>
                : <></>
            }
        </div>

        <DialogContent dividers>
            {
                (alertType === 0)
                ? <>
                    {
                        (isSuccess) 
                        ? <>
                            <p style={{marginTop:'0px'}}>You have <b style={{color:'green'}}>successfully registered</b> to Happy Play!</p>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <img style={{width:'150px'}} src={require('../../../assets/happy-play-logo.png')} className="logo" title="Esat Logo" />
                            </div>
                            <div>
                                <span style={{color:'green'}}>Stay tuned! </span>
                                <span style={{fontStyle:'italic'}}>You will be notified via SMS when your application is approved.</span>
                            </div>
                        </>
                        : <>
                            <p style={{textTransform:'none', margin:'0px'}}>You need to accept the End-User Agreement to be able to register and use Happy Play</p>
                        </>
                    }
                </>
                : (alertType === 1)
                ? <>
                    {
                        (msgType ===0)
                        ? <p style={{textTransform:'none', margin:'0px'}}>You have <b style={{color:'green'}}>successfully set</b> your password</p>
                        : <p style={{textTransform:'none', margin:'0px'}}>You have <b style={{color:'green'}}>successfully updated</b> your password</p>
                    }
                </>
                : <></>
            }
            
        </DialogContent>

        <DialogActions style={{display:'flex', justifyContent:'center'}}>
            {
                (alertType === 0)
                ? <LoadingButton onClick={handleOkay} variant="contained" size='small' fullWidth>{ (isSuccess) ? "Ok" : "Back"}</LoadingButton>
                : (alertType === 1)
                ? <Button component={Link} to="/login" variant="contained" size="small" color="primary" fullWidth>Login</Button>
                : <></>
            }
          
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}