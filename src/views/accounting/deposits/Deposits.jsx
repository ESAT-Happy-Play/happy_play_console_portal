import './deposits.scss';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';
import DepositsTable from './DepositTable';
import { mockDeposits } from '../../../helper/mocks';
import DepositCreate from './DepositCreate';


const Deposits = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleClose = () => {
        setOpenCreate(false);
    }

    const handleSubmit = (data) => {
        setOpenSuccess(true);
        handleClose();
    }

    return (
        <div className="home">
            <div className="header">
                <h1>Deposit Transactions</h1>
                <Button
                    onClick={() => setOpenCreate(true)}
                    size="small"
                    variant="outlined"
                    sx={{ margin: 0, height: 30 }}
                >New Deposit <AddIcon /></Button>
            </div>

            <DepositsTable data={mockDeposits} />

            {openCreate &&
                <DepositCreate
                    isOpen={openCreate}
                    handleSubmission={handleSubmit}
                    handleClose={handleClose}
                />}

            {openSuccess &&
                <Dialog
                    open={openSuccess}
                    onClose={() => setOpenSuccess(false)}
                >
                    <DialogTitle style={{ color: '#38A169', fontWeight: 'bold' }}>Success</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Successfully created deposit!</DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center" }}>
                        <Button onClick={() => setOpenSuccess(false)} className="cancel-button">Close</Button>
                    </DialogActions>
                </Dialog>
            }
        </div >

    )
}

export default Deposits