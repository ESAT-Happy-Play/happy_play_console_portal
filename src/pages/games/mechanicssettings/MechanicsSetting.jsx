import "./mechanicssetting.scss";
import React, { useState, useEffect } from 'react';
import { TextField, Button  } from "@mui/material";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditMechanicSetting from "../../../components/Dialog/forms/EditMechanicSetting";

import PageLoader from "../../../components/widget/PageLoader";
import CustomTab from "../../../components/tab/CustomTab";
import { LimitTable, SoldOutTable } from "./MechanicalTables";
import CustomVerticalTab from "../../../components/tab/CustomVerticalTab";
import {Card} from "../../../components/card/Card";

const MechanicsSetting = () => {
  // const [pageLoader, setPageLoader] = useState(true);
  const [skipGamebyId, setSkipGamebyId] = React.useState(true);
  const [gameGuid, setGameGUid] = React.useState(null);
  const [gamelist, setGameList] = React.useState([]);
  const [winMult, setWinMult] = React.useState(700);
    // Edit Setting dialog
  const [openEditSetting, setEditSetting] = React.useState(false);
  const handleEditSettingOpen = () => { setEditSetting(true); };
  const handleEditSettingClose = () => { setEditSetting(false); };

  const handleEditCallback = () => {
    setTimeout(function(){
      window.location.reload(false);
    }, 2000);
  }

  const verticalTab = [
    "Regular", "Jackpot 3.3", "Jackpot 3.4"
  ]

  //MOCK DATA-------------!

  const jack3Limit = [
    {
      combination: "1,2,3,4,5,J,K,Q",
      betAmount: 2000,
      currentBet: 1230
    },
    
    {
      combination: "1,5,6,8,10,K,J,Q",
      betAmount: 1231,
      currentBet: 121
    },
    
    {
      combination: "3,7,8,10,Q,K,J",
      betAmount: 1231,
      currentBet: 121
    },
  ];
  const jack4Limit = [
    {
      combination: "1,2,3,4,5,J,K,Q",
      betAmount: 456,
      currentBet: 767
    },
    
    {
      combination: "1,5,6,8,10,K,J,Q",
      betAmount: 4562,
      currentBet: 145621
    },
    
    {
      combination: "3,7,8,10,Q,K,J",
      betAmount: 12313,
      currentBet: 123
    },
  ];
  
  const regLimit = [
    {
      combination: "1,2,3,4,5",
      betAmount: 2000,
      currentBet: 1230
    },
    
    {
      combination: "1,5,6,8,10",
      betAmount: 1231,
      currentBet: 121
    },
    
    {
      combination: "3,7,8,10",
      betAmount: 1231,
      currentBet: 121
    },
  ];

  const regSoldOut = [
    {
      combination: "1,2,3,4,5",
      isTemp: true
    },
    
    {
      combination: "1,5,6,8,10",
      isTemp: false
    },
    
    {
      combination: "3,7,8,10",
      isTemp: true
    },
  ];

  const jack3SoldOut = [
    {
      combination: "1,2,3,4,5,J,K,Q",
      isTemp: true
    },
    
    {
      combination: "1,5,6,8,10,K,J,Q",
      isTemp: false
    },
  ]
  const jack4SoldOut = [
    {
      combination: "3,4,5,8,1,K,Q,J",
      isTemp: true
    },
    
    {
      combination: "1,5,6,8,10,Q,K,J",
      isTemp: false
    },
    
    {
      combination: "3,2,5,7,1,J,Q,K",
      isTemp: true
    },
  ];
  
  
  const [limitData, setLimitData] = useState(regLimit);
  const [soldOutData, setSoldOutData] = useState(regSoldOut);
  const fetchLimitData = (newValue) => {
    if (newValue == 0)
      setLimitData(regLimit);
    else if (newValue == 1)
      setLimitData(jack3Limit);
    else
      setLimitData(jack4Limit);
  }

  const fetchSoldOutData = (newValue) => {
    if (newValue == 0)
      setSoldOutData(regSoldOut);
    else if (newValue == 1)
      setSoldOutData(jack3SoldOut);
    else
      setSoldOutData(jack4SoldOut);
  }

  const tabs = [
    {
      label: "Overall Limit",
      Component: 
      <div className="div-multiplier">
        <Card
          header={"Winning Multiplier"}
          actions={
            <Button onClick={e => handleEditSettingOpen() } variant="outline" className="edit-button" size="large">
              Edit <EditOutlinedIcon />
            </Button>}
          body={
            <div className="mult-body">
              <h1>{winMult}</h1>
              <p>Winning equivalent per 1 peso bet</p>
            </div>
          }
          
        />
    </div>
    },
    {
      label: "Limit Per Combination",
      Component:
      <div className="tab-container">
        <div className="tab-header">
          <h1>Bets</h1>
        </div>
        <CustomVerticalTab
          changeEvent={fetchLimitData}
          tabList={
            verticalTab.map((label) => ({
              label: label,
              Component: <LimitTable data={limitData} />
            }))
          }
        />
      </div>
    },
    {
      label: "Sold Out Combination",
      Component: 
      <div className="tab-container">
        <div className="tab-header">
          <h1>Bets</h1>
        </div>        
        <CustomVerticalTab
          changeEvent={fetchSoldOutData}
          tabList={
            verticalTab.map((label) => ({
              label: label,
              Component: 
              <SoldOutTable data={soldOutData} />
            }))
          }
        />
      </div>
    }
  ];

  return (
    <div className="content">
      <CustomTab 
        tabList={tabs}
      />

      <EditMechanicSetting 
      isOpenAddSetting={ openEditSetting } 
      handleCloseEditSetting={ handleEditSettingClose } 
      handleCallback={ handleEditCallback } gameObj={ gamelist }/>

      {/* <PageLoader isLoadingPage={ pageLoader } /> */}
    </div>
  )
}

export default MechanicsSetting
