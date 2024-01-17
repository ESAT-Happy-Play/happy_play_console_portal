import "./accountactions.scss";

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
import { Card } from "../../../components/card/Card";
import AccountActionList from "../../../components/table/accountactions/AccountActionList";

const AccountActions = () => {
  const [pageLoader, setPageLoader] = useState(false);
  const [tablelistdata, settablelistdata] = useState([]);
  const tabs = ["Suspended Accounts", "Cancelled Accounts"];
  const [reportType, setreportType] = useState(0);
  const selectReportType = (newValue) => {
    setreportType(newValue);
  }

  const handleViolationsData = async () => {
    setPageLoader(true);
    let url = (reportType === 0) ? `${process.env.REACT_APP_API_URL}/violations/action/Suspended`
      : `${process.env.REACT_APP_API_URL}/violations/action/Cancellation`;
    let response = await GETFetch(url);

    setPageLoader(false);
    if (response.status) {
      settablelistdata(response.data);
    }
  }

  useEffect(() => {
    handleViolationsData();
  }, [reportType]);

  return (
    <div className="content">
      <CustomTab 
        changeEvent={selectReportType}
        tabList={
          tabs.map((label) => ({
            label: label,
            Component: 
              <div className="div-result">
                <Card
                  style={{flex:2}}
                  header={null}
                  body={
                    <div>
                      <div>
                        <AccountActionList SearchResults={ tablelistdata } isLoading = { pageLoader } />
                      </div>
                    </div>
                  }
                />
              </div>
          }))
        }
      />
      
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default AccountActions
