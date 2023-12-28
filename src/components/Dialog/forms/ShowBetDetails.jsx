import "../dialogform.scss";
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button  } from "@mui/material";
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const ShowBetDetails = ({ isOpen, handleClose, itemObj, itemValObj }) => {

  return (
    <>
      <BootstrapDialog style={{ fontSize: '15px'}} className="showUserDetails"
        open={ isOpen }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd">
            <span>BET DETAILS</span>
            <IconButton onClick={ handleClose } color="primary">
              <CancelIcon />
            </IconButton>
          </div>
        </div>
        <DialogContent dividers>
          <div className='divProfileInfo' style={{padding:'0px'}}>
            <div className="row">
              <div className="col-5">
                <span><b>Username : </b> {(itemObj !== null) ? itemObj.accountName : "" }</span>
              </div>
              <div className="col-4">
                <span><b>Account # : </b> {(itemObj !== null) ? itemObj.accountNumber.toString().padStart(12, '0') : "" }</span>
              </div>
              <div className="col-3">
                <span><b>Number of Cards : </b> {(itemObj !== null) ? itemObj.noOfCards : "" }</span>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <span><b>Transaction # : </b> {(itemObj !== null) ? itemObj.trasactionNo : "" }</span>
              </div>
              <div className="col-4">
                <span><b>Bet Amount : </b> {(itemObj !== null) ? itemObj.totalAmount : "" }</span>
              </div>
              <div className="col-3">
                <span><b>Game Type : </b> {(itemObj !== null) ? itemObj.gameTypeNumber.toString().padStart(4, '0') : "" }</span>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <span><b>Recruiter : </b> {(itemObj !== null) ? itemObj.recruiterName : "" }</span>
              </div>
              
              <div className="col-4">
                <span><b>Date : </b> {(itemObj !== null) ? (new Date(itemObj.scheduleDate)).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) : "" }</span>
              </div>
              <div className="col-3">
                <span><b>Draw Type : </b> {(itemObj !== null) ? itemObj.gameDrawTypeName : "" }</span>
              </div>
            </div>
          </div>

          <div className="row" style={{display:'table'}}>
            {
              (itemValObj !== null) ?
                <>
                {
                  itemValObj.map((item, index) => (
                    <div key={index} className="col-4 div-card">
                      <div className="card-head">
                        <span>B</span>
                        <span>I</span>
                        <span>N</span>
                        <span>G</span>
                        <span>O</span>
                      </div>
                      <div style={{display:'flex',gap:'10px'}}>
                        {
                          item.map((item, index) => (
                            <div key={index} className="div-card-num">
                              <div>
                                {
                                  item.map((item, index) => (
                                    <Button key={index} variant="contained" size="small">
                                      {(item === -1) ? <StarOutlinedIcon /> : item }
                                    </Button>
                                  ))
                                }
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
                </>
              : <>No card found!</>
            }
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  )
}

export default ShowBetDetails
