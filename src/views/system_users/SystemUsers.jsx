import "./sysusers.scss";
import React from 'react';
import { StoreExt } from "../../utils/helpers";
import { AdminSysUserPage } from './AdminSysUserPage';
import { SysUserPage } from './SysUserPage';

export const SystemUsers = () => {
  let loginObj = StoreExt.getStore("auth");
  let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

  return (
    <>
      {
        (loginObj.companyId)
        ? <AdminSysUserPage /> 
        : <SysUserPage paramCompanyObjId={tokenObj.companyId} paramCompanyId={loginObj.companyId} />
      }
  </>
  )
}