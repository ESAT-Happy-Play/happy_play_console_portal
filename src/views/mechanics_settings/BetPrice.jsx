import React from 'react';
import { CustomCard } from '../../components/card/CustomCard';

import './mechanicsSettings.scss';

const BetPrice = ({ subType }) => {
    return (
        <div className="cards-container">
            {subType.betPriceLimit ?
                <CustomCard
                    header="Bet Price Limit"
                    body={<h2 className='card-header'>{subType.betPriceLimit}</h2>}
                    description="The maximum bet amount per combination"
                />
                :
                <CustomCard
                    header="Bet Price"
                    body={<h2 className='card-header'>{subType.betPrice}</h2>}
                    description="Price amount per bet"
                />
            }
        </div>
    );
}

export default BetPrice;
