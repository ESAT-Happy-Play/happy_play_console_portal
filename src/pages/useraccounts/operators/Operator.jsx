import "./operator.scss"

import React, { useState, useEffect } from 'react';
import OperatorSearchBar from "../../../components/table/operator/OperatorSearchBar";
import OperatorList from "../../../components/table/operator/OperatorList";
import PageLoader from "../../../components/widget/PageLoader";
import { toast } from 'react-toastify';

import { TextField, MenuItem, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddOperator from "../../../components/Dialog/forms/AddOperator";

import { GetStoreObject, GetJWTStoreObject } from "../../../helper/Helpers";
import { Roles } from "../../../helper/Objects";

const Operator = () => {
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
  
  const [operatorList, setoperatorList] = useState([]);
  const [companies, setCompanies] = useState([]);
  
  const handleSelect = (e, value) => {
    setPageLoader(true);
    setCompanyId(value);
  }

  // On click search Operator
  const handleOperatorSearch = (event, value) => { 
    setSearchValue(value);
    setPageNumber(0);
    setPageSize(_PAGESIZE);
    setPageLoader(true);
  }

  // Trigger on search Operator empty
  const handleOperatorSearchEmpty = (event, value) => {
    if (value === "") {
      setSearchValue("");
      setPageNumber(0);
      setPageSize(_PAGESIZE);
      setPageLoader(true);
    }
  }

  // handle table next page
  const handleOperatorChangePage = (event, newPage) => {
    setPageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle table change page size
  const handleOperatorRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPageNumber(0);
    setPageLoader(true);
  }

  const handleNewOperator = () => {
    if(CompanyId !== null) {
      handleAddOperatorOpen();
    } else {
      toast.error("Please select company");
    }
  }

  // Add dialog
  const [openAddOperator, setAddOperator] = React.useState(false);
  const handleAddOperatorOpen = () => { setAddOperator(true); };
  const handleAddOperatorClose = () => { setAddOperator(false); };

  const handleOperatorCallback = () => {
    setPageLoader(true);
    setTotalRows(totalRows + 1);
  }

  return (
    <div className="content">
      <div  className="container">
        <div className="top">
          <h2 className="title">LIST OF OPERATORS</h2>
          {
            (tokenObj.RoleId === roles.Admin || (tokenObj.RoleId === roles.Operator && loginObj.isMain)) ?
              <Button variant="contained" onClick={ handleNewOperator } size="large">
                New Operator <AddIcon />
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
            <OperatorSearchBar handleSearch={ handleOperatorSearch } handleSearchEmpty={ handleOperatorSearchEmpty } />
          </div>
        </div>

        <div className="row p-15">
          <div className="col-12">
            <OperatorList 
            SearchResults={ operatorList }
            ChangePage = { handleOperatorChangePage }
            RowsPerPage = { handleOperatorRowsPerPage }
            pageNumber = { (PageNumber === 0) ? PageNumber : (PageNumber - 1) }
            pageSize = { PageSize } 
            totalCount = { totalRows } />
          </div>
        </div>

      </div>
      <AddOperator 
        isOpen={ openAddOperator } 
        handleClose={ handleAddOperatorClose }
        handleBack={ handleOperatorCallback }
        companyId= { CompanyId }
        branchId= { BrachId }
        branchName= { BranchName } />

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  );
}

export default Operator