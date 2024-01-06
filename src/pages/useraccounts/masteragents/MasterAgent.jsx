import "./masteragent.scss";

import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { TextField, MenuItem, Button  } from "@mui/material"
import { toast } from 'react-toastify';

import MasterAgentSearchBar from "../../../components/table/masterAgent/MasterAgentSearchBar";

import { GETFetch } from "../../../api/ApiFetchBuilder";

import MasterAgentList from "../../../components/table/masterAgent/MasterAgentList";
import AddMasterAgent from "../../../components/Dialog/forms/masterAgent/AddMasterAgent";

const MasterAgent = () => {

  /**
   * constants and functions
   */
  let _PAGESIZE = 10;
  const [pageLoader, setPageLoader] = useState(false);

  const [masterAgentSearchValue, setmasterAgentSearchValue] = useState('');
  const [companyCode, setcompanyCode] = useState(null);
  const [branchCode, setbranchCode] = useState(null);
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);
  const [masterAgents, setmasterAgent] = useState([]);
  const [allCompanies, setallCompanies] = useState([]);
  const [branches, setbranches] = useState([]);

  const handleMasterAgentData = async () => {
    setPageLoader(true);
    let url = (companyCode === null && branchCode === null) ? `${process.env.REACT_APP_API_URL}/masteragents?rowsperpage=${pageSize}&pagenumber=${pageNumber}&agentsearch=${masterAgentSearchValue}`
      : (companyCode !== null && branchCode === null) ? `${process.env.REACT_APP_API_URL}/masteragents?rowsperpage=${pageSize}&pagenumber=${pageNumber}&companyid=${companyCode}&agentsearch=${masterAgentSearchValue}`
      : (companyCode !== null && branchCode !== null) ? `${process.env.REACT_APP_API_URL}/masteragents?rowsperpage=${pageSize}&pagenumber=${pageNumber}&companyid=${companyCode}&branchcode=${branchCode}&agentsearch=${masterAgentSearchValue}` 
      : `${process.env.REACT_APP_API_URL}/masteragents?rowsperpage=${pageSize}&pagenumber=${pageNumber}&agentsearch=${masterAgentSearchValue}`;
    
      let response = await GETFetch(url);
    setPageLoader(false);

    if(response.status) {
      setmasterAgent(response.data.masterAgents);

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
    handleMasterAgentData();
    handleComapanyAll();
  }, [pageNumber, masterAgentSearchValue, pageSize, totalRows, companyCode, branchCode]);

  // On click search
  const handleMasterAgentSearch = (event, value) => { 
    setmasterAgentSearchValue(value);
    setpageNumber(1);
    setpageSize(_PAGESIZE);
  }

  // Trigger on search empty
  const handleMasterAgentSearchEmpty = (event, value) => {
    if (value === "") {
      setmasterAgentSearchValue("");
      setpageNumber(1);
      setpageSize(_PAGESIZE);
    }
  }

  // handle table next page
  const handleMasterAgentChangePage = (event, newPage) => {
    setpageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle table change page size
  const handleMasterAgentRowsPerPage = (event) => {
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
  const [openAddMasterAgent, setAddMasterAgent] = React.useState(false);
  const handleAddMasterAgentOpen = () => { setAddMasterAgent(true); };
  const handleAddMasterAgentClose = () => { setAddMasterAgent(false); };

  const handleMasterAgentCallback = () => {
    setTotalRows(totalRows + 1);
  }

  return (
    <div className="masterAgent">
      <div className="container">
        <div className="top">
          <h2 className="title">LIST OF MASTER AGENTS</h2>
          <Button className="btn-success" variant="outlined" onClick={ handleAddMasterAgentOpen } size="large">
            Add New Master Agent <AddIcon />
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
              <MasterAgentSearchBar handleSearch={ handleMasterAgentSearch } handleSearchEmpty={ handleMasterAgentSearchEmpty } />
            </div>
          </div>
        </div>

        <MasterAgentList 
          searchResults={ masterAgents }
          totalCount={ totalRows }
          RowsPerPage={ handleMasterAgentRowsPerPage }
          pageNumber = { (pageNumber === 0) ? pageNumber : (pageNumber - 1) }
          pageSize = { pageSize }
          ChangePage={ handleMasterAgentChangePage }
          isLoading = { pageLoader }
        />

        <AddMasterAgent isOpenAdd={openAddMasterAgent} handleCloseAdd={handleAddMasterAgentClose} handleCallback={handleMasterAgentCallback} />
      </div>
    </div>
  )
}

export default MasterAgent
