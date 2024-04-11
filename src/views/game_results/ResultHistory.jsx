import React, { useEffect, useState } from 'react';
import "./resultHistory.scss";
// import { FormatFullDate, FormatTimeAmPm } from "../../helper/Helpers";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { DateExt, ConstArrayExt } from "../../utils/helpers";
import ResultHistoryDialog from './dialog/ResultHistoryDialog';

const ResultHistory = ({ resultDate, drawTime, result, winners, theme }) => {
  // const dateString = "May 08, 2023 14:00:00";
  // const mockDate = new Date(dateString);
  const [showHistory, setshowHistory] = useState(false);
  const [resultData, setresultData] = useState({
    date: DateExt.readableDateShort(resultDate),
    time: ConstArrayExt.getConvertToTime(parseInt(drawTime.split(":")[0])),
    result: result,
    winners: winners
  });

  return (
    <>
      <div onClick={() => setshowHistory(true)}
        className={
          theme === "light"
            ? "result-history-container-light"
            : "result-history-container"
        }
      >
        <div className={theme === "light" ? "date-time-light" : "date-time"}>
          <div>{DateExt.readableDateShort(resultDate)}</div>
          <div className="history-time-container">
            {ConstArrayExt.getConvertToTime(parseInt(drawTime.split(":")[0]))}
          </div>
        </div>
        <div className={theme === "light" ? "draw-result-light" : "draw-result"}>
          {result}
        </div>
        <div className={theme === "light" ? "winners-light" : "winners"}>
          ({winners} {theme === "light" ? "Bets" : "Winners"}){" "}
          <ArrowForwardIosIcon
            sx={{
              color:
                theme === "light" ? "dark-grey" : "rgba(255, 255, 255, 0.623)",
            }}
          />
        </div>
      </div>
      <ResultHistoryDialog data={resultData} open={showHistory} onClose={() => setshowHistory(false)} theme={theme} />
    </>
  );
};

export default ResultHistory;
