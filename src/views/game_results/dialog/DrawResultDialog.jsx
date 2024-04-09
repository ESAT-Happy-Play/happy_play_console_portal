import React from "react";
import "./drawResultDialog.scss";
import EditIcon from "../../../assets/icons/EditIcon";

import { DateExt } from "../../../utils/helpers";

const DrawResultDialog = ({
  open,
  onClose,
  onSubmit,
  combination,
  width,
  gameName,
  theme,
  pendingResultData,
  newResult
}) => {
  // let loginObj = StoreExt.getStore("auth");
  // let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

  const handleOnSubmitDrawResult = () => {
    let objPayload = {
      companyId: pendingResultData[0].companyId,
      result: newResult,
      companyGame: pendingResultData[0].companyGame,
      gameSchedule: pendingResultData[0].gameDrawType
    }

    console.log(objPayload);

    onSubmit();
  }

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
                  {
                    (pendingResultData !== null) && (pendingResultData.length > 0) ? 
                    <b>
                      { DateExt.readableDateShort(pendingResultData[0].date) } {"-"}
                      { 
                        (parseInt(pendingResultData[0].drawTime.split(":")[0]) === 0) ? 12 
                        : parseInt(pendingResultData[0].drawTime.split(":")[0]) 
                      }
                      {DateExt.formatTime(pendingResultData[0].endCutOff).split(" ")[1]}
                    </b>
                    : <>Loading...</>
                  }
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
                onClick={handleOnSubmitDrawResult}
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
