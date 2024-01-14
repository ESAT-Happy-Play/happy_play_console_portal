import "../cwallet.scss";
import React, { useState, useEffect } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';

import { Button } from "@mui/material";
import AgentSendCreditsList from "../../../components/table/AgentSendCredits/AgentSendCreditsList";
import AgentSendCreditSearchBar from "../../../components/table/AgentSendCredits/AgentSendCreditSearchBar";

import AdminSendCredit from "../../../components/Dialog/forms/wallet/AdminSendCredit";

import { GETFetch } from "../../../api/ApiFetchBuilder";
import { GetStoreObject } from "../../../helper/Helpers";
import OperatorSendCredit from "../../../components/Dialog/forms/wallet/OperatorSendCredit";
import MasterAgentSendCredit from "../../../components/Dialog/forms/wallet/MasterAgentSendCredit";

const SendCredits = () => {

  let loginObj = GetStoreObject("auth");

  let _PAGESIZE = 10;
  const [pageLoader, setPageLoader] = useState(false);

  // table state
  const [searchValue, setsearchValue] = useState('');
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);
  const [tablelistdata, settablelistdata] = useState([]);
  const [userdata, setuserdata] = useState(null);

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

  const handleSendCreditData = async () => {
    setPageLoader(true);
    let url = (loginObj.userCode === '0101') ? `${process.env.REACT_APP_API_URL}/credits/send/history?rowsperpage=${pageSize}&pagenumber=${pageNumber}&receivernamesearch=${searchValue}`
      : `${process.env.REACT_APP_API_URL}/credits/send/history?senderuserid=${loginObj.userId}&rowsperpage=${pageSize}&pagenumber=${pageNumber}&receivernamesearch=${searchValue}`;

    let response = await GETFetch(url);
    setPageLoader(false);

    if(response.status) {
      settablelistdata(response.data.historyData);

      setTotalRows(response.data.totalRows);
      setpageNumber(response.data.currentPage);
      setpageSize(response.data.rowsPerPage);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  useEffect(() => {
    handleCurrentUserData();
    handleSendCreditData();
  }, [pageNumber, searchValue, pageSize, totalRows]);

  // On click search company
  const handleSearch = (event, value) => { 
    setsearchValue(value);
    setpageNumber(1);
    setpageSize(_PAGESIZE);
  }

  // Trigger on search company empty
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

  // Add dialog
  const [openSendCredit, setSendCredit] = React.useState(false);
  const handleSendCreditOpen = () => { setSendCredit(true); };
  const handleSendCreditClose = () => { setSendCredit(false); };

  const handleSendCreditCallback = () => {
    handleSendCreditClose();
    setTotalRows(totalRows + 1);
  }

  return (
    <div className="agentWallet">
      {
        (loginObj.userCode !== "0101") ?
          <div className="div-balance">
            <div className="div1">
              <h1>{(userdata !== null) ? (userdata.creditBalance === null) ? 0 : userdata.creditBalance : '...'}</h1>
              <span>Credit Balance</span>
            </div>
            {
              (loginObj.userCode !== "0102") ? 
              <div className="div1">
                <h1>{(userdata !== null) ? (userdata.commissionBalance === null) ? 0 : userdata.commissionBalance : '...'}</h1>
                <span>Commission Balance</span>
              </div>
              : <></>
            }
            <div className="div1">
              <br /><br />
              <Button type="submit" onClick={ handleSendCreditOpen } variant="outlined" color="success">
                Send Credits <AddIcon />
              </Button>
            </div>
          </div>
          : <div style={{padding:'15px',display:'flex',justifyContent:'end'}}>
            <Button type="submit" onClick={ handleSendCreditOpen } variant="outlined" color="success">
                Send Credits <AddIcon />
              </Button>
          </div>
      }

      <div className="div-table">
        <div className="div-table-head" style={{display:'block'}}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div></div>
            <div className="bottom" style={{width:'50%'}}>
              <div className="search">
                <AgentSendCreditSearchBar handleSearch={ handleSearch } handleSearchEmpty={ handleSearchEmpty } />
              </div>
            </div>
          </div>
          <br />

          <AgentSendCreditsList 
            SearchResults={ tablelistdata }
            totalCount={ totalRows }
            RowsPerPage={ handleRowsPerPage }
            pageNumber = { (pageNumber === 0) ? pageNumber : (pageNumber - 1) }
            pageSize = { pageSize }
            ChangePage={ handleChangePage }
            isLoading = { pageLoader }
          />
        </div>
      </div>

      {
          // Super Admin : 0101 // Operator : 0102 // Master Agent: 0201 // Agent: 0202
        (loginObj.userCode === '0101') ? <AdminSendCredit balance={(userdata !== null) ? (userdata.creditBalance === null) ? 0 : userdata.creditBalance : 0} isOpenAdd={ openSendCredit } handleCloseAdd={ handleSendCreditClose } handleCallback={ handleSendCreditCallback } />
        : (loginObj.userCode === '0102') ? <OperatorSendCredit balance={(userdata !== null) ? (userdata.creditBalance === null) ? 0 : userdata.creditBalance : 0} isOpenAdd={ openSendCredit } handleCloseAdd={ handleSendCreditClose } handleCallback={ handleSendCreditCallback } />
        : (loginObj.userCode === '0201') ? <MasterAgentSendCredit balance={(userdata !== null) ? (userdata.creditBalance === null) ? 0 : userdata.creditBalance : 0} isOpenAdd={ openSendCredit } handleCloseAdd={ handleSendCreditClose } handleCallback={ handleSendCreditCallback } />
        : <MasterAgentSendCredit balance={(userdata !== null) ? (userdata.creditBalance === null) ? 0 : userdata.creditBalance : 0} isOpenAdd={ openSendCredit } handleCloseAdd={ handleSendCreditClose } handleCallback={ handleSendCreditCallback } />
      }

    </div>
  )
}

export default SendCredits
