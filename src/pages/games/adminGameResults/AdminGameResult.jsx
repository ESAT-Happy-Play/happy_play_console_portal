import "./admingameresult.scss";
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { toast } from 'react-toastify';

import { TextField, Button, MenuItem  } from "@mui/material";
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';

import PageLoader from "../../../components/widget/PageLoader";
import { GetStoreObject, FormatDate, FormatTime } from "../../../helper/Helpers";
import AdminGameResultList from "../../../components/table/adminGameResults/AdminGameResultList";
import AdminGameResultSearchBar from "../../../components/table/adminGameResults/AdminGameResultSearchBar";
import PostResults from "../../../components/Dialog/forms/PostResults";

const AdminGameResult = () => {
  // auth api response object
  let storeObj = GetStoreObject("auth");
  // storeObj.companyObjId
  // storeObj.branchId
  // storeObj.isMain
  // storeObj.accountObjectId
  // storeObj.branchName

  const [pageLoader, setPageLoader] = useState(true);
  const [onloadProcess, setonloadProcess] = useState(true);
  const [value, setValue] = React.useState('');

  let _PAGESIZE = 5;
  const [SearchValue, setSearchValue] = useState('');
  const [PageNumber, setPageNumber] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [PageSize, setPageSize] = useState(_PAGESIZE);

  const [DateFrom, setDateFrom] = React.useState(null);
  const [latestDrawDate, setlatestDrawDate] = React.useState(null);
  const [drawTypeName, setdrawTypeName] = React.useState(null);
  const [drawTypeID, setdrawTypeID] = React.useState(null); 
  const [drawResulsList, setDrawResultsList] = React.useState([]);
  const [winnerList, setWinnerList] = React.useState([]);
  const [branchId, setbranchId] = React.useState(storeObj.branchId);

  const [ResultDrawNumbers, setResultDrawNumbers] = React.useState(null);
  const [CurrentDrawData, setCurrentDrawData] = React.useState(null);

  const [DrawCounts, setDrawCounts] = React.useState(null);
  const [MaxntBall, setMaxntBall] = React.useState(null);


  const handleGetResultData = async (gameTypeId, pageNumber, pageSize, searchVal) => {
    console.log("get result data");
  }

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    setPageLoader(true);
    await handleGetResultData(newValue, 0, _PAGESIZE, "");
  };

  // On click search
  const handleAdminGameResultSearch = async (event, searchvalue) => { 
    setSearchValue(searchvalue);
    setPageNumber(0);
    setPageSize(_PAGESIZE);
    setPageLoader(true);

    await handleGetResultData(value, 0, _PAGESIZE, searchvalue);
  }

  // Trigger on search empty
  const handleAdminGameResultSearchEmpty = async (event, searchvalue) => {
    if (value === "") {
      setSearchValue("");
      setPageNumber(0);
      setPageSize(_PAGESIZE);
      setPageLoader(true);

      await handleGetResultData(value, 0, _PAGESIZE, "");
    }
  }

    // handle company table next page
  const handleAdminGameResultChangePage = async (event, newPage) => {
    setPageNumber(newPage + 1);
    setPageLoader(true);

    await handleGetResultData(value, (newPage + 1) , _PAGESIZE, "");
  }

  // handle company table change page size
  const handleAdminGameResultRowsPerPage = async (event) => {
    setPageSize(+event.target.value);
    setPageNumber(0);
    setPageLoader(true);

    await handleGetResultData(value, 0, (+event.target.value), "");
  }

  // Post Result Modal
  const [openDialog, setDialog] = React.useState(false);
  const handleDialogClose = () => { setDialog(false); };
  const handleDialogOpen = () => {
    setDialog(true); 
  };

  const handleSelectDate = (e, dateVal) => {
    setPageLoader(true);
    setDateFrom(dateVal);
  }

  return (
    <div className="divGameResult">
      <div className="divballResult">

        <div className="left">
          <div className="top">
            <h2 className="title">LATEST RESULT</h2>
            {
              (!onloadProcess) ?
                <span>
                  {
                    `${(new Date(latestDrawDate)).toLocaleDateString("en-US", { 
                      // weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}`
                  }
                  <b>
                    {
                      (drawTypeName !== null) ?
                      `(${drawTypeName})`
                      : ''
                    }
                  </b>
                </span>
              : <></>
            }
          </div>

          {
            (pageLoader) ? <div style={{padding:'20px'}}>Loading... Please wait.</div> :
            <div className="numContent">
              <div className="left">
                <br/>
                {
                  (onloadProcess) ? <>Loading... Please wait!</>
                  :
                  drawResulsList.filter(str => !str.gameTypeName.includes("Blackout")).map((item, index) => (
                    <div className="circleContainer" key={index}>
                      <div className="div-title">
                        <span className="spanTitle">{item.gameTypeName}</span>
                      </div>
                      <div className="div-values">
                        {
                          (item.drawResultValues !== "") 
                          ? 
                            <>
                              {
                                item.drawResultValues.split(',').map((item, index) => (
                                  <span key={index} className="circle">{item}</span>
                                ))
                              }
                            </>
                          :
                            <>
                              {
                                ("0".padStart(Number(item.maxNthBall), '0')).split("").map((item, index) => (
                                  <span key={index} className="circle">-</span>
                                ))
                              }
                            </>
                        }
                      </div>
                    </div>
                  ))
                }

                <div className="circleContainer" style={{ display:'block'}}>
                  <br/>
                  <span className="spanOpTitle">Operator Name</span>
                  <br/>
                  <span>Updated By</span>
                </div>
              </div>

              <div className="right">
                {
                  drawResulsList.filter(str => str.gameTypeName.includes("Blackout")).map((item, index) => (
                    <div key={index}>
                      <span className="spanTitle">{item.gameTypeName}</span>
                      <div className="circleContainer" key={index}>

                        {
                          drawResulsList.filter(str => str.gameTypeName.includes("Blackout")).map((item, index) => (
                            <div key={index}>
                            {
                              (item.drawResultValues !== "") 
                              ? 
                                <>
                                  {
                                    item.drawResultValues.split(',').map((item, index) => (
                                      <span key={index} className="circle">{item}</span>
                                    ))
                                  }
                                  {
                                    ((item.maxNthBall- (item.drawResultValues.split(',')).length) > 0) ?
                                      ("0".padEnd(Number((item.maxNthBall- (item.drawResultValues.split(',')).length)), '0')).split("").map((item, index) => (
                                        <span key={index} className="circle">-</span>
                                      ))
                                    : ''
                                  }
                                </>
                              :
                                <>
                                  {
                                    ("0".padStart(Number(item.maxNthBall), '0')).split("").map((item, index) => (
                                      <span key={index} className="circle">-</span>
                                    ))
                                  }
                                </>
                            }
                            </div>
                          ))
                        }
                          
                      </div>
                    </div>
                  ))
                }
                <br/>
                <br/>
                <div className="circleContainer" style={{display:'block', marginTop:'15px'}}>
                  <span>Specific Result from specific date</span>
                  {
                    (!onloadProcess) ?
                    <div style={{display:'flex', marginTop:'10px', gap:'5px'}}>
                      <div>
                        <label>Date</label>
                        <TextField type="date"
                          onChange={e => handleSelectDate(e, e.target.value)}
                          sx={{ width: "200px" }} defaultValue={latestDrawDate} variant="outlined" size="small" />
                      </div>
                      <div>
                        <label>Draw Type</label>
                        <TextField 
                          sx={{ width: "100px" }}  defaultValue={drawTypeID} variant="outlined" size="small" select>
                          <MenuItem value=''><em>Select current draw</em></MenuItem>
                          { 
                              <MenuItem value=''>Loading options...</MenuItem>
                          }
                        </TextField>
                      </div>
                    </div>
                    : <></>
                  }
                </div>
              </div>
            </div>
          }

        </div>
        <div className="right">
          {
            (CurrentDrawData !== null) ? 
            <>
              <div className="rtContent" style={{marginTop:'5px'}}>
                <span>Current Date: </span>
                <b>
                  {
                    `${(new Date(CurrentDrawData.date)).toLocaleDateString("en-US", { 
                      // weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}`
                  }
                </b>
              </div>
              <div className="rtContent">
                <span>Current Draw: </span>
                <b>
                  {
                    (CurrentDrawData.gameDrawType !== null) ? CurrentDrawData.gameDrawType : 'N/A'
                  }
                </b>
              </div>
              <div className="rtContent">
                <span>CutOff Time: </span>
                <b>
                  {
                    (CurrentDrawData.cutOffTime !== null) ? FormatTime(CurrentDrawData.cutOffTime) : 'N/A'
                  }
                </b>
              </div>
              <div className="rtContent">
                <span>Betting Status: </span>
                {
                  (CurrentDrawData.gameScheduleList.length === 0) ? <b>N/A</b>
                  : (DrawCounts !== null && MaxntBall !== null && (DrawCounts >= MaxntBall)) ? <b style={{color:'red'}}>Closed</b>
                  : <b style={{color:'#39c939'}}>Open</b>
                }
                
              </div>
              <div className="rtContent">
                <Button variant="contained" disabled={(CurrentDrawData.gameScheduleList.length === 0) ? true : false} onClick={handleDialogOpen} style={{backgroundColor:'#805ad5'}} size="large">
                  Post Result <PostAddOutlinedIcon />
                </Button>
              </div>
            </>
            : <>Loading... Please wait.</>
          }
        </div>

      </div>

      <div className="content">
        <div className="container">
          <div className="top">
            <h2 className="title">WINNERS</h2>
          </div>
          <div className="divGameBets">
            <div>
              {
                (drawResulsList.length !== 0) ? 
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange}>
                        {
                          drawResulsList.map((item, index) => (
                            <Tab key={index} label={item.gameTypeName} value={item.gameTypeId.toString()} />
                          ))
                        }
                      </TabList>
                    </Box>
                    { 
                        drawResulsList.map((item, index) => (
                          <TabPanel key={index} value={item.gameTypeId.toString()}>
                            <div className="row">
                              <div className="col-6">
                                <AdminGameResultSearchBar handleSearch={ handleAdminGameResultSearch } handleSearchEmpty={ handleAdminGameResultSearchEmpty } />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <AdminGameResultList 
                                  SearchResults={ winnerList }
                                  ChangePage = { handleAdminGameResultChangePage }
                                  RowsPerPage = { handleAdminGameResultRowsPerPage }
                                  pageNumber = { (PageNumber === 0) ? PageNumber : (PageNumber - 1) }
                                  pageSize = { PageSize } 
                                  totalCount = { totalRows } 
                                  handleLoader={ setPageLoader }/>
                              </div>
                            </div>
                          </TabPanel>
                        ))
                    }
                  </TabContext>
                </Box>
                : (pageLoader) ? <>Loading... Please wait.</> : <>No records found!</>
              }
            </div>
          </div>
        </div>
      </div>
      <PostResults 
          isOpen={ openDialog } 
          handleClose={ handleDialogClose }
          dataObj={CurrentDrawData}
          resultNumbers={ResultDrawNumbers}
          DrawCount={DrawCounts}
          MaxBall={MaxntBall} />

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default AdminGameResult
