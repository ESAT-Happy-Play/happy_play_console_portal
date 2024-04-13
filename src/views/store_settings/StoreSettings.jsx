import React, { useState, useEffect } from 'react';
import CustomTab from '../../components/tab/CustomTab';
import CustomVerticalTab from '../../components/tab/CustomVerticalTab';
import StoreLimits from './StoreLimits';
import DeckLimits from './DeckLimits';

import { CompanyGameList } from "../../utils/common/CompanyGameList";
import { ContentLoader } from "../../components/mui";
import { StoreExt } from "../../utils/helpers";
import { GameService } from "../../services";

function StoreSettings() {
  let loginObj = StoreExt.getStore("auth");
  let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

  const [companyGames, setcompanyGames] = useState(null);
  const [companyGuid, setcompanyGuid] = useState(tokenObj.companyId);
  const [pageLoader, setPageLoader] = useState(true);
  const [storeLimits, setstoreLimits] = useState(null);
  const [deckLimits, setdeckLimits] = useState(null);
  const [selectedGameId, setselectedGameId] = useState();

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

  const handleListGames = async () => {
    await CompanyGameList.getGameList().then((res) => {
      setcompanyGuid(res.companyId);

      if (res.gameList.length > 0) {
        setcompanyGames(res.gameList);
        // for new load default company
        setselectedGameId(res.gameList[0].id);
        
        // init needed data
        getStoreLimit(res.gameList[0].id);
      }
      setPageLoader(false);
    });
  }

  useEffect(() => {
    handleListGames();
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
      {
        (tokenObj.role !== "Super Admin")
        ? (companyGames !== null)
        ? <CustomTab changeEvent={handleChangeGame} tabList={tabs} />
        : <div style={{padding:'25px'}}>Loading...Please wait.</div>
        : <div style={{padding:'25px'}}>No company linked to the account.</div>
      }

      <ContentLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default StoreSettings
