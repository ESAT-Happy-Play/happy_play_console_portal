import React, { useState, useEffect } from 'react';
import './dialog.scss';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { COLORS } from '../../helper/colors';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { TextField, Button  } from "@mui/material";
import { toast } from 'react-toastify';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';

import { MuiLoadingButton } from "../../components/mui";
import { StoreExt } from "../../utils/helpers";
import { UserService } from "../../services";

const VerificationDialog = ({ 
    title, onTriggerClick = () => { }, 
    isOpen, 
    onClose, 
    children,
    objData }) => {
    
    let loginObj = StoreExt.getStore("auth");
    // let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

    const [submitLoading, setsubmitLoading] = useState(false);
    
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openConfirmVerify, setopenConfirmVerify] = useState(false);
    const [openDecline, setopenDecline] = useState(false);
    const [isDecline, setisDecline] = useState(false);
    const [declineRemarks, setdeclineRemarks] = useState("");

    const handleAccept = () => {
        setisDecline(false);
        setopenConfirmVerify(true);
    }

    const handleApproveConfirm = () => {
        setsubmitLoading(true);
        UserService.approvedVerification(objData.accountObjectId).then((resp) => {
            if (resp.data) {
                setOpenSuccess(true);
            } else {
                toast.error(resp.errorMessage); 
            }
            setsubmitLoading(false);
        });
    }

    const handleDeclineConfirm = () => {
        if(declineRemarks !== "") {
            setsubmitLoading(true);
            UserService.declinedVerification({
                    "accountObjectId": objData.accountObjectId,
                    "remarks": declineRemarks
                }).then((resp) => {
                if (resp.data) {
                    setOpenSuccess(true);
                } else {
                    toast.error(resp.errorMessage); 
                }
                setsubmitLoading(false);
            });
        }
    }

    const handleSuccessClose = () => {
        setOpenSuccess(false);
        setopenDecline(false);
        setopenConfirmVerify(false);

        onClose();
        onTriggerClick();
    }

    useEffect(() => {
        if(objData !== null) {
            setisDecline(false);
        }
    }, [objData]);

    return (
        <>
            <Dialog disableEscapeKeyDown
                open={isOpen}
                sx={[{ '.MuiPaper-root': { borderRadius: 3, minWidth:'760px' } }]}
            >
                <Box display="flex" justifyContent="space-between" color="#3b38a4" borderBottom='1px solid #ccc'>
                    <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 18, paddingY: 1 }}>{title}</DialogTitle>
                    <IconButton onClick={ onClose }>
                        <CloseIcon />
                    </IconButton>
                </Box>
                
                <DialogContent
                    sx={{ width: 760, padding:'0px' }}>
                    {children}
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <StyledButton
                        type='submit'
                        onClick={e => (setopenDecline(true),setisDecline(true))}
                        sx={[{ background: COLORS.redWarn, color: 'white' }, { '&:hover': { background: 'red' } }]}
                    >Decline</StyledButton>
                    <StyledButton
                        type="submit"
                        onClick={handleAccept}
                        sx={[{ background: COLORS.green, color: 'white' }, { '&:hover': { background: 'green' } }]}
                    >Accept <CheckIcon/></StyledButton>
                </DialogActions>
            </Dialog>

            {/* confirm new downline */}
            <Dialog disableEscapeKeyDown
                open={openConfirmVerify}
                sx={[{ '.MuiPaper-root': { borderRadius: 3 } }]}
            >
                <Box display="flex" justifyContent="space-between" color="#3b38a4" borderBottom='1px solid #787878'>
                    <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, paddingY: 1 }}>Confirm Approval</DialogTitle>
                    <IconButton disabled={submitLoading} onClick={e => setopenConfirmVerify(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                
                <DialogContent
                    sx={{ width: 400 }}>
                    <div style={{display:'grid',textAlign:'center'}}>
                        <span>Are you sure all information is verified?</span>
                    </div>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <StyledButton disabled={submitLoading} onClick={e => setopenConfirmVerify(false)}>Back</StyledButton>

                    <MuiLoadingButton text="Confirm" variant="contained" onClick={handleApproveConfirm} 
                            loading={ submitLoading } size="medium"
                            sx={[{ background: COLORS.green, color: 'white' }, { '&:hover': { background: 'green' } }]}
                            loadingPosition='end'
                            icon={ <CheckIcon/> } />
                </DialogActions>
            </Dialog>

            {/* Decline new user */}
            <Dialog disableEscapeKeyDown
                open={openDecline}
                sx={[{ '.MuiPaper-root': { borderRadius: 3 } }]}
            >
                <Box display="flex" justifyContent="space-between" color="#3b38a4" borderBottom='1px solid #787878'>
                    <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, paddingY: 1 }}>Confirm Decline</DialogTitle>
                    <IconButton disabled={submitLoading} onClick={e => setopenDecline(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                
                <DialogContent
                    sx={{ width: 400 }}>
                    <div>
                        <label>Decline Remarks *</label>
                        <TextField onChange={e => setdeclineRemarks(e.target.value)} 
                            multiline maxRows={4} sx={[{border:'1px solid red', borderRadius:'5px'}]}
                            defaultValue="" variant="outlined" fullWidth />
                    </div>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <StyledButton disabled={submitLoading} onClick={e => setopenDecline(false)}>Back</StyledButton>
                    <MuiLoadingButton text="Confirm" variant="contained" 
                        loading={ submitLoading } size="medium" onClick={handleDeclineConfirm}
                        sx={[{ background: COLORS.redWarn, color: 'white' }, { '&:hover': { background: 'red' } }]}
                        loadingPosition='end'
                        icon={ <CheckIcon/> } />
                </DialogActions>
            </Dialog>
            
            {/* SuccessModal */}
            <Dialog
                open={openSuccess}
                onClose={onClose}
                sx={[{ '.MuiPaper-root': { borderRadius: 3 } }]}
            >
                {
                    (!isDecline)
                    ? <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, color: COLORS.green, borderBottom: `1px solid ${COLORS.background}`, paddingY: 1 }}>Success!</DialogTitle>
                    : <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, color: COLORS.skyBlueHighlight, borderBottom: `1px solid ${COLORS.background}`, paddingY: 1 }}>Success!</DialogTitle>
                }
                
                <DialogContent
                    sx={{ width: 300, paddingY: 0 }}>
                    
                    {
                        (!isDecline)
                        ? <>
                            <p style={{ margin: 0, paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>
                                You have approved this user's request to be fully verified
                            </p>

                            <div style={{display:'flex', justifyContent:'center'}}>
                                <img style={{width:'150px'}} src={require('../../assets/happy-play-logo.png')} className="logo" title="Esat Logo" />
                            </div>

                            <p style={{ margin: 0, paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>
                                The system will notify the user of thier status
                            </p>
                        </>
                        : <>
                            <p style={{ margin: 0, paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>
                                Verification for this user is successfully declined
                            </p>

                            <p style={{ margin: 0, paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>
                                The system will inform the user of your remarks!
                            </p>
                        </>
                    }
                    
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <StyledButton onClick={handleSuccessClose} sx={{ color: COLORS.violetMain, width: 150, background: COLORS.background }}>OK</StyledButton>
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

export default VerificationDialog;