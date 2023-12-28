import React from 'react';
import { TextField, Button  } from "@mui/material";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import AddIcon from '@mui/icons-material/Add';
import EditPrice from '../Dialog/forms/EditPrice';

const PriceAndPrizes = ({GameTypeObj, CallbackRefresh}) => {

    // Update price dialog
  const [openEditPrice, setEditPrice] = React.useState(false);
  const handleEditPriceOpen = () => { setEditPrice(true); };
  const handleEditPriceClose = () => { setEditPrice(false); };

  const handleEditPriceCallback = (obj) => {
    CallbackRefresh();
  }

  return (
    <>
        <div className="divContent">
            <div className="left">
                <div className="container">
                <div className="top">
                    <h2 className="title">{ GameTypeObj.gameTypeName }</h2>
                </div>
                
                <div className="ulContent">
                    <div className="contentDiv">
                    <div className="divLabel">
                        <span>Jackpot Increment</span>
                    </div>
                    <div>
                        <TextField disabled variant="outlined" value={ (GameTypeObj.prizePoolPercentage) + " %" } size="small" fullWidth />
                    </div>
                    </div>
                    <div className="contentDiv">
                    <div className="divLabel">
                        <span>Floor Value</span>
                    </div>
                    <div>
                        <TextField disabled variant="outlined" value={ GameTypeObj.floorValue.toLocaleString(undefined, {maximumFractionDigits:2}) } size="small" fullWidth />
                    </div>
                    </div>
                    <div className="contentDiv">
                    <div className="divLabel">
                        <span>Cieling Value</span>
                    </div>
                    <div>
                        <TextField disabled variant="outlined" value={ GameTypeObj.ceilingValue.toLocaleString(undefined, {maximumFractionDigits:2}) } size="small" fullWidth />
                    </div>
                    </div>
                    <div className="contentDiv">
                    <div className="divLabel">
                        <span>Card Price</span>
                    </div>
                    <div>
                        <TextField disabled variant="outlined" value={ GameTypeObj.cardPrice } size="small" fullWidth />
                    </div>
                    </div>
                    <div className="contentDiv">
                    <div className="divLabel">
                        <span>Max Nth Ball</span>
                    </div>
                    <div>
                        <TextField disabled variant="outlined" value={ GameTypeObj.maxNthBall } size="small" fullWidth />
                    </div>
                    </div>

                    <div className="divBtnCenter">
                    <Button onClick={ e => handleEditPriceOpen() } variant="contained" color="warning" size="large">
                        Edit <EditOutlinedIcon />
                    </Button>
                    </div>
                </div>
                </div>
            </div>

            <div className="center">
                <div className="container">
                <div className="ulContent">
                    <div className="displayPrice">
                        <b>CURRENT PRICE</b>
                        <h2>{ GameTypeObj.currentWinningPrice.toLocaleString(undefined, {maximumFractionDigits:2}) }</h2>
                        <span>{ (new Date(GameTypeObj.createdOn)).toDateString() }</span>
                        <span>2PM</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <EditPrice isOpenEditPrice={ openEditPrice } handleCloseEditPrice={ handleEditPriceClose } handleCallback={ handleEditPriceCallback } gameType={ GameTypeObj } />
    </>
  )
}

export default PriceAndPrizes
