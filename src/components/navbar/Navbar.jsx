import React from 'react';
import "./navbar.scss";

import { useSelector, useDispatch } from "react-redux";
import NavIcon from './NavIcon';

const Navbar = () => {

  const dispatch = useDispatch()
  const { appState } = useSelector((state) => state.appState);

  let title = (appState.split(".")[1]);
  let navTitle = (title !== undefined) ? title.replace(/([a-z](?=[A-Z]))/g, '$1 ').toUpperCase() : "";

  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="navTitle">
          <NavIcon sideBarSate={ appState } />
          <h2>{(navTitle === "PRICE&PRIZES" ? "PRICE & PRIZES" : navTitle )}</h2>
        </div>
      </div>
    </div>
  )
}

export default Navbar