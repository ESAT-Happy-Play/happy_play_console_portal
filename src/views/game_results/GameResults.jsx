import React from 'react';

import { StoreExt } from "../../utils/helpers";

import DefaultGameResult from './DefaultGameResult';
import AdminGameResult from './AdminGameResult';

const GameResults = () => {
  let loginObj = StoreExt.getStore("auth");

  return (
    <>
      {
        (loginObj.companyId === -1)
        ? <AdminGameResult /> 
        : <DefaultGameResult />
      }
    </>
  )
}

export default GameResults
