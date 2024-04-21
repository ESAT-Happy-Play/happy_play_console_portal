import React, { useState, useEffect } from 'react';
import CustomVerticalTab from '../../components/tab/CustomVerticalTab';
import CustomTab from '../../components/tab/CustomTab';

import './scheduleSettings.scss';
// import { companyGames } from '../../helper/mocks';
import ScheduleCalendar from './ScheduleCalendar';

import { CompanyGameList } from "../../utils/common/CompanyGameList";
import { ContentLoader } from "../../components/mui";
import { StoreExt, DateExt } from "../../utils/helpers";
import { DrawTypeService, CloseDateService } from "../../services";

const DefaultScheduleSettings = () => {
  let loginObj = StoreExt.getStore("auth");
  let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

  const [pageLoader, setPageLoader] = useState(true);
  const [companyGames, setcompanyGames] = useState(null);
  const [companyGuid, setcompanyGuid] = useState(tokenObj.companyId);

  const [drawTypes, setDrawTypes] = useState(null);
  const [closingDates, setClosingDates] = useState(null);
  const [selectedGameId, setselectedGameId] = useState(null);

  const fetchDrawTypesData = (newValue) => {
    // Get closing dates
    getCloseDates(newValue);
  }

  const handleChangeGame = (newValue) => {
    getDrawTypeList(newValue);
    getCloseDates(newValue);
  }

  const getDrawTypeList = (gameId) => {
    DrawTypeService.getDrawTypes(companyGuid, gameId).then((res) => {
      if(res) { setDrawTypes(res.data); }
    });
  }

  const getCloseDates = (gameId, startDate = null, endDate = null) => {
    setPageLoader(true);
    setselectedGameId(gameId);
    let startD = startDate; let endD = endDate;
    if (startDate === null && endDate === null) {
      startD = DateExt.todaysDate();
      endD = DateExt.todaysDate();
    }

    CloseDateService.getClosedDateByCompany(companyGuid, gameId, startD, endD).then((res) => {
      if(res) { 
        setClosingDates(res.data.filter(obj => obj.game === gameId));
      }
      setPageLoader(false);
    });
  }

  const handleSelectDate = (newDate) => {
    let ftDate = DateExt.formatDate(newDate);
    getCloseDates(selectedGameId, ftDate, ftDate); 
  }

  const handleCloseCallback = (data, clickType, selectedDate) => {
    setPageLoader(true);
    let dataparam = {
      companyId: data.companyId,
      date: DateExt.formatDate(selectedDate),
      isWholeday: true,
      status: 1,
      closedDrawType: data.id,
      game: selectedGameId
    };

    CloseDateService.createCloseDate(dataparam).then((res) => {
      closingDates.push(dataparam);
      setPageLoader(false);
    });
  }

  const handleListGames = async () => {
    await CompanyGameList.getGameList().then((res) => {
      setcompanyGuid(res.companyId);

      if (res.gameList.length > 0) {
        setcompanyGames(res.gameList);
        // for new load default company
        setselectedGameId(res.gameList[0].id);
        
        // init needed data
        getDrawTypeList(res.gameList[0].id);
        getCloseDates(res.gameList[0].id);
      }
      setPageLoader(false);
    });
  }

  useEffect(() => {
    handleListGames();
  }, []);

  const tabs = (companyGames !== null) ?
    companyGames.map((game) => {
      return {
        label: game.gameName,
        itemId: game.id,
        Component:
          <div className="tab-container">
            <div className="tab-header">
              <h1>Game Schedules</h1>
            </div>
            <CustomVerticalTab
              changeEvent={fetchDrawTypesData}
              tabList={[
                { label: "Game Types", itemId: 10111, isHeader: true },
                ...game.child?.map((subtype) => { 
                  return { 
                    label: subtype.gameName, 
                    itemId: subtype.id, 
                    Component: <ScheduleCalendar drawTypes={ drawTypes } closeDates={closingDates} selectDateCallback={handleSelectDate} closeDateCallback={handleCloseCallback} /> 
                  } }) 
                  ?? [{ 
                    label: game.gameName, 
                    itemId: game.id, 
                    Component: <ScheduleCalendar drawTypes={ drawTypes } closeDates={closingDates} selectDateCallback={handleSelectDate} closeDateCallback={handleCloseCallback} /> 
                  }],
                { label: "Draw Time", itemId: 10112, isHeader: true },
                { label: "Draw Time", itemId: 10113, Component: <p>No design yet</p> }
              ]} />
          </div>
      }
    }) : <div style={{padding:'25px'}}>Loading...Please wait.</div>;

  return (
    <div className='container'>
      {
        (tokenObj.role !== "Super Admin")
        ? (companyGames !== null) 
        ? <CustomTab changeEvent={handleChangeGame} tabList={tabs} />
        : <div style={{padding:'25px'}}>Loading...Please wait.</div>
        : <div style={{padding:'25px'}}>No company linked to the account.</div>
      }

      <ContentLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default DefaultScheduleSettings
