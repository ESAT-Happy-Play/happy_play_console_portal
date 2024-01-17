import "./mechanicssetting.scss";
import React, { useState, useEffect } from 'react';
import { TextField, Button } from "@mui/material";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditMechanicSetting from "../../../components/Dialog/forms/EditMechanicSetting";
import { GETFetch } from "../../../api/ApiFetchBuilder";
import PageLoader from "../../../components/widget/PageLoader";
import CustomTab from "../../../components/tab/CustomTab";
import { toast } from 'react-toastify';

import { LimitTable, SoldOutTable } from "./MechanicalTables";
import CustomVerticalTab from "../../../components/tab/CustomVerticalTab";
import { Card } from "../../../components/card/Card";

const MechanicsSetting = () => {
  // const [pageLoader, setPageLoader] = useState(true);

  const defaultOverallLimit = {
    betEntryLimit: 0,
    betAmountLimit: 0,
    currentBetAmount: 0,
    uniqueComboPercentage: 0,
    currentUniqueComboPercentage: 0
  };

  const [overallLimit, setoverallLimit] = React.useState(defaultOverallLimit);
  const [gamelist, setGameList] = React.useState([]);
  const [limitPerCombination, setLimitPerCombination] = React.useState([]);
  const [soldOutCombination, setSoldOutCombination] = React.useState([]);

  // Edit Setting dialog
  const [openEditSetting, setEditSetting] = React.useState(false);
  const handleEditSettingOpen = () => { setEditSetting(true); };
  const handleEditSettingClose = () => { setEditSetting(false); };

  const handleEditCallback = () => {
    setTimeout(function () {
      window.location.reload(false);
    }, 2000);
  }

  const verticalTab = [
    "Regular", "Jackpot 3.3", "Jackpot 3.4"
  ]


  const getOverallGameLimit = async () => {
    let url = `${process.env.REACT_APP_API_URL}/gamesettings/overallgamelimits?gametype=01`;
    let response = await GETFetch(url);

    if (response.status) {
      if (!!response.data.overallGameLimits)
      {
        setoverallLimit(response.data.overallGameLimits);
      }
    }

    if (!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  const getLimitPerCombination = async (gameType) => {
    let url = `${process.env.REACT_APP_API_URL}/gamesettings/limitspercombination?gametype=${gameType}`;
    let response = await GETFetch(url);
    if (response.status) {
      if (!!response.data.limitsPerCombo)
      {
        setLimitPerCombination(response.data.limitsPerCombo);
      }
    }

    if (!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  const getSoldouts = async (gameType) => {
    let url = `${process.env.REACT_APP_API_URL}/gamesettings/soldouts?gametype=${gameType}`;
    let response = await GETFetch(url);

    if (response.status) {
      if (!!response.data.soldouts)
      {
        setSoldOutCombination(response.data.soldouts);
      }
    }

    if (!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  const fetchLimitData = (newValue) => {
    if (newValue == 0)
      getLimitPerCombination('01');
    else if (newValue == 1)
      getLimitPerCombination('02');
    else
      getLimitPerCombination('03');
  }

  const fetchSoldOutData = (newValue) => {
    if (newValue == 0)
      getSoldouts('01');
    else if (newValue == 1)
      getSoldouts('02');
    else
      getSoldouts('03');
  }

  useEffect(() => {
    getOverallGameLimit();
    getLimitPerCombination('01');
    getSoldouts('01');
  }, [])

  const tabs = [
    {
      label: "Overall Limit",
      Component:
        <div className="div-multiplier">
          <Card
            header={"Bet Entry Limit"}
            actions={
              <Button onClick={e => handleEditSettingOpen()} variant="outline" className="edit-button" size="large">
                Edit <EditOutlinedIcon />
              </Button>}
            body={
              <div className="mult-body">
                <h1>{overallLimit.betEntryLimit}</h1>
                <p>Number of bets in a batch</p>
              </div>
            }
          />
          <Card
            header={"Bet Amount Limit"}
            actions={
              <Button onClick={e => handleEditSettingOpen()} variant="outline" className="edit-button" size="large">
                Edit <EditOutlinedIcon />
              </Button>}
            body={
              <div className="mult-body">
                <h1>{overallLimit.betAmountLimit}</h1>
                <p>Current bet amount: {overallLimit.currentBetAmount}</p>
              </div>
            }
          />
          <Card
            header={"Unique Combination"}
            actions={
              <Button onClick={e => handleEditSettingOpen()} variant="outline" className="edit-button" size="large">
                Edit <EditOutlinedIcon />
              </Button>}
            body={
              <div className="mult-body">
                <h1>{overallLimit.uniqueComboPercentage}%</h1>
                <p>Current pool percentages: {overallLimit.currentUniqueComboPercentage}%</p>
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
                Component: <LimitTable data={limitPerCombination} />
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
                  <SoldOutTable data={soldOutCombination} />
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
        isOpenAddSetting={openEditSetting}
        handleCloseEditSetting={handleEditSettingClose}
        handleCallback={handleEditCallback} gameObj={gamelist} />

      {/* <PageLoader isLoadingPage={ pageLoader } /> */}
    </div>
  )
}

export default MechanicsSetting
