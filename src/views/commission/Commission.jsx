import './commission.scss';
import React, { useEffect, useState } from 'react';

import WithdrawalList from './WithdrawalList';
import CommissionTable from './CommissionTable';
import WithdrawalRequest from './WithdrawalRequest';

export const Commission = () => {
  const [isWithdrawRequest, setisWithdrawRequest] = useState(false);
  const handleWithdraw = () => { setisWithdrawRequest(true); }
  const handleCancelWithdraw = () => { setisWithdrawRequest(false); }

  return (
    <div className='commission_container'>
      {
        (isWithdrawRequest) ? <WithdrawalRequest cancel={handleCancelWithdraw} />
        : <>
          <WithdrawalList callBack={handleWithdraw} />
          <CommissionTable />
        </>
      }
    </div>
  )
}
