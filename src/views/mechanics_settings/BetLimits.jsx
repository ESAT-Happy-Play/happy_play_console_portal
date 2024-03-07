import React, { useState } from 'react';
import { CustomCard } from '../../components/card/CustomCard';

import './mechanicsSettings.scss';

const BetLimits = ({ subType }) => {

    const [currentBetAmount, setCurrentBetAmount] = useState(2100);
    const [currentPercentage, setCurrentPercentage] = useState(21.20);
    return (
        <div className="cards-container">
            <CustomCard
                header="Bet Entry Limit"
                body={<h2 className='card-header'>{subType.betEntryLimit}</h2>}
                description="Number of bets in a batch"
            />
            <CustomCard
                header="Bet Amount Limit"
                body={<h2 className='card-header'>{subType.betAmountLimit}</h2>}
                description={`Current Bet Amount: ${currentBetAmount}`}
            />
            <CustomCard
                header="Unique Combination"
                body={<h2 className='card-header'>{subType.uniqueCombination}</h2>}
                description={`Current Percentage: ${currentPercentage}%`}
            />
        </div>
    );
}

export default BetLimits;
