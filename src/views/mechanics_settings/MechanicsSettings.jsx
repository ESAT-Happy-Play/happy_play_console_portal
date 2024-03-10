import React from 'react';
import { companyGames, mechanicsSettings, mockLimitCombination } from '../../helper/mocks';
import CustomVerticalTab from '../../components/tab/CustomVerticalTab';
import { IOSSwitch } from '../../components/switch/IOSSwitch';
import CustomTab from '../../components/tab/CustomTab';
import { CustomCard } from '../../components/card/CustomCard';
import './mechanicsSettings.scss';
import { useState } from 'react';
import BetLimits from './BetLimits';
import BetPrice from './BetPrice';
import PrizeCalculations from './PrizeCalculations';
import LimitCombinationTable from './LimitCombinationTable';

const MechanicsSettings = () => {

  const getSubTypeTabs = (subType) => {
    return [
      {
        label: "Bet Limit",
        Component: <BetLimits subType={subType} />
      },
      {
        label: "Limit Per Combination",
        Component: <LimitCombinationTable data={mockLimitCombination} type={subType.subTypeName} />
      },
      {
        label: "Bet Price",
        Component: <BetPrice subType={subType} />
      },
      {
        label: "Prize Calculations", Component: <PrizeCalculations subType={subType} />
      }
    ]
  }

  const tabs =
    mechanicsSettings.map((game) => {

      var verticalTabs = [];
      if (game.child?.length > 1)
        game.child.forEach((subtype) => {
          verticalTabs.push({ label: subtype.subTypeName, isHeader: true });
          verticalTabs.push(...getSubTypeTabs(subtype));
        });
      else
        verticalTabs.push(...getSubTypeTabs(game.child[0]));

      console.log(verticalTabs);

      return {
        label: game.gameName,
        Component:
          <div className="tab-container">
            <div className="tab-header">
              <h1>Game Configurations</h1>
            </div>
            <CustomVerticalTab
              changeEvent={console.log}
              tabList={verticalTabs} />
          </div>
      }
    });

  return (
    <div className='container'>
      <CustomTab tabList={tabs} />
    </div>
  )
}

export default MechanicsSettings
