import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

import "./notificationdialog.scss"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};  

const NotificationDialog = ({ isOpen, handleClose }) => {
    return (
    <div>
      <BootstrapDialog
        TransitionComponent={Transition} keepMounted
        onClose={ handleClose }
        aria-labelledby="customized-dialog-title"
        open={ isOpen }
        id='notifyDialog'
      >
        <h2>Notifications</h2>
        <DialogContent dividers>
          <div className="notifyContent">
            <div className="left"><ArrowForwardOutlinedIcon/></div>
            <div className="center">
                <h3>Notification header</h3>
                <p>This is a test. Please ignore.</p>
            </div>
            <div className="right">
                <ArrowForwardOutlinedIcon/>
            </div>
          </div>

          <div className="notifyContent">
            <div className="left"><ArrowForwardOutlinedIcon/></div>
            <div className="center">
                <h3>Notification header</h3>
                <p>This is a test. Please ignore.</p>
            </div>
            <div className="right">
                <ArrowForwardOutlinedIcon/>
            </div>
          </div>

          <div className="notifyContent">
            <div className="left"><ArrowForwardOutlinedIcon/></div>
            <div className="center">
                <h3>Notification header</h3>
                <p>This is a test. Please ignore.</p>
            </div>
            <div className="right">
                <ArrowForwardOutlinedIcon/>
            </div>
          </div>
        </DialogContent>

        <DialogActions sx={{ background: "#fec30e" }}>
          <Button autoFocus onClick={handleClose} sx={{ color: "black", textTransform: "capitalize" }}>
            See All Notifications <ArrowForwardOutlinedIcon/>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
    )
}

export default NotificationDialog