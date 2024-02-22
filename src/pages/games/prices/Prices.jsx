import "./prices.scss";
import React, { useState, useEffect } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Card } from "../../../components/card/Card";
import { Button } from "@mui/material";
import CustomTab from "../../../components/tab/CustomTab";
import { GETFetch } from "../../../api/ApiFetchBuilder";
import { toast } from 'react-toastify';
import WinningMultiplierDialogs from "../../../components/Dialog/WinningMultiplierDialogs";
import GrossDialogs from "../../../components/Dialog/GrossDialogs";

const Prices = () => {
  let _PAGESIZE = 10;

  const [multiplier, setMultiplier] = React.useState(700);
  const [gross, setGross] = React.useState(50);
  const [jackPot33, setJackPot33] = React.useState({});
  const [jackPot34, setjackPot34] = React.useState({});
  const [combinations, setCombinations] = React.useState(70);
  const [totalRows, setTotalRows] = useState(10);
  const [PageSize, setPageSize] = useState(_PAGESIZE);

  const [pageLoader, setPageLoader] = useState(true);
  const [winningOpen, setWinningOpen] = useState(false);
  const [grossOpen, setGrossOpen] = useState(false);

  const [gameTypeList, setGameTypeList] = React.useState([]);

  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getRegularWinningPrice = async () => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_API_URL}/gamesettings/winningsettings/regularwinmultiplier`;
    let response = await GETFetch(url);

    if (response.status) {
      setMultiplier(response.data.winMultiplier);
      console.log(response.data.success)
    }

    if (!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  const getJackpotWinningPrice = async (gameType) => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_API_URL}/gamesettings/winningsettings/jackpot?gametype=${gameType}`;
    let response = await GETFetch(url);

    if (response.status) {
      if (gameType == '02') {
        if (!!response.data.jackpotWinningSettings) {
          setJackPot33(response.data.jackpotWinningSettings);
        }
      }

      if (gameType == '03') {
        if (!!response.data.jackpotWinningSettings) {
          setjackPot34(response.data.jackpotWinningSettings);
        }
      }

      console.log(response.data.success)
    }

    if (!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  useEffect(() => {
    getRegularWinningPrice();
    getJackpotWinningPrice('02');
    getJackpotWinningPrice('03');
  }, []);

  const tabs = [
    {
      label: "Regular",
      Component:
        <div className="div-multiplier">
          <Card
            header={"Winning Multiplier"}
            actions={
              <Button onClick={() => { setWinningOpen(true) }} variant="outline" className="edit-button" size="large">
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
              <Button onClick={() => { setGrossOpen(true) }} variant="outline" className="edit-button" size="large">
                Change <EditOutlinedIcon />
              </Button>}
            body={
              <div className="mult-body">
                <h1>{jackPot33.jackpotPercentage}%</h1>
                <p>Gross percentage as prize increment</p>
              </div>
            }
          />
          <Card
            style={{ flex: 2 }}
            header={"Current Prize"}
            body={
              <div className="mult-body">
                <h1>{jackPot33.jackpotAmount}</h1>
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
              <Button onClick={() => { setGrossOpen(true) }} variant="outline" className="edit-button" size="large">
                Change <EditOutlinedIcon />
              </Button>}
            body={
              <div className="mult-body">
                <h1>{jackPot34.jackpotPercentage}%</h1>
                <p>Gross percentage as prize increment</p>
              </div>
            }
          />
          <Card
            style={{ flex: 2 }}
            header={"Current Prize"}
            body={
              <div className="mult-body">
                <h1>{jackPot34.jackpotAmount}</h1>
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
      <WinningMultiplierDialogs isOpen={winningOpen} setOpen={setWinningOpen} value={multiplier} />
      <GrossDialogs isOpen={grossOpen} setOpen={setGrossOpen} value={jackPot33.jackpotPercentage || 100} />
    </div>
  )
}

export default Prices
