import React, { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { StoreExt } from "../../utils/helpers";
import { setAccountState } from "../../redux/reducers/AccountStateReducer";
import { UserService } from "../../services";

const PageLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  let authdata = StoreExt.getStore("auth");
  let accountData = StoreExt.getStore("accountState");

  const handleInitUserInfo = () => {
    UserService.systemUserInfo(authdata.id).then((resp) => {
      if(resp) { dispatch(setAccountState(resp)); }
    })
  }
  
  useEffect(() => {
    if (accountData === null) { handleInitUserInfo(); }
  }, [dispatch, accountData]);

  return (
    <>
      {
        (authdata !== null) ? <Outlet /> : <Navigate to="/console/login" state={{ from: location }} replace /> 
      }
    </>
  );
};

export default PageLayout;