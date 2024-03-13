import React from "react";
import "./drawResultDialog.scss";
import EditIcon from "../../../assets/icons/EditIcon";
import { FormatFullDate, FormatTimeAmPm } from "../../../helper/Helpers";

const DrawResultDialog = ({
  open,
  onClose,
  onSubmit,
  combination,
  width,
  gameName,
  theme,
}) => {
  const dateString = "May 08, 2023 14:00:00";
  const latestPrizeDate = new Date(dateString);

  return (
    <>
      {open && (
        <div className="custom-dialog-container">
          <div
            className={
              theme === "light" ? "custom-dialog-light" : "custom-dialog"
            }
            style={{ width: width }}
          >
            <h2
              className={
                theme === "light" ? "dialog-title-light" : "dialog-title"
              }
            >
              Confirm Draw Result
            </h2>
            <div className="dialog-content">
              <div className="dialog-info-container">
                <p
                  className={
                    theme === "light" ? "dialog-info-light" : "dialog-info"
                  }
                >
                  You are about to post the {gameName} games result for{" "}
                  <b>
                    {FormatFullDate(latestPrizeDate)} {"-"}
                    {FormatTimeAmPm(latestPrizeDate)}
                  </b>
                </p>
              </div>
              <div className="combination-result">{combination}</div>
              <div className="dialog-instruction-container">
                <p
                  className={
                    theme === "light"
                      ? "dialog-instruction-light"
                      : "dialog-instruction"
                  }
                >
                  Please <b>double-check</b> the combination and click proceed
                  if you are 100% sure.
                </p>
              </div>
            </div>
            <div
              className={
                theme === "light" ? "dialog-buttons-light" : "dialog-buttons"
              }
            >
              <button
                className={
                  theme === "light" ? "cancel-button-light" : "cancel-button"
                }
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className={
                  theme === "light" ? "confirm-button-light" : "confirm-button"
                }
                onClick={onSubmit}
              >
                <div
                  className={
                    theme === "light" ? "button-label-light" : "button-label"
                  }
                >
                  Confirm
                  <EditIcon size={10} />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default DrawResultDialog;
