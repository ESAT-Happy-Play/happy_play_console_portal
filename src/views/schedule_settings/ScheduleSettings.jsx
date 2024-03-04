import React, { useState, useMemo } from 'react';
import CustomVerticalTab from '../../components/tab/CustomVerticalTab';
import CustomTab from '../../components/tab/CustomTab';

import './scheduleSettings.scss';
import { companyGames } from '../../helper/mocks';
import ScheduleCalendar from './ScheduleCalendar';

const ScheduleSettings = () => {

  const [drawTypes, setDrawTypes] = useState([]);
  const [closingDates, setClosingDates] = useState([]);

  const getMenu = (child) => {
    console.log(child);
    return child.map((subtype) => { return { label: subtype.subGameName } })
  };

  const fetchClosingData = (newValue) => {
    if (newValue == 0) {
      setClosingDates('01');
    }
    else if (newValue == 1)
      setClosingDates('02');
    else
      setClosingDates('03');
  }

  const fetchDrawTypesData = (newValue) => {
    if (newValue == 0) {
      setDrawTypes('01');
    }
    else if (newValue == 1)
      setDrawTypes('02');
    else
      setDrawTypes('03');
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
              changeEvent={fetchDrawTypesData}
              tabList={[
                { label: "Game Types", isHeader: true },
                ...game.child?.map((subtype) => { return { label: subtype.subGameName, Component: <ScheduleCalendar /> } }) ?? [{ label: game.gameName, Component: <ScheduleCalendar /> }],
                { label: "Draw Types", isHeader: true },
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

export default ScheduleSettings
