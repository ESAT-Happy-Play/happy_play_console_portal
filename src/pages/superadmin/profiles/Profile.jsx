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

import { ProfileModel } from "../../../model/ProfileModel";
import { GETFetch, POSTFetch } from "../../../api/ApiFetchBuilder";
import AddProfile from "../../../components/Dialog/forms/profile/AddProfile";
import EditProfile from "../../../components/Dialog/forms/profile/EditProfile";
import MessageDialog from "../../../components/Dialog/MessageDialog";

const Profile = () => {
  /**
   * constants and functions
   */
  const [pageLoader, setPageLoader] = useState(false);
  const formProfile = useForm({ defaultValues: ProfileModel.AddProfileForm });
  const { register, handleSubmit, formState, reset } = formProfile;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);

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

  // Edit dialog
  const [openEditProfile, setEditProfile] = React.useState(false);
  const handleEditProfileOpen = () => { setEditProfile(true); };
  const handleEditProfileClose = () => { setEditProfile(false); };

  const handleEditProfileCallback = () => {
    console.log("Edit profile callback");
  }

  // Confiration dialog message
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleProfileOkay = async () => {
    setSubmitLoading(true);
    let response = await POSTFetch(`${process.env.REACT_APP_API_URL}/branches`, formData);
    if(response.status) {
      toast.success(response.data.message);
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
              <li>Super Admin</li>
              <li>Operator</li>
              <li>Master Agent</li>
              <li>Agent</li>
            </ul>
          </div>
          <div className="div-right">
            <form noValidate>
              <div className="div-content">
                <h4>CATEGORY</h4>
                <div style={{marginTop:'15px'}}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Super Admin" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Company" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Branch" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Profiles" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Games" />
                  </FormGroup>
                </div>
              </div>
              <div className="div-content">
                <h4>USER ACCOUNT</h4>
                <div style={{marginTop:'15px'}}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="System Users" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Operators" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="User Verification" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Master Agents" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Agents" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Players" />
                  </FormGroup>
                </div>
              </div>
              <div className="div-content">
                <h4>GAME</h4>
                <div style={{marginTop:'15px'}}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Game Schedule Settings" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Game Mechanics Settings" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Price & Prizes" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Bets" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Game Result" />
                  </FormGroup>
                </div>
              </div>
              <div className="div-content">
                <h4>POSTINGS</h4>
                <div style={{marginTop:'15px'}}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Text Blast" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Announcements" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Livestreaming" />
                  </FormGroup>
                </div>
              </div>
              <div className="div-content">
                <h4>REPORTS</h4>
                <div style={{marginTop:'15px'}}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Sales" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Transactions" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="User Activity" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="User Growth" />
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
          </div>
        </div>
      </div>

      <AddProfile isOpenAdd={ openAddProfile } handleCloseAdd={ handleAddProfileClose } handleCallback={ handleProfileCallback } />
      <EditProfile isOpenEdit={ openEditProfile } handleCloseEdit={ handleEditProfileClose } handleCallback={ handleEditProfileCallback } />
      
      <MessageDialog
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleProfileOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to delete profile?" }
        color={ "error" }
        isLoading={ submitLoading } />
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default Profile
