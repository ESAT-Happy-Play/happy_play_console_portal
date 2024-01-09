import "./gamebets.scss";
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem  } from "@mui/material";
import { toast } from 'react-toastify';

import GameBetsSearchBar from "../../../components/table/gameBets/GameBetsSearchBar";
import GameBetsList from "../../../components/table/gameBets/GameBetsList";

import { GetStoreObject } from "../../../helper/Helpers";
import { BetsTable } from "./BetTable";
import CustomTab from "../../../components/tab/CustomTab";

const GameBets = () => {

  // auth api response object
  let storeObj = GetStoreObject("auth");
  // storeObj.companyObjId
  // storeObj.branchId
  // storeObj.isMain
  // storeObj.accountObjectId
  // storeObj.branchName

  const [pageLoader, setPageLoader] = React.useState(false);

  let _PAGESIZE = 5;
  const [SearchValue, setSearchValue] = React.useState('');
  const [PageNumber, setPageNumber] = React.useState(0);
  const [totalRows, setTotalRows] = React.useState(0);
  const [PageSize, setPageSize] = React.useState(_PAGESIZE);

  // const [getBetsHistory] = useGetBetsHistoryMutation();

  const [branchId, setbranchId] = React.useState(storeObj.branchId);

  // On click search
  const handleGameBetsSearch = async (event, searchvalue) => { 
    setSearchValue(searchvalue);
    setPageNumber(0);
    setPageSize(_PAGESIZE);
    setPageLoader(true);
  }

  // Trigger on search empty
  const handleGameBetsSearchEmpty = async (event, searchvalue) => {
    if (searchvalue === "") {
      setSearchValue("");
      setPageNumber(0);
      setPageSize(_PAGESIZE);
      setPageLoader(true);
    }
  }

    // handle company table next page
  const handleGameBetsChangePage = async (event, newPage) => {
    setPageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle company table change page size
  const handleGameBetsRowsPerPage = async (event) => {
    setPageSize(+event.target.value);
    setPageNumber(0);
    setPageLoader(true);
  }

  const tabHeaders = ["Regular", "Jackpot 3.3", "Jackpot 3.4"];

  const betReg = [
    {accntNo: 123123, accntName:"Super Admin", transactionNo:1, noBet:2, betAmount: 20, date: "Dec 25, 2023", gameTime: "5PM", recruiter:12312},
    {accntNo: 123124, accntName:"Super Admin2", transactionNo:5, noBet:6, betAmount: 50, date: "Dec 25, 2023", gameTime: "5PM", recruiter:12312},
  ];
  const jackpot3 = [];
  const jackpot4 = [];

  const [betsList, setBetsList] = React.useState(betReg);

  const fetchBets = (newValue) => {
    if (newValue == 0)
      setBetsList(betReg);

    else if (newValue == 1)
      setBetsList(jackpot3);

    else
      setBetsList(jackpot4);
  }

  return (
    <div className="content">
      <CustomTab
                  changeEvent={fetchBets}
                  tabList={
                    tabHeaders?.map((label) => (
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
                                  <TextField 
                                    sx={{ width: "200px" }}  defaultValue="1PM" variant="outlined" size="small" select>
                                    <MenuItem value=''><em>Select draw schedule</em></MenuItem>
                                    <MenuItem value='1PM'>1PM</MenuItem>
                                    <MenuItem value='2PM'>2PM</MenuItem>
                                    <MenuItem value='3PM'>3PM</MenuItem>
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
                          <BetsTable data={betsList} />
                        </div>
                      }
                      ))
                  }/>
      {/* <PageLoader isLoadingPage={ pageLoader } /> */}
    </div>
  );
}

export default GameBets
