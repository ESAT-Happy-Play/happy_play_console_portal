import "./branch.scss"

import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";

import AddBranch from "../../../components/Dialog/forms/AddBranch";
import BranchSearchBar from "../../../components/table/branchList/BranchSearchBar";
import BranchList from "../../../components/table/branchList/BranchList";
import PageLoader from "../../../components/widget/PageLoader";
import { toast } from 'react-toastify';

const Branch = () => {

  let _PAGESIZE = 5;
  const [pageLoader, setPageLoader] = useState(true);

  // Branch table state
  const [BranchSearchValue, setBranchSearchValue] = useState('');
  const [BranchPageNumber, setBranchPageNumber] = useState(0);
  const [totalBranchRows, setTotalBranchRows] = useState(0);
  const [BranchPageSize, setBranchPageSize] = useState(_PAGESIZE);
  const [branches, setBraches] = useState([]);

  // On click search Branch
  const handleBranchSearch = (event, value) => { 
    setBranchSearchValue(value);
    setBranchPageNumber(0);
    setBranchPageSize(_PAGESIZE);
    setPageLoader(true);
  }

  // Trigger on search Branch empty
  const handleBranchSearchEmpty = (event, value) => {
    if (value === "") {
      setBranchSearchValue("");
      setBranchPageNumber(0);
      setBranchPageSize(_PAGESIZE);
      setPageLoader(true);
    }
  }

  // handle Branch table next page
  const handleBranchChangePage = (event, newPage) => {
    setBranchPageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle Branch table change page size
  const handleBranchRowsPerPage = (event) => {
    setBranchPageSize(+event.target.value);
    setBranchPageNumber(0);
    setPageLoader(true);
  }

    // Add branch dialog
  const [openAddBranch, setAddBranch] = React.useState(false);
  const handleAddBranchOpen = () => { setAddBranch(true); };
  const handleAddBranchClose = () => { setAddBranch(false); };
  const handleAddCallback = () => {
    setPageLoader(true);
    setTotalBranchRows(totalBranchRows + 1);
  }

  return (
    <div className="branch">
      <div className="container">
        <div className="top">
          <h2 className="title">LIST OF ALL BRANCH</h2>
          <Button variant="contained" size="large" onClick={ handleAddBranchOpen }>
            New Branch <AddIcon />
          </Button>
        </div>

        <div className="content">
          <br/>
          <div className="right">
              <div className="search">
                  <BranchSearchBar handleBranchSearch={ handleBranchSearch } handleBranchSearchEmpty={ handleBranchSearchEmpty } />
              </div>
              <br/>
              <BranchList BranchSearchResults={ branches }
                  totalCount={ totalBranchRows }
                  BranchRowsPerPage={ handleBranchRowsPerPage }
                  pageNumber = { (BranchPageNumber === 0) ? BranchPageNumber : (BranchPageNumber - 1) }
                  pageSize = { BranchPageSize }
                  BranchChangePage={ handleBranchChangePage } 
              />
          </div>
        </div>

      </div>

      <AddBranch isOpenAddBranch={ openAddBranch } handleCloseAddBranch={ handleAddBranchClose }
      handleCallback={handleAddCallback} />
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default Branch
