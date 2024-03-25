import React, { useState, useEffect } from 'react';
import CustomVerticalTab from '../../components/tab/CustomVerticalTab';
import CustomTab from '../../components/tab/CustomTab';

import './scheduleSettings.scss';
// import { companyGames } from '../../helper/mocks';
import ScheduleCalendar from './ScheduleCalendar';

import { ContentLoader } from "../../components/mui";
import { StoreExt, DateExt } from "../../utils/helpers";
import { GameService, DrawTypeService, CloseDateService } from "../../services";

const ScheduleSettings = () => {
  let loginObj = StoreExt.getStore("auth");
  let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

  const [companyGames, setcompanyGames] = useState(null);
  const [pageLoader, setPageLoader] = useState(false);
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

  const listGames = () => {
    setPageLoader(true);
    GameService.getCompanyGameSettings(tokenObj.companyId).then((res) => {
      if(res.status) {
        let gameIds = res.data.map(m => m.gameId);
        GameService.getAllGameList().then((res1) => {
          let listOfCompanyGames = res1.data.filter((item) => gameIds.includes(item.id));

          let objCompanies = [];
          listOfCompanyGames.forEach(item => {
            // push parent
            if(item.gameMechanics.isParent) {
              objCompanies.push({
                gameName: item.name,
                id: item.id,
                child: [{ gameName: item.name, id: item.id }]
              });
            } else {
              let parentCompany = objCompanies.filter(obj => obj.id === item.gameMechanics.parentId);
              if (parentCompany.length > 0) {
                let parentIndex = objCompanies.findIndex(obj => obj.id === parentCompany[0].id);

                //Update child
                objCompanies[parentIndex].child.push({ gameName: item.name, id: item.id });
              }
            }
          });

          setcompanyGames(objCompanies);

          // for new load default company
          getDrawTypeList(objCompanies[0].id);
          setselectedGameId(objCompanies[0].id);
          
          // init needed data
          getDrawTypeList(objCompanies[0].id);
          getCloseDates(objCompanies[0].id);

          setPageLoader(false);
        });
      } else { setPageLoader(false); }
    });
  }

  const getDrawTypeList = (gameId) => {
    DrawTypeService.getDrawTypes(tokenObj.companyId, gameId).then((res) => {
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

    CloseDateService.getClosedDateByCompany(tokenObj.companyId, gameId, startD, endD).then((res) => {
      if(res) { 
        setClosingDates(res.data.filter(obj => obj.game == gameId));
      }
      setPageLoader(false);
    });
  }

  const handleSelectDate = (newDate) => {
    let ftDate = DateExt.formatDate(newDate);
    getCloseDates(selectedGameId, ftDate, ftDate); 
  }

  useEffect(() => {
    listGames();
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
                    Component: <ScheduleCalendar drawTypes={ drawTypes } closeDates={closingDates} selectDateCallback={handleSelectDate} /> 
                  } }) 
                  ?? [{ 
                    label: game.gameName, 
                    itemId: game.id, 
                    Component: <ScheduleCalendar drawTypes={ drawTypes } closeDates={closingDates} selectDateCallback={handleSelectDate} /> 
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
        (companyGames !== null) 
        ? <CustomTab changeEvent={handleChangeGame} tabList={tabs} />
        : <div style={{padding:'25px'}}>Loading...Please wait.</div>
      }

      <ContentLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default ScheduleSettings
