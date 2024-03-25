import React, { useState, useEffect } from 'react';
import CustomTab from '../../components/tab/CustomTab';
import CustomVerticalTab from '../../components/tab/CustomVerticalTab';
import StoreLimits from './StoreLimits';
import DeckLimits from './DeckLimits';

import { ContentLoader } from "../../components/mui";
import { StoreExt } from "../../utils/helpers";
import { GameService } from "../../services";

function StoreSettings() {
  let loginObj = StoreExt.getStore("auth");
  let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

  const [companyGames, setcompanyGames] = useState(null);
  const [pageLoader, setPageLoader] = useState(false);
  const [storeLimits, setstoreLimits] = useState(null);
  const [deckLimits, setdeckLimits] = useState(null);
  const [selectedSettingId, setselectedSettingId] = useState();

  const listGames = () => {
    setPageLoader(true);
    GameService.getCompanyGameSettings(tokenObj.companyId).then((res) => {
      if(res.status) {
        let gameIds = res.data.map(m => m.gameId);
        GameService.getAllGameList().then((res1) => {
          let listOfCompanyGames = res1.data.filter((item) => gameIds.includes(item.id));

          let objCompanies = [];
          listOfCompanyGames.forEach(item => {
            // push parent
            if(item.gameMechanics.isParent) {
              objCompanies.push({
                gameName: item.name,
                id: item.id,
                child: [{ gameName: item.name, id: item.id }]
              });
            } else {
              let parentCompany = objCompanies.filter(obj => obj.id === item.gameMechanics.parentId);
              if (parentCompany.length > 0) {
                let parentIndex = objCompanies.findIndex(obj => obj.id === parentCompany[0].id);

                //Update child
                objCompanies[parentIndex].child.push({ gameName: item.name, id: item.id });
              }
            }
          });

          setcompanyGames(objCompanies);
          getStoreLimit(objCompanies[0].id);
          setselectedSettingId(objCompanies[0].id);

          setPageLoader(false);
        });
      } else { setPageLoader(false); }
    });
  }

  const getStoreLimit = (companySettingId) => {
    setPageLoader(true);
    setselectedSettingId(companySettingId);
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
    setselectedSettingId(companySettingId);
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

  useEffect(() => {
    listGames();
  }, []);

  const tabs = (companyGames !== null) ?
    companyGames.map((game) => {

      var verticalTabs = [
        { label: "Store Limits", itemId: (game.id + "90009"), 
          Component: (storeLimits !== null) 
            ? <StoreLimits storeLimits={storeLimits} settingId={selectedSettingId} gameName={game.gameName} /> 
            : <div style={{padding:'25px'}}>Loading...Please wait.</div>
        },
        { label: "Deck Limits", itemId: (game.id + "90010"), 
          Component: (deckLimits !== null) 
            ? <DeckLimits deckLimits={deckLimits} settingId={selectedSettingId} gameName={game.gameName} /> 
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
        (companyGames !== null) 
        ? <CustomTab changeEvent={handleChangeGame} tabList={tabs} />
        : <div style={{padding:'25px'}}>Loading...Please wait.</div>
      }

      <ContentLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default StoreSettings
