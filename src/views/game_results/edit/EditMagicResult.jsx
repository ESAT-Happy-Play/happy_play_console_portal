import React, { useState } from "react";
import "./editMagicResult.scss";
import EditIcon from "../../../assets/icons/EditIcon";
import DrawResultDialog from "../dialog/DrawResultDialog";

import { DateExt, ConstArrayExt } from "../../../utils/helpers";

const EditMagicResult = ({
  drawResult,
  operatorName,
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
  ];

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const toggleDialog = () => {
    if (newResult.length > 2) { setShowConfirmDialog((prev) => !prev); }
  };

  const handleClickNumber = (resultNumber) => {
    let nwResult = newResult;
    if (newResult.length > 2) { nwResult = ""; }
    setnewResult(nwResult + resultNumber);
  }

  return (
    <>
      <div className="magic-result-container">
        <div className="results-side">
          <div className="magic-date-container">
            {
              (pendingResultData !== null) && (pendingResultData.length > 0) ?
              <>
                <p>{ DateExt.readableDateShort(pendingResultData[0].date) }</p>
                <div className="magic-time-container">
                  { 
                    (parseInt(pendingResultData[0].drawTime.split(":")[0]) === 0) ? "12 PM" 
                    : ConstArrayExt.getConvertToTime(parseInt(pendingResultData[0].drawTime.split(":")[0])) 
                  }
                </div>
              </>
              : <>Loading...</>
            }
          </div>
          <div className="magic-reel">
            {newResult.split("").map((result, index) => (
              <div className="magic-reel-item" key={index}>
                {result}
              </div>
            ))}
          </div>
          <div className="magic-operator">
            <p>Postedzz By: {operatorName}</p>
          </div>
        </div>
      </div>
      <div className="magic-buttons-container">
        <div className="magic-buttons">
          {buttonLabels.map((button, index) => (
            <div className="magic-button-item" onClick={e => handleClickNumber(button) } key={index}>
              {button}
            </div>
          ))}
        </div>
      </div>
      <div className="magic-buttons-footer">
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
        drawType={1}
        onClose={toggleDialog}
        onSubmit={() => {
          onClickPost();
          toggleDialog();
        }}
        combination={
          <div className="magic-reel">
            {newResult.split("").map((result, index) => (
              <div className="magic-reel-item" key={index}>
                {result}
              </div>
            ))}
          </div>
        }
        width={"400px"}
        gameName={"Magic"}
        theme="light"
      />
    </>
  );
};

export default EditMagicResult;
