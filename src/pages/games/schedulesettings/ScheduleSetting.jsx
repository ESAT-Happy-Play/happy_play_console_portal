import "./schedulesetting.scss";

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

import { TextField, MenuItem, Button  } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddSchedule from "../../../components/Dialog/forms/AddSchedule";

import PageLoader from "../../../components/widget/PageLoader";
import { FormatTime } from "../../../helper/Helpers";
import AddEditGameDrawType from "../../../components/Dialog/forms/AddEditGameDrawType";

import { GetStoreObject } from "../../../helper/Helpers";

import CustomTab from "../../../components/tab/CustomTab"
import CustomVerticalTab from "../../../components/tab/CustomVerticalTab";

import { ClosingTable, DrawTypesTable } from "./scheduleTables";

const ScheduleSetting = () => {
  const [pageLoader, setPageLoader] = useState(false);
  //MOCK DATA
  const tabHeaders = ["Regular", "Jackpot 3.3", "Jackpot 3.4"];
  
  const rows = ["Date 1",
  "Date 2", 
  "Date 3", 
  "Date 4", 
  "Date 5", 
  "Date 6", 
  "Date 7", 
  "Date 8", 
  "Date 9", 
  ];
  
  const rows2 = ["Jack Date 1",
  "Jack Date 2", 
  "Jack Date 3", 
  "Jack Date 4", 
  "Jack Date 5", 
  "Date 6", 
  "Jack Date 7", 
  "Date 8", 
  "Jack Date 9", 
  ];
  
  const rows3 = ["Jack 3.4 Date 1",
  "Jack 3.4 Date 2", 
  "Jack 3.4 Date 3", 
  "Jack 3.4 Date 4", 
  "Jack 3.4 Date 5", 
  "Date 6", 
  "Jack 3.4 Date 7", 
  "Date 8", 
  "Jack 3.4 Date 9", 
  ];

  
  
  const drawTypesData = [
    {drawTime: "1PM", startCutoff: "12:30", endCutoff: "12:55"},
    {drawTime: "2PM", startCutoff: "1:30", endCutoff: "1:55"},
    {drawTime: "3PM", startCutoff: "2:30", endCutoff: "2:55"},
    {drawTime: "4PM", startCutoff: "3:30", endCutoff: "3:55"},
  ];

  const drawTypesData2 = [
    {drawTime: "5PM", startCutoff: "4:30", endCutoff: "4:55"},
    {drawTime: "6PM", startCutoff: "5:30", endCutoff: "5:55"},
    {drawTime: "8PM", startCutoff: "7:30", endCutoff: "7:55"},
    {drawTime: "11PM", startCutoff: "10:30", endCutoff: "10:55"},
  ];

  const drawTypesData3 = [
    {drawTime: "1PM", startCutoff: "12:30", endCutoff: "12:55"},
    {drawTime: "2PM", startCutoff: "1:30", endCutoff: "1:55"},
    {drawTime: "6PM", startCutoff: "5:30", endCutoff: "5:55"},
    {drawTime: "8PM", startCutoff: "7:30", endCutoff: "7:55"},
    {drawTime: "11PM", startCutoff: "10:30", endCutoff: "10:55"},
  ];
  
  const [closingDates, setClosingDates]= useState(rows);
  const [drawTypes, setDrawTypes]= useState(drawTypesData);

  const fetchClosingData = (newValue) => {
    if(newValue == 0){
      setClosingDates(rows);
    }
    else if(newValue == 1)
      setClosingDates(rows2);
    else
      setClosingDates(rows3);
  }

  
  const fetchDrawTypesData = (newValue) => {
    if(newValue == 0){
      setDrawTypes(drawTypesData);
    }
    else if(newValue == 1)
      setDrawTypes(drawTypesData2);
    else
      setDrawTypes(drawTypesData3);
  }


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
        <CustomVerticalTab
          changeEvent={fetchClosingData}
          tabList={
            tabHeaders?.map((label) => ({label:label, Component: <ClosingTable data={closingDates} />}))
          }/>
      </div>
    },
    {
      label: "Draw Types",
      Component:
        <div className="tab-container">
          <div className="tab-header">
            <h1>DrawTypes</h1>
          </div>
          <CustomVerticalTab
            changeEvent={fetchDrawTypesData}
            tabList={
              tabHeaders?.map((label) => ({label:label, Component: <DrawTypesTable data={drawTypes} />}))
            }/>
        </div>
    },
  ];


  return (
    <div className="content">
      <div >
          <CustomTab tabList={tabs}/>
      </div>
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default ScheduleSetting
