import React from 'react';

import { StoreExt } from "../../utils/helpers";

import AdminGamePrizes from './AdminGamePrizes';
import DefaultGamePrizes from './DefaultGamePrizes';

const GamePrizes = () => {
  let loginObj = StoreExt.getStore("auth");

  return (
    <>
      {
        (loginObj.companyId === -1)
        ? <AdminGamePrizes /> 
        : <DefaultGamePrizes />
      }
    </>
  )
}

export default GamePrizes
