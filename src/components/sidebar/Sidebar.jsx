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
        <span className="logo">Happy Play</span>
      </div>
      <div className="profile" onClick={event =>  window.location.href='/'}>
          {
            <img src={`${process.env.PUBLIC_URL}/noimage.png`} alt="img" className='avatar' />
          }
          
          <div className="profInfo">
            <p style={{ overflow:"hidden" }}><b>{ authState.displayName }</b></p>
            <p>{ authState.userId }</p>
          </div>
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
    </div>
  );
};

export default Sidebar;