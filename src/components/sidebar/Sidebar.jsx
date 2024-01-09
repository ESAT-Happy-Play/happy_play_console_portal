import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
import "./sidebar.scss"
import { GetJWTStoreObject, GetStoreObject } from "../../helper/Helpers";

const Sidebar = () => {
  const dispatch = useDispatch();
  // auth api response object
  let storeObj = GetStoreObject("auth");
  // storeObj.companyObjId
  // storeObj.branchId
  // storeObj.isMain
  // storeObj.accountObjectId
  // storeObj.branchName
  
  const { authState } = useSelector((state) => state);
  
  return (
    <div className="sidebar">
      <div className="top">
        <img src={require('../../assets/esat-mock-logo.png')} className="logo" title="Esat Logo"/>
      </div>
      {
        appRoutes.map((route, index) => (
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        ))
      }
      <div className="foot">
        <img src={require('../../assets/esat-sidebar-foot.png')} className="foot-logo" title="esat foot"/>
      </div>
    </div>
  );
};

export default Sidebar;