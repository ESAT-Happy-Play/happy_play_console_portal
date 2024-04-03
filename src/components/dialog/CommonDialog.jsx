import React from 'react';
import './dialog.scss';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Button  } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const CommonDialog = ({ title, isOpen,  onClose, children, modalWidth = 400 }) => {
  return (
    <>
      <Dialog disableEscapeKeyDown
            open={isOpen}
            sx={[{ '.MuiPaper-root': { borderRadius: 3 } }]}
        >
            <Box display="flex" justifyContent="space-between" color="#3b38a4" borderBottom='1px solid #787878'>
                <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 18, paddingY: 1 }}>{title}</DialogTitle>
                <IconButton onClick={ onClose }>
                    <CloseIcon />
                </IconButton>
            </Box>
            
            <DialogContent
                sx={{ width: modalWidth }}>
                {children}
            </DialogContent>
        </Dialog>
    </>
  )
}

const StyledButton = styled(Button)(`
    font-family: 'Inter';
    width: 128px;
    `,
);

export default CommonDialog
