import "./home.scss";
import React from 'react';

import Widget  from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
            <Widget type="user" />
            <Widget type="player" />
            <Widget type="agent" />
            <Widget type="sales" />
          </div>
          <div className="charts">
            <Chart title="Last 6 Months (Sales)" aspect={2 / 1} />
            <Featured />
          </div>
      </div>
    </div>
  )
}

export default Home