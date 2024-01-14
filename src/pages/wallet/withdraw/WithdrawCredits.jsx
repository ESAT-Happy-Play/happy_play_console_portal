import "../cwallet.scss";
import React, { useState, useEffect } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';

import { Button } from "@mui/material";
import AgentWithdrawList from "../../../components/table/AgentWithdraw/AgentWithdrawList";

import { GETFetch } from "../../../api/ApiFetchBuilder";
import { GetStoreObject } from "../../../helper/Helpers";
import MasterAgentRequestCredit from "../../../components/Dialog/forms/wallet/WithdrawRequest";

const WithdrawCredits = () => {

  let loginObj = GetStoreObject("auth");

  let _PAGESIZE = 5;
  const [pageLoader, setPageLoader] = useState(false);

  // table state
  const [searchValue, setsearchValue] = useState('');
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);
  const [tablelistdata, settablelistdata] = useState([]);
  const [userdata, setuserdata] = useState(null);

  const handleWithdrawRequestData = async () => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_API_URL}/credits/withdraw/requests?requestfrom=${loginObj.userId}&rowsperpage=${pageSize}&pagenumber=${pageNumber}&requesteename=${searchValue}`;

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
    handleWithdrawRequestData();
  }, [pageNumber, searchValue, pageSize, totalRows]);

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

  // dialog
  const [openWithdrawCredit, setSendCredit] = React.useState(false);
  const handleWithdrawCreditOpen = () => { setSendCredit(true); };
  const handleWithdrawCreditClose = () => { setSendCredit(false); };

  const handleWithrawCallback = () => {
    handleWithdrawCreditClose();
    setTotalRows(totalRows + 1);
  }

  return (
    <div className="agentWallet">
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
          <Button onClick={ handleWithdrawCreditOpen } variant="outlined">
            Withdraw Credits <AddIcon />
          </Button>
        </div>
      </div>
      <div className="div-table">
        <div className="div-table-head" style={{display:'block'}}>
          <br />
          <AgentWithdrawList 
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

      <MasterAgentRequestCredit dataObj={userdata} isOpenAdd={ openWithdrawCredit } handleCloseAdd={ handleWithdrawCreditClose } handleCallback={ handleWithrawCallback } />
    </div>
  )
}

export default WithdrawCredits
