import React from 'react';
import "./navbar.scss";

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import NotificationDialog from "../Dialog/NotificationDialog";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/reducers/auth/AuthReducer';
import { removeAppState } from '../../redux/reducers/AppStateReducer';
import { removeRoleState } from '../../redux/reducers/RoleStateReducer';
import MessageDialog from "../Dialog/MessageDialog";
import NavIcon from './NavIcon';

const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { appState } = useSelector((state) => state.appState);
  const { roleState } = useSelector((state) => state.roleState);

  let title = (appState.split(".")[1]);
  let navTitle = (title !== undefined) ? title.replace(/([a-z](?=[A-Z]))/g, '$1 ').toUpperCase() : "";

  const [openNotify, setOpenNotify] = React.useState(false);
  const handleNotifyOpen = () => { setOpenNotify(true); }
  const handleNotifyClose = () => { setOpenNotify(false); }

// Confiration dialog message for add company
  const [openConfirmLogoutSubmit, setConfirmLogoutSubmit] = React.useState(false);
  const handleLogoutSubmitOpen = () => { setConfirmLogoutSubmit(true); };
  const handleLogoutSubmitClose = () => { setConfirmLogoutSubmit(false); };
  const handleLogoutOkay = async () => {
    dispatch(logOut());
    dispatch(removeAppState());
    dispatch(removeRoleState());

    if (roleState === "Agent") {
      navigate('/console/login');
    } else {
      navigate('/dashboard/login');
    }
  };

  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="navTitle">
          <NavIcon sideBarSate={ appState } />
          <h2>{(navTitle === "PRICE&PRIZES" ? "PRICE & PRIZES" : navTitle )}</h2>
        </div>

        <div className="items">
          <div className="item itemNoti" onClick={ handleNotifyOpen }>
            <NotificationsNoneOutlinedIcon className='icon' />
            <div className="counter">1</div>
          </div>
          <div className="item itemLogout" onClick={ handleLogoutSubmitOpen }>
            <span style={{fontSize:'16px',marginRight:'10px',color:'white'}}>Logout</span> 
            <ExitToAppIcon className='icon' />
          </div>
        </div>
      </div>

      <MessageDialog
        isOpenMessage={ openConfirmLogoutSubmit } 
        handleCloseMessage={ handleLogoutSubmitClose } 
        handleOkay={ handleLogoutOkay } 
        title={ "Logout" } 
        content={ "Are you sure you want to logout?" }
        color={ "error" } />
      
      <NotificationDialog isOpen={ openNotify } handleClose={ handleNotifyClose } />
    </div>
  )
}

export default Navbar