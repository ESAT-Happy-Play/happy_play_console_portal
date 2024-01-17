import "./cgamebets.scss";
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem  } from "@mui/material";
import { toast } from 'react-toastify';

import GameBetsSearchBar from "../../../../components/table/gameBets/GameBetsSearchBar";

import GameBetsList from "../../../../components/table/gameBets/GameBetsList";

import CustomTab from "../../../../components/tab/CustomTab";
import { GETFetch } from "../../../../api/ApiFetchBuilder";
import PageLoader from "../../../../components/widget/PageLoader";
import { DrawTypes } from "../../../../helper/Enums";

const AgentGameBets = () => {
  const [pageLoader, setPageLoader] = useState(false);

  let _PAGESIZE = 10;
  // table state
  const [searchValue, setsearchValue] = useState('');
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);

  const [betsList, setBetsList] = React.useState([]);
  const [tabsVal, settabsVal] = useState(0);
  const [gameTime, setgameTime] = useState(null);

  const handleBetsData = async () => {
    setPageLoader(true);
    let gameType = "01";
    if (tabsVal === 1) {
      gameType = "02";
    } else if (tabsVal === 2) {
      gameType = "03";
    } else {
      gameType = "01";
    }
    
    let url = `${process.env.REACT_APP_API_URL}/bets?rowsperpage=${pageSize}&pagenumber=${pageNumber}&gametype=${gameType}&bettorsearch=${searchValue}`;
    if (gameTime !== null) {
      url = `${process.env.REACT_APP_API_URL}/bets?rowsperpage=${pageSize}&pagenumber=${pageNumber}&gametype=${gameType}&drawtype=${gameTime}&bettorsearch=${searchValue}`;
    }

    let response = await GETFetch(url);
    setPageLoader(false);

    if (response.status) {
      setBetsList(response.data.bets)

      setTotalRows(response.data.totalRows);
      setpageNumber(response.data.currentPage);
      setpageSize(response.data.rowsPerPage);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    handleBetsData();
  }, [pageNumber, searchValue, pageSize, totalRows, tabsVal, gameTime]);

  // On click search
  const handleGameBetsSearch = async (event, searchvalue) => { 
    setsearchValue(searchvalue);
    setpageNumber(1);
    setpageSize(_PAGESIZE);
  }

  // Trigger on search empty
  const handleGameBetsSearchEmpty = async (event, searchvalue) => {
    if (searchvalue === "") {
      setsearchValue("");
      setpageNumber(1);
      setpageSize(_PAGESIZE);
    }
  }

    // handle table next page
  const handleChangePage = (event, newPage) => {
    setpageNumber(newPage + 1);
  }

  // handle table change page size
  const handleRowsPerPage = (event) => {
    setpageSize(+event.target.value);
    setpageNumber(1);
  }
  
  const tabs = ["Regular", "Jackpot 3.3", "Jackpot 3.4"];
  const fetchResults = (newValue) => {
    setgameTime(null);
    settabsVal(newValue);
  }

  const clickDrawSchedEvent = event => {
    let drawVal = event.target.getAttribute('data-value');
    setgameTime(drawVal);
  }

  return (
    <div className="content">
      <CustomTab
          changeEvent={fetchResults}
          tabList={
            tabs?.map((label) => (
              {label:label, 
                Component: 
                <div className="tab-container">
                  <div className="tab-header">
                    <h1>Bets</h1>
                  </div>
                  
                  <div className="header-actions">
                    <div className="dateSearch">
                        <div></div>
                        <GameBetsSearchBar handleSearch={ handleGameBetsSearch } handleSearchEmpty={ handleGameBetsSearchEmpty } />
                    </div>
                  </div>

                  <GameBetsList 
                        SearchResults={ betsList }
                        totalCount={ totalRows }
                        RowsPerPage={ handleRowsPerPage }
                        pageNumber = { (pageNumber === 0) ? pageNumber : (pageNumber - 1) }
                        pageSize = { pageSize }
                        ChangePage={ handleChangePage }
                        isLoading = { pageLoader }/>
                </div>
              }
              ))
          }/>
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  );
}

export default AgentGameBets
