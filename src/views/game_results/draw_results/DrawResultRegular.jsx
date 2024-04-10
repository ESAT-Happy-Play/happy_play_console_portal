import React from "react";
import "./drawResultRegular.scss";
import { getGameLogo } from "../../../helper/logos";
import CrownIcon from "../../../assets/icons/CrownIcon.png";

import { DateExt } from "../../../utils/helpers";

const DrawResultRegular = ({ operatorName, lastDrawResult }) => {
  return (
    <div className="draw-result-container">
      <div className="results-side">
        <div className="result-date-container">
          {
            (lastDrawResult !== null) ?
            <>
              <p>{DateExt.readableDateShort(lastDrawResult.resultDate)}</p>
              <div className="time-container">
                {lastDrawResult.drawSchedule}
              </div>
            </>
            : <></>
          }
        </div>
        <div className="reel">
          <div>
            { 
              (lastDrawResult !== null) 
              ? lastDrawResult.drawResult.split("-").join("").toString().replace(/\d{3}(?=.)/g, '$& ')
              : ("0-0-0").split("-").join("").toString().replace(/\d{3}(?=.)/g, '$& ')
            }
          </div>
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
