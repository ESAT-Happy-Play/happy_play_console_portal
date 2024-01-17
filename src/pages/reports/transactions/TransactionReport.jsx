import "./transactionreport.scss";

import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button  } from "@mui/material"
import { toast } from 'react-toastify';

import { GETFetch } from "../../../api/ApiFetchBuilder";
import { GetStoreObject } from "../../../helper/Helpers";
import CommissionsList from "../../../components/table/commissions/CommissionsList";
import CommissionsSearchBar from "../../../components/table/commissions/CommissionsSearchBar";

const TransactionReport = () => {
  let loginObj = GetStoreObject("auth");

  /**
   * Branch table list constants and functions
   */
  let _PAGESIZE = 5;
  // let _CompanyCode = loginObj.companyId;
  const [pageLoader, setPageLoader] = useState(false);

  // company table state
  const [SearchValue, setSearchValue] = useState('');
  const [companyCode, setcompanyCode] = useState(null);
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);
  const [tablelistdata, settablelistdata] = useState([]);

  const handleCommissionData = async () => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_API_URL}/users/commissiontransactions?rowsperpage=${pageSize}&pagenumber=${pageNumber}&gametype=`;
    let response = await GETFetch(url);
    setPageLoader(false);

    if(response.status) {
      settablelistdata(response.data.commissionTransactions);

      // setTotalRows(response.data.totalRows);
      // setpageNumber(response.data.currentPage);
      // setpageSize(response.data.rowsPerPage);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    handleCommissionData();
  }, [pageNumber, SearchValue, pageSize, totalRows]);

  // On click search company
  const handleSearch = (event, value) => { 
    setSearchValue(value);
    setpageNumber(1);
    setpageSize(_PAGESIZE);
  }

  // Trigger on search company empty
  const handleSearchEmpty = (event, value) => {
    if (value === "") {
      setSearchValue("");
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

  const handleSelect = (e, value) => {
    setcompanyCode(value);
  }

  return (
    <div className="trans-report">
      <div className="container">
        <div className="top">
          <h2 className="title">COMMISSIONS</h2>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div className="bottom">
            <span>Game Type</span>
            <TextField 
                onChange={e => handleSelect(e, e.target.value) }
                label="Select game type" style={{ minWidth: "250px" }} defaultValue="" variant="outlined" size="small" select>
                <MenuItem value=''><em>Select game type</em></MenuItem>
                <MenuItem value='01'><em>Regular</em></MenuItem>
                <MenuItem value='02'><em>Jackpot 3.3</em></MenuItem>
                <MenuItem value='03'><em>Jackpot 3.4</em></MenuItem>
              </TextField>
          </div>
          <div className="bottom" style={{width:'50%'}}>
            <div className="search">
              <CommissionsSearchBar handleSearch={ handleSearch } handleSearchEmpty={ handleSearchEmpty } />
            </div>
          </div>
        </div>
        <CommissionsList 
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
  )
}

export default TransactionReport
