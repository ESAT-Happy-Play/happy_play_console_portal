import { useLocation, Navigate, Outlet } from "react-router-dom";
import "./main.scss"

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

import { setCredentials } from "../../redux/reducers/auth/AuthReducer";
import { setAccountState } from "../../redux/reducers/AccountStateReducer";

import { StoreExt } from "../../utils/helpers";

const Layout = () => {
  // constants
  const dispatch = useDispatch();
  const location = useLocation();

  let authdata = StoreExt.getStore("auth");
  let accountData = StoreExt.getStore("accountState");

  // for auth state
  useEffect(() => {
    if (authdata !== null) { dispatch(setCredentials(authdata)) }
    if (accountData !== null) { dispatch(setAccountState(accountData)) }
  }, [dispatch, authdata, accountData]);


  return (
    <div className="layout">
      <Sidebar />
      <div className="layoutContainer">
        <Navbar />
        {
          (authdata !== null) ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
        }
      </div>
    </div>
  );
};

export default Layout;