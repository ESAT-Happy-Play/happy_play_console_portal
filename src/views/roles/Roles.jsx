import "./roles.scss";
import React from 'react';
import { StoreExt } from "../../utils/helpers";
import { AdminRoleContent } from './AdminRoleContent';
import { RoleContent } from './RoleContent';

export const Roles = () => {
  let loginObj = StoreExt.getStore("auth");
  let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

  return (
    <>
      {
        (loginObj.companyId === -1)
        ? <AdminRoleContent /> 
        : <RoleContent paramCompanyObjId={tokenObj.companyId} paramCompanyId={loginObj.companyId} />
      }
    </>
  )
}