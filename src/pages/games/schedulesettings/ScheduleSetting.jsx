import "./schedulesetting.scss";

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { toast } from 'react-toastify';

import { TextField, MenuItem, Button  } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import AddSchedule from "../../../components/Dialog/forms/AddSchedule";

import PageLoader from "../../../components/widget/PageLoader";
import { FormatTime } from "../../../helper/Helpers";
import AddEditGameDrawType from "../../../components/Dialog/forms/AddEditGameDrawType";

import { GetStoreObject } from "../../../helper/Helpers";

import CustomTab from "../../../components/tab/CustomTab"

const ScheduleSetting = () => {
  let authdata = GetStoreObject("auth");
  const token = (authdata !== null) ? authdata.token : "";

  let _PAGESIZE = 10;
  const [SearchValue, setSearchValue] = useState('');
  const [PageNumber, setPageNumber] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [PageSize, setPageSize] = useState(_PAGESIZE);

  const [pageLoader, setPageLoader] = useState(false);
  const [skipScheduleDate, setSkipScheduleDate] = useState(true);
  const [skipScheduleDrawId, setSkipScheduleDrawId] = useState(true);
  const [skipDrawTypeList, setSkipDrawTypeList] = useState(true);
  const [skipDrawType, setSkipDrawType] = useState(true);
  const [prevElem, setPrevEmel] = useState();

  // const [schedGameTypeId, setSchedGameTypeId] = React.useState(0);
  const [gameTypeId, setGameTypeId] = React.useState(0);
  const [gameTypeIdDraw, setGameTypeIdDraw] = React.useState(0);
  const [closingDate, setClosingDate] = React.useState('');
  const [gameTypeList, setGameTypeList] = React.useState([]);
  const [gameSheduleDatesList, setGameSheduleDatesList] = React.useState([]);
  const [gameDateDraws, setGameDateDraws] = React.useState([]);

  const [schedGameDrawTypeList, setSchedGameDrawTypeList] = React.useState([]);
  const [gameDrawTypeList, setGameDrawTypeList] = React.useState([]);
  const [gameDrawTypeObj, setGameDrawTypeObj] = React.useState(null);

  
  const tabs = [
    {
      label: "Tab 1",
      Component: <div>Hello, I am tab 1</div>
    },
    {
      label: "Tab 2",
      Component: <div>Hello, I am tab 2</div>
    },
    {
      label: "Tab 3",
      Component: (
        <div>
          <h1>Tab with heading</h1>
          <p>Hello I am a tab with a heading</p>
        </div>
      )
    }
  ];

  const handleSelectGameType = (e, val) => {
    if(prevElem !== undefined) {
      prevElem.classList.remove('active');
    }

    setGameTypeId(val);
    setSkipScheduleDate(false);
    setSkipDrawTypeList(false);
    setPageLoader(true);
  }

  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Add Schedule dialog
  const [openAddSchedule, setAddSchedule] = React.useState(false);
  const handleAddScheduleOpen = () => { (gameTypeId !== 0) ? setAddSchedule(true) : toast.error("Please select game type.") };
  const handleAddScheduleClose = () => { 
    setSchedGameDrawTypeList([]);
    setAddSchedule(false); 
  };

  const handleSelectDate = (e, value) => {
    if(prevElem !== undefined) {
      prevElem.classList.remove('active');
    }
    e.currentTarget.classList.add("active");

    if(value !== closingDate) {
      setPrevEmel(e.currentTarget);
      setClosingDate(value.date);
      setPageLoader(true);
      setSkipDrawType(false);
    }
  }

  const handleSelectGameTypeDraw = (e, value) => {
    setGameTypeIdDraw(value);
    setSkipScheduleDrawId(false);
    setPageLoader(true);
  }

  // Add Draw Type dialog
  const [openAddDrawType, setAddDrawType] = React.useState(false);
  const handleAddDrawTypeOpen = () => { (gameTypeIdDraw !== 0) ? setAddDrawType(true) : toast.error("Please select game type.") };
  const handleAddDrawTypeClose = () => { setAddDrawType(false); };

  const handleAddDrawType = () => {
    setGameDrawTypeObj(null);
    handleAddDrawTypeOpen();
  }

  const handleEditDrawType = (e, valuObj) => {
    setGameDrawTypeObj(valuObj);
    handleAddDrawTypeOpen();
  }

  const handleScheduleCallback = () => {
    console.log("Schedule Callback");
  }

  const handleAddDrawTypeCallBack = (gameTypeId) => {
    console.log("Draw Type Callback");
  }

  return (
    <div className="content">
      <div className="container">
          <CustomTab tabList={tabs}/>
        <div className="divSchedule">
          <CustomTab tabList={tabs}/>
          <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange}>
                    <Tab label="Closing Schedules" value="1" />
                    <Tab label="Draw Types" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="searchContent">
                    <div className="left">
                      <label>Select Game Type</label>
                    </div>
                    <div className="center">
                      <TextField 
                        placeholder="Select game type"
                        onChange={ e => handleSelectGameType(e,e.target.value) }
                        label="Select game type" sx={{ width: "200px" }}  defaultValue="" variant="outlined" size="small" select>
                        <MenuItem value=''><em>Select game type</em></MenuItem>
                        { 
                            <MenuItem value=''>Loading options...</MenuItem>
                        }
                        </TextField>
                    </div>
                  </div>

                  <div className="divContent">
                    <div className="left">
                      <div className="container">
                        <div className="top">
                          <h2 className="title">BY DATE</h2>
                          {/* <Button variant="contained" size="large" onClick={ handleAddScheduleOpen }>
                            Add <AddIcon />
                          </Button> */}
                        </div>

                        <br/>
                        <div className="ulContent">
                          <ul>
                            <li style={{ background: "#bec9c9" }}>Closing Date</li>
                            { 
                                (gameSheduleDatesList.length !== 0) ? gameSheduleDatesList.map((item, index) => (
                                  <li key={index} onClick={ e => handleSelectDate(e, item) }>
                                    {(new Date(item.date)).toDateString()}
                                    {/* {(new Date(item)).toDateString()} <CloseOutlinedIcon sx={{ color:"red "}} /> */}
                                  </li>
                                ))
                                :
                                <li>No records found. Please select game type.</li>
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="center">
                      <div className="container">
                        <div className="top">
                          <h2 className="title">BY DRAW SCHEDULE</h2>
                          <Button variant="contained" size="large" onClick={ handleAddScheduleOpen }>
                            Add <AddIcon />
                          </Button>
                        </div>

                        <br/>
                        <div className="ulContent">
                          <ul>
                            <li style={{ background: "#bec9c9" }}>Draw Type</li>
                            { 
                                (gameDateDraws.length !== 0) ? gameDateDraws.map((item, index) => (
                                  <li key={index}>
                                    {item}
                                  </li>
                                ))
                                :
                                <li>No records found. Please select closing date.</li>
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div className="searchContent">
                    <div className="left">
                      <label>Select Game Type</label>
                    </div>
                    <div className="center">
                      <TextField 
                        placeholder="Select game type"
                        onChange={ e => handleSelectGameTypeDraw(e,e.target.value) }
                        label="Select game type" sx={{ width: "200px" }}  defaultValue="" variant="outlined" size="small" select>
                        <MenuItem value=''><em>Select game type</em></MenuItem>
                        { 
                            (gameTypeList.length !== 0) ? gameTypeList.map((item) => (
                            <MenuItem key={item.gameTypeId} value={item.gameTypeId}>
                                {item.gameTypeName}
                            </MenuItem>
                            )) :
                            <MenuItem value=''>Loading options...</MenuItem>
                        }
                        </TextField>
                    </div>
                  </div>

                  <div className="container">
                    <div className="top">
                      <h2 className="title">DRAW TYPES</h2>

                      <Button onClick={handleAddDrawType} sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                        Add <AddIcon />
                      </Button>
                    </div>

                    <br/>
                    <div className="ulContent">
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">DRAW TYPE</TableCell>
                              <TableCell align="center">START CUTOFF</TableCell>
                              <TableCell align="center">END CUTOFF</TableCell>
                              <TableCell align="center"></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                                (gameDrawTypeList.length > 0) ?
                                gameDrawTypeList.map((drawType, index) => (
                                  <TableRow key={index} x={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell align="center" component="th" scope="row"> {drawType.drawTypeName}</TableCell>
                                    <TableCell align="center">{FormatTime(drawType.startCutOff)}</TableCell>
                                    <TableCell align="center">{FormatTime(drawType.endCutOff)}</TableCell>
                                    <TableCell align="center">
                                      <Button onClick={e => handleEditDrawType(e, drawType)} variant="contained" size="small" color="info">
                                        Edit <EditOutlinedIcon />
                                      </Button>
                                    </TableCell>
                                </TableRow>
                                ))
                                : <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                      <TableCell align="center" component="th" scope="row" colSpan={3}> No records found! Please select game type. </TableCell>
                                  </TableRow>
                              }
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>

                </TabPanel>
              </TabContext>
            </Box>
        </div>
      </div>

      <AddSchedule 
        isOpenAddSchedule={ openAddSchedule } 
        handleCloseAddSchedule={ handleAddScheduleClose } 
        handleCallback={ handleScheduleCallback }
        gameType={ (gameTypeList.filter(m => m.gameTypeId === gameTypeId)) }
        currentDate={ closingDate }
        listDrawTypes = {[]}/>

      <AddEditGameDrawType 
        isOpenModal={ openAddDrawType } 
        handleCloseModal={ handleAddDrawTypeClose }
        gameId = { gameTypeIdDraw } 
        Obj = { gameDrawTypeObj }
        CallBackFunc = { handleAddDrawTypeCallBack }/>

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default ScheduleSetting
