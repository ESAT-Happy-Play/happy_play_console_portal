import "./cwallet.scss";
import React from 'react';

const AgentWallet = () => {
  return (
    <div className="agentWallet">
      <div className="div-head">
        <ul>
          <li className="li-active">Commission</li>
          <li>Credit</li>
        </ul>
      </div>
      <div className="div-balance">
        <div className="div1">
          <h1>2,940.00</h1>
          <span>Your Commission Balance</span>
        </div>
        <div className="div2">
          <h1>CASH-OUT</h1>
        </div>
      </div>
      <div className="div-table">
        <div className="div-table-head">
          <h3 className="title">CREDIT LEDGER</h3>
        </div>
      </div>
    </div>
  )
}

export default AgentWallet
