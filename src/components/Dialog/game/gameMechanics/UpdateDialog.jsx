import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { COLORS } from '../../../../helper/colors';
import styled from '@emotion/styled';


const UpdateDialog = ({ title, onUpdate = () => { }, isOpen, onClose, children, successMessage, isValid }) => {
    /*
        Use for editing values in game tab
        parameters(required):
        title: string,
         
    */
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleSubmit = () => {
        onUpdate();
        onClose();
        setOpenSuccess(true);
    }


    return (
        <>
            <Dialog
                open={isOpen}
                onClose={onClose}
                sx={[{ '.MuiPaper-root': { borderRadius: 3 } }]}
            >
                <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 18, paddingX: "24px", paddingY: "15px", marginBottom: "24px", borderBottom: `1px solid ${COLORS.transparentFont}` }}>{title}</DialogTitle>
                <DialogContent
                    sx={{ width: 400, fontSize: 13, paddingX: "24px", paddingY: "32px" }}>
                    {children}
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <StyledButton onClick={onClose}>Cancel</StyledButton>
                    <StyledButton
                        disabled={!isValid}
                        type="submit"
                        onClick={handleSubmit}
                        sx={[{ background: COLORS.orange, color: 'white' }, { '&:hover': { background: 'orange' } }]}
                    >Update</StyledButton>
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
                <DialogActions sx={{ justifyContent: "center" }}>
                    <StyledButton onClick={() => setOpenSuccess(false)} sx={{ color: COLORS.violetMain, width: 150, background: COLORS.background }}>Cancel</StyledButton>
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