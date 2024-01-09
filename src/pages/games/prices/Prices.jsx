import "./prices.scss";
import React, { useState, useEffect } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Card } from "../../../components/card/Card";
import { Button } from "@mui/material";
import CustomTab from "../../../components/tab/CustomTab";

const Prices = () => {
  let _PAGESIZE = 10;

  const [multiplier, setMultiplier] = React.useState(700);
  const [percentage, setPercentage] = React.useState(10);
  const [prize, setPrize] = useState(3250800)
  const [combinations, setCombinations] = React.useState(70);
  const [totalRows, setTotalRows] = useState(10);
  const [PageSize, setPageSize] = useState(_PAGESIZE);

  const [pageLoader, setPageLoader] = useState(true);
  const [gameTypeList, setGameTypeList] = React.useState([]);

  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: "Regular",
      Component: 
      <div className="div-multiplier">
        <Card
          header={"Winning Multiplier"}
          actions={
            <Button onClick={()=> {}} variant="outline" className="edit-button" size="large">
              Edit <EditOutlinedIcon />
            </Button>}
          body={
            <div className="mult-body">
              <h1>{multiplier}</h1>
              <p>Winning equivalent per 1 peso bet</p>
            </div>
          }
        />
    </div>
    },
    {
      label: "Jackpot 3.3",
      Component:
      <div className="div-multiplier">
        <Card
          header={"Gross Percentage"}
          actions={
            <Button onClick={()=> {}} variant="outline" className="edit-button" size="large">
              Change <EditOutlinedIcon />
            </Button>}
          body={
            <div className="mult-body">
              <h1>{percentage}%</h1>
              <p>Gross percentage as prize increment</p>
            </div>
          }
        />
        <Card
          style={{flex:2}}
          header={"Current Prize"}
          body={
            <div className="mult-body">
              <h1>{prize}</h1>
              <p>May 08, 2023  <b>2PM</b></p>
            </div>
          }
        />
      </div>
    },
    {
      label: "Jackpot 3.4",
      Component: 
      <div className="div-multiplier">
        <Card
          header={"Gross Percentage"}
          actions={
            <Button onClick={()=> {}} variant="outline" className="edit-button" size="large">
              Change <EditOutlinedIcon />
            </Button>}
          body={
            <div className="mult-body">
              <h1>{percentage}%</h1>
              <p>Gross percentage as prize increment</p>
            </div>
          }
        />
        <Card
          style={{flex:2}}
          header={"Current Prize"}
          body={
            <div className="mult-body">
              <h1>{prize}</h1>
              <p>May 08, 2023  <b>2PM</b></p>
            </div>
          }
        />
      </div>
    }
  ];
  const handleCallBackRefresh = () => {
    setPageLoader(true);
    setTotalRows(totalRows + 1);
  }

  return (
    <div className="content">
      <CustomTab 
        tabList={tabs}
      />
      {/* <PageLoader isLoadingPage={ pageLoader } /> */}
    </div>
  )
}

export default Prices
