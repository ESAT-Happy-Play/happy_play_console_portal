import "./chome.scss";
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { TextField, Button  } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { BounceLetterLoader } from 'react-spinner-overlay';

const AgentHome = () => {
  const { authState } = useSelector((state) => state);
  // const [pageLoader, setPageLoader] = useState(false);

  return (
    <div className="content">
      <div className="container">
        <div className="divadmin">
          <h1 style={{ marginLeft: "4%" }} className="title">GOOD MORNING, { authState.name }</h1>
        </div>
        <div className="agent-home-container">
          <div className="row">
            <div className="col-6">
              <div className="widget" style={{ background: "#fbd38d"}}>
                <span className="w-title">YOUR REFERAL KEY:</span>
                <span className="w-content">USYS8877</span>
              </div>
            </div>
            <div className="col-6">
              <div className="widget" style={{ background: "#f56565"}}>
                <span className="w-title">COMMISSION</span>
                <span className="w-content">45.45</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="widget" style={{ background: "#bb6bd9"}}>
                <span className="w-title">AGENTS</span>
                <span className="w-content">
                  60
                </span>
              </div>
            </div>
            <div className="col-6">
              <div className="widget" style={{ background: "#4fd1c5"}}>
                <span className="w-title">PLAYERS</span>
                <span className="w-content">
                  76
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <h2 style={{ color:"#4d4e50", marginLeft:"3%" }}>COMMISSION</h2>
          </div>

          <div className="row">
              <div className="col-4">
                <div className="row">
                  <div className="col-4 labelTitle">
                    <span>Date From</span>
                  </div>
                  <div className="col-8">
                    <TextField
                      type="date"
                      sx={{ width: "200px" }}  variant="outlined" size="small" />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-4 labelTitle">
                    <span>Date To</span>
                  </div>
                  <div className="col-8">
                    <TextField
                      type="date"
                      sx={{ width: "200px" }}  variant="outlined" size="small" />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-12 center">
                    <Button variant="contained" color="success" size="medium">
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
          </div>

          <div className="row">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Account Number</TableCell>
                    <TableCell>Player Name</TableCell>
                    <TableCell>Selected Date Commission</TableCell>
                    <TableCell>Total Commission</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    key="TesId"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>000100045</TableCell>
                    <TableCell>Wongki</TableCell>
                    <TableCell>03/03/2023</TableCell>
                    <TableCell>123.65</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AgentHome