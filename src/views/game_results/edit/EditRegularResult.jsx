import React, { useState } from "react";
import "./editRegularResult.scss";
import { getGameLogo } from "../../../helper/logos";
import EditIcon from "../../../assets/icons/EditIcon";
import DrawResultDialog from "../dialog/DrawResultDialog";
import { DateExt, ConstArrayExt } from "../../../utils/helpers";

const EditRegularResult = ({
  drawResult,
  gameSubType,
  onClickPost,
  onClickCancel,
  pendingResultData
}) => {

  const [newResult, setnewResult] = useState(drawResult);
  const [index, setIndex] = useState(0);
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
  ];

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const toggleDialog = () => {
    if (newResult.length > 2) { setShowConfirmDialog((prev) => !prev); }
  };

  const generateResultDigits = (result) => {
    var digits = result.map((e) =>
      <p className="reel-digit">{e}</p>
    );
    return [<div className={`reel-container ${result.length > 3 ? "four-slot" : null}`}>
      {digits}
    </div>]
  }


  const handleClickNumber = (resultNumber) => {
    let tempResult = newResult.split('-');
    tempResult[index] = resultNumber;
    setnewResult(tempResult.join('-'));
    if (index == 2)
      setIndex(0);
    else
      setIndex(index + 1);
  }

  return (
    <>
      <div className="magic-result-container">
        <div className="results-side">
          <div className="result-date-container">
            {
              (pendingResultData !== null) && (pendingResultData.length > 0) ?
                <>
                  <p>{DateExt.readableDateShort(pendingResultData[0].date)}</p>
                  <div className="time-container">
                    {
                      (parseInt(pendingResultData[0].drawTime.split(":")[0]) === 0) ? "12 PM"
                        : ConstArrayExt.getConvertToTime(parseInt(pendingResultData[0].drawTime.split(":")[0]))
                    }
                  </div>
                </>
                : <>Loading...</>
            }
          </div>
          <div className="reel">
            {
              (newResult !== "")
                ?
                generateResultDigits(newResult.split("-"))
                :
                generateResultDigits((" - - ").split("-"))
            }
          </div>
          <div className="operator">
            {getGameLogo("Regular Game", gameSubType, 100)}
          </div>
        </div>
      </div>
      <div className="coin-buttons-container">
        <div className="coin-buttons">
          {buttonLabels.map((button, index) => (
            <div className="button-item" onClick={e => handleClickNumber(button)} key={index}>
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
          <div className="reel">
            {
              (newResult !== "")
                ?
                generateResultDigits(newResult.split("-"))
                :
                generateResultDigits((" - - ").split("-"))
            }
          </div>
        }
        width={"400px"}
        gameName={gameSubType}
      />

    </>
  );
};

export default EditRegularResult;
