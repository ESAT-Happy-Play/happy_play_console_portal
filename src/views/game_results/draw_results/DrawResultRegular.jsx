import React from "react";
import "./drawResultRegular.scss";
import { getGameLogo } from "../../../helper/logos";
import CrownIcon from "../../../assets/icons/CrownIcon.png";

import { DateExt } from "../../../utils/helpers";

const DrawResultRegular = ({ operatorName, lastDrawResult }) => {

  const generateResultDigits = (result) => {
    var digits = result.map((e, index) =>
      <p className="reel-digit" key={index}>{e}</p>
    );
    return [<div className="reel-container" key={1}>
      {digits}
    </div>]

  }
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
          {
            (lastDrawResult !== null)
              ?
              generateResultDigits(lastDrawResult.drawResult.split("-"))
              :
              generateResultDigits(("7-7-7").split("-"))
          }
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
