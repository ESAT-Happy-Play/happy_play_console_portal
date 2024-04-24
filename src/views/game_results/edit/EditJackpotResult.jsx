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
  const [cardIndex, setCardIndex] = useState(0);
  const [suiteIndex, setSuiteIndex] = useState(3);
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

  const generateResultDigits = (result) => {
    var digits = result.map((e, index) =>
      <p className="reel-digit" key={index}>{e}</p>
    );
    return [<div className={`reel-container ${result.length > 3 ? "four-slot" : null}`}>
      {digits}
    </div>]
  }

  const handleClickNumber = (resultNumber, index) => {
    let tempResult = newResult.split('-');
    if (index < 12) {
      tempResult[cardIndex] = resultNumber;
      setnewResult(tempResult.join('-'));
      if ((cardIndex == 5 && gameType == "Jackpot 3.3") || (cardIndex == 6 && gameType == "Jackpot 3.4"))
        setCardIndex(0);
      else
        setCardIndex(cardIndex + 1);
    }
    else {
      tempResult[suiteIndex] = resultNumber;
      setnewResult(tempResult.join('-'));
      if ((suiteIndex == 5 && gameType == "Jackpot 3.3") || (suiteIndex == 6 && gameType == "Jackpot 3.4"))
        setSuiteIndex(3);

      else
        setSuiteIndex(suiteIndex + 1);
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
                  <p>{DateExt.readableDateShort(pendingResultData[0].date)}</p>
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
            {
              (newResult !== "")
                ?
                [generateResultDigits(newResult.split("-").splice(0, 3)),
                generateResultDigits(newResult.split("-").splice(3))]
                :
                [generateResultDigits(("10-7-7-A-A-A").split("-").splice(0, 3)),
                generateResultDigits(("10-7-7-A-A-A").split("-").splice(3))]
            }
          </div>
          <div className="operator">
            {getGameLogo(gameType, gameSubType, 100)}
          </div>
        </div>
      </div>
      <div className="coin-buttons-container">
        <div className="coin-buttons">
          {buttonLabels.map((button, index) => (
            <div className="jackpot-button-item" onClick={e => handleClickNumber(button, index)} key={index}>
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
            {
              (newResult !== "")
                ?
                [generateResultDigits(newResult.split("-").splice(0, 3)),
                generateResultDigits(newResult.split("-").splice(3))]
                :
                [generateResultDigits(("10-7-7-A-A-A").split("-").splice(0, 3)),
                generateResultDigits(("10-7-7-A-A-A").split("-").splice(3))]
            }
          </div>
        }
        gameName={gameType}
      />
    </>
  );
};

export default EditJackpotResult;
