import React from "react";
import "./prizePool.scss";
import { getGameLogo } from "../../helper/logos";
import { FormatAmount } from "../../helper/Helpers";

const PrizePool = ({ prizePool, gameName, subtypeName }) => {
  const dateString = "May 08, 2023 14:00:00";
  const latestPrizeDate = new Date(dateString);

  return (
    <div className="prize-pool-container">
      <div className="prize-pool-header">
        <p>Current Prize</p>
      </div>
      <div className="prize-container">
        <div className="prize-header">
          <div className="prize-logo">
            <div>{getGameLogo(gameName, subtypeName)}</div>
            <h1>{FormatAmount(prizePool[0].prizeAmount)}</h1>
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
        {prizePool.map((pool) => (
          <div className="prize-row" key={pool.id}>
            <h2>{FormatAmount(pool.prizeAmount)}</h2>
            <p>
              As of:{" "}
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
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrizePool;
