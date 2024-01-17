import "./salesreport.scss";
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem  } from "@mui/material";
import { toast } from 'react-toastify';

import CustomTab from "../../../components/tab/CustomTab";
import { GETFetch } from "../../../api/ApiFetchBuilder";
import PageLoader from "../../../components/widget/PageLoader";
import { DrawTypes } from "../../../helper/Enums";
import SalesList from "../../../components/table/sales/SalesList";

import SalesChart from "../../../components/chart/SalesChart";

const SalesReport = () => {
  const [pageLoader, setPageLoader] = useState(false);

  const [salesList, setsalesList] = React.useState([]);
  const [tabsVal, settabsVal] = useState(0);

  const [overAllSales, setoverAllSales] = React.useState([]);
  const [salesPerDay, setsalesPerDay] = React.useState([]);
  // const [salesPerDraw, setsalesPerDraw] = React.useState([]);

  const handleSalesData = async () => {
    // setPageLoader(true);
    let url = `${process.env.REACT_APP_API_URL}/reportings/sales/overall`;
    let response = await GETFetch(url);
    // setPageLoader(false);

    if (response.status) {
      setoverAllSales(response.data.overAllSales)
      setsalesPerDay(response.data.salesPerDay.slice(-7))
      // setsalesPerDraw(response.data.salesPerDraw)

      let salesPerDrawObjKeys = Object.keys(response.data.salesPerDraw);
      let filaArry = [];
      salesPerDrawObjKeys.forEach((item, i) => {
        let arryVal = response.data.salesPerDraw[item];
        let newObj = { day: item, pm1: 0, pm2: 0, pm3: 0, pm4: 0, pm5: 0, pm6: 0, pm7: 0, pm8: 0, pm9: 0, pm10: 0, pm11: 0, id: i };
        arryVal.forEach((item1, j) => {
          if(item1.drawType === "1PM") {
            newObj.pm1 = item1.totalGross
          } else if (item1.drawType === "2PM") {
            newObj.pm2 = item1.totalGross
          } else if (item1.drawType === "3PM") {
            newObj.pm3 = item1.totalGross
          } else if (item1.drawType === "4PM") {
            newObj.pm4 = item1.totalGross
          } else if (item1.drawType === "5PM") {
            newObj.pm5 = item1.totalGross
          } else if (item1.drawType === "6PM") {
            newObj.pm6 = item1.totalGross
          } else if (item1.drawType === "7PM") {
            newObj.pm7 = item1.totalGross
          } else if (item1.drawType === "8PM") {
            newObj.pm8 = item1.totalGross
          } else if (item1.drawType === "9PM") {
            newObj.pm9 = item1.totalGross
          } else if (item1.drawType === "10PM") {
            newObj.pm10 = item1.totalGross
          } else {
            newObj.pm11 = item1.totalGross
          }
        });
        filaArry.push(newObj);
      });
      setsalesList(filaArry);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    // execute every 5 mins
    const intervalId = setInterval(() => {
      handleSalesData().then();
    }, 5000);

    console.log(intervalId);
  }, [tabsVal]);
  
  // const tabs = ["Overall", "Company", "Branch", "Master Agent", "Agent", "Player"];
  const tabs = ["Overall"];
  const fetchResults = (newValue) => {
    settabsVal(newValue);
  }

  const handleSelect = (val) => {
    console.log(val);
  }

  return (
    <div className="sales-report">
      <CustomTab
          changeEvent={fetchResults}
          tabList={
            tabs?.map((label) => (
              {label:label, 
                Component: 
                <div className="tab-container" style={{padding:'20px'}}>
                  <div className="header-actions">
      
                    <div className="dateSearch">

                      <div className="row" style={{justifyContent:'space-evenly'}}>
                        <div style={{width:'100%'}}>
                          <div className="charts">
                            <SalesChart title="Last 7 Days (Sales)" objData={salesPerDay} aspect={2 / 1} />
                          </div>
                        </div>
                        <div>
                          <div className="div-overallparent">
                            <div className="div-overall div-color1">
                              <b>{(overAllSales.length > 0) ? overAllSales[0].totalGross : "..."}</b>
                              <span>Gross Sales</span>
                            </div>

                            <div className="div-overall div-color2">
                              <b>{(overAllSales.length > 0) ? overAllSales[0].totalNet : "..."}</b>
                              <span>Net Sales</span>
                            </div>
                          </div>
                          <div className="div-overallparent">
                            <div className="div-overall div-color3">
                              <b>{(overAllSales.length > 0) ? overAllSales[0].totalCommissionDistributed : "..."}</b>
                              <span>Distributed Commission</span>
                            </div>

                            <div className="div-overall div-color4">
                              <b>{(overAllSales.length > 0) ? overAllSales[0].totalWinnings : "..."}</b>
                              <span>Distributed Winning</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>

                  <SalesList SearchResults={ salesList } isLoading = { pageLoader }/>
                </div>
              }
              ))
          }/>
      <PageLoader isLoadingPage={ pageLoader } />

      {/* <div className="col-8">

        <div className="row">
          <div className="labelTitle">
            <span>Game Type</span>
          </div>
          <div className="col-8">
            <TextField 
              onChange={e => handleSelect(e, e.target.value) }
              label="Select game type" style={{ minWidth: "250px" }} defaultValue="" variant="outlined" size="small" select>
              <MenuItem value=''><em>Select game type</em></MenuItem>
              <MenuItem value='01'>Regular</MenuItem>
              <MenuItem value='02'>Jackpot 3.3</MenuItem>
              <MenuItem value='03'>Jackpot 3.4</MenuItem>
            </TextField>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default SalesReport
