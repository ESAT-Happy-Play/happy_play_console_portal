import React, { useEffect, useState } from 'react';
import "./drawResultDialog.scss";
import EditIcon from "../../../assets/icons/EditIcon";

import { CircleSpinnerOverlay } from 'react-spinner-overlay';
import { DateExt, StoreExt, ConstArrayExt } from "../../../utils/helpers";
import { DrawService } from "../../../services";

const DrawResultDialog = ({
  open,
  onClose,
  onSubmit,
  combination,
  width,
  gameName,
  theme,
  pendingResultData,
  newResult,
  drawType = 0
}) => {
  let loginObj = StoreExt.getStore("auth");
  const [onSubmitLoading, setonSubmitLoading] = useState(false);
  // let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

  const handleOnSubmitDrawResult = () => {
    let drwTime = pendingResultData[0].drawTime.split(":")[0];
    // let ampm = DateExt.formatTime(pendingResultData[0].endCutOff).split(" ")[1];

    let objPayload = {
      resultDate: DateExt.formatDate(pendingResultData[0].date),
      companyId: pendingResultData[0].companyId,
      companyGameId: pendingResultData[0].companyGame,
      drawScheduleId: pendingResultData[0].id,
      drawSchedule: (parseInt(drwTime) === 0) ? "12 PM" : ConstArrayExt.getConvertToTime(parseInt(drwTime)),
      drawResult: newResult.split("").join("-"),
      drawResultType: drawType,
      operatorName: loginObj.fullname
    }

    setonSubmitLoading(true);
    DrawService.postDrawResult(objPayload).then((res) => {
      if (res) { onSubmit(); }
      setonSubmitLoading(false);
    });
  }

  return (
    <>
      <CircleSpinnerOverlay loading={onSubmitLoading} overlayColor="rgba(0,153,255,0.2)" />
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
