import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';
import { COLORS } from '../../helper/colors';
import './winningMultiplier.scss';

export default function WinningMultiplierDialogs({ isOpen, setOpen, value }) {
    const [openConfirmation, setOpenConfirmation] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [newValue, setNewValue] = React.useState(value);

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseConfimation = () => {
        setOpenConfirmation(false);
    };
    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };


    const handleSet = () => {
        console.log(`NEW VALUE IS: ${newValue}`);
        handleClose();
        handleCloseConfimation();
        setOpenSuccess(true);
        setTimeout(() => {
            handleCloseSuccess();
        }, 3000);
    }


    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <DialogTitle style={{ color: COLORS.violetMain }}>Edit Winning Multiplier</DialogTitle>
                <DialogContent
                    style={{ paddingLeft: 60, paddingTop: 20, paddingRight: 60 }}>
                    <TextField
                        defaultValue={value}
                        variant="standard"
                        className="textBox"
                        onChange={(event) => {
                            setNewValue(event.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={handleClose} className="cancel-button">Cancel</Button>
                    <Button type="submit" onClick={() => setOpenConfirmation(true)} className="update-button">Update <EditOutlinedIcon /></Button>
                </DialogActions>
            </Dialog>
            {/* Confirmation Modal */}
            <Dialog
                open={openConfirmation}
                onClose={handleCloseConfimation}
            >
                <DialogTitle style={{ color: COLORS.violetMain }}>Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>Note: Winning Multiplier will be set to</DialogContentText>
                    <DialogContentText sx={{ fontWeight: 'bold', textAlign: 'center' }}>{newValue}</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={handleCloseConfimation} className="cancel-button">Cancel</Button>
                    <Button type="submit" onClick={handleSet} className="add-button">Confirm</Button>
                </DialogActions>
            </Dialog>
            {/* Success Modal */}
            <Dialog
                open={openSuccess}
                onClose={handleCloseSuccess}
            >
                <DialogTitle style={{ color: '#38A169', fontWeight: 'bold' }}>Success</DialogTitle>
                <DialogContent>
                    <DialogContentText>New winning multiplier added!</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={handleCloseSuccess} className="cancel-button">Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}