import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { COLORS } from '../../../../helper/colors';
import styled from '@emotion/styled';

import EditIcon from '@mui/icons-material/Edit';
import { MuiLoadingButton } from '../../../mui';

const UpdateDialog = ({ title, onUpdate = () => { }, isOpen, onClose, children, successMessage, isValid, isLoading = false, isSuccess = false, dialogCallback }) => {
    /*
        Use for editing values in game tab
        parameters(required):
        title: string,
         
    */
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleSubmit = () => {
        onUpdate();
    }

    const handleCallback = () => {
        setOpenSuccess(false);
        dialogCallback();
    }

    useEffect(() => {
        if (isSuccess) {
            onClose();
            setOpenSuccess(true);
        }
    }, [isSuccess]);

    return (
        <>
            <Dialog
                open={isOpen}
                // onClose={onClose}
                sx={[{ '.MuiPaper-root': { borderRadius: 3 } }]}
            >
                <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 18, paddingX: "24px", paddingY: "15px", marginBottom: "24px", borderBottom: `1px solid ${COLORS.transparentFont}` }}>{title}</DialogTitle>
                <DialogContent
                    sx={{ width: 400, fontSize: 13, paddingX: "24px", paddingY: "32px" }}>
                    {children}
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <StyledButton disabled={isLoading} onClick={onClose}>Cancel</StyledButton>
                    <MuiLoadingButton text="Update" onClick={handleSubmit} loading={ isLoading }
                        disabled={!isValid} type="submit"
                        loadingPosition='end'
                        icon={ <EditIcon/> }
                        sx={[{ background: COLORS.orange, color: 'white' }, { '&:hover': { background: 'orange' } }]}/>

                </DialogActions>
            </Dialog>
            {/* SuccessModal */}
            <Dialog
                open={openSuccess}
                onClose={onClose}
                sx={[{ '.MuiPaper-root': { borderRadius: 3 } }]}
            >
                <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 18, color: COLORS.green, borderBottom: `1px solid ${COLORS.background}`, paddingY: 1 }}>Success!</DialogTitle>
                <DialogContent
                    sx={{ width: 300, paddingY: 0 }}>
                    <p style={{ margin: 0, paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>{successMessage}</p>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", width: '100%' }}>
                    <Button onClick={handleCallback} sx={{ color: COLORS.violetMain, width: 250, background: COLORS.background, fontFamily: 'Inter', marginBottom: '8px' }}>Close</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}

const StyledButton = styled(Button)(`
    font-family: 'Inter';
    width: 128px;
    `,
);


export default UpdateDialog;