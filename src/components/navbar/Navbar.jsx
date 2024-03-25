import React from 'react';
import "./navbar.scss";

// import NotificationDialog from "../Dialog/NotificationDialog";

import { useSelector } from "react-redux";
import NavIcon from './NavIcon';

const Navbar = () => {
  const { appState } = useSelector((state) => state.appState);

  let title = (appState.split(".")[1]);
  let navTitle = (title !== undefined) ? title.replace(/([a-z](?=[A-Z]))/g, '$1 ').toUpperCase() : "";

  // const [openNotify, setOpenNotify] = React.useState(false);
  // const handleNotifyOpen = () => { setOpenNotify(true); }
  // const handleNotifyClose = () => { setOpenNotify(false); }

  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="navTitle">
          <NavIcon sideBarSate={ appState } />
          <h2>{(navTitle === "PRICE&PRIZES" ? "PRICE & PRIZES" : navTitle )}</h2>
        </div>
      </div>

      {/* <NotificationDialog isOpen={ openNotify } handleClose={ handleNotifyClose } /> */}
    </div>
  )
}

export default Navbar