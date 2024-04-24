import React from 'react';

import { StoreExt } from "../../utils/helpers";

import AdminStoreSettings from './AdminStoreSettings';
import DefaultStoreSettings from './DefaultStoreSettings';

const StoreSettings = () => {
  let loginObj = StoreExt.getStore("auth");

  return (
    <>
      {
        (loginObj.companyId === -1)
        ? <AdminStoreSettings /> 
        : <DefaultStoreSettings />
      }
    </>
  )
}

export default StoreSettings
