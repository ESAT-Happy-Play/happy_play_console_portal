import "../cwallet.scss";
import React, { useState, useEffect } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { Button } from "@mui/material";

import { GETFetch } from "../../../api/ApiFetchBuilder";
import { GetStoreObject } from "../../../helper/Helpers";

import WithdrawalRequestsList from "../../../components/table/withdrawalRequests/WithdrawalRequestsList";
import WithdrawalRequestsSearchBar from "../../../components/table/withdrawalRequests/WithdrawalRequestsSearchBar";

const WithdrawalRequests = () => {

  let loginObj = GetStoreObject("auth");

  let _PAGESIZE = 10;
  const [pageLoader, setPageLoader] = useState(false);

  // company table state
  const [searchValue, setsearchValue] = useState('');
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);
  const [tablelistdata, settablelistdata] = useState([]);

  const handleSendCreditData = async () => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_API_URL}/credits/withdraw/requests?rowsperpage=${pageSize}&pagenumber=${pageNumber}&requesteename=${searchValue}`;
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

  useEffect(() => {
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

  const [requestObj, setrequestObj] = useState(null);
  const handleApproveDecline = (e, dataObject, reqType) => {
    setrequestObj(dataObject);
    if(reqType === 1) {
      handleApprWithdrawOpen();
    } else {
      handleDeclineWithdrawOpen();
    }
  }

  // dialog
  const [openApprWithdraw, setApprWithdraw] = React.useState(false);
  const handleApprWithdrawOpen = () => { setApprWithdraw(true); };
  const handleApprWithdrawClose = () => { setApprWithdraw(false); };

  const handleApprWithdrawCallback = () => {
    handleApprWithdrawClose();
    setTotalRows(totalRows - 1);
  }

  // dialog
  const [openDeclineWithdraw, setDeclineWithdraw] = React.useState(false);
  const handleDeclineWithdrawOpen = () => { setDeclineWithdraw(true); };
  const handleDeclineWithdrawClose = () => { setDeclineWithdraw(false); };

  const handleDeclineWithdrawCallback = () => {
    handleDeclineWithdrawClose();
    setTotalRows(totalRows - 1);
  }

  return (
    <div className="agentWallet">
      <div className="div-table">
        <div className="div-table-head" style={{display:'block'}}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div></div>
            <div className="bottom" style={{width:'50%'}}>
              <div className="search">
                <WithdrawalRequestsSearchBar handleSearch={ handleSearch } handleSearchEmpty={ handleSearchEmpty } />
              </div>
            </div>
          </div>
          <br />

          <WithdrawalRequestsList 
            SearchResults={ tablelistdata }
            totalCount={ totalRows }
            RowsPerPage={ handleRowsPerPage }
            pageNumber = { (pageNumber === 0) ? pageNumber : (pageNumber - 1) }
            pageSize = { pageSize }
            ChangePage={ handleChangePage }
            isLoading = { pageLoader }
            ApproveDecline={ handleApproveDecline }
          />
        </div>
      </div>

    </div>
  )
}

export default WithdrawalRequests
