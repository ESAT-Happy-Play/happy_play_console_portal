import "./gamebet.scss";

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { toast } from 'react-toastify';

import { TextField, MenuItem, Button  } from "@mui/material";

import PageLoader from "../../../components/widget/PageLoader";
import { GetStoreObject, FormatDate } from "../../../helper/Helpers";
import AdminGameBetsSearchBar from "../../../components/table/adminGameBets/AdminGameBetsSearchBar";
import AdminGameBetsList from "../../../components/table/adminGameBets/AdminGameBetsList";

const AdminGameBets = () => {
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

  const [DateFrom, setDateFrom] = useState(null);
  const [DateTo, setDateTo] = useState(null);
  const [DrawTypeId, setDrawTypeId] = useState(null);
  const [DrawName, setDrawName] = useState(null);

  const [betsList, setBetsList] = React.useState([]);
  const [branchId, setbranchId] = React.useState(storeObj.branchId);

  const [gameTypeList, setGameTypeList] = React.useState([]);

  const handleGetBetsData = async (
      gameTypeId, 
      pageNumber, 
      pageSize, 
      searchVal) => {
    console.log("game bets data");
  }

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    setPageLoader(true);
    await handleGetBetsData(newValue, 0, _PAGESIZE, "");
  };

  // On click search
  const handleAdminGameBetsSearch = async (event, searchvalue) => { 
    setSearchValue(searchvalue);
    setPageNumber(0);
    setPageSize(_PAGESIZE);
    setPageLoader(true);

    await handleGetBetsData(value, 0, _PAGESIZE, searchvalue);
  }

  // Trigger on search empty
  const handleAdminGameBetsSearchEmpty = async (event, searchvalue) => {
    if (searchvalue === "") {
      setSearchValue("");
      setPageNumber(0);
      setPageSize(_PAGESIZE);
      setPageLoader(true);

      await handleGetBetsData(value, 0, _PAGESIZE, "");
    }
  }

    // handle company table next page
  const handleAdminGameBetsChangePage = async (event, newPage) => {
    setPageNumber(newPage + 1);
    setPageLoader(true);

    await handleGetBetsData(value, (newPage + 1) , _PAGESIZE, "");
  }

  // handle company table change page size
  const handleAdminGameBetsRowsPerPage = async (event) => {
    setPageSize(+event.target.value);
    setPageNumber(0);
    setPageLoader(true);

    await handleGetBetsData(value, 0, (+event.target.value), "");
  }

  const handleDateFromOnChage = (e, value) => {
    setDateFrom(value);
  }

  const handleDateToOnChage = (e, value) => {
    setDateTo(value);
  }

  const handleSelectDraw = event => {
    setDrawTypeId(event.target.getAttribute('data-value'));
    setDrawName(event.target.getAttribute('data-drawname'));
  }

  const handleGenerateReport = async () => {
    setPageLoader(true);
    await handleGetBetsData(value, 0, _PAGESIZE, "")
  }

  return (
    <div className="content">
      <div className="container">
        <div className="top">
          <h2 className="title">BETS</h2>
          {
            (!onloadProcess) ?
              <span>
                {
                  `${(new Date(DateFrom)).toLocaleDateString("en-US", { 
                    // weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} - 
                  ${(new Date(DateTo)).toLocaleDateString("en-US", { 
                    // weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} ${(DrawName !== null) ? `(${DrawName})` : ""}`
                }
              </span>
            : <></>
          }
        </div>
        <div className="divGameBets">
          {
            (!onloadProcess) ? 
              <div className="divSearch">
                <div className="searchContent">
                  <div className="left">
                    <label>From</label>
                  </div>
                  <div className="center">
                    <TextField
                      type="date" sx={{ width: "200px" }}
                      onChange={e => handleDateFromOnChage(e, e.target.value)} 
                      defaultValue={DateFrom} variant="outlined" size="small"/>
                  </div>
                </div>

                <div className="searchContent">
                  <div className="left">
                    <label>To</label>
                  </div>
                  <div className="center">
                    <TextField
                      type="date" sx={{ width: "200px" }} 
                      onChange={e => handleDateToOnChage(e, e.target.value)}
                      defaultValue={DateTo} variant="outlined" size="small"/>
                  </div>
                </div>

                <div className="searchContent">
                  <div className="left">
                    <label>Draw Type</label>
                  </div>
                  <div>
                    <TextField 
                      sx={{ width: "200px" }} 
                      onClick={ handleSelectDraw } 
                      defaultValue="" variant="outlined" size="small" select>
                      <MenuItem value=''><em>Select draw</em></MenuItem>
                      { 
                          <MenuItem value=''>Loading options...</MenuItem>
                      }
                      </TextField>
                  </div>
                </div>

                <div className="searchContent">
                  <div style={{paddingTop:'25px'}}>
                    <Button onClick={handleGenerateReport} variant="contained" color="success">
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
            : <></>
          }
          
          <br /> <br />
          <div>
            {
              (gameTypeList.length !== 0) ? 
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                      {
                        gameTypeList.map((item, index) => (
                          <Tab key={index} label={item.gameTypeName} value={item.gameTypeId.toString()} />
                        ))
                      }
                    </TabList>
                  </Box>
                  { 
                      gameTypeList.map((item, index) => (
                        <TabPanel key={index} value={item.gameTypeId.toString()}>
                          <div className="row">
                            <div className="col-6">
                              <AdminGameBetsSearchBar handleSearch={ handleAdminGameBetsSearch } handleSearchEmpty={ handleAdminGameBetsSearchEmpty } />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <AdminGameBetsList 
                                SearchResults={ betsList }
                                ChangePage = { handleAdminGameBetsChangePage }
                                RowsPerPage = { handleAdminGameBetsRowsPerPage }
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
              : (pageLoader) ? 
                <div style={{padding:'20px'}}>Loading... Please wait.</div> : 
                <div style={{padding:'20px'}}>No records found!</div>
            }
            
          </div>

        </div>
      </div>

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default AdminGameBets
