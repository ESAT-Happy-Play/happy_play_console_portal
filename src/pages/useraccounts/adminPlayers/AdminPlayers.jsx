import React, { useState, useEffect } from 'react';
import PageLoader from "../../../components/widget/PageLoader";
import { toast } from 'react-toastify';

import { TextField, MenuItem } from "@mui/material";

import AdminPlayerSearchBar from "../../../components/table/adminPlayer/AdminPlayerSearchBar";
import AdminPlayerList from "../../../components/table/adminPlayer/AdminPlayerList";

import { GetStoreObject, GetJWTStoreObject } from "../../../helper/Helpers";
import { Roles } from "../../../helper/Objects";

const AdminPlayers = () => {
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

  const [SearchValue, setSearchValue] = useState('');
  const [PageNumber, setPageNumber] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [PageSize, setPageSize] = useState(_PAGESIZE);
  
  const [playerList, setPlayerList] = useState([]);
  const [companies, setCompanies] = useState([]);
  
  const handleSelect = (e, value) => {
    setPageLoader(true);
    setCompanyId(value);
  }

  // On click search AdminPlayer
  const handleAdminPlayerSearch = (event, value) => { 
    setSearchValue(value);
    setPageNumber(0);
    setPageSize(_PAGESIZE);
    setPageLoader(true);
  }

  // Trigger on search AdminPlayer empty
  const handleAdminPlayerSearchEmpty = (event, value) => {
    if (value === "") {
      setSearchValue("");
      setPageNumber(0);
      setPageSize(_PAGESIZE);
      setPageLoader(true);
    }
  }

    // handle company table next page
  const handleAdminPlayerChangePage = (event, newPage) => {
    setPageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle company table change page size
  const handleAdminPlayerRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPageNumber(0);
    setPageLoader(true);
  }

  return (
    <div className="content">
      <div  className="container">
        <div className="top">
          <h2 className="title">LIST OF PLAYERS</h2>
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
            <AdminPlayerSearchBar handleSearch={ handleAdminPlayerSearch } handleSearchEmpty={ handleAdminPlayerSearchEmpty } />
          </div>
        </div>

        <div className="row p-15">
          <div className="col-12">
            <AdminPlayerList 
            SearchResults={ playerList }
            ChangePage = { handleAdminPlayerChangePage }
            RowsPerPage = { handleAdminPlayerRowsPerPage }
            pageNumber = { (PageNumber === 0) ? PageNumber : (PageNumber - 1) }
            pageSize = { PageSize } 
            totalCount = { totalRows }
            pageLoad = { pageLoader } />
          </div>
        </div>

      </div>
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  );
}
export default AdminPlayers;