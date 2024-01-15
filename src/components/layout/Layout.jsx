import { useLocation, Navigate, Outlet } from "react-router-dom";
import "./main.scss"

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

import { setCredentials } from "../../redux/reducers/auth/AuthReducer";
import { setRoleState } from "../../redux/reducers/RoleStateReducer";

import { GetStoreObject } from "../../helper/Helpers";

const Layout = () => {
  // constants
  const dispatch = useDispatch();
  const location = useLocation();

  let authdata = GetStoreObject("auth");
  let userRole = GetStoreObject("role");

// for auth state
  useEffect(() => {
    if (authdata !== null) {
      dispatch(setCredentials(authdata))
      dispatch(setRoleState(userRole));
    }
  }, [dispatch, authdata, userRole]);


  return (
    <div className="layout">
      <Sidebar />
      <div className="layoutContainer">
        <Navbar />
        {
          (authdata !== null) ? <Outlet /> 
          : (userRole === null) ? <Navigate to="/" state={{ from: location }} replace /> 
          : (userRole.role == "Agent") ? <Navigate to="/console/login" state={{ from: location }} replace /> 
          : <Navigate to="/dashboard/login" state={{ from: location }} replace />
        }
      </div>
    </div>
  );
};

export default Layout;