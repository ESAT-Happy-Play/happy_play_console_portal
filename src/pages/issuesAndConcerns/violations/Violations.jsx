import "./violations.scss";

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

import { TextField, MenuItem, Button } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GETFetch } from "../../../api/ApiFetchBuilder";
import PageLoader from "../../../components/widget/PageLoader";

import { GetStoreObject } from "../../../helper/Helpers";

import CustomTab from "../../../components/tab/CustomTab"
import { Card } from "../../../components/card/Card";

const Violations = () => {
  const [pageLoader, setPageLoader] = useState(false);

  const tabs = ["On-Going", "History"];
  const [reportType, setreportType] = useState(0);
  const selectReportType = (newValue) => {
    setreportType(newValue);
  }

  return (
    <div className="content">
      <CustomTab 
        changeEvent={selectReportType}
        tabList={
          tabs.map((label) => ({
            label: label,
            Component: 
              <div className="div-result">
                <Card
                  style={{flex:2}}
                  header={null}
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

                      <div>
                        Voilations Table
                      </div>
                    </div>
                  }
                />
              </div>
          }))
        }
      />
      
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default Violations
