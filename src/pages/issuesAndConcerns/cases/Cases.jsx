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
  const [tablelistdataAll, settablelistdataAll] = useState([]);
  const [tablelistdata, settablelistdata] = useState([]);
  const parentTabHeaders = ["System Issue", "Report Someone"];

  const [reportType, setreportType] = useState(0);
  const selectReportType = (newValue) => {
    setreportType(newValue);
    if (newValue === 0) {
      settablelistdata(tablelistdataAll.filter(m => m.organizationId === 5));
    } else {
      settablelistdata(tablelistdataAll.filter(m => m.organizationId === 9));
    }
  }

  const [filterValue, setfilterValue] = useState(1);
  const selectFilter = (newValue) => {
    if (newValue === 0) {
      setfilterValue(1);
    } else if (newValue === 1) {
      setfilterValue(3);
    } else {
      setfilterValue(4);
    }
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
      settablelistdataAll(response.data.cases);
      let responseData = response.data.cases;
      settablelistdata(responseData.filter(m => m.organizationId === 5));
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
    if (value === 0) {
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
                changeEvent={selectFilter}
                tabList={
                  reportHeaders(reportType)?.map((label) => ({ label: label, Component: 
                  <div className="div-tabbody">
                      <CasesList 
                        SearchResults={ tablelistdata.filter(m => m.statusId === filterValue) }
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
