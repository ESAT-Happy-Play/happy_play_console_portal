import "./sysusers.scss";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { StoreExt } from "../../utils/helpers";
import { CompanyService } from "../../services";
import { SpinLoader } from '../../components/mui';
import { setCompanyState } from '../../redux/reducers/CompanyStateReducer'

import { AdminSysUserPage } from './AdminSysUserPage';
import { SysUserPage } from './SysUserPage';

export const SystemUsers = () => {
  
  const dispatch = useDispatch();
  let compObj = StoreExt.getStore("cmpInfo");
  let loginObj = StoreExt.getStore("auth");
  let tokenObj = StoreExt.getDecodeJWT(loginObj.token);
  const [companyData, setcompanyData] = useState(null);

  const [pageLoader, setPageLoader] = useState(false);
  const handleGetCompany = () => {
    if (compObj !== null) {
      setcompanyData(compObj.data);
      console.log(compObj.data);
    } else {
      setPageLoader(true);
      CompanyService.getCompanyDetails(tokenObj.companyId).then((resp) => {
          if (resp) { 
            setcompanyData(resp.data);
            dispatch(setCompanyState(resp));
          }
          setPageLoader(false);
      });
    }
  }

  useEffect(() => {
    handleGetCompany();
  }, []);

  return (
    <>
      {
        (companyData !== null)
        ? (companyData.companyId === -1)
        ? <AdminSysUserPage /> 
        : <SysUserPage paramCompanyObjId={companyData.companyObjectId} paramCompanyId={companyData.companyId} />
        : <div>Loading...Please wait.</div>
      }
    <SpinLoader isLoadingPage={ pageLoader } />
  </>
  )
}