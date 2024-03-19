import React, { useState, useEffect } from 'react';
import './dialog.scss';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { COLORS } from '../../utils/common_helpers/colors';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { TextField, MenuItem, Button  } from "@mui/material";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import { MuiLoadingButton } from "../../components/mui";
import { UserService } from "../../services";

const ApprovalDialog = ({ 
    title, onTriggerClick = () => { }, 
    isOpen, 
    onClose, 
    children,
    objData }) => {
    
    const [submitLoading, setsubmitLoading] = useState(false);
    const formApprove = useForm({ defaultValues: {
        accountInfoId: (objData !== null) ? objData.accountObjectId : "",
        userTypeId: "", commission: "" }
    });
    const { register, handleSubmit, formState, reset } = formApprove;
    const { errors } = formState;
    const [formData, setFormData] = React.useState({});
    
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openAssignRole, setopenAssignRole] = useState(false);
    const [openConfirmDownline, setopenConfirmDownline] = useState(false);
    const [openDecline, setopenDecline] = useState(false);
    const [hasCommission, sethasCommission] = useState(true);
    const [isDecline, setisDecline] = useState(false);
    const [declineRemarks, setdeclineRemarks] = useState("");

    const handleAccept = () => {
        // onTriggerClick();
        // onClose();
        setisDecline(false);
        setopenAssignRole(true);
    }

    const selectRoleEvent = event => {
        let userType = event.target.getAttribute('data-value');
        if (userType === "4") {
            sethasCommission(true);
        } else {
            sethasCommission(false);
        }
    }

    const approvalHandler = (data) => {
        setFormData(data);
        setopenConfirmDownline(true)
    }

    const handleApproveConfirm = () => {
        setsubmitLoading(true);
        UserService.approveUser({
                "accountInfoId": formData.accountInfoId,
                "userTypeId": formData.userTypeId,
                "commission": (formData.commission !== "") ? formData.commission : null
            }).then((resp) => {
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
            UserService.declinedUser({
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
        setopenConfirmDownline(false);
        setopenAssignRole(false);

        onClose();
        onTriggerClick();
    }

    useEffect(() => {
        if(objData !== null) {
            reset(formValues => ({
                ...formValues,
                accountInfoId: objData.accountObjectId
            }));
            sethasCommission(true);
            setisDecline(false);
        }
    }, [objData]);

    return (
        <>
            <Dialog disableEscapeKeyDown
                open={isOpen}
                sx={[{ '.MuiPaper-root': { borderRadius: 3 } }]}
            >
                <Box display="flex" justifyContent="space-between" color="#3b38a4" borderBottom='1px solid #787878'>
                    <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, paddingY: 1 }}>{title}</DialogTitle>
                    <IconButton onClick={ onClose }>
                        <CloseIcon />
                    </IconButton>
                </Box>
                
                <DialogContent
                    sx={{ width: 400 }}>
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

            {/* Assign role to new user */}
            <Dialog disableEscapeKeyDown
                open={openAssignRole}
                sx={[{ '.MuiPaper-root': { borderRadius: 3 } }]}
            >
                <Box display="flex" justifyContent="space-between" color="#3b38a4" borderBottom='1px solid #787878'>
                    <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, paddingY: 1 }}>Assign Role to New User</DialogTitle>
                    <IconButton onClick={e => setopenAssignRole(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                
                <form onSubmit={ handleSubmit(approvalHandler) } noValidate>
                    <DialogContent
                        sx={{ width: 400 }}>
                        <div>
                            <label>Role *</label>
                            <TextField 
                                onClick={selectRoleEvent}
                                { ...register("userTypeId", { required: true } ) }
                                error={ !!errors.userTypeId }
                                defaultValue="" variant="outlined" size="small" fullWidth select>
                                <MenuItem value='' data-value=""><em>Select Role</em></MenuItem>
                                <MenuItem value="4" data-value="4">Agent</MenuItem>
                                <MenuItem value="5" data-value="5">Player</MenuItem>
                            </TextField>
                        </div>
                        <div>
                            <label>Commission Share *</label>
                            <TextField disabled={!hasCommission} 
                                { ...register("commission", { required: hasCommission } ) }
                                error={ !!errors.commission }
                                defaultValue="" variant="outlined" size="small" fullWidth />
                        </div>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center" }}>
                        <StyledButton onClick={e => setopenAssignRole(false)}>Back</StyledButton>
                        <StyledButton
                            type="submit"
                            sx={[{ background: COLORS.green, color: 'white' }, { '&:hover': { background: 'green' } }]}
                        >Proceed <ArrowRightAltIcon/> </StyledButton>
                    </DialogActions>
                </form>
            </Dialog>

            {/* confirm new downline */}
            <Dialog disableEscapeKeyDown
                open={openConfirmDownline}
                sx={[{ '.MuiPaper-root': { borderRadius: 3 } }]}
            >
                <Box display="flex" justifyContent="space-between" color="#3b38a4" borderBottom='1px solid #787878'>
                    <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, paddingY: 1 }}>Confirm New Downline Member</DialogTitle>
                    <IconButton disabled={submitLoading} onClick={e => setopenConfirmDownline(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                
                <DialogContent
                    sx={{ width: 400 }}>
                    {
                        (hasCommission) 
                        ? <div style={{display:'grid',textAlign:'center'}}>
                            <span>Are you sure you want to</span>
                            <span>register [{(objData !== null) ? objData.fullname : ""}] as your</span>
                            <span><b>Agent</b> with a share of <b>{formData.commission}%</b></span>
                        </div>
                        : <div style={{display:'grid',textAlign:'center'}}>
                            <span>Are you sure you want to</span>
                            <span>register [{(objData !== null) ? objData.fullname : ""}] as your</span>
                            <span><b>Player</b>?</span>
                        </div>
                    }
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <StyledButton disabled={submitLoading} onClick={e => setopenConfirmDownline(false)}>Back</StyledButton>

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
                                You have <span style={{color:'green'}}>successfully approved</span> [{(objData !== null) ? objData.fullname : ""}]
                                as your downline.
                            </p>

                            <div style={{display:'flex', justifyContent:'center'}}>
                                <img style={{width:'150px'}} src={require('../../assets/happy-play-logo.png')} className="logo" title="Esat Logo" />
                            </div>

                            <p style={{ margin: 0, paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>
                                The system will inform the user of your approval!
                            </p>
                        </>
                        : <>
                            <p style={{ margin: 0, paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>
                                You have declined registration for this user.
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

export default ApprovalDialog;