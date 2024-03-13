import React from "react";
import "./drawResultJackpot.scss";
import { FormatFullDate, FormatTimeAmPm } from "../../../helper/Helpers";
import { getGameLogo } from "../../../helper/logos";
import CrownIcon from "../../../assets/icons/CrownIcon.png";

const DrawResultJackpot = ({ drawResult, operatorName, gameName }) => {
  const dateString = "February 24, 2023 14:00:00";
  const latestPrizeDate = new Date(dateString);
  return (
    <div className="draw-result-container">
      <div className="jackpot-results">
        <div className="result-game-header">
          <div className="result-date-container">
            <p>{FormatFullDate(latestPrizeDate)}</p>
            <div className="time-container">
              {FormatTimeAmPm(latestPrizeDate).replace(/\s+/g, "")}
            </div>
          </div>
          <div className="game-type-item">
            {getGameLogo(gameName, gameName, 100)}
            <div className="amount">
              <p>10</p>
              <img src={CrownIcon} width={15} alt="crown" />
            </div>
          </div>
        </div>
        <div className="jackpot-reel">
          <div>{drawResult}</div>
        </div>
        <div className="operator">
          <p>Postedssxczxzasdz By: {operatorName}</p>
        </div>
      </div>
    </div>
  );
};

export default DrawResultJackpot;
