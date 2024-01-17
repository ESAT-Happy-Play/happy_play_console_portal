import "./userverification.scss";

import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";

import PageLoader from "../../../components/widget/PageLoader";
import { toast } from 'react-toastify';
import VerificationList from "../../../components/table/userVerification/VerificationList";

import { GETFetch } from "../../../api/ApiFetchBuilder";
import UserVerificationRequest from "../../../components/Dialog/forms/verification/UserVerificationRequest";

const UserVerification = () => {
  /**
   * constants and functions
   */
  let _UserAgentCode = "0202"; // Agent as default
  let _UserPlayerCode = "0301"; // player as default

  const [pageLoader, setPageLoader] = useState(false);
  const [userCode, setuserCode] = useState(_UserAgentCode);
  const [usersForV, setusersForV] = useState([]);
  const [userDataInfo, setuserDataInfo] = useState(null);

  const [counter, setCounter] = useState(0);

  const handleVerificationData = async () => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_API_URL}/users/forverification?usercode=${userCode}`; 
    let response = await GETFetch(url);
    setPageLoader(false);

    if(response.status) {
      setusersForV(response.data.usersForVerification);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  const handleUserData = async (userid) => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_API_URL}/users/${userid}`; 
    let response = await GETFetch(url);
    setPageLoader(false);

    if(response.status) {
      setuserDataInfo(response.data.user);
      console.log(response.data.user);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    handleVerificationData();
  }, [userCode, counter]);

  const handleClick = async (elem, code) => {
    let listClass = document.getElementsByClassName('active-b')
    // remove all class active to the list
    for (let i = 0; i < listClass.length; i++) {
      listClass[i].classList.remove("active-b");
    }

    // now add active to curren selected 
    elem.target.classList.add("active-b");

    setuserCode(code);
  }


  // const [userObject, setuserObject] = useState(null);
  const handleShowVerification = async ( event, userObj) => {
    console.log(userObj.userId);

    // TODO: /users/:userid .user
    await handleUserData(userObj.userId);

    // setuserObject(userObj);
    handleVerifyRequestOpen();
  };

  const [openVerifyRequest, setVerifyRequest] = React.useState(false);
  const handleVerifyRequestOpen = () => { setVerifyRequest(true); };
  const handleVerifyRequestClose = () => { setVerifyRequest(false); };

  const handleVerficationCallback = () => {
    handleVerifyRequestClose();
    setCounter(counter + 1);
  };

  return (
    <div className="verificationPage">
      <div className="container">
        <div className="top" style={{borderBottom:'2px solid rgb(239, 239, 239)'}}>
          <h2 className="title">VERIFICATION REQUEST</h2>
        </div>
        <div style={{display:'flex'}}>
          <div className="div-left">
            <ul>
              <li onClick={(e) => handleClick(e, _UserAgentCode)} className="active-b">Agents</li>
              <li onClick={(e) => handleClick(e, _UserPlayerCode)}>Players</li>
            </ul>
          </div>
          <div className="div-right">
            <div className="div-bottom">
              <VerificationList searchResults={ usersForV } ShowVerify={handleShowVerification} isLoading={ pageLoader } />
            </div>
          </div>
        </div>
      </div>

      <UserVerificationRequest isOpenAdd={ openVerifyRequest } 
        handleCloseAdd={ handleVerifyRequestClose } 
        userObj={ userDataInfo } handleCallback={handleVerficationCallback} />
    </div>
  )
}

export default UserVerification
