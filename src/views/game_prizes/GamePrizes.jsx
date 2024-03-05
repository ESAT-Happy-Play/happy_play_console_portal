import React from "react";
import { gamePrizes } from "../../helper/mocks";
import CustomVerticalTab from "../../components/tab/CustomVerticalTab";
import CustomTab from "../../components/tab/CustomTab";
import "./gamePrizes.scss";
import PrizePool from "./PrizePool";
import Winners from "./Winners";

function GamePrizes() {
  const tabs = gamePrizes.map((game) => {
    const verticalTabs = [];
    if (game.gameName === "Regular Game") {
      verticalTabs.push({
        label: "Regular",
        isHeader: false,
        Component: <></>,
      });
    }
    if (game.child) {
      game.child.forEach((subType) => {
        verticalTabs.push({
          label: subType.subGameName,
          isHeader: true,
        });
        verticalTabs.push({
          label: "Prize Pool",
          Component: (
            <PrizePool
              prizePool={subType.prizePool}
              gameName={game.gameName}
              subtypeName={subType.subGameName}
            />
          ),
        });
        verticalTabs.push({
          label: "Winners",
          Component: (
            <Winners
              winners={subType.winners}
              gameName={game.gameName}
              subtypeName={subType.subGameName}
            />
          ),
        });
      });
    }
    return {
      label: game.gameName,
      Component: (
        <div className="tab-container">
          <div className="tab-header">
            <h1>Game Prizes</h1>
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
