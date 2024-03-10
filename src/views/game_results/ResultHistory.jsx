import React from "react";
import "./resultHistory.scss";
import { FormatFullDate, FormatTimeAmPm } from "../../helper/Helpers";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ResultHistory = ({ result, winners, theme }) => {
  const dateString = "May 08, 2023 14:00:00";
  const mockDate = new Date(dateString);
  return (
    <div
      className={
        theme === "light"
          ? "result-history-container-light"
          : "result-history-container"
      }
    >
      <div className={theme === "light" ? "date-time-light" : "date-time"}>
        <div>{FormatFullDate(mockDate)} </div>
        <div className="history-time-container">
          {FormatTimeAmPm(mockDate).replace(/\s+/g, "")}
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
  );
};

export default ResultHistory;
