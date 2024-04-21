import React, { useState, useEffect } from 'react';
import CustomTab from '../../components/tab/CustomTab';
import CustomVerticalTab from '../../components/tab/CustomVerticalTab';
import StoreLimits from './StoreLimits';
import DeckLimits from './DeckLimits';
import { TextField, MenuItem  } from "@mui/material";

import { CompanyGameList } from "../../utils/common/CompanyGameList";
import { CompanyList } from "../../utils/common/CompanyList";
import { ContentLoader } from "../../components/mui";
import { StoreExt } from "../../utils/helpers";
import { GameService } from "../../services";

function AdminStoreSettings() {
  let loginObj = StoreExt.getStore("auth");
  let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

  const [companyGames, setcompanyGames] = useState(null);
  const [companyGuid, setcompanyGuid] = useState(tokenObj.companyId);
  const [pageLoader, setPageLoader] = useState(false);
  const [storeLimits, setstoreLimits] = useState(null);
  const [deckLimits, setdeckLimits] = useState(null);
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

  const getStoreLimit = (companySettingId) => {
    setPageLoader(true);
    setselectedGameId(companySettingId);
    GameService.getStoreLimits(companySettingId).then((res) => {
      if (res) { setstoreLimits(res.data);
      } else {
        setstoreLimits({ maxUnitsPrice: 0, maxUnits: 0, maxFavorites: 0, hotCombinationsRange: 0, hotCombinationsRefreshUnits: 0 });
      }
      setPageLoader(false);
    });
  }

  const getDeckLimit = (companySettingId) => {
    setPageLoader(true);
    setselectedGameId(companySettingId);
    GameService.getDeckLimits(companySettingId).then((res) => {
      if (res) { setdeckLimits(res.data);
      } else {
        setdeckLimits({ deckOpenTime: 0, maxDeckUnits: 0 });
      }
      setPageLoader(false);
    });
  }

  const hadleSelectGame = (data) => {
    if (data.includes("90009")) {
      getStoreLimit((data.replace("90009", "")));
    }
    if (data.includes("90010")) {
      getDeckLimit((data.replace("90010", "")));
    }
  }

  const handleChangeGame = (newValue) => {
    getStoreLimit(newValue);
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
        getStoreLimit(res.gameList[0].id);
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

  const tabs = (companyGames !== null) ?
    companyGames.map((game) => {

      var verticalTabs = [
        { label: "Store Limits", itemId: (game.id + "90009"), 
          Component: (storeLimits !== null) 
            ? <StoreLimits storeLimits={storeLimits} settingId={selectedGameId} gameName={game.gameName} /> 
            : <div style={{padding:'25px'}}>Loading...Please wait.</div>
        },
        { label: "Deck Limits", itemId: (game.id + "90010"), 
          Component: (deckLimits !== null) 
            ? <DeckLimits deckLimits={deckLimits} settingId={selectedGameId} gameName={game.gameName} /> 
            : <div style={{padding:'25px'}}>Loading...Please wait.</div>
        },
      ];

      return {
        label: game.gameName,
        itemId: game.id,
        Component:
          <div className="tab-container">
            <div className="tab-header">
              <h1>Configurations</h1>
            </div>
            <CustomVerticalTab
              changeEvent={hadleSelectGame}
              tabList={verticalTabs} />
          </div>
      }
    }) : <div style={{padding:'25px'}}>Loading...Please wait.</div>;

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

      <ContentLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default AdminStoreSettings
