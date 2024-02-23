import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import React, { useEffect, useState } from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
  // TODO: connect to actual notification number
  const mockNotifCounter = 4;


  return (
    <div className="sidebar">
      <div className="top">
        <img src={require('../../assets/happy-play-logo.png')} className="logo" title="Esat Logo" />
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
        <div className="notifications">
          <NotificationsIcon className='icon' />
          <p>Notifications</p>
          {mockNotifCounter > 0 &&
            <p className="notif-count">{mockNotifCounter}</p>
          }
        </div>
        <div className="profile">
          <AccountCircleRoundedIcon className='icon' />
          <div>
            <h2>Username</h2>
            <p>Your Profile</p>
          </div>
          <ArrowForwardIosIcon className='icon' />
        </div>
        <div className="trademark">
          <h2>Web Dashboard</h2>
          <p>Happy Play © 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;