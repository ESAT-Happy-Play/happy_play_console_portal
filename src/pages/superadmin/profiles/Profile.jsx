import "./profile.scss";

import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";

import { useForm } from 'react-hook-form';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import PageLoader from "../../../components/widget/PageLoader";
import { toast } from 'react-toastify';

import { GETFetch, DELETEFetch } from "../../../api/ApiFetchBuilder";
import AddProfile from "../../../components/Dialog/forms/profile/AddProfile";
import EditProfile from "../../../components/Dialog/forms/profile/EditProfile";
import MessageDialog from "../../../components/Dialog/MessageDialog";

import { ProfileModel } from "../../../model/ProfileModel";

const Profile = () => {
  /**
   * constants and functions
   */
  const [pageLoader, setPageLoader] = useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [disabledCheckbox, setdisabledCheckbox] = React.useState(true);
  const [isEditProfile, setisEditProfile] = React.useState(false);

  const formProfile = useForm({ defaultValues: ProfileModel.UpdateProfileForm });
  const { register, handleSubmit, formState, reset } = formProfile;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});

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
      let accessData = response.data.userAccessProfile;
      console.log(accessData);
      reset(formValues => ({
        ...formValues,
        g1_superadmin: accessData.g1_superadmin,
        g1_company: accessData.g1_company,
        g1_branch: accessData.g1_branch,
        g1_profiles: accessData.g1_profiles,
        g1_game: accessData.g1_game,
        g2_systemusers: accessData.g2_systemusers,
        g2_operators: accessData.g2_operators,
        g2_userverification: accessData.g2_userverification,
        g2_masteragents: accessData.g2_masteragents,
        g2_agents: accessData.g2_agents,
        g2_players: accessData.g2_players,
        g3_gameschedulesettings: accessData.g3_gameschedulesettings,
        g3_gamemechanicssettings: accessData.g3_gamemechanicssettings,
        g3_gamewinningsettings: accessData.g3_gamewinningsettings,
        g3_gamebets: accessData.g3_gamebets,
        g3_gameresults: accessData.g3_gameresults,
        g4_txtblast: accessData.g4_txtblast,
        g4_announcements: accessData.g4_announcements,
        g4_livestream: accessData.g4_livestream,
        g5_sales: accessData.g5_sales,
        g5_transactions: accessData.g5_transactions,
        g5_useractivity: accessData.g5_useractivity,
        g5_usergrowth: accessData.g5_usergrowth
      }));
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

  // // Edit dialog
  // const [openEditProfile, setEditProfile] = React.useState(false);
  // const handleEditProfileOpen = () => { setEditProfile(true); };
  // const handleEditProfileClose = () => { setEditProfile(false); };

  // const handleEditProfileCallback = () => {
  //   setinsertCount((insertCount + 1));
  // }
  const handleEditProfile = () => {
    setisEditProfile(true);
    setdisabledCheckbox(false);
  }

  const handleEditProfileCancel = () => {
    setisEditProfile(false);
    setdisabledCheckbox(true);
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

  // Edit submit handler
  const submitEditHandler = async (data) => {
    setFormData(data);
    // handleSubmitOpen();
    console.log(formProfile);
    console.log(data);
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
                  <form onSubmit={ handleSubmit(submitEditHandler) } noValidate>
                    <div className="div-body">
                      <div className="div-content">
                        <h4>CATEGORY</h4>
                        <div style={{marginTop:'15px'}}>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox {...register('g1_superadmin', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g1_superAdmin !== 0) ? true : false} />} label="Super Admin" />
                            <FormControlLabel control={<Checkbox {...register('g1_company', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g1_company !== 0) ? true : false} />} label="Company" />
                            <FormControlLabel control={<Checkbox {...register('g1_branch', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g1_branch !== 0) ? true : false} />} label="Branch" />
                            <FormControlLabel control={<Checkbox {...register('g1_profiles', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g1_profiles !== 0) ? true : false} />} label="Profiles" />
                            <FormControlLabel control={<Checkbox {...register('g1_game', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g1_games !== 0) ? true : false} />} label="Games" />
                          </FormGroup>
                        </div>
                      </div>
                      <div className="div-content">
                        <h4>USER ACCOUNT</h4>
                        <div style={{marginTop:'15px'}}>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox {...register('g2_systemusers', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g2_systemUsers !== 0) ? true : false} />} label="System Users" />
                            <FormControlLabel control={<Checkbox {...register('g2_operators', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g2_operators !== 0) ? true : false} />} label="Operators" />
                            <FormControlLabel control={<Checkbox {...register('g2_userverification', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g2_userVerification !== 0) ? true : false} />} label="User Verification" />
                            <FormControlLabel control={<Checkbox {...register('g2_masteragents', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g2_masterAgents !== 0) ? true : false} />} label="Master Agents" />
                            <FormControlLabel control={<Checkbox {...register('g2_agents', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g2_agents !== 0) ? true : false} />} label="Agents" />
                            <FormControlLabel control={<Checkbox {...register('g2_players', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g2_players !== 0) ? true : false} />} label="Players" />
                          </FormGroup>
                        </div>
                      </div>
                      <div className="div-content">
                        <h4>GAME</h4>
                        <div style={{marginTop:'15px'}}>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox {...register('g3_gameschedulesettings', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g3_gameScheduleSettings !== 0) ? true : false} />} label="Game Schedule Settings" />
                            <FormControlLabel control={<Checkbox {...register('g3_gamemechanicssettings', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g3_gameMecahnicsSettings !== 0) ? true : false} />} label="Game Mechanics Settings" />
                            <FormControlLabel control={<Checkbox {...register('g3_gamewinningsettings', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g3_gameWinningSettings !== 0) ? true : false} />} label="Price & Prizes" />
                            <FormControlLabel control={<Checkbox {...register('g3_gamebets', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g3_bets !== 0) ? true : false} />} label="Bets" />
                            <FormControlLabel control={<Checkbox {...register('g3_gameresults', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g3_gameResult !== 0) ? true : false} />} label="Game Result" />
                          </FormGroup>
                        </div>
                      </div>
                      <div className="div-content">
                        <h4>POSTINGS</h4>
                        <div style={{marginTop:'15px'}}>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox {...register('g4_txtblast', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g4_txtBlast !== 0) ? true : false} />} label="Text Blast" />
                            <FormControlLabel control={<Checkbox {...register('g4_announcements', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g4_announcements !== 0) ? true : false} />} label="Announcements" />
                            <FormControlLabel control={<Checkbox {...register('g4_livestream', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g4_livestreaming !== 0) ? true : false} />} label="Livestreaming" />
                          </FormGroup>
                        </div>
                      </div>
                      <div className="div-content">
                        <h4>REPORTS</h4>
                        <div style={{marginTop:'15px'}}>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox {...register('g5_sales', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g5_sales !== 0) ? true : false} />} label="Sales" />
                            <FormControlLabel control={<Checkbox {...register('g5_transactions', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g5_transactions !== 0) ? true : false} />} label="Transactions" />
                            <FormControlLabel control={<Checkbox {...register('g5_useractivity', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g5_userActivity !== 0) ? true : false} />} label="User Activity" />
                            <FormControlLabel control={<Checkbox {...register('g5_usergrowth', {})} disabled={disabledCheckbox} defaultChecked={(userAccessProfile.g5_userGrowth !== 0) ? true : false} />} label="User Growth" />
                          </FormGroup>
                        </div>
                      </div>
                    </div>

                    <div className={(isEditProfile) ? "div-body-bottom" : "div-body-bottom div-hide"}>
                      <Button onClick={ handleEditProfileCancel } variant="outlined" size="medium">
                        Cancel
                      </Button>
                      <Button type="submit" color="success" variant="contained" size="medium">
                        Update <EditIcon />
                      </Button>
                    </div>
                  </form>

                  <div className={(isEditProfile) ? "div-bottom div-hide" : "div-bottom"}>
                    <Button onClick={ handleSubmitOpen } className="btn-error" color="error" variant="outlined" size="small">
                      Delete <DeleteIcon />
                    </Button>
                    <Button onClick={ handleEditProfile } className="btn-warning" variant="outlined" size="small">
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
      {/* <EditProfile 
        isOpenEdit={ openEditProfile } 
        handleCloseEdit={ handleEditProfileClose } 
        handleCallback={ handleEditProfileCallback }
        objData={userAccessProfile} /> */}
      
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
