import React from "react";
import "./drawResultRegular.scss";
import { FormatFullDate, FormatTimeAmPm } from "../../../helper/Helpers";
import { getGameLogo } from "../../../helper/logos";
import CrownIcon from "../../../assets/icons/CrownIcon.png";

const DrawResultRegular = ({ operatorName, lastDrawResult }) => {
  const dateString = "May 08, 2023 14:00:00";
  const latestPrizeDate = new Date(dateString);
  return (
    <div className="draw-result-container">
      <div className="results-side">
        <div className="result-date-container">
          {
            (lastDrawResult !== null) ?
            <>
              <p>{lastDrawResult.resultDate}</p>
              <div className="time-container">
                {lastDrawResult.drawSchedule}
              </div>
            </>
            : <></>
          }
        </div>
        <div className="reel">
          <div>{ (lastDrawResult !== null) ? lastDrawResult.drawResult.split("-").join("") : "777"}</div>
        </div>
        <div className="operator">
          <p>Posted By: {operatorName}</p>
        </div>
      </div>
      <div className="game-types-side">
        <div className="game-type-item">
          {getGameLogo("Regular Game", "Regular", 100)}
          <div className="amount">
            <p>10</p>
            <img src={CrownIcon} width={15} alt="crown" />
          </div>
        </div>
        <div className="game-type-item">
          {getGameLogo("Regular Game", "Power Win", 100)}
          <div className="amount">
            <p>10</p>
            <img src={CrownIcon} width={15} alt="crown" />
          </div>
        </div>
        <div className="game-type-item">
          {getGameLogo("Regular Game", "Tripple Win", 100)}
          <div className="amount">
            <p>10</p>
            <img src={CrownIcon} width={15} alt="crown" />
          </div>
        </div>
        <div className="game-type-item">
          {getGameLogo("Regular Game", "Magic Win", 100)}
          <div className="amount">
            <p>10</p>
            <img src={CrownIcon} width={15} alt="crown" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawResultRegular;
