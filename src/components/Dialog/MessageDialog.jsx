import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const MessageDialog = ({ isOpenMessage, handleCloseMessage, handleOkay, title, content, color, isLoading }) => {

  return (
    <>
    <Dialog open={ isOpenMessage } disableEscapeKeyDown>
        <DialogTitle>
          { title }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { content }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={ isLoading } onClick={ handleCloseMessage } variant="outlined">Cancel</LoadingButton>
          <LoadingButton
            loading={ isLoading }
            onClick={ handleOkay }
            color={ color } 
            autoFocus
            variant='contained'
            loadingPosition='end'
            endIcon={ <CheckOutlinedIcon/> }>Yes</LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MessageDialog
