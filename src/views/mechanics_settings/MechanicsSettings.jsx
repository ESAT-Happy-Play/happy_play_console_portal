import React from 'react'
import { companyGames } from '../../helper/mocks';
import CustomVerticalTab from '../../components/tab/CustomVerticalTab';
import CustomTab from '../../components/tab/CustomTab';

const MechanicsSettings = () => {

  const verticalTabs = [
    { label: "Bet Limit", Component: <p>No design yet</p> },
    { label: "Limit Per Combination", Component: <p>No design yet</p> },
    { label: "Bet Price", Component: <p>No design yet</p> },
    { label: "Prize Calculations", Component: <p>No design yet</p> }
  ];

  const getVerticalTabs = () => {

  }

  const tabs =
    companyGames.map((game) => {
      return {
        label: game.gameName,
        Component:
          <div className="tab-container">
            <div className="tab-header">
              <h1>Game Schedules</h1>
            </div>
            <CustomVerticalTab
              changeEvent={console.log}
              tabList={[
                ...[].concat(...game.child?.map((subtype) => { return [{ label: subtype.subGameName, isHeader: true }, ...verticalTabs] }) ?? [...verticalTabs]),
              ]} />
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
