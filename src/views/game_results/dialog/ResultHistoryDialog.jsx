import React, { useEffect, useState } from 'react';
import "./drawResultDialog.scss";

const ResultHistoryDialog =({
  open,
  onClose,
  width,
  theme,
  data
}) => {
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
            Draw Result Details
            </h2>
            <div className="dialog-content">
              <div className="dialog-info-container">
                <p className={
                    theme === "light" ? "dialog-info-light" : "dialog-info"
                  }
                >
                    {data.date} - <b style={{color:'#fad418'}}>{data.time}</b>
                </p>
              </div>
              <div style={{textAlign:'center',color:'#fad418',fontSize:'50px',fontWeight:'600'}}>
                {data.result}
              </div>
              <div className="dialog-instruction-container">
                <p
                  className={
                    theme === "light"
                      ? "dialog-instruction-light"
                      : "dialog-instruction"
                  }
                >
                  ({data.winners} {theme === "light" ? "Bets" : "Winners"})
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

            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ResultHistoryDialog
