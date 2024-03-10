import React, { useState } from "react";
import ResultCard from "./ResultCard";
import CustomTab from "../../components/tab/CustomTab";
import { companyGames } from "../../helper/mocks";
import "./gameResults.scss";
import { COLORS } from "../../helper/colors";
import DrawResultRegular from "./draw_results/DrawResultRegular";
import DrawResultJackpot from "./draw_results/DrawResultJackpot";
import MagicResult from "./draw_results/MagicResult";
import EditRegularResult from "./edit/EditRegularResult";
import EditJackpotResult from "./edit/EditJackpotResult";
import EditMagicResult from "./edit/EditMagicResult";

function GameResults() {
  const resultsHistory = ["4-3-3", "4-3-3", "4-3-3", "4-3-3"];
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingMagic, setIsEditingMagic] = useState(false);

  const tabs = companyGames.map((game) => {
    return {
      label: game.gameName,
      Component: (
        <div className="game-results-container">
          <ResultCard
            headerTitle={isEditing ? "Post Draw Result" : "Latest Draw Result"}
            headerTitleColor={COLORS.yellow}
            headerColor={COLORS.maroon}
            borderColor={COLORS.yellow}
            postButtonLabel="Post Draw Result"
            postButtonLabelColor={COLORS.darkGrey}
            postButtonColor={COLORS.yellow}
            hasBackground={true}
            hasSubHeading={true}
            drawResult={
              game.gameName === "Regular" ? (
                <DrawResultRegular
                  drawResult={"A29"}
                  operatorName={"Operator Name"}
                />
              ) : (
                <DrawResultJackpot
                  drawResult={"A29 SHS"}
                  operatorName={"Operator Name"}
                  gameName={game.gameName}
                />
              )
            }
            editDrawResult={
              game.gameName === "Regular" ? (
                <EditRegularResult
                  drawResult={"A29"}
                  gameType={game.gameName}
                  gameSubType={game.gameName}
                  onClickPost={() => setIsEditing((prev) => !prev)}
                  onClickCancel={() => setIsEditing((prev) => !prev)}
                />
              ) : (
                <EditJackpotResult
                  drawResult={"A29 SHS"}
                  gameType={game.gameName}
                  gameSubType={game.gameName}
                  onClickPost={() => setIsEditing((prev) => !prev)}
                  onClickCancel={() => setIsEditing((prev) => !prev)}
                />
              )
            }
            resultsHistory={resultsHistory}
            isEditing={isEditing}
            onClickPost={() => setIsEditing((prev) => !prev)}
          />
          {game.gameName === "Regular" && (
            <ResultCard
              headerTitle={
                isEditingMagic ? "Post Magic Draw" : "Latest Magic Result"
              }
              headerTitleColor="blue"
              borderColor="lightGray"
              postButtonLabel="Post Magic Result"
              postButtonColor={COLORS.violetMain}
              drawResult={
                <MagicResult
                  drawResult={"A29"}
                  operatorName={"Operator Name"}
                />
              }
              editDrawResult={
                <EditMagicResult
                  drawResult={"A29"}
                  operatorName={"Operator Name"}
                  onClickPost={() => setIsEditingMagic((prev) => !prev)}
                  onClickCancel={() => setIsEditingMagic((prev) => !prev)}
                />
              }
              resultsHistory={resultsHistory}
              resultsHistoryTheme="light"
              isEditing={isEditingMagic}
              onClickPost={() => setIsEditingMagic((prev) => !prev)}
            />
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

export default GameResults;
