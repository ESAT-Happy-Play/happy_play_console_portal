import "./operator.scss";

import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { TextField, MenuItem, Button  } from "@mui/material"
import { toast } from 'react-toastify';

import OperatorSearchBar from "../../../components/table/operator/OperatorSearchBar";
import OperatorList from "../../../components/table/operator/OperatorList";

import { GETFetch } from "../../../api/ApiFetchBuilder";

import AddOperator from "../../../components/Dialog/forms/operator/AddOperator";

const Operator = () => {

  /**
   * constants and functions
   */
  let _PAGESIZE = 5;
  const [pageLoader, setPageLoader] = useState(false);

  const [operatorSearchValue, setoperatorSearchValue] = useState('');
  const [companyCode, setcompanyCode] = useState(null);
  const [branchCode, setbranchCode] = useState(null);
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);
  const [operators, setoperators] = useState([]);
  const [allCompanies, setallCompanies] = useState([]);
  const [branches, setbranches] = useState([]);

  const handleOperatorData = async () => {
    setPageLoader(true);
    let url = (companyCode === null && branchCode === null) ? `${process.env.REACT_APP_API_URL}/operators?rowsperpage=${pageSize}&pagenumber=${pageNumber}&operatorsearch=${operatorSearchValue}`
      : (companyCode !== null && branchCode === null) ? `${process.env.REACT_APP_API_URL}/operators?rowsperpage=${pageSize}&pagenumber=${pageNumber}&companyid=${companyCode}&operatorsearch=${operatorSearchValue}`
      : (companyCode !== null && branchCode !== null) ? `${process.env.REACT_APP_API_URL}/operators?rowsperpage=${pageSize}&pagenumber=${pageNumber}&companyid=${companyCode}&branchcode=${branchCode}&operatorsearch=${operatorSearchValue}` 
      : `${process.env.REACT_APP_API_URL}/operators?rowsperpage=${pageSize}&pagenumber=${pageNumber}&operatorsearch=${operatorSearchValue}`;
    
      let response = await GETFetch(url);
    setPageLoader(false);

    if(response.status) {
      setoperators(response.data.operators);

      setTotalRows(response.data.totalRows);
      setpageNumber(response.data.currentPage);
      setpageSize(response.data.rowsPerPage);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  const handleComapanyAll = async () => {
    let response = await GETFetch(`${process.env.REACT_APP_API_URL}/companies/all`);
    if(response.status) {
      setallCompanies(response.data.companies);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  const handleBranchByCompany = async (code) => {
    let response = await GETFetch(`${process.env.REACT_APP_API_URL}/branches?rowsperpage=100&pagenumber=1&companyid=${code}`);
    if(response.status) {
      setbranches(response.data.branches);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    handleOperatorData();
    handleComapanyAll();
  }, [pageNumber, operatorSearchValue, pageSize, totalRows, companyCode, branchCode]);

  // On click search
  const handleOperatorSearch = (event, value) => { 
    setoperatorSearchValue(value);
    setpageNumber(1);
    setpageSize(_PAGESIZE);
  }

  // Trigger on search empty
  const handleOperatorSearchEmpty = (event, value) => {
    if (value === "") {
      setoperatorSearchValue("");
      setpageNumber(1);
      setpageSize(_PAGESIZE);
    }
  }

  // handle table next page
  const handleOperatorChangePage = (event, newPage) => {
    setpageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle table change page size
  const handleOperatorRowsPerPage = (event) => {
    setpageSize(+event.target.value);
    setpageNumber(1);
    setPageLoader(true);
  }

  const handleSelect = async (e, value) => {
    setcompanyCode(value);
    setbranchCode(null);
    await handleBranchByCompany(value);
  }

  const handleSelectBranch = async (e, value) => {
    setbranchCode(value);
  }

  // Add dialog
  const [openAddOperator, setAddOperator] = React.useState(false);
  const handleAddOperatorOpen = () => { setAddOperator(true); };
  const handleAddOperatorClose = () => { setAddOperator(false); };

  const handleOperatorCallback = () => {
    setTotalRows(totalRows + 1);
  }

  return (
    <div className="operator">
      <div className="container">
        <div className="top">
          <h2 className="title">LIST OF OPERATORS</h2>
          <Button className="btn-success" variant="outlined" onClick={ handleAddOperatorOpen } size="large">
            Add New Operator <AddIcon />
          </Button>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div className="bottom">
            <span>Company</span>
            <TextField 
                onChange={e => handleSelect(e, e.target.value) }
                label="Select Company" style={{ minWidth: "250px" }} defaultValue="" variant="outlined" size="small" select>
                <MenuItem value=''><em>Select Company</em></MenuItem>
                { 
                    (allCompanies.length !== 0) ? allCompanies.map((item) => (
                    <MenuItem data-province-code={item.companyId} key={item.companyId} value={item.companyId}>
                        {item.companyName}
                    </MenuItem>
                    )) 
                    : (pageLoader) ? <MenuItem value=''>Loading options...</MenuItem>
                    : <MenuItem value=''>No records found!</MenuItem>
                }
              </TextField>
          </div>
          <div className="bottom">
            <span>Branch</span>
            <TextField 
                onChange={e => handleSelectBranch(e, e.target.value) }
                label="Select Branch" style={{ minWidth: "250px" }} defaultValue="" variant="outlined" size="small" select>
                <MenuItem value=''><em>Select Branch</em></MenuItem>
                { 
                    (branches.length !== 0) ? branches.map((item) => (
                    <MenuItem data-province-code={item.branchCode} key={item.branchCode} value={item.branchCode}>
                        {item.branchName}
                    </MenuItem>
                    )) 
                    : (pageLoader) ? <MenuItem value=''>Loading options...</MenuItem>
                    : <MenuItem value=''>No records found!</MenuItem>
                }
              </TextField>
          </div>
          <div className="bottom" style={{ minWidth: "450px" }}>
            <div className="search">
              <OperatorSearchBar handleSearch={ handleOperatorSearch } handleSearchEmpty={ handleOperatorSearchEmpty } />
            </div>
          </div>
        </div>

        <AddOperator isOpenAdd={openAddOperator} handleCloseAdd={handleAddOperatorClose} handleCallback={handleOperatorCallback} />
        <OperatorList 
          searchResults={ operators }
          totalCount={ totalRows }
          RowsPerPage={ handleOperatorRowsPerPage }
          pageNumber = { (pageNumber === 0) ? pageNumber : (pageNumber - 1) }
          pageSize = { pageSize }
          ChangePage={ handleOperatorChangePage }
          isLoading = { pageLoader }
        />
      </div>
    </div>
  )
}

export default Operator
