import React from "react";
import "./resultCard.scss";
import EditIcon from "../../assets/icons/EditIcon";
import { FormatFullDate } from "../../helper/Helpers";
import { drawTypeList } from "../../helper/mocks";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ResultHistory from "./ResultHistory";
import FilterListIcon from "@mui/icons-material/FilterList";

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
}) => {
  const dateString = "May 08, 2023 14:00:00";
  const latestPrizeDate = new Date(dateString);

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
          <button
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
          <div className="date">
            <p>Pending: {FormatFullDate(latestPrizeDate)}</p>
            <div className="divider"></div>
          </div>
          <div className="draw-time-row">
            <div className="draw-time-list">
              {drawTypeList.map((drawType, index) => (
                <div
                  key={drawType.gameTypeId}
                  className={`draw-time-item ${
                    index === 0 ? "first-item" : ""
                  }`}
                >
                  <b>{drawType.name.split(" ")[0]}</b>
                  <p>{drawType.name.split(" ")[1]}</p>
                </div>
              ))}
            </div>
            <OpenInFullIcon sx={{ color: "white" }} />
          </div>
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
            {resultsHistory.map((result, index) => (
              <ResultHistory
                winners={76}
                result={result}
                key={index}
                theme={resultsHistoryTheme}
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
