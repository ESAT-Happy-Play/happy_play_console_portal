import React from "react";
import "./resultCard.scss";
import EditIcon from "../../assets/icons/EditIcon";
// import { FormatFullDate } from "../../helper/Helpers";
// import { drawTypeList } from "../../helper/mocks";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ResultHistory from "./ResultHistory";
import FilterListIcon from "@mui/icons-material/FilterList";

import { DateExt, ConstArrayExt } from "../../utils/helpers";

const ResultCard = ({
  headerTitle,
  headerTitleColor,
  headerColor,
  borderColor,
  postButtonLabel,
  postButtonLabelColor,
  postButtonColor,
  hasBackground,
  hasSubHeading,
  drawResult,
  editDrawResult,
  resultsHistory,
  resultsHistoryTheme,
  isEditing,
  onClickPost,
  pendingResultData
}) => {
  // const dateString = "May 08, 2023 14:00:00";
  // const latestPrizeDate = new Date(dateString);

  return (
    <div
      className={`results-container ${hasBackground ? "with-background" : ""}`}
    >
      <div
        className="results-header"
        style={{
          backgroundColor: headerColor,
          borderBottom: `solid 1px ${borderColor}`,
        }}
      >
        <p style={{ color: headerTitleColor }}>{headerTitle}</p>
        {postButtonLabel && !isEditing && (
          <button disabled={
              (pendingResultData !== null) && (pendingResultData !== undefined)
              ? (pendingResultData.length > 0) ? false : true : true 
            }
            style={{
              color: postButtonLabelColor ?? "white",
              backgroundColor: postButtonColor,
            }}
            onClick={onClickPost}
          >
            <div className="button-label">
              {postButtonLabel}
              <EditIcon size={10} />
            </div>
          </button>
        )}
      </div>
      {hasSubHeading && (
        <div className="subheading">
          {
            (pendingResultData !== null) && (pendingResultData !== undefined) && (pendingResultData.length > 0) ?
            <>
              <div className="date">
                <p>Pending: {DateExt.readableDateShort(pendingResultData[0].date)}</p>
                <div className="divider"></div>
              </div>
              <div className="draw-time-row">
                <div className="draw-time-list">
                  {pendingResultData.map((drawType, index) => (
                    <div
                      key={drawType.id}
                      className={`draw-time-item ${
                        index === 0 ? "first-item" : ""
                      }`}
                    >
                      <b>{ (parseInt(drawType.drawTime.split(":")[0]) === 0) ? "12 PM" 
                      : ConstArrayExt.getConvertToTime(parseInt(drawType.drawTime.split(":")[0])) }</b>
                      {/* <p>{ DateExt.formatTime(drawType.endCutOff).split(" ")[1] }</p> */}
                    </div>
                  ))}
                </div>
                <OpenInFullIcon sx={{ color: "white" }} />
              </div>
            </> : <>
                <div className="date">
                  <p>Pending: {DateExt.readableDateShort(new Date())}</p>
                  <div className="divider"></div>
                </div>
                <div className="draw-time-row">
                <div className="draw-time-list">
                    <div className={`draw-time-item first-item`}>
                      <p>No pending draw found!</p>
                    </div>
                </div>
                <OpenInFullIcon sx={{ color: "white" }} />
              </div>
            </>
          }
        </div>
      )}
      {isEditing ? (
        editDrawResult
      ) : (
        <div className="draw-result">{drawResult}</div>
      )}
      <div
        className={
          resultsHistoryTheme === "light"
            ? "results-history-light"
            : "results-history"
        }
      >
        {!isEditing ? (
          <>
            {resultsHistoryTheme !== "light" && (
              <div className="results-history-header">
                <p>Results History </p>
                <div className="filter-button">
                  Filters
                  <FilterListIcon />
                </div>
              </div>
            )}
            {
            (resultsHistory !== null) ? resultsHistory.map((result, index) => (
              <ResultHistory
                winners={result.noOfWinners}
                result={result.result}
                drawTime={result.drawTime}
                resultDate={result.drawDate}
                key={index}
                theme={resultsHistoryTheme}
              />
            )) : <></>
            }
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
