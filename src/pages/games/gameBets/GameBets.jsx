import "./gamebets.scss";
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem  } from "@mui/material";
import { toast } from 'react-toastify';

import GameBetsSearchBar from "../../../components/table/gameBets/GameBetsSearchBar";
import GameBetsList from "../../../components/table/gameBets/GameBetsList";

import CustomTab from "../../../components/tab/CustomTab";
import { GETFetch } from "../../../api/ApiFetchBuilder";
import PageLoader from "../../../components/widget/PageLoader";
import { DrawTypes } from "../../../helper/Enums";

const GameBets = () => {
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
                    <div className="col-8">

                      <div className="row">
                        <div className="labelTitle">
                          <span>Game Time</span>
                        </div>
                        <div className="col-8">
                          <TextField style={{textAlign:'left'}} sx={{ width: "200px" }}
                            label="Select draw schedule"
                            onClick={clickDrawSchedEvent}
                            variant="outlined" defaultValue="" size="small" fullWidth select>
                            <MenuItem value=""><em>Select draw schedule</em></MenuItem>
                                { 
                                    DrawTypes().map((item, index) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                    ))
                                }
                            </TextField>
                        </div>
                      </div>
                    </div>
                    <div className="dateSearch">
                      <div className="row">
                        <div className="row">
                          <div className="labelTitle">
                            <span>Date From</span>
                          </div>
                          <div className="col-8">
                            <TextField
                              type="date"
                              sx={{ width: "200px" }}  variant="outlined" size="small" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4 labelTitle">
                            <span>Date To</span>
                          </div>
                          <div className="col-8">
                            <TextField
                              type="date"
                              sx={{ width: "200px" }}  variant="outlined" size="small" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-3">
                        <GameBetsSearchBar handleSearch={ handleGameBetsSearch } handleSearchEmpty={ handleGameBetsSearchEmpty } />
                      </div>
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

export default GameBets
