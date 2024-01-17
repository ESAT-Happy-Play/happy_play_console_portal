import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddIcon from '@mui/icons-material/Add';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';
import { COLORS } from '../../helper/colors';
import "./addClosing.scss"

export default function AddClosingDialog({ isOpen, setOpen }) {
    const [openConfirmation, setOpenConfirmation] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());

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
        console.log(`NEW CLOSE DATE IS: ${selectedDate.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}`);
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
                <DialogTitle style={{ color: COLORS.violetMain }}>Add Closing Date</DialogTitle>
                <DialogContent
                    style={{ paddingLeft: 60, paddingTop: 20, paddingRight: 60 }}>
                    <div className="col-16">
                        <TextField
                            type="date"
                            sx={{ width: "200px" }} variant="outlined" size="small" />
                    </div>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={handleClose} className="cancel-button">Cancel</Button>
                    <Button type="submit" onClick={() => setOpenConfirmation(true)} className="add-button">Add <AddIcon /></Button>
                </DialogActions>
            </Dialog>
            {/* Confirmation Modal */}
            <Dialog
                open={openConfirmation}
                onClose={handleCloseConfimation}
            >
                <DialogTitle style={{ color: COLORS.violetMain }}>Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>Note: The game will be disabled on</DialogContentText>
                    <DialogContentText sx={{ fontWeight: 'bold', textAlign: 'center' }}>{selectedDate.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}</DialogContentText>
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
                    <DialogContentText>New closing date successfully added!</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={handleCloseSuccess} className="cancel-button">Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}