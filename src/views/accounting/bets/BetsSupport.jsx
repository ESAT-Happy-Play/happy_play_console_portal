import './betsSupport.scss';
import React, { useState } from 'react';
import { mockBets, } from '../../../helper/mocks';
import BetTable from './BetTable';
import CustomTab from '../../../components/tab/CustomTab';


const BetsSupport = () => {
    const [selectedType, setSelectedType] = useState(0);

    const tabs = [
        { label: "Regular", Component: <></> },
        { label: "Jackpot 3.3", Component: <></> },
        { label: "Jackpot 3.4", Component: <></> },
    ]

    return (
        <>
            <CustomTab tabList={tabs} changeEvent={setSelectedType} />
            <div className="home">
                <div className="header">
                    <h1>Bets History</h1>
                </div>

                <BetTable data={mockBets} />
            </div >
        </>

    )
}

export default BetsSupport;