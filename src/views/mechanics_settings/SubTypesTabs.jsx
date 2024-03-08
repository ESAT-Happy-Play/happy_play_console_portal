import LimitCombinationTable from "./LimitCombinationTable";

export const getTabs = (subType, section) => {
    var tabs = [];
    let keys = Object.keys(subType);

    if (section == "Bet Limits") {

    }
    return [
        {
            label: "Bet Limit",
            Component:
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
        },
        {
            label: "Limit Per Combination",
            Component: <LimitCombinationTable />
        },
        {
            label: "Bet Price",
            Component:
                <div className="cards-container">
                    <CustomCard
                        header="Bet Price Limit"
                        body={<h2 className='card-header'>{subType.betPriceLimit}</h2>}
                        description="The maximum bet amount per combination"
                    />
                </div>
        },
        {
            label: "Prize Calculations", Component:
                <div className="cards-container">
                    <CustomCard
                        header="Winning Multiplier"
                        body={<h2 className='card-header'>{subType.winningMultiplier}</h2>}
                        description="Equivalent winner prize per 1 peso"
                    />
                    <CustomCard
                        header="Enable Quasi Winnings"
                        body={<IOSSwitch checked={subType.haveQuasi} />}
                        description="The maximum bet amount per combination"
                    />
                </div>
        }
    ]
}

export const getJackpotSubTabs = (subType) => {
    return [
        {
            label: "Bet Limit",
            Component:
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
        },
        {
            label: "Limit Per Combination",
            Component: <LimitCombinationTable />
        },
        {
            label: "Bet Price",
            Component: <p>No design yet</p>
        },
        { label: "Prize Calculations", Component: <p>No design yet</p> }
    ]
}

