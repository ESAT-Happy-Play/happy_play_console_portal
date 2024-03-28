import React, { useState, useEffect } from 'react';
import CustomTab from "../../components/tab/CustomTab";
import "./bets.scss";
// import { mockBetsHistory } from "../../helper/mocks";
import CustomVerticalTab from "../../components/tab/CustomVerticalTab";
import BetsTable from "./BetsTable";

import { CompanyGameList } from "../../utils/common/CompanyGameList";
import { StoreExt } from "../../utils/helpers";
import { ContentLoader } from "../../components/mui";
import { GameService } from "../../services";

function Bets() {
  let loginObj = StoreExt.getStore("auth");
  let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

  const [pageLoader, setPageLoader] = useState(true);
  const [companyGames, setcompanyGames] = useState(null);
  const [companyGuid, setcompanyGuid] = useState(tokenObj.companyId);
  const [selectedGameId, setselectedGameId] = useState(null);

  const handleChangeGame = (newValue) => {
    console.log(newValue);
  }

  const handleVerticalChange = (newValue) => {
    console.log(newValue);
  }

  const handleListGames = async () => {
    await CompanyGameList.getGameList().then((res) => {
      setcompanyGuid(res.companyId);

      if (res.gameList.length > 0) {
        setcompanyGames(res.gameList);
        // for new load default company
        setselectedGameId(res.gameList[0].id);
      }
      setPageLoader(false);
    });
  }

  useEffect(() => {
    handleListGames();
  }, []);

  const tabs = (companyGames !== null) ? companyGames.map((game) => {
    const verticalTabs = [];
    if (game.child) {
      game.child.forEach((subType) => {
        verticalTabs.push({
          label: subType.gameName,
          itemId: subType.id,
          Component: (
            <BetsTable
              data={[]}
              gameName={game.gameName}
              subTypeName={subType.gameName}
            />
          ),
        });
      });
    }
    return {
      label: game.gameName,
      itemId: game.id, 
      Component: (
        <div className="tab-container">
          <div className="tab-header">
            <h1>Game Bet History</h1>
          </div>
          {game.child ? (
            <CustomVerticalTab changeEvent={handleVerticalChange} tabList={verticalTabs} />
          ) : (
            <BetsTable data={[]} gameName={game.gameName} />
          )}
        </div>
      ),
    };
  }) : <div style={{padding:'25px'}}>Loading...Please wait.</div>;

  return (
    <div className="container">
      {
        (companyGames !== null) 
        ? <CustomTab changeEvent={handleChangeGame} tabList={tabs} />
        : <div style={{padding:'25px'}}>Loading...Please wait.</div>
      }

      <ContentLoader isLoadingPage={ pageLoader } />
    </div>
  );
}

export default Bets;
