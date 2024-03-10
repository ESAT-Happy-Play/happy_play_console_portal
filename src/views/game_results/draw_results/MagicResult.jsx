import React from "react";
import "./magicResult.scss";
import { FormatFullDate, FormatTimeAmPm } from "../../../helper/Helpers";

const MagicResult = ({ drawResult, operatorName }) => {
  const dateString = "May 08, 2023 14:00:00";
  const latestPrizeDate = new Date(dateString);

  return (
    <div className="magic-result-container">
      <div className="results-side">
        <div className="magic-date-container">
          <p>{FormatFullDate(latestPrizeDate)}</p>
          <div className="magic-time-container">
            {FormatTimeAmPm(latestPrizeDate).replace(/\s+/g, "")}
          </div>
        </div>
        <div className="magic-reel">
          {drawResult.split("").map((result, index) => (
            <div className="magic-reel-item" key={index}>
              {result}
            </div>
          ))}
        </div>
        <div className="magic-operator">
          <p>Posted By: {operatorName}</p>
        </div>
      </div>
    </div>
  );
};

export default MagicResult;
