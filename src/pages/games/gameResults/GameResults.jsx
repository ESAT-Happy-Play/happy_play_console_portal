import "./gameresults.scss";
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem  } from "@mui/material";
import { toast } from 'react-toastify';

import GameResultsList from "../../../components/table/gameResults/GameResultsList";
import { GetStoreObject } from "../../../helper/Helpers";

const GameResults = () => {
  // auth api response object
  let storeObj = GetStoreObject("auth");
  // storeObj.companyObjId
  // storeObj.branchId
  // storeObj.isMain
  // storeObj.accountObjectId
  // storeObj.branchName

  const [pageLoader, setPageLoader] = React.useState(false);

  let _PAGESIZE = 5;
  // const [SearchValue, setSearchValue] = React.useState('');
  const [PageNumber, setPageNumber] = React.useState(0);
  const [totalRows, setTotalRows] = React.useState(0);
  const [PageSize, setPageSize] = React.useState(_PAGESIZE);

  // const [getDrawHistoryResults] = useGetDrawHistoryResultsMutation();
  const [resultsList, setResultsList] = React.useState([]);
  const [branchId, setbranchId] = React.useState(storeObj.branchId);

    // handle company table next page
  const handleGameResultsChangePage = async (event, newPage) => {
    setPageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle company table change page size
  const handleGameResultsRowsPerPage = async (event) => {
    setPageSize(+event.target.value);
    setPageNumber(0);
    setPageLoader(true);
  }

  return (
    <div className="content">
      <div  className="container">
        <div className="row p-15">
          <div className="col-5">
            <div className="row">
              <div className="col-4 labelTitle">
                <span>Game Type</span>
              </div>
              <div className="col-8">
                <TextField 
                  sx={{ width: "200px" }}  defaultValue="Regular" variant="outlined" size="small" select>
                  <MenuItem value=''><em>Select game type</em></MenuItem>
                  <MenuItem value='Regular'>Regular</MenuItem>
                  <MenuItem value='Jackpot 4-6'>Jackpot 4-6</MenuItem>

                  </TextField>
              </div>
            </div>

            <div className="row">
              <div className="col-4 labelTitle">
                <span>Draw Schedule</span>
              </div>
              <div className="col-8">
                <TextField 
                  sx={{ width: "200px" }}  defaultValue="1PM" variant="outlined" size="small" select>
                  <MenuItem value=''><em>Select draw schedule</em></MenuItem>
                  <MenuItem value='1PM'>1PM</MenuItem>
                  <MenuItem value='2PM'>2PM</MenuItem>
                  <MenuItem value='3PM'>3PM</MenuItem>
                  </TextField>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="row">
              <div className="col-4 labelTitle">
                <span>Date From</span>
              </div>
              <div className="col-8">
                <TextField
                  type="date"
                  sx={{ width: "200px" }}  variant="outlined" size="small" />
              </div>
            </div>
            <div className="row">
              <div className="col-4 labelTitle">
                <span>Date To</span>
              </div>
              <div className="col-8">
                <TextField
                  type="date"
                  sx={{ width: "200px" }}  variant="outlined" size="small" />
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="row">
              <div className="col-12 txtright">
                <Button variant="contained" color="success">
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="row p-15">
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <GameResultsList 
                  SearchResults={ resultsList }
                  ChangePage = { handleGameResultsChangePage }
                  RowsPerPage = { handleGameResultsRowsPerPage }
                  pageNumber = { (PageNumber === 0) ? PageNumber : (PageNumber - 1) }
                  pageSize = { PageSize } 
                  totalCount = { totalRows }
                  loading ={ pageLoader }/>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* <PageLoader isLoadingPage={ pageLoader } /> */}
    </div>
  );
}

export default GameResults
