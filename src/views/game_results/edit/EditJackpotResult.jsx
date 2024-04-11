import React, { useState } from "react";
import "./editJackpotResult.scss";
import { FormatFullDate, FormatTimeAmPm } from "../../../helper/Helpers";
import { getGameLogo } from "../../../helper/logos";
import EditIcon from "../../../assets/icons/EditIcon";
import DrawResultDialog from "../dialog/DrawResultDialog";

import { DateExt } from "../../../utils/helpers";

const EditJackpotResult = ({
  drawResult,
  gameType,
  gameSubType,
  onClickPost,
  onClickCancel,
  pendingResultData
}) => {

  const [newResult, setnewResult] = useState(drawResult);
  // const dateString = "May 08, 2023 14:00:00";
  // const latestPrizeDate = new Date(dateString);
  const buttonLabels = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "S",
    "H",
    "C",
    "D",
  ];

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const toggleDialog = () => {
    if (newResult.length > 6) { setShowConfirmDialog((prev) => !prev); }
  };

  const handleClickNumber = (resultNumber) => {
    let nwResult = newResult;
    console.log((nwResult.match(/-/g) || []).length);
    if ((nwResult.match(/-/g) || []).length === 5) { nwResult = ""; }

    if (nwResult === "") {
      setnewResult(resultNumber);
    } else {
      setnewResult(nwResult + "-" + resultNumber);
    }
    
  }

  return (
    <>
      <div className="draw-result-container">
        <div className="results-side">
          <div className="result-date-container">
            {
              (pendingResultData !== null) && (pendingResultData.length > 0) ?
              <>
                <p>{ DateExt.readableDateShort(pendingResultData[0].date) }</p>
                <div className="time-container">
                  { 
                    (parseInt(pendingResultData[0].drawTime.split(":")[0]) === 0) ? 12 
                    : parseInt(pendingResultData[0].drawTime.split(":")[0]) 
                  }
                  {DateExt.formatTime(pendingResultData[0].endCutOff).split(" ")[1]}
                </div>
              </>
              : <>Loading...</>
            }
          </div>
          <div className="jackpot-reel">
            <div>{newResult.split("-").join("").toString().replace(/\d{3}(?=.)/g, '$& ')}</div>
          </div>
          <div className="operator">
            {getGameLogo(gameType, gameSubType, 100)}
          </div>
        </div>
      </div>
      <div className="coin-buttons-container">
        <div className="coin-buttons">
          {buttonLabels.map((button, index) => (
            <div className="jackpot-button-item" onClick={e => handleClickNumber(button) } key={index}>
              {button}
            </div>
          ))}
        </div>
      </div>
      <div className="buttons-footer">
        <button className="cancel-button" onClick={onClickCancel}>
          <div>{"Cancel"}</div>
        </button>
        <button className="post-button" onClick={toggleDialog}>
          <div className="button-label">
            {"Post"}
            <EditIcon size={10} />
          </div>
        </button>
      </div>
      <DrawResultDialog
        open={showConfirmDialog}
        pendingResultData={pendingResultData}
        newResult={newResult}
        onClose={toggleDialog}
        onSubmit={() => {
          onClickPost();
          toggleDialog();
        }}
        combination={
          <div className="jackpot-reel">
            <div>{newResult.split("-").join("").toString().replace(/\d{3}(?=.)/g, '$& ')}</div>
          </div>
        }
        gameName={gameType}
      />
    </>
  );  
};

export default EditJackpotResult;
