import "./cagent.scss";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { GETFetch } from "../../../../api/ApiFetchBuilder";

import AdminAgentList from "../../../../components/table/adminAgent/AdminAgentList";
import AdminAgentSearchBar from "../../../../components/table/adminAgent/AdminAgentSearchBar";
import { GetStoreObject } from "../../../../helper/Helpers";

const AccountAgent = () => {
  let loginObj = GetStoreObject("auth");

  /**
   * constants and functions
   */
  let _PAGESIZE = 10;
  const [pageLoader, setPageLoader] = useState(false);

  const [agentSearchValue, setagentSearchValue] = useState('');
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);
  const [agents, setagents] = useState([]);

  const handleAgentData = async () => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_API_URL}/agents?rowsperpage=${pageSize}&pagenumber=${pageNumber}&companyid=${loginObj.companyId}&branchcode=${loginObj.branchCode}&agentsearch=${agentSearchValue}`;
     
    let response = await GETFetch(url);
    setPageLoader(false);

    if(response.status) {
      setagents(response.data.agents);

      setTotalRows(response.data.totalRows);
      setpageNumber(response.data.currentPage);
      setpageSize(response.data.rowsPerPage);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    handleAgentData();
  }, [pageNumber, agentSearchValue, pageSize, totalRows]);

  // On click search
  const handleMasterAgentSearch = (event, value) => { 
    setagentSearchValue(value);
    setpageNumber(1);
    setpageSize(_PAGESIZE);
  }

  // Trigger on search empty
  const handleMasterAgentSearchEmpty = (event, value) => {
    if (value === "") {
      setagentSearchValue("");
      setpageNumber(1);
      setpageSize(_PAGESIZE);
    }
  }

  // handle table next page
  const handleAgentChangePage = (event, newPage) => {
    setpageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle table change page size
  const handleAgentRowsPerPage = (event) => {
    setpageSize(+event.target.value);
    setpageNumber(1);
    setPageLoader(true);
  }

  return (
    <div className="cagentPage">
      <div className="container">
        <div className="top">
          <h2 className="title">LIST OF AGENTS</h2>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div></div>
          <div className="bottom" style={{ minWidth: "450px" }}>
            <div className="search">
              <AdminAgentSearchBar handleSearch={ handleMasterAgentSearch } handleSearchEmpty={ handleMasterAgentSearchEmpty } />
            </div>
          </div>
        </div>

        <AdminAgentList 
          searchResults={ agents }
          totalCount={ totalRows }
          RowsPerPage={ handleAgentRowsPerPage }
          pageNumber = { (pageNumber === 0) ? pageNumber : (pageNumber - 1) }
          pageSize = { pageSize }
          ChangePage={ handleAgentChangePage }
          isLoading = { pageLoader }
        />
      </div>
    </div>
  )
}

export default AccountAgent
