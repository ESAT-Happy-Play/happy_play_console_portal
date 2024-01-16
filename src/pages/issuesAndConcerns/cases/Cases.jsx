import "./cases.scss";

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

import { TextField, MenuItem, Button } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GETFetch } from "../../../api/ApiFetchBuilder";
import PageLoader from "../../../components/widget/PageLoader";

import { GetStoreObject } from "../../../helper/Helpers";

import CustomTab from "../../../components/tab/CustomTab"
import CustomVerticalTab from "../../../components/tab/CustomVerticalTab";

const Cases = () => {
  const [pageLoader, setPageLoader] = useState(false);

  const [reportType, setreportType] = useState(0);
  const selectReportType = (newValue) => {
    setreportType(newValue);
  }

  const sysIssueTabHeaders = ["Pending", "Acknowledged", "Complete"];
  const [systemIssue, setsystemIssue] = useState(0);
  const selectsystemIssue = (newValue) => {
    setsystemIssue(newValue);
  }

  const reportTabHeaders = ["Pending", "Acknowledged"];
  const [reportSomeone, setreportSomeone] = useState(0);
  const selectreportSomeone = (newValue) => {
    setreportSomeone(newValue);
  }

  useEffect(() => {

  }, []);

  const tabs = [
    {
      label: "System Issue",
      Component:
        <div className="tab-container" style={{padding:'15px'}}>
          <CustomVerticalTab
            changeEvent={selectsystemIssue}
            tabList={
              sysIssueTabHeaders?.map((label) => ({ label: label, Component: 
              <div className="div-tabbody">
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
                  Table System Issue
              </div>
              }))
            } />
        </div>
    },
    {
      label: "Report Someone",
      Component:
        <div className="tab-container" style={{padding:'15px'}}>
          <CustomVerticalTab
            changeEvent={selectreportSomeone}
            tabList={
              reportTabHeaders?.map((label) => ({ label: label, Component:
                <div className="div-tabbody">
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
                    Table Report Someone
                </div>
              }))
            } />
        </div>
    },
  ];


  return (
    <div className="content">
      <div >
        <CustomTab changeEvent={selectReportType} tabList={tabs} />
      </div>
      <PageLoader isLoadingPage={pageLoader} />
    </div>
  )
}

export default Cases
