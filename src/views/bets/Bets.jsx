import React from 'react';

import { StoreExt } from "../../utils/helpers";

import AdminBets from './AdminBets';
import DefaultBets from './DefaultBets';

const Bets = () => {
  let loginObj = StoreExt.getStore("auth");

  return (
    <>
      {
        (loginObj.companyId === -1)
        ? <AdminBets /> 
        : <DefaultBets />
      }
    </>
  )
}

export default Bets
