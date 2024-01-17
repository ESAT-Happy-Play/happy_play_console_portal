import "./violations.scss";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { TextField, MenuItem, Button } from "@mui/material";

import { POSTFetch } from "../../../api/ApiFetchBuilder";
import PageLoader from "../../../components/widget/PageLoader";

import { GetStoreObject } from "../../../helper/Helpers";

import CustomTab from "../../../components/tab/CustomTab"
import { Card } from "../../../components/card/Card";
import ViolationsList from "../../../components/table/violations/ViolationsList";
import ActViolation from "../../../components/Dialog/forms/issueConcern/ActViolation";

const Violations = () => {
  const [pageLoader, setPageLoader] = useState(false);

  const [tablelistdata, settablelistdata] = useState([]);
  const tabs = ["On-Going"];
  const selectReportType = (newValue) => {
    console.log(newValue);
  }

  const handleViolationsData = async () => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_API_URL}/violations/search`;
    let response = await POSTFetch(url, {
        "userType": null,
        "searchKey": null,
        "sortBy": null,
        "offset": 0,
        "size": 100
    });

    setPageLoader(false);
    if (response.status) {
      settablelistdata(response.data);
    }
  }

  useEffect(() => {
    handleViolationsData();
  }, []);

  const [actObj, setactObj] = React.useState(null);
  const handleAct = (e, objtData) => {
    setactObj(objtData);
    handleActOpen();
  }

  // 
  const [openAct, setAct] = React.useState(false);
  const handleActOpen = () => { setAct(true); };
  const handleActClose = () => { setAct(false); };

  const handleActCallback = () => {
    handleActClose();
  }

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
                        <ViolationsList SearchResults={ tablelistdata } ProcessAct={handleAct} isLoading = { pageLoader } />
                      </div>
                    </div>
                  }
                />
              </div>
          }))
        }
      />
      
      <PageLoader isLoadingPage={ pageLoader } />
      <ActViolation isOpenAdd={openAct} handleCloseAdd={handleActClose} handleCallback={handleActCallback} objData={actObj} />
    </div>
  )
}

export default Violations
