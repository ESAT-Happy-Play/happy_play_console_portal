import React, { useState, useEffect } from 'react';
import { gamePrizes } from "../../helper/mocks";
import CustomVerticalTab from "../../components/tab/CustomVerticalTab";
import CustomTab from "../../components/tab/CustomTab";
import "./gamePrizes.scss";
import PrizePool from "./PrizePool";
import Winners from "./Winners";
import Regular from "./Regular";

import { CompanyGameList } from "../../utils/common/CompanyGameList";
import { StoreExt } from "../../utils/helpers";
import { ContentLoader } from "../../components/mui";

function DefaultGamePrizes() {

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

  const tabs = (companyGames !== null) ?
    companyGames.map((game) => {
    const verticalTabs = [];
    if (game.child) {
      game.child.forEach((subType) => {
        if (subType.gameName === "Regular") {
          verticalTabs.push({
            label: subType.gameName,
            itemId: subType.id,
            Component: <Regular companyGameId={subType.id} />,
          });
        } else {
          verticalTabs.push({
            label: subType.gameName,
            itemId: subType.id,
            isHeader: true,
          });
          verticalTabs.push({
            label: "Prize Pool",
            itemId: (subType.id + "90001"),
            Component: (
              <PrizePool
                prizePool={[{
                  prizeAmount: 0
                }]}
                gameName={game.gameName}
                subtypeName={subType.gameName}
              />
            ),
          });
          verticalTabs.push({
            label: "Winners",
            itemId: (subType.id + "90002"),
            Component: (
              <Winners
                winners={[{
                  amountWon: 0
                }]}
                gameName={game.gameName}
                subtypeName={subType.gameName}
              />
            ),
          });
        }
      });
    }
    return {
      label: game.gameName,
      itemId: game.id, 
      Component: (
        <div className="tab-container">
          <div className="tab-header">
            <h1>Winners</h1>
          </div>
          <CustomVerticalTab changeEvent={handleVerticalChange} tabList={verticalTabs} />
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

export default DefaultGamePrizes;
