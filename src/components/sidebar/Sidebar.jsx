import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import React, { useState } from 'react';
import { useSelector } from "react-redux";

import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import "./sidebar.scss";

const Sidebar = () => {
  const { appState } = useSelector((state) => state.appState);
  
  const [selected, setSelected] = useState("");
  // TODO: connect to actual notification number
  const mockNotifCounter = 4;

  const handleProfile = () => {
    window.location.href = '/profile';
  }

  const goToNotificatoins = () => {
    window.location.href = '/notifications';
  }

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
              <SidebarItem item={route} key={index} hasIcon={true} />
            )
          ) : null
        ))
      }
      <div className="foot">
        <div className={(appState === "Notifications.Notifications") ? "notifications foot-active" : "notifications" }
        onClick={goToNotificatoins}>
          <NotificationsIcon className='icon' />
          <p>Notifications</p>
          {mockNotifCounter > 0 &&
            <p className="notif-count">{mockNotifCounter}</p>
          }
        </div>
        <div className={(appState === "Profile.Profile") ? "profile foot-active" : "profile" } 
        onClick={handleProfile}>
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