import React, { useState, useEffect } from 'react';
import { mockLimitCombination } from '../../helper/mocks';
import CustomVerticalTab from '../../components/tab/CustomVerticalTab';
import CustomTab from '../../components/tab/CustomTab';
import { TextField, MenuItem  } from "@mui/material";

import './mechanicsSettings.scss';
import BetLimits from './BetLimits';
import BetPrice from './BetPrice';
import PrizeCalculations from './PrizeCalculations';
import LimitCombinationTable from './LimitCombinationTable';

import { CompanyGameList } from "../../utils/common/CompanyGameList";
import { CompanyList } from "../../utils/common/CompanyList";
import { ContentLoader } from "../../components/mui";
import { StoreExt } from "../../utils/helpers";
import { GameService } from "../../services";

const AdminMechanicsSettings = () => {
  let loginObj = StoreExt.getStore("auth");
  let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

  const [pageLoader, setPageLoader] = useState(false);
  const [companyGames, setcompanyGames] = useState(null);
  const [companyGuid, setcompanyGuid] = useState(tokenObj.companyId);

  const [betLimitConfig, setbetLimitConfig] = useState(null);
  const [prizeCalcDataConfig, setprizeCalcDataConfig] = useState(null);
  const [betPrizeConfig, setbetPrizeConfig] = useState(null);
  const [selectedGameId, setselectedGameId] = useState();

  const [compObjId, setcompObjId] = useState("");
  const [companies, setcompanies] = useState([]);

  const handleFilterByCompany = async event => {
    let companyObjId = event.target.getAttribute('data-value');
    if (companyObjId !== null) {
      setPageLoader(true);
      setcompObjId(companyObjId);
      await handleListGames(companyObjId);
      setPageLoader(false);
    }
  }

  const getBetLimits = (companySettingId) => {
    setPageLoader(true);
    setselectedGameId(companySettingId);
    GameService.getBetLimits(companySettingId).then((res) => {
      if (res) {
        setbetLimitConfig(res.data)
      } else {
        setbetLimitConfig({ betEntryLimit: 0, betAmountLimit: 0, uniqueCombination: 0 });
      }
      setPageLoader(false);
    });
  }

  const getPrizeCalc = (companySettingId) => {
    setPageLoader(true);
    setselectedGameId(companySettingId);
    GameService.getPrizeCalculations(companySettingId).then((res) => {
      if (res) {
        setprizeCalcDataConfig(res.data);
      } else {
        setprizeCalcDataConfig({
          pooling: { prizeFloor: 0, prizeCeiling: 0, incrementAmount: 0 },
          enableQuasi: true,
          consecutiveWins: 0,
          winningMultiplier: { minAmount: 0, winPerBet: 0 }
        });
      }
      setPageLoader(false);
    });
  }

  const getBetPrices = (companySettingId) => {
    setPageLoader(true);
    setselectedGameId(companySettingId);
    GameService.getBetPrices(companySettingId).then((res) => {
      if (res) {
        setbetPrizeConfig(res.data)
      } else {
        setbetPrizeConfig({ amount: 0, isFixed: true });
      }
      setPageLoader(false);
    });
  }

  const handleChangeGame = (newValue) => {
    getBetLimits(newValue);
  }

  const hadleSelectGame = (data) => {
    if (data.includes("90009")) {
      getBetLimits((data.replace("90009", "")));
    }
    if (data.includes("90010")) {
      console.log("Limit Per Combination " + (data.replace("90010", "")));
    }
    if (data.includes("90011")) {
      getBetPrices((data.replace("90011", "")));
    }
    if (data.includes("90012")) {
      getPrizeCalc((data.replace("90012", "")));
    }
  }

  const handleListGames = async (compObjId) => {
    setPageLoader(true);
    await CompanyGameList.getGameList(compObjId, true).then((res) => {
      setcompanyGuid(res.companyId);

      if (res.gameList.length > 0) {
        setcompanyGames(res.gameList);
        // for new load default company
        setselectedGameId(res.gameList[0].id);

        // init needed data
        getBetLimits(res.gameList[0].id);
      } else {
        setcompanyGames([]);
      }
      setPageLoader(false);
    });
  }

  useEffect(() => {
    // handleListGames();
    CompanyList.getCompanyList().then((res) => {
      setcompanies(res.companyList);
    });
  }, []);

  const getSubTypeTabs = (subType) => {
    return [
      {
        label: "Bet Limit", itemId: (subType.id + "90009"),
        Component: (betLimitConfig !== null) ? <BetLimits bitLimitData={betLimitConfig} settingId={selectedGameId} subType={subType} /> : <>Loading...Please wait.</>
      },
      {
        label: "Limit Per Combination", itemId: (subType.id + "90010"),
        Component: <LimitCombinationTable data={[]} type={subType.gameName} settingId={selectedGameId} subType={subType} />
      },
      {
        label: "Bet Price", itemId: (subType.id + "90011"),
        Component: <BetPrice betPriceData={betPrizeConfig} settingId={selectedGameId} subType={subType} />
      },
      {
        label: "Prize Calculations", itemId: (subType.id + "90012"),
        Component: <PrizeCalculations prizeCalcData={prizeCalcDataConfig} settingId={selectedGameId} subType={subType} />
      }
    ]
  }

  const tabs = (companyGames !== null) ?
    companyGames.map((game) => {

      var verticalTabs = [];
      if (game.child?.length > 1)
        game.child.forEach((subtype) => {
          verticalTabs.push({ label: subtype.gameName, itemId: 11111110, isHeader: true });
          verticalTabs.push(...getSubTypeTabs(subtype));
        });
      else
        verticalTabs.push(...getSubTypeTabs(game.child[0]));

      return {
        label: game.gameName,
        itemId: game.id,
        Component:
          <div className="tab-container">
            <div className="tab-header">
              <h1>Game Configurations</h1>
            </div>
            <CustomVerticalTab
              changeEvent={hadleSelectGame}
              tabList={verticalTabs} />
          </div>
      }
    }) : <></>;

  return (
    <div className='container'>
        <div className="search" style={{borderBottom:'2px solid #e3e3e3', padding:'15px', marginBottom:'15px'}}>
            <TextField type="text" sx={{width:'200px'}} defaultValue={compObjId}
            label="Select Company" size="small" onClick={handleFilterByCompany} select>
            <MenuItem value=""><em>Select company</em></MenuItem>
            { 
                (companies.length > 0) ?
                companies.map((item, index) => (
                    <MenuItem key={item.companyId} data-obj={item.companyObjectId} value={item.companyObjectId}>
                        {item.companyName}
                    </MenuItem>
                ))
                : <MenuItem value=""><em>No data found!</em></MenuItem>
            }
            </TextField>
        </div>
      {
        (companyGames !== null && companyGames !== undefined)
        ? (companyGames.length > 0)
        ? <CustomTab changeEvent={handleChangeGame} tabList={tabs} />
        : <div style={{ padding:'25px' }}>No available game for the selected company</div>
        : <div style={{ padding:'25px' }}>Please select company.</div>
      }
      <ContentLoader isLoadingPage={pageLoader} />
    </div>
  )
}

export default AdminMechanicsSettings
