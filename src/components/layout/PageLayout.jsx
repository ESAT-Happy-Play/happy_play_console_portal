import React from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { GetStoreObject } from "../../helper/Helpers";

const PageLayout = () => {
  const location = useLocation()
  let authdata = GetStoreObject("auth");
  let userRole = GetStoreObject("role");

  return (
    <>
      {
        (authdata !== null) ? <Outlet /> 
          : (userRole.role == "Agent") ? <Navigate to="/agent/login" state={{ from: location }} replace /> 
          : <Navigate to="/dashboard/login" state={{ from: location }} replace />
      }
    </>
  );
};

export default PageLayout;