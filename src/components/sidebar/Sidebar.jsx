import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import React, { useEffect, useState } from 'react';

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
  const [selected, setSelected] = useState("");

  return (
    <div className="sidebar">
      <div className="top">
        <img src={require('../../assets/esat-top.png')} className="bg-img" title="Esat Logo" />
        <a href="/">
          <img src={require('../../assets/esat-mock-logo.png')} className="logo" title="Esat Logo" />
        </a>
      </div>
      {
        appRoutes.map((route, index) => (
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} selected={selected == route.sidebarProps.displayText} setSelected={setSelected} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        ))
      }
      <div className="foot">
        <img src={require('../../assets/esat-foot.png')} className="foot-logo" title="esat foot" />
      </div>
    </div>
  );
};

export default Sidebar;