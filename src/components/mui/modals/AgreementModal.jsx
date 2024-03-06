import React from 'react';
import "./modal.scss";

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { LoadingButton } from '@mui/lab';

import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import { AlertModal } from './index';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));

export const AgreementModal = ({ isOpen, handleClose, handleOkay, isLoading }) => {

  // modal config
  const [openAlert, setAlert] = React.useState(false);
  const handleAlertOpen = () => { setAlert(true); };
  const handleAlertClose = () => { setAlert(false); };

  const handleAlertOkay = () => {
    handleAlertClose();
  }

  return (
    <>
    <BootstrapDialog className="small-modal-dialog" open={ isOpen } disableEscapeKeyDown>
        <div className="modal-head">
            <h3 style={{marginLeft:'15px', color:'#1976d2'}}>End-User Agreement</h3>
            <IconButton onClick={ handleClose } color="primary">
                <CancelIcon />
            </IconButton>
        </div>

        <DialogContent dividers>
            <p style={{marginTop:'0px'}}>You need to read and accept the Happy Play &nbsp; <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></p>
            <div style={{background:'aliceblue', height:'350px'}}></div>
        </DialogContent>

        <DialogActions style={{display:'flex', justifyContent:'space-between'}}>
          <LoadingButton onClick={handleAlertOpen} variant="outlined" size='small' fullWidth>Decline</LoadingButton>
          <LoadingButton
            loading={ isLoading }
            onClick={ handleOkay }
            size='small'
            autoFocus
            fullWidth
            variant='contained'
            loadingPosition='end'
            endIcon={ <CheckOutlinedIcon/> }>Accept</LoadingButton>
        </DialogActions>
      </BootstrapDialog>

      <AlertModal isOpen={openAlert} handleOkay={handleAlertOkay} isSuccess={false} />
    </>
  )
}