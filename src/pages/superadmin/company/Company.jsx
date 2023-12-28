import "./company.scss";

import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField, InputAdornment } from "@mui/material";

import AddCompany from "../../../components/Dialog/forms/AddCompany";
import AddBranch from "../../../components/Dialog/forms/AddBranch";
import CompanySearchBar from "../../../components/table/companyList/CompanySearchBar";
import CompanyList from "../../../components/table/companyList/CompanyList";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import PageLoader from "../../../components/widget/PageLoader";
import { toast } from 'react-toastify';

const Company = () => {
  /**
   * Company table list constants and functions
   */
  let _PAGESIZE = 5;
  const [pageLoader, setPageLoader] = useState(false);

  // company table state
  const [companySearchValue, setCompanySearchValue] = useState('');
  const [companyPageNumber, setCompanyPageNumber] = useState(0);
  const [totalCompanyRows, setTotalCompanyRows] = useState(0);
  const [companyPageSize, setCompanyPageSize] = useState(_PAGESIZE);
  const [companies, setCompanies] = useState([]);

  // On click search company
  const handleCompanySearch = (event, value) => { 
    setCompanySearchValue(value);
    setCompanyPageNumber(0);
    setCompanyPageSize(_PAGESIZE);
    setPageLoader(true);
  }

  // Trigger on search company empty
  const handleCompanySearchEmpty = (event, value) => {
    if (value === "") {
      setCompanySearchValue("");
      setCompanyPageNumber(0);
      setCompanyPageSize(_PAGESIZE);
      setPageLoader(true);
    }
  }

  // handle company table next page
  const handleCompanyChangePage = (event, newPage) => {
    setCompanyPageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle company table change page size
  const handleCompanyRowsPerPage = (event) => {
    setCompanyPageSize(+event.target.value);
    setCompanyPageNumber(0);
    setPageLoader(true);
  }

  /**
   * Company profile constants and functions
   */
  const [branches, setBranchTable] = useState([]);
  
  const [showProfile, setShowProfile] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [branchName, setBranchName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [branchCount, setBranchCount] = useState(0);
  const [operatorCount, setOperatorCount] = useState(0);
  const [notGetCompany, setNotGetCompany] = useState(true);
  
  // trigger to show company profile
  const handleShowCompanyProfile = ( event, companyId, companyName) => {
    setPageLoader(true);

    setCompanyId(companyId);
    setCompanyName(companyName);
    setNotGetCompany(false);
    // get branch data

    console.log(companyId);
  };

  /**
   * Page dialogs constants and functions
   */

  // Add company dialog
  const [openAddCompany, setAddCompany] = React.useState(false);
  const handleAddCompanyOpen = () => { setAddCompany(true); };
  const handleAddCompanyClose = () => { setAddCompany(false); };

  const handleCompanyCallback = () => {
    setPageLoader(true);
    setTotalCompanyRows(totalCompanyRows + 1);
  }

  // Add branch dialog
  const [openAddBranch, setAddBranch] = React.useState(false);
  const handleAddBranchOpen = () => { setAddBranch(true); };
  const handleAddBranchClose = () => { setAddBranch(false); };

  const handleBranchCallback = () => {

  }

  /**
   * Search branch
   */
  // submit form if buttons submit available
  const handleBranchSearchSubmit = (e) => e.preventDefault();
  // onchange trigger
  const handleBranchSearchChange = (e) => {
      if (branchName === "" && e.target.value === "") {
        setPageLoader(true);
        handleExecuteSearchBranch();
      }
      setBranchName(e.target.value);
  }
  // on search icon trigger
  const handleSearchBranchSubmit = (e) => {
      setPageLoader(true);
      handleExecuteSearchBranch();
  }

  const handleBranchKeyDown = (e) => {
    if(e.keyCode === 13){
      setPageLoader(true);
      handleExecuteSearchBranch();
    }
  }

  const handleExecuteSearchBranch = () => {
    console.log("search banch");
  }

  return (
    <div className="company">
      <div className="container">
        <div className="top">
          <h2 className="title">LIST OF REGISTERED COMPANIES</h2>
          <Button variant="contained" size="large" onClick={ handleAddCompanyOpen }>
            New Company <AddIcon />
          </Button>
        </div>
        <div className="bottom">
          <div className="search">
            <CompanySearchBar handleCompanySearch={ handleCompanySearch } handleCompanySearchEmpty={ handleCompanySearchEmpty } />
          </div>
        </div>
        <CompanyList 
          companySearchResults={ companies }
          totalCount={ totalCompanyRows }
          showCompanyProfile={ handleShowCompanyProfile }
          companyRowsPerPage={ handleCompanyRowsPerPage }
          pageNumber = { (companyPageNumber === 0) ? companyPageNumber : (companyPageNumber - 1) }
          pageSize = { companyPageSize }
          companyChangePage={ handleCompanyChangePage }
        />
      </div>

      <div id="divCompanyProfile" className={(showProfile) ? "show container" : "hide container" }>
        <div className="top">
          <h2 className="title">COMPANY PROFILE</h2>
          <Button variant="contained" size="large" onClick={ handleAddBranchOpen }>
            New Branch <AddIcon />
          </Button>
        </div>
        <div className="bottomProfile">
          <div className="left">
            <h2 className="title">{ companyName }</h2>
            <span>Company Name</span>

            <div className="widget1">
              <div className="left">
                <h3>Branches</h3>
                <div>
                  <h3>{ branchCount }</h3>
                </div>
              </div>
              <div className="right">
                <h3>Operators</h3>
                <div>
                  <h3>{ operatorCount }</h3>
                </div>
              </div>
            </div>

            <div className="widget2">
              <h3>Headers</h3>
            </div>

          </div>

          <div className="BranchList">
            <div className="bottom" style={{ width: "100%", padding: 0, marginBottom: "15px"}}>
                <form className="search" onSubmit={ handleBranchSearchSubmit }>
                    <TextField
                        size="small"
                        label="Search Branch Name"
                        variant="outlined"
                        fullWidth
                        onChange={ handleBranchSearchChange }
                        onKeyDown={ handleBranchKeyDown }
                        InputProps={{
                            endAdornment: (
                            <InputAdornment onClick={ handleSearchBranchSubmit } position="end">
                                <SearchIcon />
                            </InputAdornment>
                            )
                        }}
                    />
                </form>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Branch Name</TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Branch Operator</TableCell>
                    <TableCell>Branch Contact</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    (branches.length > 0) ?
                    branches.map((branch, index) => (
                      <TableRow key={branch.branchId} x={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell component="th" scope="row"> {branch.branchName}</TableCell>
                        <TableCell>{branch.companyName}</TableCell>
                        <TableCell>{branch.branchOperator}</TableCell>
                        <TableCell>{branch.branchContact}</TableCell>
                    </TableRow>
                    ))
                    : <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                          <TableCell component="th" scope="row" colSpan={6}> No Branch records found! </TableCell>
                      </TableRow>
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>

        </div>
      </div>

      <AddCompany isOpenAddCompany={ openAddCompany } handleCloseAddCompany={ handleAddCompanyClose } handleCallback={ handleCompanyCallback } />
      <AddBranch isOpenAddBranch={ openAddBranch } handleCloseAddBranch={ handleAddBranchClose } 
      companyId={ companyId } companyName={ companyName } handleCallback={ handleBranchCallback } />

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default Company
