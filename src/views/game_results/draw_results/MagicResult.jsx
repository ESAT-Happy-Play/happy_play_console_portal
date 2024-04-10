import React from "react";
import "./magicResult.scss";

import { DateExt } from "../../../utils/helpers";

const MagicResult = ({ operatorName, lastDrawResult }) => {
  // const dateString = "May 08, 2023 14:00:00";
  // const latestPrizeDate = new Date(dateString);

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
            (lastDrawResult !== null) ? 
              <>
                {
                  lastDrawResult.drawResult.split("-").map((result, index) => (
                    <div className="magic-reel-item" key={index}>
                      {result}
                    </div>
                  ))
                }
              </>
            : <>
              {
                ("0-0-0").split("-").map((result, index) => (
                  <div className="magic-reel-item" key={index}>
                    {result}
                  </div>
                ))
              }
            </>
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
