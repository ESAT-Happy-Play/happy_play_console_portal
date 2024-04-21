import React from 'react';

import { StoreExt } from "../../utils/helpers";

import AdminMechanicsSettings from './AdminMechanicsSettings';
import DefautMechanicsSettings from './DefautMechanicsSettings';

const MechanicsSettings = () => {
  let loginObj = StoreExt.getStore("auth");

  return (
    <>
      {
        (loginObj.companyId === -1)
        ? <AdminMechanicsSettings /> 
        : <DefautMechanicsSettings />
      }
    </>
  )
}

export default MechanicsSettings
