import "./cuserapproval.scss";

import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { TextField, MenuItem, Button  } from "@mui/material"
import { toast } from 'react-toastify';
import { GETFetch } from "../../../../api/ApiFetchBuilder";

import { GetStoreObject } from "../../../../helper/Helpers";
import ForApprovalList from "../../../../components/table/userApproval/ForApprovalList";
import ForApprovalSearchBar from "../../../../components/table/userApproval/ForApprovalSearchBar";
import ApproveOrDecline from "../../../../components/Dialog/forms/ApproveOrDecline";

const AgentUserApproval = () => {
  let loginObj = GetStoreObject("auth");

  /**
   * Branch table list constants and functions
   */
  let _PAGESIZE = 5;
  const [pageLoader, setPageLoader] = useState(false);

  // table state
  const [searchValue, setsearchValue] = useState('');
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);
  const [approvals, setapprovals] = useState([]);

  const handleApprovalsData = async () => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_API_URL}/users/approvals/${loginObj.referralCode}?rowsperpage=${pageSize}&pagenumber=${pageNumber}&registrantsearch=${searchValue}`;
    let response = await GETFetch(url);
    setPageLoader(false);

    if(response.status) {
      setapprovals(response.data.approvals);

      setTotalRows(response.data.totalRows);
      setpageNumber(response.data.currentPage);
      setpageSize(response.data.rowsPerPage);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    handleApprovalsData();
  }, [pageNumber, searchValue, pageSize, totalRows]);

  // On click search company
  const handleApprovalSearch = (event, value) => { 
    setsearchValue(value);
    setpageNumber(1);
    setpageSize(_PAGESIZE);
  }

  // Trigger on search company empty
  const handleApprovalSearchEmpty = (event, value) => {
    if (value === "") {
      setsearchValue("");
      setpageNumber(1);
      setpageSize(_PAGESIZE);
    }
  }

  // handle company table next page
  const handleApprovalChangePage = (event, newPage) => {
    setpageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle table change page size
  const handleApprovalRowsPerPage = (event) => {
    setpageSize(+event.target.value);
    setpageNumber(1);
    setPageLoader(true);
  }

  // 
  const handleShowApprove = ( event, objData) => {
    setuserObj(objData);
    handleApproveOpen();
  };

  // Add dialog
  const [userObj, setuserObj] = React.useState(null);
  const [openApprove, setApprove] = React.useState(false);
  const handleApproveOpen = () => { setApprove(true); };
  const handleApproveClose = () => { setApprove(false); };

  const handleApproveCallback = () => {
    setPageLoader(true);
    setTotalRows(totalRows + 1);
    handleApproveClose();
  }

  return (
    <div className="userAproval">
      <div className="container">
        <div className="top">
          <h2 className="title">PENDING REGISTRATIONS</h2>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div></div>
          <div className="bottom" style={{width:'50%'}}>
            <div className="search">
              <ForApprovalSearchBar handleSearch={ handleApprovalSearch } handleSearchEmpty={ handleApprovalSearchEmpty } />
            </div>
          </div>
        </div>
        <ForApprovalList 
          SearchResults={ approvals }
          ShowObjInfo={handleShowApprove}
          totalCount={ totalRows }
          RowsPerPage={ handleApprovalRowsPerPage }
          pageNumber = { (pageNumber === 0) ? pageNumber : (pageNumber - 1) }
          pageSize = { pageSize }
          ChangePage={ handleApprovalChangePage }
          isLoading = { pageLoader }
        />

        <ApproveOrDecline isOpenAdd={openApprove} handleCloseAdd={handleApproveClose} handleCallback={handleApproveCallback} userObj={userObj} />
      </div>
    </div>
  )
}

export default AgentUserApproval
