import './deposits.scss';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import DepositsTable from './DepositTable';
import { mockDeposits } from '../../../helper/mocks';
import DepositDetail from './DepositDetail';
import DepositCreate from './DepositCreate';


const Deposits = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const handleClose = () => {
        setOpenCreate(false);
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
                    handleClose={handleClose}
                />}
        </div >

    )
}

export default Deposits