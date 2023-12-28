import "../dialogform.scss";
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button  } from "@mui/material";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import MessageDialog from "../MessageDialog";
import { toast } from 'react-toastify';

import { GetStoreObject } from "../../../helper/Helpers";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const PostResults = ({ isOpen, handleClose, dataObj, resultNumbers, DrawCount, MaxBall }) => {
  let authdata = GetStoreObject("auth");
  const token = (authdata !== null) ? authdata.token : "";

  const [DrawDate, setDrawDate] = React.useState('');
  const [AllDS, setAllDS] = React.useState(false);
  const [SelectedCount, setSelectedCount] = React.useState(0);
  const [CurrentNumber, setCurrentNumber] = React.useState('');
  const [One, setOne] = React.useState(false);
  const [Two, setTwo] = React.useState(false);
  const [Three, setThree] = React.useState(false);
  const [Four, setFour] = React.useState(false);
  const [Five, setFive] = React.useState(false);
  const [Six, setSix] = React.useState(false);
  const [Seven, setSeven] = React.useState(false);
  const [Eight, setEight] = React.useState(false);
  const [Nine, setNine] = React.useState(false);
  const [Ten, setTen] = React.useState(false);

  const [Eleven, setEleven] = React.useState(false);
  const [Twelve, setTwelve] = React.useState(false);
  const [Thirteen, setThirteen] = React.useState(false);
  const [Fourteen, setFourteen] = React.useState(false);
  const [Fifteen, setFifteen] = React.useState(false);
  const [Sixteen, setSixteen] = React.useState(false);
  const [Seventeen, setSeventeen] = React.useState(false);
  const [Eightteen, setEightteen] = React.useState(false);
  const [Nineteen, setNineteen] = React.useState(false);
  const [Twenty, setTwenty] = React.useState(false);

  const [TwentyOne, setTwentyOne] = React.useState(false);
  const [TwentyTwo, setTwentyTwo] = React.useState(false);
  const [TwentyThree, setTwentyThree] = React.useState(false);
  const [TwentyFour, setTwentyFour] = React.useState(false);
  const [TwentyFive, setTwentyFive] = React.useState(false);
  const [TwentySix, setTwentySix] = React.useState(false);
  const [TwentySeven, setTwentySeven] = React.useState(false);
  const [TwentyEight, setTwentyEight] = React.useState(false);
  const [TwentyNine, setTwentyNine] = React.useState(false);
  const [Thirty, setThirty] = React.useState(false);

  const [ThirtyOne, setThirtyOne] = React.useState(false);
  const [ThirtyTwo, setThirtyTwo] = React.useState(false);
  const [ThirtyThree, setThirtyThree] = React.useState(false);
  const [ThirtyFour, setThirtyFour] = React.useState(false);
  const [ThirtyFive, setThirtyFive] = React.useState(false);
  const [ThirtySix, setThirtySix] = React.useState(false);
  const [ThirtySeven, setThirtySeven] = React.useState(false);
  const [ThirtyEight, setThirtyEight] = React.useState(false);
  const [ThirtyNine, setThirtyNine] = React.useState(false);
  const [Fourty, setFourty] = React.useState(false);

  const [FourtyOne, setFourtyOne] = React.useState(false);
  const [FourtyTwo, setFourtyTwo] = React.useState(false);
  const [FourtyThree, setFourtyThree] = React.useState(false);
  const [FourtyFour, setFourtyFour] = React.useState(false);
  const [FourtyFive, setFourtyFive] = React.useState(false);
  const [FourtySix, setFourtySix] = React.useState(false);
  const [FourtySeven, setFourtySeven] = React.useState(false);
  const [FourtyEight, setFourtyEight] = React.useState(false);
  const [FourtyNine, setFourtyNine] = React.useState(false);
  const [Fifty, setFifty] = React.useState(false);

  const [FiftyOne, setFiftyOne] = React.useState(false);
  const [FiftyTwo, setFiftyTwo] = React.useState(false);
  const [FiftyThree, setFiftyThree] = React.useState(false);
  const [FiftyFour, setFiftyFour] = React.useState(false);
  const [FiftyFive, setFiftyFive] = React.useState(false);
  const [FiftySix, setFiftySix] = React.useState(false);
  const [FiftySeven, setFiftySeven] = React.useState(false);
  const [FiftyEight, setFiftyEight] = React.useState(false);
  const [FiftyNine, setFiftyNine] = React.useState(false);
  const [Sixty, setSixty] = React.useState(false);

  const [SixtyOne, setSixtyOne] = React.useState(false);
  const [SixtyTwo, setSixtyTwo] = React.useState(false);
  const [SixtyThree, setSixtyThree] = React.useState(false);
  const [SixtyFour, setSixtyFour] = React.useState(false);
  const [SixtyFive, setSixtyFive] = React.useState(false);
  const [SixtySix, setSixtySix] = React.useState(false);
  const [SixtySeven, setSixtySeven] = React.useState(false);
  const [SixtyEight, setSixtyEight] = React.useState(false);
  const [SixtyNine, setSixtyNine] = React.useState(false);
  const [Seventy, setSeventy] = React.useState(false);
  
  const [SeventyOne, setSeventyOne] = React.useState(false);
  const [SeventyTwo, setSeventyTwo] = React.useState(false);
  const [SeventyThree, setSeventyThree] = React.useState(false);
  const [SeventyFour, setSeventyFour] = React.useState(false);
  const [SeventyFive, setSeventyFive] = React.useState(false);

  useEffect(() => {
    if(resultNumbers !== null) {
      let drawResult = resultNumbers.drawResult;
      let results = resultNumbers.results;

      if(results.length > 0) {
        setTimeout(function(){
          for (let i = 0; i < results.length; i++) {
            handleSelected(results[i].drawResult);
          }
        }, 3000);
        
        setSelectedCount(results.length);
      }

      if(dataObj !== null) {
        setDrawDate(`${(new Date(dataObj.date)).toLocaleDateString("en-US", {
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} ${dataObj.gameDrawType}`);
      }

      if(DrawCount !== null && MaxBall !== null) {
        if(DrawCount >= MaxBall) {
          setAllDS(true);
        }
      }

    }
  }, [resultNumbers, dataObj, DrawCount, MaxBall]);

  const handleSet = (e, value) => {
    setCurrentNumber(value);
    handleOpenConfirm();
  }

  const handleSelected = (value) => {
    switch (value) {
      case 1: setOne(!One); break;
      case 2: setTwo(!Two); break;
      case 3: setThree(!Three); break;
      case 4: setFour(!Four); break;
      case 5: setFive(!Five); break;
      case 6: setSix(!Six); break;
      case 7: setSeven(!Seven); break;
      case 8: setEight(!Eight); break;
      case 9: setNine(!Nine); break;
      case 10: setTen(!Ten); break;

      case 11: setEleven(!Eleven); break;
      case 12: setTwelve(!Twelve); break;
      case 13: setThirteen(!Thirteen); break;
      case 14: setFourteen(!Fourteen); break;
      case 15: setFifteen(!Fifteen); break;
      case 16: setSixteen(!Sixteen); break;
      case 17: setSeventeen(!Seventeen); break;
      case 18: setEightteen(!Eightteen); break;
      case 19: setNineteen(!Nineteen); break;
      case 20: setTwenty(!Twenty); break;

      case 21: setTwentyOne(!TwentyOne); break;
      case 22: setTwentyTwo(!TwentyTwo); break;
      case 23: setTwentyThree(!TwentyThree); break;
      case 24: setTwentyFour(!TwentyFour); break;
      case 25: setTwentyFive(!TwentyFive); break;
      case 26: setTwentySix(!TwentySix); break;
      case 27: setTwentySeven(!TwentySeven); break;
      case 28: setTwentyEight(!TwentyEight); break;
      case 29: setTwentyNine(!TwentyNine); break;
      case 30: setThirty(!Thirty); break;

      case 31: setThirtyOne(!ThirtyOne); break;
      case 32: setThirtyTwo(!ThirtyTwo); break;
      case 33: setThirtyThree(!ThirtyThree); break;
      case 34: setThirtyFour(!ThirtyFour); break;
      case 35: setThirtyFive(!ThirtyFive); break;
      case 36: setThirtySix(!ThirtySix); break;
      case 37: setThirtySeven(!ThirtySeven); break;
      case 38: setThirtyEight(!ThirtyEight); break;
      case 39: setThirtyNine(!ThirtyNine); break;
      case 40: setFourty(!Fourty); break;

      case 41: setFourtyOne(!FourtyOne); break;
      case 42: setFourtyTwo(!FourtyTwo); break;
      case 43: setFourtyThree(!FourtyThree); break;
      case 44: setFourtyFour(!FourtyFour); break;
      case 45: setFourtyFive(!FourtyFive); break;
      case 46: setFourtySix(!FourtySix); break;
      case 47: setFourtySeven(!FourtySeven); break;
      case 48: setFourtyEight(!FourtyEight); break;
      case 49: setFourtyNine(!FourtyNine); break;
      case 50: setFifty(!Fifty); break;

      case 51: setFiftyOne(!FiftyOne); break;
      case 52: setFiftyTwo(!FiftyTwo); break;
      case 53: setFiftyThree(!FiftyThree); break;
      case 54: setFiftyFour(!FiftyFour); break;
      case 55: setFiftyFive(!FiftyFive); break;
      case 56: setFiftySix(!FiftySix); break;
      case 57: setFiftySeven(!FiftySeven); break;
      case 58: setFiftyEight(!FiftyEight); break;
      case 59: setFiftyNine(!FiftyNine); break;
      case 60: setSixty(!Sixty); break;

      case 61: setSixtyOne(!SixtyOne); break;
      case 62: setSixtyTwo(!SixtyTwo); break;
      case 63: setSixtyThree(!SixtyThree); break;
      case 64: setSixtyFour(!SixtyFour); break;
      case 65: setSixtyFive(!SixtyFive); break;
      case 66: setSixtySix(!SixtySix); break;
      case 67: setSixtySeven(!SixtySeven); break;
      case 68: setSixtyEight(!SixtyEight); break;
      case 69: setSixtyNine(!SixtyNine); break;
      case 70: setSeventy(!Seventy); break;

      case 71: setSeventyOne(!SeventyOne); break;
      case 72: setSeventyTwo(!SeventyTwo); break;
      case 73: setSeventyThree(!SeventyThree); break;
      case 74: setSeventyFour(!SeventyFour); break;
      case 75: setSeventyFive(!SeventyFive); break;
    }
  }

  // Confiration dialog message 
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [openConfirm, setConfirm] = React.useState(false);
  const handleOpenConfirm = () => { setConfirm(true); };
  const handleCloseConfirm = () => { setConfirm(false); };
  const handleResultOkay = async () => {
    setSubmitLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_BINGO_URL}/api/draw`, {
            method: 'POST',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentDraw: CurrentNumber })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setSubmitLoading(false);
          handleCloseConfirm();

          setSelectedCount(SelectedCount + 1);
          handleSelected(CurrentNumber);

          if((SelectedCount + 1) >= MaxBall) {
            setAllDS(true);
          }
        })
        .catch(error => {
            toast.error(error, { autoClose: false });
        })
    } catch (err) {
      if (err.status === 400) {
        toast.error(err.data.detail, { autoClose: false });
      } else {
        toast.error(err.message, { autoClose: false });
      }
    }
  };

  return (
    <>
      <BootstrapDialog className="postResults"
        open={ isOpen }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd">
            <span>Post Result</span>
            <span style={{ fontSize:'16px', color:'#424242', fontWeight:'500'}}>
                Date: <b>{DrawDate}</b> 
            </span>
          </div>
        </div>
        <DialogContent dividers>
          <div className="row">
            <div className="col-12 div-selectNumber">
                <span>Select Resulting Number</span>
                <span className="spanSelected">
                    <b>{ SelectedCount }</b>
                    <b>/</b>
                    <b>39</b>
                </span>
            </div>
          </div>
          <div className="row row-ov">
            <div className="col-12 div-bingo-numbers">
                <Button style={{background:'black', color:'white', fontWeight:'700'}} variant="contained" size="small">B</Button>
                <Button onClick={ e => handleSet(e, 1) } disabled={(AllDS) ? AllDS : One} className={ (One) ? "selected" : "" } variant="contained" size="small">1</Button>
                <Button onClick={ e => handleSet(e, 2) } disabled={(AllDS) ? AllDS : Two} className={ (Two) ? "selected" : "" } variant="contained" size="small">2</Button>
                <Button onClick={ e => handleSet(e, 3) } disabled={(AllDS) ? AllDS : Three} className={ (Three) ? "selected" : "" } variant="contained" size="small">3</Button>
                <Button onClick={ e => handleSet(e, 4) } disabled={(AllDS) ? AllDS : Four} className={ (Four) ? "selected" : "" } variant="contained" size="small">4</Button>
                <Button onClick={ e => handleSet(e, 5) } disabled={(AllDS) ? AllDS : Five} className={ (Five) ? "selected" : "" } variant="contained" size="small">5</Button>
                <Button onClick={ e => handleSet(e, 6) } disabled={(AllDS) ? AllDS : Six} className={ (Six) ? "selected" : "" } variant="contained" size="small">6</Button>
                <Button onClick={ e => handleSet(e, 7) } disabled={(AllDS) ? AllDS : Seven} className={ (Seven) ? "selected" : "" } variant="contained" size="small">7</Button>
                <Button onClick={ e => handleSet(e, 8) } disabled={(AllDS) ? AllDS : Eight} className={ (Eight) ? "selected" : "" } variant="contained" size="small">8</Button>
                <Button onClick={ e => handleSet(e, 9) } disabled={(AllDS) ? AllDS : Nine} className={ (Nine) ? "selected" : "" } variant="contained" size="small">9</Button>
                <Button onClick={ e => handleSet(e, 10) } disabled={(AllDS) ? AllDS : Ten} className={ (Ten) ? "selected" : "" } variant="contained" size="small">10</Button>
                <Button onClick={ e => handleSet(e, 11) } disabled={(AllDS) ? AllDS : Eleven} className={ (Eleven) ? "selected" : "" } variant="contained" size="small">11</Button>
                <Button onClick={ e => handleSet(e, 12) } disabled={(AllDS) ? AllDS : Twelve} className={ (Twelve) ? "selected" : "" } variant="contained" size="small">12</Button>
                <Button onClick={ e => handleSet(e, 13) } disabled={(AllDS) ? AllDS : Thirteen} className={ (Thirteen) ? "selected" : "" } variant="contained" size="small">13</Button>
                <Button onClick={ e => handleSet(e, 14) } disabled={(AllDS) ? AllDS : Fourteen} className={ (Fourteen) ? "selected" : "" } variant="contained" size="small">14</Button>
                <Button onClick={ e => handleSet(e, 15) } disabled={(AllDS) ? AllDS : Fifteen} className={ (Fifteen) ? "selected" : "" } variant="contained" size="small">15</Button>
            </div>
          </div>
          <div className="row row-ov">
            <div className="col-12 div-bingo-numbers">
                <Button style={{background:'black', color:'white', fontWeight:'700'}} variant="contained" size="small">I</Button>
                <Button onClick={ e => handleSet(e, 16) } disabled={(AllDS) ? AllDS : Sixteen} className={ (Sixteen) ? "selected" : "" } variant="contained" size="small">16</Button>
                <Button onClick={ e => handleSet(e, 17) } disabled={(AllDS) ? AllDS : Seventeen} className={ (Seventeen) ? "selected" : "" } variant="contained" size="small">17</Button>
                <Button onClick={ e => handleSet(e, 18) } disabled={(AllDS) ? AllDS : Eightteen} className={ (Eightteen) ? "selected" : "" } variant="contained" size="small">18</Button>
                <Button onClick={ e => handleSet(e, 19) } disabled={(AllDS) ? AllDS : Nineteen} className={ (Nineteen) ? "selected" : "" } variant="contained" size="small">19</Button>
                <Button onClick={ e => handleSet(e, 20) } disabled={(AllDS) ? AllDS : Twenty} className={ (Twenty) ? "selected" : "" } variant="contained" size="small">20</Button>
                <Button onClick={ e => handleSet(e, 21) } disabled={(AllDS) ? AllDS : TwentyOne} className={ (TwentyOne) ? "selected" : "" } variant="contained" size="small">21</Button>
                <Button onClick={ e => handleSet(e, 22) } disabled={(AllDS) ? AllDS : TwentyTwo} className={ (TwentyTwo) ? "selected" : "" } variant="contained" size="small">22</Button>
                <Button onClick={ e => handleSet(e, 23) } disabled={(AllDS) ? AllDS : TwentyThree} className={ (TwentyThree) ? "selected" : "" } variant="contained" size="small">23</Button>
                <Button onClick={ e => handleSet(e, 24) } disabled={(AllDS) ? AllDS : TwentyFour} className={ (TwentyFour) ? "selected" : "" } variant="contained" size="small">24</Button>
                <Button onClick={ e => handleSet(e, 25) } disabled={(AllDS) ? AllDS : TwentyFive} className={ (TwentyFive) ? "selected" : "" } variant="contained" size="small">25</Button>
                <Button onClick={ e => handleSet(e, 26) } disabled={(AllDS) ? AllDS : TwentySix} className={ (TwentySix) ? "selected" : "" } variant="contained" size="small">26</Button>
                <Button onClick={ e => handleSet(e, 27) } disabled={(AllDS) ? AllDS : TwentySeven} className={ (TwentySeven) ? "selected" : "" } variant="contained" size="small">27</Button>
                <Button onClick={ e => handleSet(e, 28) } disabled={(AllDS) ? AllDS : TwentyEight} className={ (TwentyEight) ? "selected" : "" } variant="contained" size="small">28</Button>
                <Button onClick={ e => handleSet(e, 29) } disabled={(AllDS) ? AllDS : TwentyNine} className={ (TwentyNine) ? "selected" : "" } variant="contained" size="small">29</Button>
                <Button onClick={ e => handleSet(e, 30) } disabled={(AllDS) ? AllDS : Thirty} className={ (Thirty) ? "selected" : "" } variant="contained" size="small">30</Button>
            </div>
          </div>
          <div className="row row-ov">
            <div className="col-12 div-bingo-numbers">
                <Button style={{background:'black', color:'white', fontWeight:'700'}} variant="contained" size="small">N</Button>
                <Button onClick={ e => handleSet(e, 31) } disabled={(AllDS) ? AllDS : ThirtyOne} className={ (ThirtyOne) ? "selected" : "" } variant="contained" size="small">31</Button>
                <Button onClick={ e => handleSet(e, 32) } disabled={(AllDS) ? AllDS : ThirtyTwo} className={ (ThirtyTwo) ? "selected" : "" } variant="contained" size="small">32</Button>
                <Button onClick={ e => handleSet(e, 33) } disabled={(AllDS) ? AllDS : ThirtyThree} className={ (ThirtyThree) ? "selected" : "" } variant="contained" size="small">33</Button>
                <Button onClick={ e => handleSet(e, 34) } disabled={(AllDS) ? AllDS : ThirtyFour} className={ (ThirtyFour) ? "selected" : "" } variant="contained" size="small">34</Button>
                <Button onClick={ e => handleSet(e, 35) } disabled={(AllDS) ? AllDS : ThirtyFive} className={ (ThirtyFive) ? "selected" : "" } variant="contained" size="small">35</Button>
                <Button onClick={ e => handleSet(e, 36) } disabled={(AllDS) ? AllDS : ThirtySix} className={ (ThirtySix) ? "selected" : "" } variant="contained" size="small">36</Button>
                <Button onClick={ e => handleSet(e, 37) } disabled={(AllDS) ? AllDS : ThirtySeven} className={ (ThirtySeven) ? "selected" : "" } variant="contained" size="small">37</Button>
                <Button onClick={ e => handleSet(e, 38) } disabled={(AllDS) ? AllDS : ThirtyEight} className={ (ThirtyEight) ? "selected" : "" } variant="contained" size="small">38</Button>
                <Button onClick={ e => handleSet(e, 39) } disabled={(AllDS) ? AllDS : ThirtyNine} className={ (ThirtyNine) ? "selected" : "" } variant="contained" size="small">39</Button>
                <Button onClick={ e => handleSet(e, 40) } disabled={(AllDS) ? AllDS : Fourty} className={ (Fourty) ? "selected" : "" } variant="contained" size="small">40</Button>
                <Button onClick={ e => handleSet(e, 41) } disabled={(AllDS) ? AllDS : FourtyOne} className={ (FourtyOne) ? "selected" : "" } variant="contained" size="small">41</Button>
                <Button onClick={ e => handleSet(e, 42) } disabled={(AllDS) ? AllDS : FourtyTwo} className={ (FourtyTwo) ? "selected" : "" } variant="contained" size="small">42</Button>
                <Button onClick={ e => handleSet(e, 43) } disabled={(AllDS) ? AllDS : FourtyThree} className={ (FourtyThree) ? "selected" : "" } variant="contained" size="small">43</Button>
                <Button onClick={ e => handleSet(e, 44) } disabled={(AllDS) ? AllDS : FourtyFour} className={ (FourtyFour) ? "selected" : "" } variant="contained" size="small">44</Button>
                <Button onClick={ e => handleSet(e, 45) } disabled={(AllDS) ? AllDS : FourtyFive} className={ (FourtyFive) ? "selected" : "" } variant="contained" size="small">45</Button>
            </div>
          </div>
          <div className="row row-ov">
            <div className="col-12 div-bingo-numbers">
                <Button style={{background:'black', color:'white', fontWeight:'700'}} variant="contained" size="small">G</Button>
                <Button onClick={ e => handleSet(e, 46) } disabled={(AllDS) ? AllDS : FourtySix} className={ (FourtySix) ? "selected" : "" } variant="contained" size="small">46</Button>
                <Button onClick={ e => handleSet(e, 47) } disabled={(AllDS) ? AllDS : FourtySeven} className={ (FourtySeven) ? "selected" : "" } variant="contained" size="small">47</Button>
                <Button onClick={ e => handleSet(e, 48) } disabled={(AllDS) ? AllDS : FourtyEight} className={ (FourtyEight) ? "selected" : "" } variant="contained" size="small">48</Button>
                <Button onClick={ e => handleSet(e, 49) } disabled={(AllDS) ? AllDS : FourtyNine} className={ (FourtyNine) ? "selected" : "" } variant="contained" size="small">49</Button>
                <Button onClick={ e => handleSet(e, 50) } disabled={(AllDS) ? AllDS : Fifty} className={ (Fifty) ? "selected" : "" } variant="contained" size="small">50</Button>
                <Button onClick={ e => handleSet(e, 51) } disabled={(AllDS) ? AllDS : FiftyOne} className={ (FiftyOne) ? "selected" : "" } variant="contained" size="small">51</Button>
                <Button onClick={ e => handleSet(e, 52) } disabled={(AllDS) ? AllDS : FiftyTwo} className={ (FiftyTwo) ? "selected" : "" } variant="contained" size="small">52</Button>
                <Button onClick={ e => handleSet(e, 53) } disabled={(AllDS) ? AllDS : FiftyThree} className={ (FiftyThree) ? "selected" : "" } variant="contained" size="small">53</Button>
                <Button onClick={ e => handleSet(e, 54) } disabled={(AllDS) ? AllDS : FiftyFour} className={ (FiftyFour) ? "selected" : "" } variant="contained" size="small">54</Button>
                <Button onClick={ e => handleSet(e, 55) } disabled={(AllDS) ? AllDS : FiftyFive} className={ (FiftyFive) ? "selected" : "" } variant="contained" size="small">55</Button>
                <Button onClick={ e => handleSet(e, 56) } disabled={(AllDS) ? AllDS : FiftySix} className={ (FiftySix) ? "selected" : "" } variant="contained" size="small">56</Button>
                <Button onClick={ e => handleSet(e, 57) } disabled={(AllDS) ? AllDS : FiftySeven} className={ (FiftySeven) ? "selected" : "" } variant="contained" size="small">57</Button>
                <Button onClick={ e => handleSet(e, 58) } disabled={(AllDS) ? AllDS : FiftyEight} className={ (FiftyEight) ? "selected" : "" } variant="contained" size="small">58</Button>
                <Button onClick={ e => handleSet(e, 59) } disabled={(AllDS) ? AllDS : FiftyNine} className={ (FiftyNine) ? "selected" : "" } variant="contained" size="small">59</Button>
                <Button onClick={ e => handleSet(e, 60) } disabled={(AllDS) ? AllDS : Sixty} className={ (Sixty) ? "selected" : "" } variant="contained" size="small">60</Button>
            </div>
          </div>
          <div className="row row-ov">
            <div className="col-12 div-bingo-numbers">
                <Button style={{background:'black', color:'white', fontWeight:'700'}} variant="contained" size="small">O</Button>
                <Button onClick={ e => handleSet(e, 61) } disabled={(AllDS) ? AllDS : SixtyOne} className={ (SixtyOne) ? "selected" : "" } variant="contained" size="small">61</Button>
                <Button onClick={ e => handleSet(e, 62) } disabled={(AllDS) ? AllDS : SixtyTwo} className={ (SixtyTwo) ? "selected" : "" } variant="contained" size="small">62</Button>
                <Button onClick={ e => handleSet(e, 63) } disabled={(AllDS) ? AllDS : SixtyThree} className={ (SixtyThree) ? "selected" : "" } variant="contained" size="small">63</Button>
                <Button onClick={ e => handleSet(e, 64) } disabled={(AllDS) ? AllDS : SixtyFour} className={ (SixtyFour) ? "selected" : "" } variant="contained" size="small">64</Button>
                <Button onClick={ e => handleSet(e, 65) } disabled={(AllDS) ? AllDS : SixtyFive} className={ (SixtyFive) ? "selected" : "" } variant="contained" size="small">65</Button>
                <Button onClick={ e => handleSet(e, 66) } disabled={(AllDS) ? AllDS : SixtySix} className={ (SixtySix) ? "selected" : "" } variant="contained" size="small">66</Button>
                <Button onClick={ e => handleSet(e, 67) } disabled={(AllDS) ? AllDS : SixtySeven} className={ (SixtySeven) ? "selected" : "" } variant="contained" size="small">67</Button>
                <Button onClick={ e => handleSet(e, 68) } disabled={(AllDS) ? AllDS : SixtyEight} className={ (SixtyEight) ? "selected" : "" } variant="contained" size="small">68</Button>
                <Button onClick={ e => handleSet(e, 69) } disabled={(AllDS) ? AllDS : SixtyNine} className={ (SixtyNine) ? "selected" : "" } variant="contained" size="small">69</Button>
                <Button onClick={ e => handleSet(e, 70) } disabled={(AllDS) ? AllDS : Seventy} className={ (Seventy) ? "selected" : "" } variant="contained" size="small">70</Button>
                <Button onClick={ e => handleSet(e, 71) } disabled={(AllDS) ? AllDS : SeventyOne} className={ (SeventyOne) ? "selected" : "" } variant="contained" size="small">71</Button>
                <Button onClick={ e => handleSet(e, 72) } disabled={(AllDS) ? AllDS : SeventyTwo} className={ (SeventyTwo) ? "selected" : "" } variant="contained" size="small">72</Button>
                <Button onClick={ e => handleSet(e, 73) } disabled={(AllDS) ? AllDS : SeventyThree} className={ (SeventyThree) ? "selected" : "" } variant="contained" size="small">73</Button>
                <Button onClick={ e => handleSet(e, 74) } disabled={(AllDS) ? AllDS : SeventyFour} className={ (SeventyFour) ? "selected" : "" } variant="contained" size="small">74</Button>
                <Button onClick={ e => handleSet(e, 75) } disabled={(AllDS) ? AllDS : SeventyFive} className={ (SeventyFive) ? "selected" : "" } variant="contained" size="small">75</Button>
            </div>
          </div>
          <div className="row">
            <div className="col-12 div-m-footer">
              <Button onClick={ handleClose } style={{textTransform:'capitalize'}} variant="outlined">Cancel</Button>
              <Button onClick={ handleClose } style={{textTransform:'capitalize',backgroundColor:'#805ad5', color:'white'}} variant="contained">
                Finish <CheckOutlinedIcon />
              </Button>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>

      <MessageDialog
        isOpenMessage={ openConfirm } 
        handleCloseMessage={ handleCloseConfirm } 
        handleOkay={ handleResultOkay } 
        title={ "Confirm Result" } 
        content={ (`Are you sure you want to select number ${CurrentNumber}?`)}
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default PostResults
