import React from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { GetStoreObject } from "../../helper/Helpers";

const PageLayout = () => {
  const location = useLocation()
  let authdata = GetStoreObject("auth");
  
  return (
    <>
      {
        (authdata !== null) ? <Outlet /> : <Navigate to="/console/login" state={{ from: location }} replace /> 
      }
    </>
  );
};

export default PageLayout;