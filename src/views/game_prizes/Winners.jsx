import React, { useState, useEffect } from "react";
import "./winners.scss";
import { CustomRadioButton } from "../../components/radio/CustomRadioGroup";
import Button from "@mui/material/Button";
import HandCoinsIcon from "../../assets/icons/HandCoinsIcon";
import { getGameLogo } from "../../helper/logos";
import { FormatAmount } from "../../helper/Helpers";

const Winners = ({ winners, gameName, subtypeName }) => {
  const dateString = "May 08, 2023 14:00:00";
  const latestPrizeDate = new Date(dateString);
  const [winnersList, setWinnersList] = useState([]);

  useEffect(() => {
    setWinnersList(winners);
  }, [winners]);

  const handleFilter = (value) => {
    switch (value) {
      case "claimed":
        setWinnersList(winners.filter((winner) => winner.status === "Claimed"));
        break;
      case "unclaimed":
        setWinnersList(
          winners.filter((winner) => winner.status === "Unclaimed")
        );
        break;
      default:
        setWinnersList(winners);
    }
  };

  return (
    <div className="winners-container">
      <div className="winners-header">
        <p>Current Prize</p>
      </div>
      <div className="winners-list-container">
        <div className="winners-list-header">
          <div className="winners-logo">
            <div>{getGameLogo(gameName, subtypeName)}</div>
            <h1>{FormatAmount(winners[0].amountWon)}</h1>
          </div>
          <h2>
            {latestPrizeDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            ,{" "}
            <span>
              {latestPrizeDate.toLocaleTimeString("en-US", {
                hour: "numeric",
                hour12: true,
              })}
            </span>
          </h2>
        </div>
        <div className="winners-filter">
          <CustomRadioButton
            size="small"
            options={[
              { label: "All", value: "all" },
              { label: "Claimed", value: "claimed" },
              { label: "Unclaimed", value: "unclaimed" },
            ]}
            handleRadioChange={(e) => handleFilter(e.target.value)}
          />
        </div>
        {winnersList.map((winner) => (
          <div className="winners-row" key={winner.id}>
            <h2>#{winner.referenceId}</h2>
            <p>{FormatAmount(winner.amountWon)} </p>
            {winner.status === "Unclaimed" ? (
              <Button
                type="submit"
                onClick={() => {}}
                className="process-button"
              >
                Process{" "}
                <HandCoinsIcon size={16} style={{ marginLeft: "5px" }} />
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={() => {}}
                className="process-button-disabled"
                disabled
              >
                Processed
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Winners;
