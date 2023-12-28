import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import RegisteredPlayerList from '../../../components/table/registeredPlayers/RegisteredPlayerList';
import RegisteredPlayerSearchBar from '../../../components/table/registeredPlayers/RegisteredPlayerSearchBar';

const Players = () => {
  let _PAGESIZE = 5;
  const [pageLoader, setPageLoader] = useState(false);

  // table state
  const [SearchValue, setSearchValue] = useState('');
  const [PageNumber, setPageNumber] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [PageSize, setPageSize] = useState(_PAGESIZE);
  
  const [agentsList, setAgentsList] = useState([]);
  
  // On click search
  const handleSearch = (event, value) => { 
    setSearchValue(value);
    setPageNumber(0);
    setPageSize(_PAGESIZE);
    setPageLoader(true);
  }

  // Trigger on search empty
  const handleSearchEmpty = (event, value) => {
    if (value === "") {
      setSearchValue("");
      setPageNumber(0);
      setPageSize(_PAGESIZE);
      setPageLoader(true);
    }
  }

  // handle table next page
  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle table change page size
  const handleRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPageNumber(0);
    setPageLoader(true);
  }

  return (
    <div className="content">
      <div  className="container">
        <div className="top">
          <h2 className="title">LIST OF REGISTERED PLAYERS</h2>
        </div>
        <div className="row p-15">
          <div className="col-12">
            <RegisteredPlayerSearchBar handleSearch={ handleSearch } handleSearchEmpty={ handleSearchEmpty } />
          </div>
        </div>

        <div className="row p-15">
          <div className="col-12">
            <RegisteredPlayerList
            SearchResults={ agentsList }
            ChangePage = { handleChangePage }
            RowsPerPage = { handleRowsPerPage }
            pageNumber = { (PageNumber === 0) ? PageNumber : (PageNumber - 1) }
            pageSize = { PageSize } 
            totalCount = { totalRows }
            loading = { pageLoader } />
          </div>
        </div>

      </div>
      
      {/* <PageLoader isLoadingPage={ pageLoader } /> */}
    </div>
  )
}

export default Players
