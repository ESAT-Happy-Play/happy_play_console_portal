import "./schedulesetting.scss";

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

import { TextField, MenuItem, Button } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddSchedule from "../../../components/Dialog/forms/AddSchedule";
import { GETFetch } from "../../../api/ApiFetchBuilder";
import PageLoader from "../../../components/widget/PageLoader";
import { FormatTime } from "../../../helper/Helpers";
import AddEditGameDrawType from "../../../components/Dialog/forms/AddEditGameDrawType";

import { GetStoreObject } from "../../../helper/Helpers";

import CustomTab from "../../../components/tab/CustomTab"
import CustomVerticalTab from "../../../components/tab/CustomVerticalTab";

import { ClosingTable, DrawTypesTable } from "./scheduleTables";
import AddClosingDialog from "../../../components/Dialog/AddClosingDialog";
import { DateTimePicker } from "@mui/lab";

const ScheduleSetting = () => {
  const [pageLoader, setPageLoader] = useState(false);
  const [addClosingOpen, setAddClosingOpen] = useState(false);
  //MOCK DATA
  const tabHeaders = ["Regular", "Jackpot 3.3", "Jackpot 3.4"];

  const [closingDates, setClosingDates] = useState([]);
  const [drawTypes, setDrawTypes] = useState([]);

  const fetchClosingData = (newValue) => {
    if (newValue == 0) {
      getClosingDates('01');
    }
    else if (newValue == 1)
      getClosingDates('02');
    else
      getClosingDates('03');
  }

  const fetchDrawTypesData = (newValue) => {
    if (newValue == 0) {
      getDrawTypes('01');
    }
    else if (newValue == 1)
      getDrawTypes('02');
    else
      getDrawTypes('03');
  }

  const getClosingDates = async (gameType) => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_API_URL}/gamesettings/closeschedules?gametype=${gameType}`;
    let response = await GETFetch(url);

    setPageLoader(false);

    if (response.status) {
      var closeSchedule = response.data.closeSchedules.map(function (item) {
        var closeDate = new Date(item['closeDate']);
        return closeDate.toDateString();
      });

      setClosingDates(closeSchedule);
      // setuserdata(response.data.loggedInUserData);
      console.log(response.data.success)
    }

    if (!response.status) {
      toast.error(response.data.errorMessage);
    }
  }


  const getDrawTypes = async (gameType) => {
    setPageLoader(true);

    let url = `${process.env.REACT_APP_API_URL}/gamesettings/drawtypes?gametype=${gameType}`;
    let response = await GETFetch(url);

    setPageLoader(false);

    if (response.status) {
      var drawTypes = response.data.drawTypes.map(function (item) {
        var cutStart = new Date(item['cutStart']);
        var cutEnd = new Date(item['cutEnd']);

        item['cutStart'] = cutStart.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        item['cutEnd'] = cutEnd.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return item;
      });

      setDrawTypes(drawTypes);

      // setuserdata(response.data.loggedInUserData);
      console.log(response.success)
    }

    if (!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  useEffect(() => {
    getClosingDates('01');
    getDrawTypes('01');
  }, []);

  const tabs = [
    {
      label: "Closing Schedule",
      Component:
        <div className="tab-container">
          <div className="tab-header">
            <h1>Closing Dates</h1>
            <Box alignItems={"center"} display={"flex"} >
              <Button variant="outline" className="tab-button" onClick={() => setAddClosingOpen(true)}>
                Add Closing Date <AddIcon />
              </Button>
            </Box>

          </div>
          <CustomVerticalTab
            changeEvent={fetchClosingData}
            tabList={
              tabHeaders?.map((label) => ({ label: label, Component: <ClosingTable data={closingDates} /> }))
            } />
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
              tabHeaders?.map((label) => { console.log(label); return { label: label, Component: <DrawTypesTable data={drawTypes} /> } })
            } />
        </div>
    },
  ];


  return (
    <div className="content">
      <div >
        <CustomTab tabList={tabs} />
      </div>
      <PageLoader isLoadingPage={pageLoader} />
      <AddClosingDialog isOpen={addClosingOpen} setOpen={setAddClosingOpen} />
    </div>
  )
}

export default ScheduleSetting
