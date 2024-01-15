import "./gameresults.scss";
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem  } from "@mui/material";
import { toast } from 'react-toastify';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GetStoreObject } from "../../../helper/Helpers";
import CustomTab from "../../../components/tab/CustomTab";
import { Card } from "../../../components/card/Card";
import { ResultsTable } from "./ResultTable";
import PageLoader from "../../../components/widget/PageLoader";
import GameResultList from "../../../components/table/gameResults/GameResultList";

import { GETFetch } from "../../../api/ApiFetchBuilder";
import PostResultRegular from "../../../components/Dialog/forms/gameResult/PostResultRegular";
import PostResultJockpot33 from "../../../components/Dialog/forms/gameResult/PostResultJockpot33";
import PostResultJackpot34 from "../../../components/Dialog/forms/gameResult/PostResultJackpot34";

const GameResults = () => {
  let storeObj = GetStoreObject("auth");
  const [pageLoader, setPageLoader] = React.useState(false);

  let _PAGESIZE = 5;
  // table state
  const [searchValue, setsearchValue] = useState('');
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);
  const [tablelistdata, settablelistdata] = useState([]);

  const [tabsVal, settabsVal] = useState(0);

  const handleGameResultData = async () => {
    setPageLoader(true);
    let gameType = "01";
    if (tabsVal === 1) {
      gameType = "02";
    } else if (tabsVal === 2) {
      gameType = "03";
    } else {
      gameType = "01";
    }
    let url = `${process.env.REACT_APP_API_URL}/gameresults?gametype=${gameType}&rowsperpage=${pageSize}&pagenumber=${pageNumber}`;

    let response = await GETFetch(url);
    setPageLoader(false);

    if(response.status) {
      settablelistdata(response.data.resultHistory);

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
    handleGameResultData();
  }, [pageNumber, searchValue, pageSize, totalRows, tabsVal]);

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
    settabsVal(newValue);
  }

  const handleShowWinner = (e, dataObject) => {
    console.log(dataObject);
  }

  // Add dialog
  const [openPostResult, setPostResult] = React.useState(false);
  const handlePostResultOpen = () => { setPostResult(true); };
  const handlePostResultClose = () => { setPostResult(false); };

  const handlePostResultCallback = () => {
    handlePostResultClose();
    setTotalRows(totalRows + 1);
  }

  return (
    <div className="content">
      <CustomTab 
        changeEvent={fetchResults}
        tabList={
          tabs.map((label) => ({
            label: label,
            Component: 
              <div className="div-result">
                <Card
                  style={{flex:1.2}}
                  header={"Latest Result"}
                  actions={
                    <Button onClick={handlePostResultOpen} variant="outline" className="post-button" size="large">
                      Post Result <EditOutlinedIcon />
                    </Button>
                  }
                  body={
                    <div className="result-div">
                      <h1>{(tablelistdata.length > 0) ? tablelistdata[0].numRes : "..."}</h1>
                      <h2>{(tablelistdata.length > 0) ? tablelistdata[0].formattedDate : "..."}</h2>
                      <h2>{(tablelistdata.length > 0) ? tablelistdata[0].drawType : "..."}</h2>
                      <p>Posted by: {(tablelistdata.length > 0) ? tablelistdata[0].operatorNameDisplay : "..."}</p>
                    </div>
                  }
                />
                <Card
                  style={{flex:2}}
                  header={"RESULT HISTORY"}
                  body={
                    <div>
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
                      </div>

                      <GameResultList 
                        SearchResults={ tablelistdata }
                        totalCount={ totalRows }
                        RowsPerPage={ handleRowsPerPage }
                        pageNumber = { (pageNumber === 0) ? pageNumber : (pageNumber - 1) }
                        pageSize = { pageSize }
                        ChangePage={ handleChangePage }
                        isLoading = { pageLoader }
                        Show = { handleShowWinner }/>
                    </div>
                  }
                />
              </div>
          }))
        }
      />

      {
        (tabsVal === 0) ? <PostResultRegular isOpenAdd={openPostResult} handleCloseAdd={handlePostResultClose} handleCallback={handlePostResultCallback} />
        : (tabsVal === 1) ? <PostResultJockpot33 isOpenAdd={openPostResult} handleCloseAdd={handlePostResultClose} handleCallback={handlePostResultCallback} />
        : <PostResultJackpot34 isOpenAdd={openPostResult} handleCloseAdd={handlePostResultClose} handleCallback={handlePostResultCallback} />
      }
      
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  );
}

export default GameResults
