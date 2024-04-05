import './tickets.scss';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, DialogContentText } from '@mui/material';
import { COLORS } from '../../helper/colors';


const TicketDetail = ({ isOpen, setOpen, ticket }) => {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogTitle style={{ color: COLORS.violetMain }}>Update Ticket</DialogTitle>
            <DialogContent>
                <DialogContentText>Note: Winning Multiplier will be set to</DialogContentText>
                <DialogContentText sx={{ fontWeight: 'bold', textAlign: 'center' }}>asdasd</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
                <Button onClick={handleClose} className="cancel-button">Close</Button>
                <Button type="submit" onClick={handleClose} className="add-button">Update Ticket <EditOutlinedIcon /></Button>
            </DialogActions>
        </Dialog>
    )
}

export default TicketDetail