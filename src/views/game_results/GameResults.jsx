import React, { useEffect, useState } from 'react';
import ResultCard from "./ResultCard";
import CustomTab from "../../components/tab/CustomTab";
// import { companyGames } from "../../helper/mocks";
import "./gameResults.scss";
import { COLORS } from "../../helper/colors";
import DrawResultRegular from "./draw_results/DrawResultRegular";
import DrawResultJackpot from "./draw_results/DrawResultJackpot";
import MagicResult from "./draw_results/MagicResult";
import EditRegularResult from "./edit/EditRegularResult";
import EditJackpotResult from "./edit/EditJackpotResult";
import EditMagicResult from "./edit/EditMagicResult";

import { StoreExt, DateExt } from "../../utils/helpers";
import { ContentLoader } from "../../components/mui";
import { CompanyGameList } from "../../utils/common/CompanyGameList";
import { GameService, DrawService } from '../../services'

function GameResults() {
  let loginObj = StoreExt.getStore("auth");
  let tokenObj = StoreExt.getDecodeJWT(loginObj.token);
  // tokenObj.companyId

  const [pageLoader, setPageLoader] = useState(true);
  const [companyGames, setcompanyGames] = useState(null);
  const [pendingDrawResults, setpendingDrawResults] = useState(null);
  const [lastDrawResult, setlastDrawResult] = useState(null);

  const resultsHistory = ["4-3-3", "4-3-3", "4-3-3", "4-3-3"];
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingMagic, setIsEditingMagic] = useState(false);

  const handleChangeGame = async (newValue) => {
    setPageLoader(true);
    let drawResults = await handlePendingDrawResult(newValue);
    setpendingDrawResults(drawResults);
    setPageLoader(false);
  }

  const handlePendingDrawResult = (companyGameId) => {
    return new Promise((resolve, reject)=> {
      GameService.getDrawBacklogs(companyGameId).then((resp) => {
        if(resp.status && resp.data.length > 0) {
          let pendingDraws = [];
          let lastDate = resp.data[0].date;
          resp.data.filter(obj => obj.date === lastDate).map((item) => {
            pendingDraws.push({
              id: item.id, 
              companyId: item.companyId,
              companyGame: item.companyGame,
              date: item.date,
              drawTime: item.drawTime,
              endCutOff: item.endCutOff,
              gameDrawType: item.gameDrawType
            });
          })
          return resolve(pendingDraws.sort((a, b) => a.id - b.id));
        }
      })
    });
  }

  const handleLastDrawResult = (companyGameId) => {
    return new Promise((resolve, reject)=> {
      DrawService.getLatestDraw(companyGameId).then((res) => {
        return resolve(res);
      })
    });
  }

  const handleListGames = async () => {
    setPageLoader(true);
    await CompanyGameList.getGameList().then((res) => {
      if (res.gameList.length > 0) {
        setcompanyGames(res.gameList);

        // int pending draw result
        handlePendingDrawResult(res.gameList[0].id).then((resp) => {
          setpendingDrawResults(resp);
        });

        // init latest draw result
        handleLastDrawResult(res.gameList[0].id).then((resp) => {
          setlastDrawResult(resp.data);
        });
      }
      setPageLoader(false);
    });
  }

  useEffect(() => {
    handleListGames();
  }, []);

  const tabs = (companyGames !== null) ? companyGames.map((game) => {
    return {
      label: game.gameName,
      itemId: game.id,
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
            pendingResultData={pendingDrawResults}
            drawResult={
              game.gameName === "Regular" ? (
                <DrawResultRegular
                  // drawResult={"A29"}
                  operatorName={"Operator Name"}
                  lastDrawResult={lastDrawResult}
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
                  pendingResultData={pendingDrawResults}
                  onClickPost={() => setIsEditing((prev) => !prev)}
                  onClickCancel={() => setIsEditing((prev) => !prev)}
                />
              ) : (
                <EditJackpotResult
                  drawResult={"A29 SHS"}
                  gameType={game.gameName}
                  gameSubType={game.gameName}
                  pendingResultData={pendingDrawResults}
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
  }) : <></>;

  return (
    <div className="container">
      {
        (companyGames !== null) 
        ? <CustomTab changeEvent={handleChangeGame} tabList={tabs} />
        : <div style={{ padding:'25px' }}>Loading...Please wait.</div>
      }

      <ContentLoader isLoadingPage={ pageLoader } />
    </div>
  );
}

export default GameResults;
