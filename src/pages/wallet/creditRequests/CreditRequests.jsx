import "../cwallet.scss";
import React, { useState, useEffect } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { toast } from 'react-toastify';

import AgentCreditRequestsList from "../../../components/table/AgentCreditRequests/AgentCreditRequestsList";
import AgentCreditRequestsSearchBar from "../../../components/table/AgentCreditRequests/AgentCreditRequestsSearchBar";

import { GETFetch } from "../../../api/ApiFetchBuilder";
import { GetStoreObject } from "../../../helper/Helpers";
import MasterAgentRequestCredit from "../../../components/Dialog/forms/wallet/MasterAgentRequestCredit";
import AllRequestCredit from "../../../components/Dialog/forms/wallet/AllRequestCredit";

const CreditRequests = () => {

  let loginObj = GetStoreObject("auth");

  let _PAGESIZE = 5;
  const [pageLoader, setPageLoader] = useState(false);
  const [requestType, setrequestType] = useState(0);

  // table state
  const [searchValue, setsearchValue] = useState('');
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);
  const [tablelistdata, settablelistdata] = useState([]);
  const [userdata, setuserdata] = useState(null);

  const handleCreditRequestData = async () => {
    setPageLoader(true);
    let url = (requestType === 0) ? `${process.env.REACT_APP_API_URL}/credits/requests?requestto=${loginObj.userId}&rowsperpage=${pageSize}&pagenumber=${pageNumber}&requesteename=${searchValue}`
      : `${process.env.REACT_APP_API_URL}/credits/requests?requestfrom=${loginObj.userId}&rowsperpage=${pageSize}&pagenumber=${pageNumber}&requesteename=${searchValue}`;

    let response = await GETFetch(url);
    setPageLoader(false);

    if(response.status) {
      settablelistdata(response.data.requests);

      setTotalRows(response.data.totalRows);
      setpageNumber(response.data.currentPage);
      setpageSize(response.data.rowsPerPage);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  const handleCurrentUserData = async () => {
    let url = `${process.env.REACT_APP_API_URL}/users/currentuserdata`;
    let response = await GETFetch(url);

    if(response.status) {
      setuserdata(response.data.loggedInUserData);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    handleCurrentUserData();
    handleCreditRequestData();
  }, [pageNumber, searchValue, pageSize, totalRows, requestType]);

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

  const handleClick = async (elem, request) => {
    let listClass = document.getElementsByClassName('li-active')
    // remove all class active to the list
    for (let i = 0; i < listClass.length; i++) {
      listClass[i].classList.remove("li-active");
    }

    // now add active to curren selected 
    elem.target.classList.add("li-active");

    setrequestType(request);

    setsearchValue("");
    setpageNumber(1);
    setpageSize(_PAGESIZE);
  }

  // Add dialog
  const [openRequestCredit, setRequestCredit] = React.useState(false);
  const handleRequestCreditOpen = () => { setRequestCredit(true); };
  const handleRequestCreditClose = () => { setRequestCredit(false); };

  const handleRequestCreditCallback = () => {
    handleRequestCreditClose();
  }

  return (
    <div className="agentWallet">
      <div className="div-balance">
        <div className="div1">
          <h1>{(userdata !== null) ? (userdata.creditBalance === null) ? 0 : userdata.creditBalance : '...'}</h1>
          <span>Credit Balance</span>
        </div>
        <div className="div1">
          <br /><br />
          <Button onClick={ handleRequestCreditOpen } variant="outlined" color="error">
            Request Credits <AddIcon />
          </Button>
        </div>
      </div>
      <div className="div-table">
        <div className="div-table-head" style={{display:'block'}}>
          <div className="div-head" style={{display:'flex',justifyContent:'center',boxShadow:'none',margin:'0px'}}>
            <ul style={{margin:'0px'}}>
              <li onClick={(e) => handleClick(e, 0)}  className="li-active">Request from Downline</li>
              <li onClick={(e) => handleClick(e, 1)} >Your Requests</li>
            </ul>
          </div>
          <br />

          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div></div>
            <div className="bottom" style={{width:'100%'}}>
              <div className="search">
                <AgentCreditRequestsSearchBar handleSearch={ handleSearch } handleSearchEmpty={ handleSearchEmpty } />
              </div>
            </div>
          </div>
          <br />
          <AgentCreditRequestsList 
            SearchResults={ tablelistdata }
            totalCount={ totalRows }
            RowsPerPage={ handleRowsPerPage }
            pageNumber = { (pageNumber === 0) ? pageNumber : (pageNumber - 1) }
            pageSize = { pageSize }
            companyChangePage={ handleChangePage }
            isLoading = { pageLoader }
          />
        </div>
      </div>

      {
          // Super Admin : 0101 // Operator : 0102 // Master Agent: 0201 // Agent: 0202
        (loginObj.userCode === '0101') ? <></>
        : (loginObj.userCode === '0102') ? <AllRequestCredit isOpenAdd={ openRequestCredit } handleCloseAdd={ handleRequestCreditClose } handleCallback={ handleRequestCreditCallback } />
        : (loginObj.userCode === '0201') ? <MasterAgentRequestCredit isOpenAdd={ openRequestCredit } handleCloseAdd={ handleRequestCreditClose } handleCallback={ handleRequestCreditCallback } />
        : <AllRequestCredit isOpenAdd={ openRequestCredit } handleCloseAdd={ handleRequestCreditClose } handleCallback={ handleRequestCreditCallback } />
      }
    </div>
  )
}

export default CreditRequests
