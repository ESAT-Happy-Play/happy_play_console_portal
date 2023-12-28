import "./wallet.scss";
import React from 'react';
import { TextField } from "@mui/material";

const Wallet = () => {
  return (
    <div className="content">
      <div className="container">
        <div className="agentWallet">
            <h2 className="title">WITHRAW</h2>
            <h2 className="title">Select your withraw method</h2>
            <div className="divgateway">
                <div className="content paymentbgc">
                    <h2 className="title">PAYMENT GATEWAY</h2> 
                </div>
            </div>
            <h3>Minimum: P100.00 - Maximum: P450,000.00</h3>

            <div className="divgateway">
                <h2 className="title">GCASH</h2>
                <div className="content">
                    <TextField className="inputClass" label="Enter Gcash Name" variant="outlined" size="small" fullWidth />
                    <TextField className="inputClass" label="Enter Number" variant="outlined" size="small" fullWidth />
                    <TextField className="inputClass" label="Enter Amount" variant="outlined" size="small" fullWidth />
                    <TextField className="inputClass" type="password" label="Enter Password" variant="outlined" size="small" fullWidth />
                </div>
            </div>
            <div className="divgateway">
              <div className="divnote">
                <span>Withdrawals are processed at a minimum of 24 hours. 2% applicable payment</span>
                <span> gateway and 30 pesos UB convenience fee will be deducted to the user.</span>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet
