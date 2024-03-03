import "./branch.scss";

import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { TextField, MenuItem, Button  } from "@mui/material";

import { TableSearchBar, BranchList} from "../../components/mui/tables";
import { AddBranch } from "../../components/mui/modals";
import { CompanyService, BranchService } from "../../services";

export const Branch = () => {
  /**
   * table list constants and functions
   */
  let _PAGESIZE = 5;
  const [pageLoader, setPageLoader] = useState(false);

  // table state
  const [searchValue, setsearchValue] = useState('');
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);
  const [listData, setlistData] = useState([]);
  const [companies, setcompanies] = useState([]);
  const [companyGUID, setcompanyGUID] = useState(null);
  const [clickCounter, setclickCounter] = useState(0);

  const handleLoadlistData = () => {
    setPageLoader(true);
    BranchService.getPaginateBranch(searchValue, pageNumber, pageSize, companyGUID)
    .then((resp) => {
      if (resp) {
        setTotalRows(resp.data.total);
        setpageNumber(resp.data.pageNumber);
        setpageSize(resp.data.pageSize);
        setlistData(resp.data.branchList);

        setPageLoader(false);
      }
    });
  }

  const handleCompanies = () => {
    CompanyService.getPaginateCompany("", 1, 100)
    .then((resp) => {
        if (resp) { setcompanies(resp.data.companyList);}
    });
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    handleLoadlistData();
    if (companies !== null) {
      handleCompanies();
    }
  }, [clickCounter]);

  // On click search
  const handleSearch = (event, value) => { 
    setsearchValue(value);
    setpageNumber(1);
    setpageSize(_PAGESIZE);
    setclickCounter(clickCounter + 1);
  }

  // Trigger on search  empty
  const handleSearchEmpty = (event, value) => {
    if (value === "") {
      setsearchValue("");
      setpageNumber(1);
      setpageSize(_PAGESIZE);
      setclickCounter(clickCounter + 1);
    }
  }

  // handle table next page
  const handleChangePage = (event, newPage) => {
    setpageNumber(newPage + 1);
    setclickCounter(clickCounter + 1);
  }

  // handle table change page size
  const handleRowsPerPage = (event) => {
    setpageSize(+event.target.value);
    setpageNumber(1);
    setclickCounter(clickCounter + 1);
  }

  const handleFilterByCompany = event => {
    setcompanyGUID(event.target.getAttribute('data-value'));
    setclickCounter(clickCounter + 1);
  }

  // Add dialog
  const [openAddModal, setAddModal] = React.useState(false);
  const handleAddModalOpen = () => { setAddModal(true); };
  const handleAddModalClose = () => { setAddModal(false); };

  return (
    <div className="div-table">
      <div className="div-container">
        <div className="div-head">
          <h2 className="title">Branch List</h2>
          <Button variant="outlined" size="medium" onClick={ handleAddModalOpen }>
            New Branch <AddIcon />
          </Button>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div style={{display:'flex', gap:'10px', padding:'20px'}}>
            <span style={{marginTop:'5px'}}>Company</span>
            <TextField type="text" sx={{width:'250px'}} defaultValue="" label="Select Company" 
            size="small" onClick={handleFilterByCompany} select>
            <MenuItem value=""><em>Select company</em></MenuItem>
            { 
                (companies.length > 0) ?
                companies.map((item, index) => (
                    <MenuItem key={item.companyId} value={item.companyObjectId}>
                        {item.companyName}
                    </MenuItem>
                ))
                : <MenuItem value=""><em>No data found!</em></MenuItem>
            }
            </TextField>
          </div>
          <div className="div-content" style={{width:'50%'}}>
            <div className="div-search">
              <TableSearchBar handleSearch={handleSearch} handleSearchEmpty={handleSearchEmpty} searchTitle="Search" />
            </div>
          </div>
        </div>
        <BranchList
          listData={listData}
          totalCount={ totalRows }
          rowsPerPage={handleRowsPerPage}
          changePage={ handleChangePage }
          pageNumber = { (pageNumber === 0) ? pageNumber : (pageNumber - 1) }
          pageSize = { pageSize }
          isLoading = { pageLoader }
        />
      </div>

      <AddBranch isOpen={ openAddModal } handleClose={ handleAddModalClose } companies={companies} />
    </div>
  )
}