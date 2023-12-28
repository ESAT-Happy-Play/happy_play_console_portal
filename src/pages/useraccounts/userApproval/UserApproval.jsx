import "./userapproval.scss";
import React, { useState, useEffect } from 'react';
import { TextField, Button  } from "@mui/material";
import { toast } from 'react-toastify';

import ForApprovalSearchBar from "../../../components/table/userApproval/ForApprovalSearchBar";
import ForApprovalList from "../../../components/table/userApproval/ForApprovalList";
import ApproveOrDecline from "../../../components/Dialog/forms/ApproveOrDecline";

const UserApproval = () => {
  let _PAGESIZE = 5;
  const [pageLoader, setPageLoader] = useState(false);
  const [SearchValue, setSearchValue] = useState('');
  const [PageNumber, setPageNumber] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [PageSize, setPageSize] = useState(_PAGESIZE);

  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [dateFromUpdate, setDateFromUpdate] = useState(dateFrom);
  const [dateToUpdate, setDateToUpdate] = useState(dateTo);

  const [forApproveList, setForApproveList] = useState([]);
  
  // On click search ForApproval
  const handleForApprovalSearch = (event, value) => { 
    setSearchValue(value);
    setPageNumber(0);
    setPageSize(_PAGESIZE);
    setPageLoader(true);
  }

  // Trigger on search ForApproval empty
  const handleForApprovalSearchEmpty = (event, value) => {
    if (value === "") {
      setSearchValue("");
      setPageNumber(0);
      setPageSize(_PAGESIZE);
      setPageLoader(true);
    }
  }

  // handle ForApproval table next page
  const handleForApprovalChangePage = (event, newPage) => {
    setPageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle ForApproval table change page size
  const handleForApprovalRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPageNumber(0);
    setPageLoader(true);
  }

  // Add ApproveDecline dialog
  const [userObj, setUserObj] = React.useState({});
  const [openApproveDecline, setApproveDecline] = React.useState(false);
  const handleApproveDeclineOpen = () => { setApproveDecline(true); };
  const handleApproveDeclineClose = () => { setApproveDecline(false); };

  const handleShowApproveDecline = ( event, accountId) => {
    setUserObj(forApproveList.find(obj => obj.accountInfoId === accountId));
    handleApproveDeclineOpen();
  };

  const handleDeleteRequest = () => {
    setPageLoader(true);
    setTotalRows(totalRows - 1);
  }

  const handleGenerate = () => {
    if (dateFrom === null) { toast.error("Please select Date From."); return; }
    if (dateTo === null) { toast.error("Please select Date To."); return; }

    setDateFromUpdate(dateFrom);
    setDateToUpdate(dateTo);

    if(dateFromUpdate !== dateFrom || dateToUpdate !== dateTo) {
      setPageLoader(true);
    }
  }

  return (
    <div className="content">
      <div  className="container">
        <div className="row p-15">
          <div className="col-4">
            <div className="row">
              <div className="col-4 labelTitle" style={{width:'87px'}}>
                <span>Date From</span>
              </div>
              <div className="col-8">
                <TextField
                  type="date"
                  sx={{ width: "200px" }} onChange={e => setDateFrom(e.target.value) }  variant="outlined" size="small" />
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-4 labelTitle" style={{width:'66px'}}>
                <span>Date To</span>
              </div>
              <div className="col-8">
                <TextField
                  type="date"
                  sx={{ width: "200px" }} onChange={e => setDateTo(e.target.value) }  variant="outlined" size="small" />
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-12 txtright">
                <Button variant="contained" onClick={handleGenerate} color="success">
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="row p-15">
          <div className="col-12">
            <ForApprovalSearchBar handleForApprovalSearch={ handleForApprovalSearch } handleForApprovalSearchEmpty={ handleForApprovalSearchEmpty } />
          </div>
        </div>

        <div className="row p-15">
          <div className="col-12">
            <ForApprovalList 
            SearchResults={ forApproveList }
            ChangePage = { handleForApprovalChangePage }
            RowsPerPage = { handleForApprovalRowsPerPage }
            pageNumber = { (PageNumber === 0) ? PageNumber : (PageNumber - 1) }
            pageSize = { PageSize } 
            totalCount = { totalRows }
            ShowApproveDecline = { handleShowApproveDecline }
            deleteRequest= { handleDeleteRequest }
            loading = { pageLoader } />
          </div>
        </div>

      </div>

      <ApproveOrDecline 
        isOpenApproveOrDecline={ openApproveDecline } 
        handleCloseApproveOrDecline={ handleApproveDeclineClose } 
        userObj={ userObj }
         />
    </div>
  );
}

export default UserApproval
