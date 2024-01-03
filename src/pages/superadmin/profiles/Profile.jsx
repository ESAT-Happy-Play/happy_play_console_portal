import "./profile.scss";

import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";

import PageLoader from "../../../components/widget/PageLoader";
import { toast } from 'react-toastify';

import { GETFetch } from "../../../api/ApiFetchBuilder";

const Profile = () => {
  /**
   * constants and functions
   */
  const [pageLoader, setPageLoader] = useState(false);
  const [profileData, setprofileData] = useState([]);

  const handleProfileData = async () => {
    setPageLoader(true);
    let response = await GETFetch(`${process.env.REACT_APP_API_URL}/companies`);
    setPageLoader(false);

    if(response.status) {
      setprofileData(response.data.companies);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // // trigger call API endpoint if state change
  // useEffect(() => {
  //   handleProfileData();
  // }, []);

  // Add dialog
  const [openAddProfile, setAddProfile] = React.useState(false);
  const handleAddProfileOpen = () => { setAddProfile(true); };
  const handleAddProfileClose = () => { setAddProfile(false); };

  const handleProfileCallback = () => {
    console.log("Add profile callback");
  }

  return (
    <div className="profilePage">
      <div className="container">
        <div className="top" style={{borderBottom:'2px solid rgb(239, 239, 239)'}}>
          <h2 className="title">PRFILES</h2>
          <Button className="btn-success" variant="outlined" size="large" onClick={ handleAddProfileOpen }>
            Add New Profile <AddIcon />
          </Button>
        </div>
        <div style={{display:'flex',marginTop:'15px'}}>
          <div>
            Test Left
          </div>
          <div>
            Test Right
          </div>
        </div>
      </div>

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default Profile
