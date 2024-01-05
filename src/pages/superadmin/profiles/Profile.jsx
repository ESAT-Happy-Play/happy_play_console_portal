import "./profile.scss";

import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import PageLoader from "../../../components/widget/PageLoader";
import { toast } from 'react-toastify';

import { GETFetch, DELETEFetch } from "../../../api/ApiFetchBuilder";
import AddProfile from "../../../components/Dialog/forms/profile/AddProfile";
import EditProfile from "../../../components/Dialog/forms/profile/EditProfile";
import MessageDialog from "../../../components/Dialog/MessageDialog";

const Profile = () => {
  /**
   * constants and functions
   */
  const [pageLoader, setPageLoader] = useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [dynamicfeatureID, setdynamicfeatureID] = useState(null);
  const [dynamicProfileName, setdynamicProfileName] = useState(null);
  const [insertCount, setinsertCount] = useState(0);

  const [accessProfiles, setaccessProfiles] = useState([]);
  const [userAccessProfile, setuserAccessProfile] = useState(null);

  const handleUserAccessProfile = async () => {
    setPageLoader(true);
    let response = await GETFetch(`${process.env.REACT_APP_API_URL}/users/accessprofiles`);
    setPageLoader(false);

    if(response.status) {
      let defaultSP = response.data.accessProfiles.filter(m => m.featureName == "SuperAdmin");
      let defaultId = (dynamicfeatureID !== null) ? dynamicfeatureID : (defaultSP.length > 0) ? defaultSP[0].featureID : '';
      let defaultName = (dynamicProfileName !== null) ? dynamicProfileName : (defaultSP.length > 0) ? defaultSP[0].featureName : '';
      
      setaccessProfiles(response.data.accessProfiles);
      setdynamicfeatureID(defaultId);
      setdynamicProfileName(defaultName);

      // then request access data for default super admin
      await handleUserAccessData(defaultId);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  const handleUserAccessData = async (featureId) => {
    setSubmitLoading(true);
    let response = await GETFetch(`${process.env.REACT_APP_API_URL}/users/accessprofile?featureid=${featureId}`);
    setSubmitLoading(false);

    if(response.status) {
      setuserAccessProfile(response.data.userAccessProfile);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    handleUserAccessProfile();
  }, [dynamicfeatureID, insertCount]);

  const handleClick = async (elem, code, name) => {
    let listClass = document.getElementsByClassName('active-b')
    // remove all class active to the list
    for (let i = 0; i < listClass.length; i++) {
      listClass[i].classList.remove("active-b");
    }

    // now add active to curren selected 
    elem.target.classList.add("active-b");

    setdynamicfeatureID(code);
    setdynamicProfileName(name);
  }

  // Add dialog
  const [openAddProfile, setAddProfile] = React.useState(false);
  const handleAddProfileOpen = () => { setAddProfile(true); };
  const handleAddProfileClose = () => { setAddProfile(false); };

  const handleProfileCallback = () => {
    setinsertCount((insertCount + 1));
  }

  // Edit dialog
  const [openEditProfile, setEditProfile] = React.useState(false);
  const handleEditProfileOpen = () => { setEditProfile(true); };
  const handleEditProfileClose = () => { setEditProfile(false); };

  const handleEditProfileCallback = () => {
    setinsertCount((insertCount + 1));
  }

  // Confiration dialog message
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleDeleteProfileOkay = async () => {
    setSubmitLoading(true);
    let response = await DELETEFetch(`${process.env.REACT_APP_API_URL}/users/accessprofile?featureid=${dynamicfeatureID}`);
    if(response.status) {
      toast.success(response.data.message);
      setTimeout(function() {
        window.location.reload(false);
      }, 2000);
    }

    if(!response.status) {
      setSubmitLoading(false);
      toast.error(response.data.errorMessage);
    }
  };

  return (
    <div className="profilePage">
      <div className="container">
        <div className="top" style={{borderBottom:'2px solid rgb(239, 239, 239)'}}>
          <h2 className="title">PROFILES</h2>
          <Button className="btn-success" variant="outlined" size="large" onClick={ handleAddProfileOpen }>
            Add New Profile <AddIcon />
          </Button>
        </div>
        <div style={{display:'flex'}}>
          <div className="div-left">
            <ul>
              {
                (accessProfiles.length > 0) ?
                  accessProfiles.map((item) => (
                    <li onClick={(e) => handleClick(e, item.featureID, item.featureName)} className={(item.featureName === "SuperAdmin") ? "active-b" : ""} key={item.featureID}>
                      {item.featureName}
                    </li>
                  ))
                : (pageLoader) ?
                  <li>Loading... Please wait.</li>
                :
                  <li>No data found</li>
              }
            </ul>
          </div>
          <div className="div-right">
            {
              (submitLoading) ? 
                <div style={{padding:'25px'}}> <span>Loading... Please wait.</span> </div>
              :
              (userAccessProfile !== null) ? 
                <>
                  <form noValidate>
                    <div className="div-content">
                      <h4>CATEGORY</h4>
                      <div style={{marginTop:'15px'}}>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g1_superAdmin !== 0) ? true : false} />} label="Super Admin" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g1_company !== 0) ? true : false} />} label="Company" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g1_branch !== 0) ? true : false} />} label="Branch" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g1_profiles !== 0) ? true : false} />} label="Profiles" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g1_games !== 0) ? true : false} />} label="Games" />
                        </FormGroup>
                      </div>
                    </div>
                    <div className="div-content">
                      <h4>USER ACCOUNT</h4>
                      <div style={{marginTop:'15px'}}>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g2_systemUsers !== 0) ? true : false} />} label="System Users" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g2_operators !== 0) ? true : false} />} label="Operators" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g2_userVerification !== 0) ? true : false} />} label="User Verification" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g2_masterAgents !== 0) ? true : false} />} label="Master Agents" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g2_agents !== 0) ? true : false} />} label="Agents" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g2_players !== 0) ? true : false} />} label="Players" />
                        </FormGroup>
                      </div>
                    </div>
                    <div className="div-content">
                      <h4>GAME</h4>
                      <div style={{marginTop:'15px'}}>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g3_gameScheduleSettings !== 0) ? true : false} />} label="Game Schedule Settings" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g3_gameMecahnicsSettings !== 0) ? true : false} />} label="Game Mechanics Settings" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g3_gameWinningSettings !== 0) ? true : false} />} label="Price & Prizes" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g3_bets !== 0) ? true : false} />} label="Bets" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g3_gameResult !== 0) ? true : false} />} label="Game Result" />
                        </FormGroup>
                      </div>
                    </div>
                    <div className="div-content">
                      <h4>POSTINGS</h4>
                      <div style={{marginTop:'15px'}}>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g4_txtBlast !== 0) ? true : false} />} label="Text Blast" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g4_announcements !== 0) ? true : false} />} label="Announcements" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g4_livestreaming !== 0) ? true : false} />} label="Livestreaming" />
                        </FormGroup>
                      </div>
                    </div>
                    <div className="div-content">
                      <h4>REPORTS</h4>
                      <div style={{marginTop:'15px'}}>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g5_sales !== 0) ? true : false} />} label="Sales" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g5_transactions !== 0) ? true : false} />} label="Transactions" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g5_userActivity !== 0) ? true : false} />} label="User Activity" />
                          <FormControlLabel control={<Checkbox disabled defaultChecked={(userAccessProfile.g5_userGrowth !== 0) ? true : false} />} label="User Growth" />
                        </FormGroup>
                      </div>
                    </div>
                  </form>

                  <div className="div-bottom">
                    <Button onClick={ handleSubmitOpen } className="btn-error" color="error" variant="outlined" size="small">
                      Delete <DeleteIcon />
                    </Button>
                    <Button onClick={ handleEditProfileOpen } className="btn-warning" variant="outlined" size="small">
                      Edit <EditIcon />
                    </Button>
                  </div>
                </>
              :
                <div style={{padding:'25px'}}> <span>Loading... Please wait.</span> </div>
            }
          </div>
        </div>
      </div>

      <AddProfile isOpenAdd={ openAddProfile } handleCloseAdd={ handleAddProfileClose } handleCallback={ handleProfileCallback } />
      <EditProfile 
        isOpenEdit={ openEditProfile } 
        handleCloseEdit={ handleEditProfileClose } 
        handleCallback={ handleEditProfileCallback }
        objData={userAccessProfile} />
      
      <MessageDialog
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleDeleteProfileOkay } 
        title={ "Confirmation" } 
        content={ `Are you sure you want to delete ${dynamicProfileName}?` }
        color={ "error" }
        isLoading={ submitLoading } />
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default Profile
