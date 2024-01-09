import "./chome.scss";
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { TextField, Button  } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { BounceLetterLoader } from 'react-spinner-overlay';

const AgentHome = () => {
  const { authState } = useSelector((state) => state);

  return (
    <div className="content">
      <div className="container">
        <br />
        <div style={{display:'flex', gap:'15px', margin:'auto',width:'50%'}}>
          <h3 style={{padding:'0', marginTop:'12px'}}>Good Day,</h3>
          <h1 style={{padding:'0', margin:'0'}}>{ authState.displayName }</h1>
        </div>
        <div className="agent-home-container">
          <div className="row">
            <div>
              <div className="widget" style={{ background: "#9ae6b4", marginLeft:'40px', width:'810px'}}>
                <span className="w-title">YOUR REFERAL KEY:</span>
                <span className="w-content">{ authState.referralCode }</span>
              </div>
            </div>
          </div>
          <div className="row" style={{gap:'15px'}}>
            <div>
              <div className="widget" style={{ background: "#9ae6b4"}}>
                <span className="w-title">CREDIT BALANCE:</span>
                <span className="w-content">{ authState.creditBalance }</span>
              </div>
            </div>
            <div>
              <div className="widget" style={{ background: "#faf089"}}>
                <span className="w-title">COMMISSION</span>
                <span className="w-content">{ authState.commissionBalance }</span>
              </div>
            </div>
          </div>
          <div className="row" style={{gap:'15px'}}>
            <div>
              <div className="widget" style={{ background: "#feb2b2"}}>
                <span className="w-title">AGENTS</span>
                <span className="w-content">
                  { authState.agentCount }
                </span>
              </div>
            </div>
            <div>
              <div className="widget" style={{ background: "#fbb6ce"}}>
                <span className="w-title">PLAYERS</span>
                <span className="w-content">
                  { authState.playerCount }
                </span>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  )
}

export default AgentHome