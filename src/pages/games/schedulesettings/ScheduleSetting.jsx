import "./schedulesetting.scss";

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
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
import CustomVerticalTab from "../../../components/tab/CustomVerticalTab";

import { verticalTab } from "./verticalTab";

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
      label: "Closing Schedule",
      Component:
      <div className="tab-container">
        <div className="tab-header">
          <h1>Closing Dates</h1>
          <Box alignItems={"center"} display={"flex"}>
            <Button variant="outline" className="tab-button">
              Add Closing Date <AddIcon/>
            </Button>
          </Box>
          
        </div>
        <CustomVerticalTab tabList={verticalTab}/>
      </div>
    },
    {
      label: "Draw Types",
      Component:         
      <div className="tab-container">
      <div className="tab-header">
        <h1>Draw Types</h1>
      </div>
      <CustomVerticalTab tabList={verticalTab}/>
    </div>
    },
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
      <div>
          <CustomTab tabList={tabs}/>
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
