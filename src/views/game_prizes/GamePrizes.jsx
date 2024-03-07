import React from "react";
import { gamePrizes } from "../../helper/mocks";
import CustomVerticalTab from "../../components/tab/CustomVerticalTab";
import CustomTab from "../../components/tab/CustomTab";
import "./gamePrizes.scss";
import PrizePool from "./PrizePool";
import Winners from "./Winners";
import Regular from "./Regular";

function GamePrizes() {
  const tabs = gamePrizes.map((game) => {
    const verticalTabs = [];
    if (game.child) {
      game.child.forEach((subType) => {
        if (subType.subTypeName === "Regular") {
          verticalTabs.push({
            label: subType.subTypeName,
            Component: <Regular />,
          });
        } else {
          verticalTabs.push({
            label: subType.subTypeName,
            isHeader: true,
          });
          verticalTabs.push({
            label: "Prize Pool",
            Component: (
              <PrizePool
                prizePool={subType.prizePool}
                gameName={game.gameName}
                subtypeName={subType.subTypeName}
              />
            ),
          });
          verticalTabs.push({
            label: "Winners",
            Component: (
              <Winners
                winners={subType.winners}
                gameName={game.gameName}
                subtypeName={subType.subTypeName}
              />
            ),
          });
        }
      });
    }
    return {
      label: game.gameName,
      Component: (
        <div className="tab-container">
          <div className="tab-header">
            <h1>Winners</h1>
          </div>
          <CustomVerticalTab tabList={verticalTabs} />
        </div>
      ),
    };
  });

  return (
    <div className="container">
      <CustomTab tabList={tabs} />
    </div>
  );
}

export default GamePrizes;
