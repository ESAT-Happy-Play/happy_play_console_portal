import React, { useEffect, useState } from 'react';
import ResultCard from "./ResultCard";
import CustomTab from "../../components/tab/CustomTab";
import { TextField, MenuItem  } from "@mui/material";
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
import { CompanyList } from "../../utils/common/CompanyList";
import { GameService, DrawService } from '../../services'

function AdminGameResult() {
  let loginObj = StoreExt.getStore("auth");
  let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

  const [pageLoader, setPageLoader] = useState(false);
  const [companyGames, setcompanyGames] = useState(null);
  const [pendingDrawResults, setpendingDrawResults] = useState(null);
  const [currentBetSchedule, setcurrentBetSchedule] = useState(null);

  const [lastDrawResult, setlastDrawResult] = useState(null);
  const [lastMagicDrawResult, setlastMagicDrawResult] = useState(null);
  const [resultHistory, setresultHistory] = useState(null);
  const [magicResultHistory, setmagicResultHistory] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingMagic, setIsEditingMagic] = useState(false);

  const [selectedCompanyGameId, setselectedCompanyGameId] = useState("");

  const [compObjId, setcompObjId] = useState("");
  const [companies, setcompanies] = useState([]);
  const handleFilterByCompany = async event => {
    let companyObjId = event.target.getAttribute('data-value');
    if (companyObjId !== null) {
      setcompObjId(companyObjId);
      await handleListGames(companyObjId);
    }
  }

  const handleChangeGame = async (newValue) => {
    setPageLoader(true);
    setselectedCompanyGameId(newValue);
    // init all pending draws
    let drawResults = await handlePendingDrawResult(newValue);
    setpendingDrawResults(drawResults);

    // init very latest dra result
    let latestResult = await handleLastDrawResult(newValue);
    setlastDrawResult(latestResult.data);

    // init results history
    let resultHistory = await handleResultHistory(newValue);
    setresultHistory(resultHistory.data.data);

    setPageLoader(false);
  }

  const handlePendingDrawResult = (companyGameId) => {
    return new Promise((resolve, reject) => {
      GameService.getDrawBacklogs(companyGameId).then((resp) => {
        if (resp.status && resp.data.length > 0) {
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
          // return resolve(pendingDraws.sort((a, b) => a.id - b.id));
          return resolve(pendingDraws);
        } else {
          return resolve([]);
        }
      })
    });
  }

  const handleLastDrawResult = (companyGameId, drawResultType = 0) => {
    return new Promise((resolve, reject) => {
      DrawService.getLatestDraw(companyGameId, drawResultType).then((res) => {
        return resolve(res);
      })
    });
  }

  const handleCurretBet = (companyGameId) => {
    return new Promise((resolve, reject) => {
      DrawService.getCurrentBetSchedule(companyGameId).then((res) => {
        if (res.success) {
          let item = res.data;
          return resolve([{
            id: item.id,
            companyId: item.companyId,
            companyGame: item.companyGame,
            date: item.date,
            drawTime: item.endCutOff, // please update for Api final
            endCutOff: item.endCutOff,
            gameDrawType: item.gameDrawType
          }]);
        } else {
          return resolve([]);
        }
      })
    });
  }

  const handleResultHistory = (companyGameId, magicResult = false) => {
    return new Promise((resolve, reject) => {
      DrawService.getDrawResultHistory(companyGameId, magicResult).then((res) => {
        return resolve(res);
      })
    });
  }

  const handleRegularResultLoad = async () => {
    setPageLoader(true);
    let allPendingDraw = await handlePendingDrawResult(selectedCompanyGameId);
    setpendingDrawResults(allPendingDraw);

    if (allPendingDraw.length > 0) {
      setselectedCompanyGameId(selectedCompanyGameId);
      let allResults = await Promise.all([
        handleLastDrawResult(selectedCompanyGameId),
        handleResultHistory(selectedCompanyGameId)
      ]);

      setlastDrawResult(allResults[0].data);
      setresultHistory(allResults[1].data.data);
    }
    setPageLoader(false);
  }

  const handleMagicResultLoad = async () => {
    setPageLoader(true);
    let allResults = await Promise.all([
      handleLastDrawResult(selectedCompanyGameId, 1),
      handleResultHistory(selectedCompanyGameId, true),
      handleCurretBet(selectedCompanyGameId)
    ]);

    setlastMagicDrawResult(allResults[0].data);
    setmagicResultHistory(allResults[1].data.data);
    setcurrentBetSchedule(allResults[2]);
    setPageLoader(false);
  }

  const handleListGames = async (compObjId) => {
    setPageLoader(true);
    let companyGameList = await CompanyGameList.getGameList(compObjId, true);
    setcompanyGames(companyGameList.gameList);

    if (companyGameList.gameList.length > 0) {
      let allPendingDraw = await handlePendingDrawResult(companyGameList.gameList[0].id);
      setpendingDrawResults(allPendingDraw);

      setselectedCompanyGameId(companyGameList.gameList[0].id);
      let allResults = await Promise.all([
        handleLastDrawResult(companyGameList.gameList[0].id),
        handleLastDrawResult(companyGameList.gameList[0].id, 1),
        handleResultHistory(companyGameList.gameList[0].id),
        handleResultHistory(companyGameList.gameList[0].id, true),
        handleCurretBet(companyGameList.gameList[0].id)
      ]);

      setlastDrawResult(allResults[0].data);
      setlastMagicDrawResult(allResults[1].data);

      setresultHistory(allResults[2].data.data);
      setmagicResultHistory(allResults[3].data.data);
      setcurrentBetSchedule(allResults[4]);
    }

    setPageLoader(false);
  }

  useEffect(() => {
    // handleListGames();
    CompanyList.getCompanyList().then((res) => {
      setcompanies(res.companyList);
    });
  }, []);

  const tabs = (companyGames !== null && companyGames !== undefined) 
    ? (companyGames.length > 0)
    ? companyGames.map((game) => {
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
                  operatorName={loginObj.fullname}
                  lastDrawResult={lastDrawResult}
                />
              ) : (
                <DrawResultJackpot
                  lastDrawResult={lastDrawResult}
                  operatorName={loginObj.fullname}
                  gameName={game.gameName}
                />
              )
            }
            editDrawResult={
              game.gameName === "Regular" ? (
                <EditRegularResult
                  drawResult={"A-A-A"}
                  gameType={game.gameName}
                  gameSubType={game.gameName}
                  pendingResultData={pendingDrawResults}
                  onClickPost={() => {
                    setIsEditing((prev) => !prev);
                    handleRegularResultLoad();
                  }}
                  onClickCancel={() => setIsEditing((prev) => !prev)}
                />
              ) : (
                <EditJackpotResult
                  drawResult={game.gameName == "Jackpot 3.3" ? "10-7-7-S-H-S" : "10-7-7-S-H-S-C"}
                  gameType={game.gameName}
                  gameSubType={game.gameName}
                  pendingResultData={pendingDrawResults}
                  onClickPost={() => {
                    setIsEditing((prev) => !prev);
                    handleRegularResultLoad();
                  }}
                  onClickCancel={() => setIsEditing((prev) => !prev)}
                />
              )
            }
            resultsHistory={resultHistory}
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
              pendingResultData={pendingDrawResults}
              drawResult={
                <MagicResult
                  // drawResult={"A29"}
                  lastDrawResult={lastMagicDrawResult}
                  operatorName={loginObj.fullname}
                />
              }
              editDrawResult={
                <EditMagicResult
                  drawResult={"A-A-A"}
                  operatorName={loginObj.fullname}
                  pendingResultData={currentBetSchedule}
                  onClickPost={() => {
                    setIsEditingMagic((prev) => !prev);
                    handleMagicResultLoad();
                  }}
                  onClickCancel={() => setIsEditingMagic((prev) => !prev)}
                />
              }
              resultsHistory={magicResultHistory}
              resultsHistoryTheme="light"
              isEditing={isEditingMagic}
              onClickPost={() => setIsEditingMagic((prev) => !prev)}
            />
          )}
        </div>
      ),
    };
  }) : <></> : <></>;

  return (
    <div className="container">
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

      <ContentLoader isLoadingPage={pageLoader} />
    </div>
  );
}

export default AdminGameResult;
