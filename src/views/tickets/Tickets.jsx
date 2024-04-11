import './tickets.scss';
import React, { useState } from 'react';
import { mockTicketList } from '../../helper/mocks';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import TicketsTable from './TicketsTable';
import TicketDetail from './TicketDetail';


const Tickets = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const handleClose = () => {
        setOpenCreate(false);
    }
    return (
        <div className="home">
            <div className="header">
                <h1>Tickets</h1>
                <Button
                    onClick={() => setOpenCreate(true)}
                    size="small"
                    variant="outlined"
                    sx={{ margin: 0, height: 30 }}
                >New Ticket <AddIcon /></Button>
            </div>

            <TicketsTable data={mockTicketList} type={"Regular"} />

            {openCreate &&
                <TicketDetail
                    isOpen={openCreate}
                    handleClose={handleClose}
                    isEditing={false}
                />}
        </div >

    )
}

export default Tickets