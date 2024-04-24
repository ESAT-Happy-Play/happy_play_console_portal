import React from 'react';

import { StoreExt } from "../../utils/helpers";

import AdminScheduleSettings from './AdminScheduleSettings';
import DefaultScheduleSettings from './DefaultScheduleSettings';

const ScheduleSettings = () => {
  let loginObj = StoreExt.getStore("auth");

  return (
    <>
      {
        (loginObj.companyId === -1)
        ? <AdminScheduleSettings /> 
        : <DefaultScheduleSettings />
      }
    </>
  )
}

export default ScheduleSettings
