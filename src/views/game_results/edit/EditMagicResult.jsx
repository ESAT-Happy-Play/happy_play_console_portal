import React, { useState } from "react";
import "./editMagicResult.scss";
import { FormatFullDate, FormatTimeAmPm } from "../../../helper/Helpers";
import EditIcon from "../../../assets/icons/EditIcon";
import DrawResultDialog from "../dialog/DrawResultDialog";

const EditMagicResult = ({
  drawResult,
  operatorName,
  onClickPost,
  onClickCancel,
}) => {
  const dateString = "May 08, 2023 14:00:00";
  const latestPrizeDate = new Date(dateString);
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
    setShowConfirmDialog((prev) => !prev);
  };

  return (
    <>
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
            <p>Postedzz By: {operatorName}</p>
          </div>
        </div>
      </div>
      <div className="magic-buttons-container">
        <div className="magic-buttons">
          {buttonLabels.map((button) => (
            <div className="magic-button-item">{button}</div>
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
        onClose={toggleDialog}
        onSubmit={() => {
          onClickPost();
          toggleDialog();
        }}
        combination={
          <div className="magic-reel">
            {drawResult.split("").map((result, index) => (
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
