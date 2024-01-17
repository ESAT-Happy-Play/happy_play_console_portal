import "./cases.scss";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { TextField, MenuItem, Button } from "@mui/material";

import { POSTFetch } from "../../../api/ApiFetchBuilder";
import PageLoader from "../../../components/widget/PageLoader";

import { GetStoreObject } from "../../../helper/Helpers";

import CustomTab from "../../../components/tab/CustomTab"
import CustomVerticalTab from "../../../components/tab/CustomVerticalTab";
import CasesList from "../../../components/table/cases/CasesList";

const Cases = () => {
  let _PAGESIZE = 10;
  const [pageLoader, setPageLoader] = useState(false);
  const [requestType, setrequestType] = useState(1);

  // table state
  const [searchValue, setsearchValue] = useState('');
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);
  const [tablelistdata, settablelistdata] = useState([]);
  const parentTabHeaders = ["System Issue", "Report Someone"];

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

  const handleCasesData = async () => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_SUPPORT_URL}/api/Case/search`;
    let response = await POSTFetch(url, {
      "caseId": "",
      "title": "",
      "owner": "",
      "status": null,
      "importance": null,
      "organizationId": null,
      "startDate": null,
      "endDate": null,
      "pagedQuery": {
        "index": 0,
        "size": 100
      }
    });
    setPageLoader(false);
    if (response.status) {
      settablelistdata(response.data.cases);
    }
  }

  useEffect(() => {
    handleCasesData();
  }, []);

  // On click search
  const handleSearch = (event, value) => { 
    setsearchValue(value);
    setpageNumber(1);
    setpageSize(_PAGESIZE);
  }

  // Trigger on search empty
  const handleSearchEmpty = (event, value) => {
    if (value === "") {
      setsearchValue("");
      setpageNumber(1);
      setpageSize(_PAGESIZE);
    }
  }

  // handle table next page
  const handleChangePage = (event, newPage) => {
    setpageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle table change page size
  const handleRowsPerPage = (event) => {
    setpageSize(+event.target.value);
    setpageNumber(1);
    setPageLoader(true);
  }

  const reportHeaders = (value) => {
    if (value === "System Issue") {
      return sysIssueTabHeaders;
    } else {
      return reportTabHeaders;
    }
  }

  return (
    <div className="content">
      <div >
        <CustomTab changeEvent={selectReportType} tabList={
          parentTabHeaders.map((labelP) => ({ label: labelP, Component:
            <div className="tab-container" style={{padding:'15px'}}>
              <CustomVerticalTab
                changeEvent={(labelP === "System Issue") ? selectsystemIssue : selectreportSomeone}
                tabList={
                  reportHeaders(labelP)?.map((label) => ({ label: label, Component: 
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

                      <CasesList 
                        SearchResults={ tablelistdata }
                        totalCount={ totalRows }
                        RowsPerPage={ handleRowsPerPage }
                        pageNumber = { (pageNumber === 0) ? pageNumber : (pageNumber - 1) }
                        pageSize = { pageSize }
                        ChangePage={ handleChangePage }
                        isLoading = { pageLoader } />
                  </div>
                  }))
                } />
            </div>
          }))
        } />
      </div>
      <PageLoader isLoadingPage={pageLoader} />
    </div>
  )
}

export default Cases
