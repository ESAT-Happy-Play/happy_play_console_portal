import './tickets.scss';
import React, { useState } from 'react';
import { mockTicketList } from '../../helper/mocks';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import TicketsTable from './TicketsTable';
import TicketDetail from './TicketDetail';

import { ContentLoader } from "../../components/mui";

const Tickets = () => {
    const [isloading, setisloading] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    const [caseStatuses, setcaseStatuses] = useState([]);
    const [caseOrganizations, setcaseOrganizations] = useState([]);

    const handleLoaderCallback = (val, csstatuses = null, csorgans = null) => {
        setisloading(val);
        if (csstatuses !== null) { setcaseStatuses(csstatuses) }
        if (csorgans !== null) { setcaseOrganizations(csorgans) }
    }

    const handleClose = () => {
        setOpenCreate(false);
    }

    const handleSuccessClose = () => {
        setOpenCreate(false);
        window.location.reload(false);
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

            <TicketsTable loaderCallback={ handleLoaderCallback } data={mockTicketList} type={"Regular"} />

            {openCreate &&
                <TicketDetail
                    isOpen={openCreate}
                    caseStatuses={caseStatuses}
                    caseOrganizations={caseOrganizations}
                    handleClose={handleClose}
                    succesCallback={handleSuccessClose}
                    isEditing={false}
                />}

            <ContentLoader isLoadingPage={isloading} />
        </div >
    )
}

export default Tickets