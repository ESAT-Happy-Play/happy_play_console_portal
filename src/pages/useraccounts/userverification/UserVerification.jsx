import "./userverification.scss";

import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";

import PageLoader from "../../../components/widget/PageLoader";
import { toast } from 'react-toastify';
import VerificationList from "../../../components/table/userVerification/VerificationList";

import { GETFetch } from "../../../api/ApiFetchBuilder";

const UserVerification = () => {
  /**
   * constants and functions
   */
  const [pageLoader, setPageLoader] = useState(false);
  const [usersForV, setusersForV] = useState([]);

  // // trigger call API endpoint if state change
  // useEffect(() => {
  //   handleProfileData();
  // }, []);

  return (
    <div className="verificationPage">
      <div className="container">
        <div className="top" style={{borderBottom:'2px solid rgb(239, 239, 239)'}}>
          <h2 className="title">VERIFICATION REQUEST</h2>
        </div>
        <div style={{display:'flex'}}>
          <div className="div-left">
            <ul>
              <li className="active-b">Agents</li>
              <li>Players</li>
            </ul>
          </div>
          <div className="div-right">
            <div className="div-bottom">
              <VerificationList searchResults={ usersForV } isLoading={ pageLoader } />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserVerification
