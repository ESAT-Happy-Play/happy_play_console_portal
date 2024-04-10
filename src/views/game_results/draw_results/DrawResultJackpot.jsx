import React from "react";
import "./drawResultJackpot.scss";
import { getGameLogo } from "../../../helper/logos";
import CrownIcon from "../../../assets/icons/CrownIcon.png";

import { DateExt } from "../../../utils/helpers";

const DrawResultJackpot = ({ operatorName, gameName, lastDrawResult }) => {
  // const dateString = "February 24, 2023 14:00:00";
  const latestPrizeDate = new Date();
  return (
    <div className="draw-result-container">
      <div className="jackpot-results">
        <div className="result-game-header">
          <div className="result-date-container">
            {
            (lastDrawResult !== null) ?
            <>
              <p>{DateExt.readableDateShort(lastDrawResult.resultDate)}</p>
              <div className="time-container">
                {lastDrawResult.drawSchedule}
              </div>
            </>
            : <>
              <p>{DateExt.readableDateShort(latestPrizeDate)}</p>
              <div className="time-container"></div>
            </>
            }
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
          <div>
            { 
              (lastDrawResult !== null) 
              ? lastDrawResult.drawResult.split("-").join("").toString().replace(/\d{3}(?=.)/g, '$& ')
              : ("7-7-7-A-A-A").split("-").join("").toString().replace(/\d{3}(?=.)/g, '$& ')
            }
          </div>
        </div>
        <div className="operator">
          <p>Posted By: 
            {
              (lastDrawResult !== null) ? operatorName : ""
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default DrawResultJackpot;
