import React from 'react';
import { CustomCard } from '../../components/card/CustomCard';

import './mechanicsSettings.scss';
import { IOSSwitch } from '../../components/switch/IOSSwitch';

const PrizeCalculations = ({ subType }) => {
    var tabs = [];
    var keys = Object.keys(subType);

    if (keys.includes("incrementAmount"))
        tabs.push(
            <CustomCard
                header="Increment Amount in %"
                body={<h2 className='card-header'>{subType.incrementAmount}</h2>}
                description="Percentage of bets to be added to the Prize"
            />);

    if (keys.includes("prizeFloor"))
        tabs.push(
            <CustomCard
                header="Prize Floor"
                body={<h2 className='card-header'>{subType.prizeFloor}</h2>}
                description="Starting Prize Pool"
            />);

    if (keys.includes("prizeCeiling"))
        tabs.push(
            <CustomCard
                header="Prize Ceiling"
                body={<h2 className='card-header'>{subType.prizeCeiling}</h2>}
                description="Maximum Prize Pool"
            />);

    if (keys.includes("consecutiveWins"))
        tabs.push(
            <CustomCard
                header="Consecutive Wins"
                body={<h2 className='card-header'>{subType.consecutiveWins}</h2>}
                description="Winning condition for achieving the prize."
            />);

    if (keys.includes("winningMultiplier"))
        tabs.push(
            <CustomCard
                header="Winning Multiplier"
                body={<h2 className='card-header'>{subType.winningMultiplier}</h2>}
                description="Equivalent winner prize per 1 peso"
            />);

    if (keys.includes("haveQuasi"))
        tabs.push(
            <CustomCard
                header="Enable Quasi Winnings"
                body={<IOSSwitch checked={subType.haveQuasi} />}
                description="The maximum bet amount per combination"
            />);


    return (
        <div className="cards-container">
            {tabs}
        </div>
    );
}

export default PrizeCalculations;