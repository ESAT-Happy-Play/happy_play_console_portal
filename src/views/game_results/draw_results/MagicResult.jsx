import React from "react";
import "./magicResult.scss";

import { DateExt } from "../../../utils/helpers";

const MagicResult = ({ operatorName, lastDrawResult }) => {
  // const dateString = "May 08, 2023 14:00:00";
  // const latestPrizeDate = new Date(dateString);

  const generateResultDigits = (result) => {
    var digits = result.map((e, index) =>
      <p className="magic-reel-item" key={index}>{e}</p>
    );
    return digits

  }

  return (
    <div className="magic-result-container">
      <div className="results-side">
        <div className="magic-date-container">
          {
            (lastDrawResult !== null) ?
              <>
                <p>{DateExt.readableDateShort(lastDrawResult.resultDate)}</p>
                <div className="magic-time-container">
                  {lastDrawResult.drawSchedule}
                </div>
              </>
              : <><p>{DateExt.readableDateShort(new Date())}</p></>
          }
        </div>
        <div className="magic-reel">
          {
            (lastDrawResult !== null)
              ?
              generateResultDigits(lastDrawResult.drawResult.split("-"))
              :
              generateResultDigits(("10-7-7").split("-"))
          }
        </div>
        <div className="magic-operator">
          <p>Posted By: {operatorName}</p>
        </div>
      </div>
    </div>
  );
};

export default MagicResult;
