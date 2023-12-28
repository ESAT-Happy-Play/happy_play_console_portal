import "./masteragent.scss"
import React, { useState, useEffect } from 'react';
import PageLoader from "../../../components/widget/PageLoader";
import { toast } from 'react-toastify';

import { TextField, MenuItem, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import MasterAgentSearchBar from "../../../components/table/masterAgent/MasterAgentSearchBar";
import MasterAgentList from "../../../components/table/masterAgent/MasterAgentList";
import AddMasterAgent from "../../../components/Dialog/forms/AddMasterAgent";

import { GetStoreObject, GetJWTStoreObject } from "../../../helper/Helpers";
import { Roles } from "../../../helper/Objects";

function MasterAgent() {
  // Enum roles
  let roles = Roles();
  // auth api response object
  let loginObj = GetStoreObject("auth");
  // token object
  let tokenObj = GetJWTStoreObject(loginObj.token);
  // loginObj.companyObjId
  // loginObj.branchId
  // loginObj.isMain
  // loginObj.accountObjectId
  // loginObj.branchName

  let _PAGESIZE = 5;
  const [pageLoader, setPageLoader] = useState(true);

  // table state
  const [CompanyId, setCompanyId] = useState((tokenObj.RoleId !== roles.Admin) ? loginObj.companyObjId : null);
  const [BrachId, setBrachId] = useState((tokenObj.RoleId !== roles.Admin) ? loginObj.branchId : null);
  const [BranchName, setBranchName] = useState((tokenObj.RoleId !== roles.Admin) ? loginObj.branchName : null);

  const [SearchValue, setSearchValue] = useState('');
  const [PageNumber, setPageNumber] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [PageSize, setPageSize] = useState(_PAGESIZE);
  
  const [masterAgentList, setmasterAgentList] = useState([]);
  const [companies, setCompanies] = useState([]);
  
  const handleSelect = (e, value) => {
    setPageLoader(true);
    setCompanyId(value);
  }

  // On click search MasterAgent
  const handleMasterAgentSearch = (event, value) => { 
    setSearchValue(value);
    setPageNumber(0);
    setPageSize(_PAGESIZE);
    setPageLoader(true);
  }

  // Trigger on search MasterAgent empty
  const handleMasterAgentSearchEmpty = (event, value) => {
    if (value === "") {
      setSearchValue("");
      setPageNumber(0);
      setPageSize(_PAGESIZE);
      setPageLoader(true);
    }
  }

    // handle company table next page
  const handleMasterAgentChangePage = (event, newPage) => {
    setPageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle company table change page size
  const handleMasterAgentRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPageNumber(0);
    setPageLoader(true);
  }

  // Add dialog
  const [openMasterAgent, setAddMasterAgent] = React.useState(false);
  const handleMasterAgentOpen = () => { setAddMasterAgent(true); };
  const handleMasterAgentClose = () => { setAddMasterAgent(false); };

  const handleMasterAgentCallback = () => {
    setPageLoader(true);
    setTotalRows(totalRows + 1);
  }

  const handleNewMasterAgent = () => {
    if(CompanyId !== null) {
      handleMasterAgentOpen();
    } else {
      toast.error("Please select company");
    }
  }

  return (
    <div className="content">
      <div  className="container">
        <div className="top">
          <h2 className="title">LIST OF MASTER AGENTS</h2>
          {
            (tokenObj.RoleId === roles.Admin || (tokenObj.RoleId === roles.Operator && loginObj.isMain)) ?
              <Button onClick={ handleNewMasterAgent } variant="contained" size="large">
                New MasterAgent <AddIcon />
              </Button>
            : ""
          }
        </div>
        <div className="row p-15">

          {
            (tokenObj.RoleId === roles.Admin) ?
              <div className="col-4">
                <TextField
                  placeholder="Select Company"
                  onChange={e => handleSelect(e, e.target.value) }
                  label="Select Company" sx={{ width: "100%" }} defaultValue="" variant="outlined" size="small" select>
                  <MenuItem value=''><em>Select Company</em></MenuItem>
                  { 
                      (companies.length !== 0) ? companies.map((item) => (
                      <MenuItem key={item.companyId} value={item.companyId}>
                          {item.companyName}
                      </MenuItem>
                      )) :
                      <MenuItem value=''>Loading options...</MenuItem>
                  }
                </TextField>
              </div>
            : ""
          }

          <div className={ (tokenObj.RoleId === roles.Admin) ? 'col-8' : 'col-12'}>
            <MasterAgentSearchBar handleSearch={ handleMasterAgentSearch } handleSearchEmpty={ handleMasterAgentSearchEmpty } />
          </div>
        </div>

        <div className="row p-15">
          <div className="col-12">
            <MasterAgentList 
            SearchResults={ masterAgentList }
            ChangePage = { handleMasterAgentChangePage }
            RowsPerPage = { handleMasterAgentRowsPerPage }
            pageNumber = { (PageNumber === 0) ? PageNumber : (PageNumber - 1) }
            pageSize = { PageSize } 
            totalCount = { totalRows } />
          </div>
        </div>

        <AddMasterAgent 
          isOpen={ openMasterAgent } 
          handleClose={ handleMasterAgentClose }
          handleBack={ handleMasterAgentCallback }
          companyId= { CompanyId } 
          branchId= { BrachId }
          branchName= { BranchName } />
      </div>
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default MasterAgent
