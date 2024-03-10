import React, { useState } from "react";
import "./editRegularResult.scss";
import { FormatFullDate, FormatTimeAmPm } from "../../../helper/Helpers";
import { getGameLogo } from "../../../helper/logos";
import EditIcon from "../../../assets/icons/EditIcon";
import DrawResultDialog from "../dialog/DrawResultDialog";

const EditRegularResult = ({
  drawResult,
  gameType,
  gameSubType,
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
          <div className="result-date-container">
            <p>{FormatFullDate(latestPrizeDate)}</p>
            <div className="time-container">
              {FormatTimeAmPm(latestPrizeDate).replace(/\s+/g, "")}
            </div>
          </div>
          <div className="reel">
            <div>{drawResult}</div>
          </div>
          <div className="operator">
            {getGameLogo("Regular Game", gameSubType, 100)}
          </div>
        </div>
      </div>
      <div className="coin-buttons-container">
        <div className="coin-buttons">
          {buttonLabels.map((button, index) => (
            <div className="button-item" key={index}>
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
        onClose={toggleDialog}
        onSubmit={() => {
          onClickPost();
          toggleDialog();
        }}
        combination={
          <div className="reel">
            <div>{drawResult}</div>
          </div>
        }
        width={"400px"}
        gameName={gameSubType}
      />
    </>
  );
};

export default EditRegularResult;
