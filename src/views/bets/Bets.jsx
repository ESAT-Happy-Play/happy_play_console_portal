import React from "react";
import CustomTab from "../../components/tab/CustomTab";
import "./bets.scss";
import { mockBetsHistory } from "../../helper/mocks";
import CustomVerticalTab from "../../components/tab/CustomVerticalTab";
import BetsTable from "./BetsTable";

function Bets() {
  const tabs = mockBetsHistory.map((game) => {
    const verticalTabs = [];
    if (game.child) {
      game.child.forEach((subType) => {
        verticalTabs.push({
          label: subType.subTypeName,
          Component: (
            <BetsTable
              data={subType.data}
              gameName={game.gameName}
              subTypeName={subType.subTypeName}
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
            <h1>Game Bet History</h1>
          </div>
          {game.child ? (
            <CustomVerticalTab tabList={verticalTabs} />
          ) : (
            <BetsTable data={game.data} gameName={game.gameName} />
          )}
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

export default Bets;
