import React from 'react';
import {Button, TextField} from '@mui/material';

function WithdrawalRequest({cancel}) {
  return (
    <div className='commission_container' style={{background:'white', width:'100%', height:'85vh'}}>
      <div className='paymentType'>
        <div className='paymentItem itemActive'>
            <img src={require('../../assets/gcash.png')} alt="img" />
            <span>Gcash</span>
        </div>
        <div className='paymentItem'>
            <img src={require('../../assets/maya.png')} alt="img" />
            <span>Maya</span>
        </div>
        <div className='paymentItem'>
            <img src={require('../../assets/grabpay.jpg')} alt="img" />
            <span>Grabpay</span>
        </div>
        <div className='paymentItem'>
            <img src={require('../../assets/visa.jpg')} alt="img" />
            <span>Visa / Credit Card</span>
        </div>
        <div className='paymentItem'>
            <img src={require('../../assets/over-the-counter.png')} alt="img" />
            <span>Over the Counter</span>
        </div>
      </div>

      <div className='paymentForm'>
        <h3>Withdraw Info</h3>
        <p className='p-balance'>Available Balance: 10,000.00</p>
        <h3>Withdraw Amount</h3>
        <div className='div-amount'>
            <div className='amt-item amt-item-active'>1,000</div>
            <div className='amt-item'>3,500</div>
            <div className='amt-item'>5,000</div>
            <div className='amt-item'>8,000</div>
            <div className='amt-item'>10,000</div>
        </div>
        <br />
        <TextField label="Enter Amoun" variant="outlined" size='small' fullWidth />
        <br />
        <div className='paymentForm-Footer'>
            <Button variant="outlined" onClick={e=>cancel(false)}>Cancel</Button>
            <Button variant="contained">Request Withdraw</Button>
        </div>
      </div>
    </div>
  )
}

export default WithdrawalRequest
