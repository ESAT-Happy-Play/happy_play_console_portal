import React from 'react';

import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import Button from '@mui/material/Button';

import { Card } from '../../components/card/Card';

function WithdrawalList({data, callBack}) {
  const handleWithdraw = () => {
    callBack();
  }
  return (
    <>
      <div className='withdrawlist'>
          <div className='div-balance'>
            <PercentRoundedIcon />
            <p className='p-balance'>19,9099,445</p>
            <span style={{fontSize:'14x'}}>Available Balance</span>
            <Button sx={{marginTop:'10px'}} onClick={handleWithdraw} variant="contained" size='medium' fullWidth>Withdraw</Button>
          </div>

          <Card 
            style={{width:"270px"}} 
            bodystyle={{padding:'0px'}}
            header= "Recent Trasactions"
            body={
              <div className="tab-container">
                <div className='withdrawItem'>
                  <div className='listData'>
                    <span className='span-title'>Withdraw</span>
                    <span className='span-title' style={{color:'red'}}>-300.00 ₱</span>
                  </div>
                  <div className='listData'>
                    <span className='span-desc' style={{color:'#8d8c8c'}}>03/21/2024 17:35:45</span>
                    <span className='span-desc'>Success</span>
                  </div>
                </div>

                <div className='withdrawItem'>
                  <div className='listData'>
                    <span className='span-title'>Bet</span>
                    <span className='span-title' style={{color:'green'}}>+10.00 ₱</span>
                  </div>
                  <div className='listData'>
                    <span className='span-desc' style={{color:'#8d8c8c'}}>03/21/2024 17:35:45</span>
                    <span className='span-desc' style={{color:'green'}}>Success</span>
                  </div>
                </div>

                <div className='withdrawItem'>
                  <div className='listData'>
                    <span className='span-title'>Withdraw</span>
                    <span className='span-title'>-300 ₱</span>
                  </div>
                  <div className='listData'>
                    <span className='span-desc' style={{color:'#8d8c8c'}}>03/21/2024 17:35:45</span>
                    <span className='span-desc'>Success</span>
                  </div>
                </div>

                <div className='withdrawItem'>
                  <div className='listData'>
                    <span className='span-title'>Bet</span>
                    <span className='span-title' style={{color:'green'}}>+10.00 ₱</span>
                  </div>
                  <div className='listData'>
                    <span className='span-desc' style={{color:'#8d8c8c'}}>03/21/2024 17:35:45</span>
                    <span className='span-desc' style={{color:'green'}}>Success</span>
                  </div>
                </div>

                <div className='withdrawItem'>
                  <div className='listData'>
                    <span className='span-title'>Withdraw</span>
                    <span className='span-title'>-300 ₱</span>
                  </div>
                  <div className='listData'>
                    <span className='span-desc' style={{color:'#8d8c8c'}}>03/21/2024 17:35:45</span>
                    <span className='span-desc'>Success</span>
                  </div>
                </div>
              </div>
            }
          />
        </div>
    </>
  )
}

export default WithdrawalList
