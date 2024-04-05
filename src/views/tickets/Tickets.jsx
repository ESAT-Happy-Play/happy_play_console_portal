import './tickets.scss';
import React from 'react';
import { mockTicketList } from '../../helper/mocks';
import TicketsTable from './TicketsTable';


const Tickets = () => {
    return (
        <div className="home">
            <div className="header">
                <h1>Game Configurations</h1>
            </div>

            <TicketsTable data={mockTicketList} type={"Regular"} />
        </div >
    )
}

export default Tickets