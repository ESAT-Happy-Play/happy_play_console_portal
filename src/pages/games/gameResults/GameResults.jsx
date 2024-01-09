import "./gameresults.scss";
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem  } from "@mui/material";
import { toast } from 'react-toastify';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GetStoreObject } from "../../../helper/Helpers";
import CustomTab from "../../../components/tab/CustomTab";
import { Card } from "../../../components/card/Card";
import { ResultsTable } from "./ResultTable";

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

  const results = ["1","2","6"];
  const resultsJ3 = ["2","8","3",  "K", "J", "Q"];
  const resultsJ4 = ["9",  "7", "6", "K", ,"A","J", "Q"];

  const tabs = ["Regular", "Jackpot 3.3", "Jackpot 3.4"];

  const [resultList, setResultList] = useState(results);

  const fetchResults = (newValue) => {
    if (newValue == 0)
      setResultList(results);
    else if (newValue == 1)
      setResultList(resultsJ3);
    else
      setResultList(resultsJ4);
  }

  return (
    <div className="content">
      <CustomTab 
        changeEvent={fetchResults}
        tabList={
          tabs.map((label) => ({
            label: label,
            Component: 
              <div className="div-result">
                <Card
                  style={{flex:1.2}}
                  header={"Latest Result"}
                  actions={
                    <Button onClick={() => {}} variant="outline" className="post-button" size="large">
                      Post Result <EditOutlinedIcon />
                    </Button>
                  }
                  body={
                    <div className="result-div">
                      <h1>{resultList.slice(0,3).join("-")}</h1>
                      {resultList.length > 3 && 
                        <h1>{resultList?.slice(3).join("-")}</h1>
                      }
                      <h2>October 8, 2023</h2>
                      <h2>1PM</h2>
                      <p>Posted by: Operator Name</p>
                    </div>
                  }
                />
                <Card
                  style={{flex:2}}
                  header={"RESULT HISTORY"}
                  body={
                    <div>
                      <div className="dateSearch">
                        <div className="row">
                          <div className="row">
                            <div className="labelTitle">
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
                      </div>
                      <ResultsTable/>
                    </div>
                  }
                />
              </div>
          }))
        }
      />
      {/* <PageLoader isLoadingPage={ pageLoader } /> */}
    </div>
  );
}

export default GameResults
